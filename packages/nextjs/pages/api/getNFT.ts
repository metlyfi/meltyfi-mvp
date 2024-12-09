import { NextApiRequest, NextApiResponse } from 'next'
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: process.env.ALCHEMY_API_KEY || '', // Inserisci la tua API key
  network: Network.ROOTSTOCK_TESTNET || '', // Scegli la rete
};

const alchemy = new Alchemy(config);

const fromTransferNFT = async (walletAddress: string) => {
  const transfers = await alchemy.core.getAssetTransfers({
    fromAddress: walletAddress,
    category: ["erc721", "erc1155"], // Filtra solo le transazioni NFT
  });
  console.log("FROM Transazioni NFT trovate:", transfers.transfers);
  return transfers.transfers
}

const toTransferNFT = async (walletAddress: string) => {
  const transfers = await alchemy.core.getAssetTransfers({
    toAddress: walletAddress,
    category: ["erc721", "erc1155"], // Filtra solo le transazioni NFT
  });
  console.log("TO Transazioni NFT trovate:", transfers.transfers);
  return transfers.transfers
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { walletAddress } = req.body

  try {
    const ownerAddr = "0xACC8CB8D3C8fccD8fC5F511A902d310574De9767";
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");


    const responseFrom = await fromTransferNFT(ownerAddr)
    const responseTo = await toTransferNFT(ownerAddr)

    return res.status(200).json({response: true})
  } catch (error) {
    console.log('NFTs error:', error);
    return res.status(400).json(error)
  }
}
export default handler;