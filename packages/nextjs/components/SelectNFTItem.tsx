// SelectNFTItem

import Image from "next/image";
import { hexToNum, shortAdrs } from "~~/utils/utils";
import { useReadContract } from "wagmi";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";


export const SelectNFTItem: React.FC<any> = ({ item, onClick }) => {
  const { targetNetwork } = useTargetNetwork();  
  const abi = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const { data, isLoading } = useReadContract({
    chainId: targetNetwork.id,
    functionName: 'tokenURI',
    address: item?.contractAddress,
    abi,
    args: [ BigInt(hexToNum(item.tokenId)) ],
  })
  
  console.log('readContractHookRes', data, isLoading)

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
