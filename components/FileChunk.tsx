import React from 'react'
import { ethers } from "ethers";

interface FileChunkProps {
    uploadChunk: any
    chunk:Blob
    chunkNumber: number
}

function FileChunk({uploadChunk, chunk, chunkNumber}: FileChunkProps) {
    console.log(uploadChunk, chunk, chunkNumber)
  return (
    <div className="w-[359px] h-[60px] flex items-center justify-between">
  <div className="left-0 top-[10px]  justify-start items-center inline-flex">
    <div className="">
      <div className="w-[18px] h-[18px] left-[11px] top-[11px]">
        <img className="w-[18px] h-[18px]" src="https://via.placeholder.com/18x18" />
      </div>
    </div>
    <div className="text-neutral-500 text-sm font-normal">{`Chunk ${chunkNumber}`}</div>
  </div>
  <div className="left-[171px] top-[17px] justify-start items-center gap-4 inline-flex">
    <div className="justify-start items-center gap-2 flex">
      <div className="text-right text-neutral-500 text-sm font-normal">8.61 MB</div>
    </div>
    <button onClick={()=>{uploadChunk(chunk, chunkNumber)}} className="text-sm font-normal py-2 px-4 border-solid border-[1px]">upload chunk</button>
  </div>
</div>
  )
}

export default FileChunk