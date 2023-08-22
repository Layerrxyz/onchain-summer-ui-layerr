export const computeSHA256 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }


export const splitFileIntoChunks = (file: File, chunkSize: number): Blob[] => {
    const chunks = [];
    let i = 0;
    while (i < file.size) {
      chunks.push(file.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return chunks;
  }
