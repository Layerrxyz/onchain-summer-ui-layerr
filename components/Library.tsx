import React from "react";
import FileChunk from "./FileChunk";

interface LibraryProps {
    uploadChunk: any;
  chunks: any;
}


function Library({ chunks, uploadChunk }: LibraryProps) {
    
  return (
    <div>
      {chunks.map((chunk:any, index:any) => {
        return <FileChunk key={index} uploadChunk={uploadChunk} chunk={chunk} chunkNumber={index} />;
      })}
    </div>
  );
}

export default Library;
