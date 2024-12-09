import { Alchemy, Network, AssetTransfersCategory } from 'alchemy-sdk';

const config = {
    apiKey: process.env.ALCHEMY_API_KEY || '',
    network: Network.ROOTSTOCK_TESTNET || '',
};
  
const alchemy = new Alchemy(config);
  
const outcomingNftTxs = async (walletAddress: string) => {
    const transfers = await alchemy.core.getAssetTransfers({
        fromAddress: walletAddress,
        category: [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155], 
    });
    console.log("FROM Transazioni NFT trovate:", transfers.transfers);
    return transfers.transfers
}
  
const incomingNftTxs = async (walletAddress: string) => {
    const transfers = await alchemy.core.getAssetTransfers({
      toAddress: walletAddress,
      category: [AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155], 
    });
    console.log("TO Transazioni NFT trovate:", transfers.transfers);
    return transfers.transfers
}

const getNftsMetadata = async (nfts: any) => {
    const result = await alchemy.nft.getNftMetadataBatch(nfts)
    return result
}

const getNftsBalance = async (walletAddress: string) => {
    const outcoming = await outcomingNftTxs(walletAddress)
    const incoming = await incomingNftTxs(walletAddress)

    const result = incoming.filter(
        (inc) =>
          !outcoming.some(
            (out) =>
              inc.tokenId === out.tokenId &&
              inc.rawContract.address === out.rawContract.address
          )
      ).map((inc) => ({
        contractAddress: inc.rawContract.address,
        tokenId: inc.tokenId,
        tokenType: inc.category.toUpperCase(), // Assumendo che "ERC721" venga da "category"
      }));

      // const metadata = await getNftsMetadata(result)
    
    return result
}
export { 
    outcomingNftTxs, 
    incomingNftTxs,
    getNftsBalance
};