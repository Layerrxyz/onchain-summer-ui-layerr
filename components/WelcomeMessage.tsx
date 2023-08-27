import React from 'react'

function WelcomeMessage() {
    return (
        <div className='mb-8 max-w-[1000px]'>
            <p className='text-primary dark:text-primary-dark'>The OnChain Library allows you to securely upload and store files directly on the blockchain. By doing so, you&apos;re ensuring that your files benefit from the immutability and decentralized nature of blockchain technology, meaning they cannot be tampered with or removed by any single entity.</p>
            <h3 className='text-primary dark:text-primary-dark mt-4'>How it Works:</h3>
            <div className='flex flex-col gap-2'>
            <p className='text-grey'><span className='welcome-body'>Upload Your File:</span> Simply click on the <b>Upload File</b> button and select the file you wish to store on the blockchain.</p>
            <p className='text-grey'><span className='welcome-body'>Chunking Process:</span> If your file exceeds 24KB, our system will automatically split it into manageable 24KB chunks. This ensures that your file is uploaded efficiently and economically.</p>
            <p className='text-grey'><span className='welcome-body'> Blockchain Upload:</span> Once chunked (if needed), your file or its chunks will be uploaded to the blockchain. Each chunk will need to be uploaded seperately and accompanied by a transaction signature.</p>
            <p className='text-grey'> <span className='welcome-body'>Finalize:</span> After all chunks (if any) are uploaded, you will need to finalize your asset. This ensures that your file is securely and permanently stored on the blockchain.</p>
            </div>
        </div >
    )
}

export default WelcomeMessage