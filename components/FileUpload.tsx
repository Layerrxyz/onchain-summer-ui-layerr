import { useState, useRef, useEffect } from "react";
import {
  computeSHA256,
  splitFileIntoChunks,
} from "../utilities/transformations";
import { useEthersSigner } from "../utilities/ethersSigner";
import uploadabi from "../assets/onchainLibrary.json";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { log } from "console";
import Library from "./Library";
type FileDetailsType = {
  name: string;
  type: string;
  size: number;
  hash: string;
  chunks: Blob[];
} | null;

export default function FileUpload() {
  const [fileDetails, setFileDetails] = useState<FileDetailsType>(null);
  const [disabled, setDisabled] = useState(true);
  const [filesUploaded, setFilesUploaded] = useState<any[]>([]);
  const signer = useEthersSigner();
  const account = useAccount();
  const [libraryAdded, setLibraryAdded] = useState(false);
  const [newAssetId, setNewAssetId] = useState<number | null>(null);
  const [chunksUploadedCount, setChunksUploadedCount] = useState<number>(0);

  useEffect(() => {
    const logAssets = async () => {
      const contract = new ethers.Contract(
        "0x00000000009A2E85957ae69A3b96efece482d15C",
        uploadabi,
        signer
      );
      console.log(contract);
      const filesUploaded = await contract.searchCatalogByUploader(
        account.address
      );
      setFilesUploaded(filesUploaded);
      console.log(filesUploaded);
    };

    if (signer) {
      setDisabled(false);
      logAssets();
    }
  }, [signer]);

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  // const contract = new ethers.Contract(
  //   "0x00000000009A2E85957ae69A3b96efece482d15C",
  //   uploadabi,
  //   signer
  // );

  // const addToLibrary = async () => {
  //   if (!fileDetails) return;

  //   try {
  //     console.log(fileDetails.hash);
  //     const tx = await contract.addAsset(
  //       fileDetails.name,
  //       `0x${fileDetails.hash}`,
  //       fileDetails.chunks.length
  //     );

  //     const receipt = await tx.wait();
  //     const assetAddedEvent = contract.interface.parseLog(receipt.logs[0]);
  //     console.log(assetAddedEvent);
  //     const id = assetAddedEvent.args[0].toNumber();
  //     setLibraryAdded(true);
  //     setNewAssetId(id);
  //   } catch (error) {
  //     handleContractError(error);
  //   }
  // };

  // const uploadChunk = async (chunk: Blob, index: number) => {
  //   try {
  //     // Read the blob as an ArrayBuffer
  //     const arrayBuffer = await new Response(chunk).arrayBuffer();

  //     // Convert the ArrayBuffer to a Uint8Array
  //     const uint8Array = new Uint8Array(arrayBuffer);

  //     // Convert the Uint8Array to a hex string
  //     const chunkBytes = ethers.utils.hexlify(uint8Array);

  //     // Upload the chunk to the blockchain
  //     console.log(newAssetId, index, chunkBytes)
  //     // const tx = await contract.uploadChunk(newAssetId, index, chunkBytes);
  //     // await tx.wait();
  //     setChunksUploadedCount((prev) => prev + 1);
  //   } catch (error) {
  //     handleContractError(error);
  //   }
  // };

  // const finalizeAsset = async (newAssetId: number) => {
  //   try {
  //     const tx = await contract.finalizeAsset(newAssetId);
  //     await tx.wait();
  //     console.log("Asset uploaded successfully");
  //   } catch (error) {
  //     handleContractError(error);
  //   }
  // };

  // const handleContractError = (e: any) => {
  //   if (e.message.includes("denied transaction signature")) {
  //     console.error("Transaction was rejected by the user.");
  //   } else {
  //     console.error("An error occurred:", e.message);
  //   }
  // };

  const addToLibrary = async () => {
    try {
      if (fileDetails) {
        const contract = new ethers.Contract(
          "0x00000000009A2E85957ae69A3b96efece482d15C",
          uploadabi,
          signer
        );

        console.log(fileDetails.hash);
        const tx = await contract.addAsset(
          fileDetails.name,
          `0x${fileDetails.hash}`,
          fileDetails.chunks.length
        );

        let receipt = await tx.wait();

        let assetAddedEvent = contract.interface.parseLog(receipt.logs[0]);
        console.log(assetAddedEvent);

        let newAssetId = assetAddedEvent.args[0].toNumber();
        console.log(newAssetId);

        for (let i = 0; i < fileDetails.chunks.length; i++) {
          const chunk = fileDetails.chunks[i];

          // Read the blob as an ArrayBuffer
          const arrayBuffer = await new Response(chunk).arrayBuffer();

          // Convert the ArrayBuffer to a Uint8Array
          const uint8Array = new Uint8Array(arrayBuffer);

          // Convert the Uint8Array to a hex string
          const chunkBytes = ethers.utils.hexlify(uint8Array);

          // Upload the chunk to the blockchain
          const tx1 = await contract.uploadChunk(newAssetId, i, chunkBytes);
          await tx1.wait();
        }

        const finaltx = await contract.finalizeAsset(newAssetId);
        await finaltx.wait();
        console.log("Asset uploaded successfully");
      }
    } catch (e) {
      const error = e as Error;
      if (error.message.includes("denied transaction signature")) {
        console.error("Transaction was rejected by the user.");
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files && event.target.files[0];
    handleFile(fileUploaded);
  };

  const handleFile = async (file: any) => {
    if (file) {
      const fileName = file.name;
      const fileHash = await computeSHA256(file);
      const fileChunks = splitFileIntoChunks(file, 24575);
      console.log(fileChunks);
      setFileDetails({
        name: fileName,
        type: file.type,
        size: file.size,
        hash: fileHash,
        chunks: fileChunks,
      });
    }
  };

  return (
    <div className="flex items-center flex-col p-4">
      <div className="my-4">
        {signer && <p>Files uploaded to Base: </p>}
        {filesUploaded.map((file, index) => {
          return (
            <div key={index}>
              <p>{file.name}</p>
              {/* <p>{file.expectedSHA256Hash}</p> */}
            </div>
          );
        })}
      </div>
      {disabled ? (
        <div>Connect your wallet to upload a file.</div>
      ) : (
        <>
          <button
            className="text-primary dark:text-primary-dark border-[1px] border-solid px-6 py-2"
            onClick={handleClick}
          >
            {fileDetails ? "Choose different file" : "Upload a file"}
          </button>
          <input
            type="file"
            onChange={handleChange}
            ref={hiddenFileInput}
            style={{ display: "none" }} // Make the file input element invisible
          />{" "}
        </>
      )}

      {fileDetails && !libraryAdded && (
        <section>
          <div className="mt-4">
            <h3>File Details:</h3>
            <p className="font-bold  text-primary dark:text-primary-dark">
              Name: <span>{fileDetails.name}</span>
            </p>
            <p className="text-primary font-bold dark:text-primary-dark break-all">
              SHA256 Hash: <span>{fileDetails.hash}</span>
            </p>
            <p className="font-bold">
              Type: <span>{fileDetails.type}</span>
            </p>
            <p className="font-bold">
              Size: <span>{fileDetails.size} bytes</span>
            </p>
          </div>
          <div className=" w-full mt-8 items-center flex flex-col gap-4 justify-center">
            <p>
              {`File has been split into ${
                fileDetails.chunks.length - 1
              } chunks`}
            </p>
            <button
              className="text-primary dark:text-primary-dark  border-[1px] w-[8rem]"
              onClick={addToLibrary}
            >
              Add to Library
            </button>
          </div>
        </section>
      )}
        {libraryAdded &&
        fileDetails &&
        (
          <button className="border-solid border-[1px]" disabled={chunksUploadedCount !== fileDetails.chunks.length} onClick={() => finalizeAsset(newAssetId!)}>
            Finalize Asset ID
          </button>
        )}
      {/* {libraryAdded && fileDetails && (
        <Library uploadChunk={uploadChunk} chunks={fileDetails.chunks} />
      )} */}
    </div>
  );
}
