import { NextApiRequest, NextApiResponse } from 'next'
import { outcomingNftTxs, incomingNftTxs, getNftsBalance } from '~~/modules/nfts';


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body

  try {
    if (!address) {
      throw 'Address not found'
    }
    const ownerAddr = address // "0xACC8CB8D3C8fccD8fC5F511A902d310574De9767";
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");


    const nftsTxs = await getNftsBalance(ownerAddr)

    return res.status(200).json(nftsTxs)
  } catch (error) {
    console.log('NFTs error:', error);
    return res.status(400).json(error)
  }
}
export default handler;