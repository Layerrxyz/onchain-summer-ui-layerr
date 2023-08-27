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
import WaitModal from "./WaitModal";
import SuccessBanner from "./SuccessBanner";
import WelcomeMessage from "./WelcomeMessage";
type FileDetailsType = {
  name: string;
  type: string;
  size: number;
  hash: string;
  chunks: Array<{ data: Blob; uploaded: boolean }>;
} | null;

export default function FileUpload() {
  const [fileDetails, setFileDetails] = useState<FileDetailsType>(null);
  const [filesUploaded, setFilesUploaded] = useState<any[]>([]);
  const signer = useEthersSigner();
  const account = useAccount();
  const [libraryAdded, setLibraryAdded] = useState(false);
  const [newAssetId, setNewAssetId] = useState<number | null>(null);
  const [chunksUploadedCount, setChunksUploadedCount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  
  const logAssets = async () => {
    const contract = new ethers.Contract(
      "0x00000000009A2E85957ae69A3b96efece482d15C",
      uploadabi,
      signer
    );
    const filesUploaded = await contract.searchCatalogByUploader(
      account.address
    );
    setFilesUploaded(filesUploaded);
  };


  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const contract = new ethers.Contract(
    "0x00000000009A2E85957ae69A3b96efece482d15C",
    uploadabi,
    signer
  );

  const addToLibrary = async () => {
    if (!fileDetails) return;
    setIsOpen(true);
    setModalTitle("Please sign the transaction to continue");
    setModalBody("This transaction creates an asset ID for your file.");
    let tx;
    try {
      tx = await contract.addAsset(
        fileDetails.name,
        `0x${fileDetails.hash}`,
        fileDetails.chunks.length
      );
    } catch (error) {
      setIsOpen(false);
      handleContractError(error);
      return;
    }
    setModalTitle("Transaction Executing... Please Wait");
    try {
      const receipt = await tx.wait();
      const assetAddedEvent = contract.interface.parseLog(receipt.logs[0]);
      const id = assetAddedEvent.args[0].toNumber();
      setLibraryAdded(true);
      setNewAssetId(id);
      setIsOpen(false);
    } catch (error) {
      setIsOpen(false);
      handleContractError(error);
    }
  };

  const uploadChunk = async (chunk: Blob, index: number) => {
    setIsOpen(true);
    setModalTitle("Please sign the transaction to continue");
    setModalBody(`This transaction uploads chunk ${index + 1} of your file to the blockchain.`);
    let chunkBytes;
    if (fileDetails) {
      try {
        // Read the blob as an ArrayBuffer
        const arrayBuffer = await new Response(chunk).arrayBuffer();
        // Convert the ArrayBuffer to a Uint8Array
        const uint8Array = new Uint8Array(arrayBuffer);
        // Convert the Uint8Array to a hex string
        chunkBytes = ethers.utils.hexlify(uint8Array);
      } catch (conversionError) {
        setIsOpen(false)
        handleContractError(conversionError);
        return;
      }
      setModalTitle("Uploading chunk... please wait");
      try {
        // Upload the chunk to the blockchain
        const tx = await contract.uploadChunk(newAssetId, index, chunkBytes);
        await tx.wait();
        setChunksUploadedCount((prev) => prev + 1);
        const updatedChunks = [...fileDetails.chunks];
        updatedChunks[index].uploaded = true;
        setFileDetails({ ...fileDetails, chunks: updatedChunks });
        setIsOpen(false)
      } catch (uploadError) {
        setIsOpen(false)
        handleContractError(uploadError);
      }
    }
  };


  const finalizeAsset = async (newAssetId: number) => {
    setIsOpen(true);
    setModalTitle("Please sign the transaction to continue");
    setModalBody("This ensures the file's contents are locked in and can't be altered on the blockchain.");
    let tx;
    try {
      tx = await contract.finalizeAsset(newAssetId);
    } catch (signingError) {
      setIsOpen(false);
      handleContractError(signingError);
      return;
    }
    setModalTitle("Finalizing asset... please wait");
    try {
      await tx.wait();
      setShowSuccessBanner(true);
      setIsOpen(false);
      await logAssets();
    } catch (finalizationError) {
      setIsOpen(false);
      handleContractError(finalizationError);
    }
  };

  const handleContractError = (e: any) => {
    if (e.message.includes("denied transaction signature")) {
      console.error("Transaction was rejected by the user.");
    } else {
      console.error("An error occurred:", e.message);
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
      setFileDetails({
        name: fileName,
        type: file.type,
        size: file.size,
        hash: fileHash,
        chunks: fileChunks,
      });
    }
  };

  useEffect(() => {
    if (signer) {
      logAssets();
    }
  }, [signer]);

  if (!signer)
    return (
      <div className="items-center justify-center flex flex-col mt-2  md:mt-6 lg:mt-12">
        <h2 className="font-bold text-center text-lg text-blue my-4">
          Connect your wallet to upload a file.
        </h2>
        <WelcomeMessage />

      </div>
    );

  return (
    <div className="flex gap-4 flex-col lg:flex-row items-center lg:h-[70vh] justify-center md:p-4">
      <div
        id="style-1"
        className="box scrollbar w-full lg:w-auto lg:max-w-[250px] order-2 lg:order-1"
      >
        <h3 className="text-blue font-bold mb-2">Files uploaded to Base: </h3>
        {filesUploaded.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No files uploaded yet.
          </p>
        ) :
          filesUploaded.map((file, index) => {
            return (
              <div className="mb-2 break-all" key={index}>
                <p className={`font-bold ${file.finalized ? 'text-green-500' : 'text-primary dark:text-primary-dark'}`}>{file.name}</p>
                <p className="text-grey">{file.expectedSHA256Hash}</p>
              </div>
            );
          })}
      </div>
      <div
        className={`box w-full lg:w-[80%]  order-1 lg:order-2 flex items-center  ${fileDetails ? "flex-col" : "flex-col"
          }`}
      >
        {showSuccessBanner && (
          <SuccessBanner setShowSuccessBanner={setShowSuccessBanner} />)}
        {!fileDetails && <WelcomeMessage />}
        {!libraryAdded && (
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

        {fileDetails && (
          <section>
            <div className="mt-4">
              <h3 className="text-blue">File Details:</h3>
              <p className="text-primary dark:text-primary-dark">
                Name: <span>{fileDetails.name}</span>
              </p>
              <p className="text-primary dark:text-primary-dark break-all">
                SHA256 Hash: <span>{fileDetails.hash}</span>
              </p>
              <p className="text-primary dark:text-primary-dark ">
                Type: <span>{fileDetails.type}</span>
              </p>
              <p className="text-primary dark:text-primary-dark">
                Size: <span>{fileDetails.size} bytes</span>
              </p>
            </div>
            {!libraryAdded && (
              <div className=" w-full mt-8 items-center flex flex-col gap-4 justify-center">
                {fileDetails.chunks.length > 1 && (
                  <p>
                    {`Due to onchain storage limits, this file will need to be uploaded in ${fileDetails.chunks.length} parts`}
                  </p>
                )}
                <button
                  className="text-primary dark:text-primary-dark border-[1px] border-solid px-6 py-2"
                  onClick={addToLibrary}
                >
                  Add to Library
                </button>
              </div>
            )}
          </section>
        )}
        {libraryAdded && fileDetails && (
          <button
            className={`border-solid py-2 px-4 rounded border cursor-pointer 
          ${chunksUploadedCount !== fileDetails.chunks.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                : "bg-blue text-white border-none"
              }`}
            disabled={chunksUploadedCount !== fileDetails.chunks.length}
            onClick={() => finalizeAsset(newAssetId!)}
          >
            Finalize
          </button>
        )}
        {libraryAdded && fileDetails && (
          <Library uploadChunk={uploadChunk} chunks={fileDetails.chunks} />
        )}
        <WaitModal
          modalTitle={modalTitle}
          modalBody={modalBody}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
