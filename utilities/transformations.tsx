export const computeSHA256 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }


 export  const splitFileIntoChunks = (file: File, chunkSize: number): Array<{ data: Blob, uploaded: boolean }> => {
    let chunks = [];
    let start = 0;
    while (start < file.size) {
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      chunks.push({ data: chunk, uploaded: false });
      start = end;
    }
    return chunks;
  };