// AddLottery.tsx
import React, { ReactNode, useState } from 'react';
import CustomCard from './Card';
import { AddressInput, EtherInput, InputBase, IntegerInput } from './scaffold-eth';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { notification } from '~~/utils/scaffold-eth';
// import { useAccount, useWriteContract } from 'wagmi';

const AddLottery: React.FC<any> = ({  }) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MeltyFiNFT");

  const [duration, setDuration] = useState('')
  const [priceContractAddress, setPriceContractAddress] = useState('')
  const [priceTokenId, setPriceTokenId] = useState('')
  const [wonkaBarPrice, setWonkaBarPrice] = useState('')
  const [wonkaBarsMaxSuply, setWonkaBarsMaxSuply] = useState('')

  // const { writeContract } = useWriteContract()




  const handleCreateLottery = async () => {
    if(!duration) return notification.error(<ErrorCode text='Duration is empty!' />);
    if(!priceContractAddress) return notification.error(<ErrorCode text='Contract Address is empty!' />);
    if(!priceTokenId) return notification.error(<ErrorCode text='NFT ID is empty!' />);
    if(!wonkaBarPrice) return notification.error(<ErrorCode text='Ticker Price is empty!' />);
    if(!wonkaBarsMaxSuply) return notification.error(<ErrorCode text='Tickers Qumtity is empty!' />);

    const date = new Date(duration);
    const timestamp = date.getTime() / 1000; 

    try {
    //  await writeContract({ 
    //     abi: [
    //       {
    //         "inputs": [
    //           { "internalType": "address", "name": "to", "type": "address" },
    //           { "internalType": "uint256", "name": "tokenId", "type": "uint256" }
    //         ],
    //         "name": "approve",
    //         "outputs": [],
    //         "stateMutability": "nonpayable",
    //         "type": "function"
    //       }
    //     ],
    //     address: priceContractAddress,
    //     functionName: 'approve',
    //     args: [
    //       '0xFf7d147cdD63f1c5E9351d97883DB2eb75AA3B8B',
    //       BigInt(priceTokenId),
    //     ],
    //  })

      await writeYourContractAsync({
        functionName: "createLottery",
        args: [BigInt(timestamp), priceContractAddress, BigInt(priceTokenId), BigInt(wonkaBarPrice),BigInt(wonkaBarsMaxSuply)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  }


  return (
    <CustomCard className='border-green-600 p-5'>
        <div className='mt-3'>
          <InputBase
            placeholder='Duration'
            type='date'
            value={duration}
            onChange={setDuration}
          />
        </div>
        <div className='mt-3'>
          <AddressInput 
            placeholder='NFT Address'
            value={priceContractAddress}
            onChange={setPriceContractAddress}
          />
        </div>
        <div className='mt-3'>
          <IntegerInput 
            placeholder='NFT ID'
            value={priceTokenId}
            onChange={setPriceTokenId}
          />
        </div>
        <div className='mt-3'>
          <EtherInput 
            placeholder='Ticket Price' 
            value={wonkaBarPrice}
            onChange={setWonkaBarPrice}
          />
        </div>
        <div className='mt-3'>
          <IntegerInput 
            placeholder='Tickets Quantity' 
            value={wonkaBarsMaxSuply}
            onChange={setWonkaBarsMaxSuply}
          />
        </div>
        <div className='mt-2'>
          <button 
            className='btn-green w-full'
            onClick={handleCreateLottery}
          >
            Create Lottery
          </button>
        </div>
    </CustomCard>
  );
};

export default AddLottery;


const ErrorCode = ({ text }: any) => {
  return (
      <p className="font-bold mt-0 mb-1">
        <code className="italic bg-base-300 text-base font-bold"></code>{text}
      </p>
  )
}
