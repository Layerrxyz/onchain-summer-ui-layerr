import React from 'react'
import { ethers } from "ethers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../assets/fontAwesomeIcons'



interface FileChunkProps {
    uploadChunk: any
    chunk:Blob
    chunkNumber: number
    uploaded: boolean
}


function FileChunk({uploadChunk, chunk, chunkNumber, uploaded}: FileChunkProps) {
  
  return (
    <div className=" px-2 h-[60px] flex items-center justify-between border-solid border-[1px] dark:border-[rgba(255,255,255,0.2)]">
  <div className="left-0 top-[10px]  justify-start items-center inline-flex mx-2 md:p-4 md:w-[300px] ">
      <div className="w-[10px] h-[10px] mr-4">
        {uploaded ? 
      <FontAwesomeIcon className='text-primary dark:text-primary-dark -translate-y-[2px]' icon={['far', 'circle-check']} />
      :
      <FontAwesomeIcon className='text-primary dark:text-primary-dark -translate-y-[6px]' icon={['fas', 'circle-exclamation']} />
        }
    </div>
    <div className="text-primary dark:text-primary-dark text-sm font-normal">{`Chunk ${chunkNumber + 1}`}</div>
  </div>
  <div className="left-[171px] top-[17px] justify-start items-center gap-4 inline-flex">
  <button onClick={() => {
          if (!uploaded) {
            uploadChunk(chunk, chunkNumber);
          }
        }} disabled={uploaded} className="text-sm font-normal text-center py-1 rounded-xl px-6 border-solid border-[1px]">{uploaded ? 'Uploaded' : 'Upload Chunk'}</button>
  </div>
</div>
  )
}

export default FileChunk