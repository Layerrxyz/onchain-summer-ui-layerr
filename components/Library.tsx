import React from "react";
import FileChunk from "./FileChunk";

interface LibraryProps {
    uploadChunk: any;
  chunks: any;
}


function Library({ chunks, uploadChunk }: LibraryProps) {    
  return (
    <div className="my-4">
      {chunks.map((chunk:any, index:any) => {
        return <FileChunk key={index} uploaded={chunk.uploaded} uploadChunk={uploadChunk} chunk={chunk.data} chunkNumber={index} />;
      })}
    </div>
  );
}

export default Library;
