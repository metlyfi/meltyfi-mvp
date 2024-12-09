// SelectNFTItem

import Image from "next/image";
import { hexToNum, shortAdrs } from "~~/utils/utils";

export const SelectNFTItem: React.FC<any> = ({ item, onClick }) => {

    // TODO: Add method to take image for the NFT token    

  

  return (
    <li  className={"mt-2 hover:bg-gray-400 p-1"}
        onClick={(e: any) => {
            onClick( { contractAddress: item?.contractAddress, tokenId: hexToNum(item.tokenId), img: item?.img || '' })
        }}
    >
        <div className="btn-sm !rounded-xl flex gap-3 py-3">
        <div>
            <Image src={item?.img || ''} height={50} width={50} alt="nft" />
        </div>
        <div className="flex flex-col ms-5">
            <span className=" whitespace-nowrap"><span className="font-semibold">Address:</span> {shortAdrs(item.contractAddress)}</span>
            <span className=" whitespace-nowrap"><span className="font-semibold">NFT ID:</span> {hexToNum(item.tokenId)}</span>
        </div>
        </div>
    </li>
  );
};
