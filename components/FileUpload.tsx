import { useState, useRef } from "react";
import {
  computeSHA256,
  splitFileIntoChunks,
} from "../utilities/transformations";

type FileDetailsType = {
  name: string;
  type: string;
  size: number;
  hash: string;
chunks: Blob[];
} | null;

export default function FileUpload() {
  const [fileDetails, setFileDetails] = useState<FileDetailsType>(null);

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

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
        chunks: fileChunks
      });
    }
  };

  return (
    <div className="flex items-center flex-col p-4">
      <>
        <button
          className="text-primary dark:text-primary-dark border-[1px] border-solid px-6 py-2"
          onClick={handleClick}
        >
          {fileDetails ? 'Choose different file' : 'Upload a file'}
        </button>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: "none" }} // Make the file input element invisible
        />
      </>
      {fileDetails && (
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
            {`File has been split into ${fileDetails.chunks.length - 1} chunks`}
            </p>
            <button className="text-primary dark:text-primary-dark  border-[1px] w-[8rem]">Add to Library</button>
        </div>
        </section>
      )}
    </div>
  );
}
