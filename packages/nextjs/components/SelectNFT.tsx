import { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks, notification } from "~~/utils/scaffold-eth";
import Image from "next/image";
import { getAddress } from "viem";
import api from "~~/helpers/api";
import { useAccount } from "wagmi";
import { hexToNum, shortAdrs } from "~~/utils/utils";
import { SelectNFTItem } from "./SelectNFTItem";

const allowedNetworks = getTargetNetworks()

const nftList = [
  {id: 1, address: '123123123', tokenId: '12', img: '/chocolate/05.png'},
  {id: 2, address: '123123123', tokenId: '12', img: '/chocolate/04.png'},
  {id: 3, address: '123123123', tokenId: '12', img: '/chocolate/03.png'},
  {id: 4, address: '123123123', tokenId: '12', img: '/chocolate/02.png'},
  {id: 5, address: '123123123', tokenId: '12', img: '/chocolate/01.png'},
]

export const SelectNFT: React.FC<any> = ({ nftData, setNftData }) => {

  const { address: connectedAddress } = useAccount();

  const [nftList, setNftList] = useState<any[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const getNFT = async () => {
    setLoading(true)
    try {
      const result = await api.getNFT({ address: connectedAddress })
      setNftList(result)
    } catch (error) {
      notification.error(<p className="font-bold mt-0 mb-1 text-red p-1">Error, impossible to get NFTs</p>);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (connectedAddress) getNFT()
  }, [connectedAddress])

  const dropdownRef = useRef<HTMLDetailsElement>(null)
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open")
  };

  useOutsideClick(dropdownRef, closeDropdown)


  const handleSetNftData = (payload: any) => {
    setNftData(payload)
    closeDropdown()
  }
  return (
    <>
      <details ref={dropdownRef} className="dropdown w-full leading-3 ">
        <summary tabIndex={0} className="btn bg-white text-black border py-3 btn-sm flex pl-0 pr-2 shadow-md dropdown-toggle gap-0 !h-auto w-full relative">
          {nftData?.contractAddress && nftData?.tokenId // && nftData?.img
          ?<div className="flex gap-3">
              <span className=" whitespace-nowrap"><span className="font-semibold">Address:</span> {nftData?.contractAddress}</span>
              <span className=" whitespace-nowrap"><span className="font-semibold">NFT ID:</span> {nftData?.tokenId}</span>
            </div>
          :
            <span className="ml-2 mr-1">
              Select NFT
            </span>
          }
          <span className="absolute top-2 right-3">
              <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
            </span>
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent bg-white text-black rounded-box gap-1 w-full"
        >
          {nftList?.length
            ? <>{nftList.map((item, index) => {
              if (!item?.tokenId) return null
              return (
                <SelectNFTItem key={index} item={item} onClick={handleSetNftData} />
                // <li key={index} className={"mt-2 hover:bg-gray-400 p-1"}
                //   onClick={(e) => {
                //     e.preventDefault()
                //     setNftData({ contractAddress: item.contractAddress, tokenId: hexToNum(item.tokenId), img: item?.img || '' })
                //     closeDropdown()
                //   }
                //   }
                // >
                //   <div className="btn-sm !rounded-xl flex gap-3 py-3">
                //     <div>
                //       <Image src={item?.img || ''} height={50} width={50} alt="nft" />
                //     </div>
                //     <div className="flex flex-col ms-5">
                //       <span className=" whitespace-nowrap"><span className="font-semibold">Address:</span> {shortAdrs(item.contractAddress)}</span>
                //       <span className=" whitespace-nowrap"><span className="font-semibold">NFT ID:</span> {hexToNum(item.tokenId)}</span>
                //     </div>
                //   </div>
                // </li>
              )
            })}</>
            : <li className="p-2">
              {loading ? 'Loading...' : 'No NFTs found on this wallet'}
            </li>
          }
        </ul>
      </details>
    </>
  );
};
