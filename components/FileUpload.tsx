import { useState, useRef } from "react";

type FileDetailsType = {
  name: string;
  type: string;
  size: number;
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

  const handleFile = (file:any) => {
    if (file) {
      setFileDetails({
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
  };

  return (
    <div className="flex items-center flex-col p-4">
        <>
      <button className="text-primary dark:text-primary-dark border-[1px] border-solid px-6 py-2" onClick={handleClick}>
        Upload a file
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display: 'none'}} // Make the file input element invisible
      />
    </>
      {fileDetails && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">File Details:</h3>
          <p className="text-primary dark:text-primary-dark">Name: {fileDetails.name}</p>
          <p className="text-primary dark:text-primary-dark">Type: {fileDetails.type}</p>
          <p className="text-primary dark:text-primary-dark">Size: {fileDetails.size} bytes</p>
        </div>
      )}
    </div>
  );
}
