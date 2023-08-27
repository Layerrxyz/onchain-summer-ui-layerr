## Features
### This is a simple user interface to run some of the main functions required to store art files to the blockchain.
- Unowned, immutable primative for storing file assets onchain.
- Utilizes SSTORE2 for onchain storage with deterministic CREATE2 addresses to prevent duplicate chunks of data from being stored.
- Data chunks can be added by uploading bytes or providing a storage pointer to the existing SSTORE2 address that the data is stored at.
- Assets may be finalized by uploader to prevent changes.
- Asset SHA256 can be validated onchain to be added to validated hash catalog.
- Asset catalog is searchable by name, uploader, expected SHA256 hash and validated SHA256 hash.
- Assets can be returned as bytes, string or Base64 encoded string.
- Storage is compatible with [scripty.sol](https://int-art.gitbook.io/scripty.sol/ "ScriptyBuilder")

## Getting Started

To run the development server, run:

```bash
npm i
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
