// AddLottery.tsx
import React, { ReactNode, useState } from 'react';
import CustomCard from './Card';
import { AddressInput, EtherInput, InputBase, IntegerInput } from './scaffold-eth';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { parseEther } from 'viem';
import { notification } from '~~/utils/scaffold-eth';

const AddLottery: React.FC<any> = ({  }) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MeltyFiNFT");

  const [duration, setDuration] = useState('')
  const [priceContractAddress, setPriceContractAddress] = useState('')
  const [priceTokenId, setPriceTokenId] = useState('')
  const [wonkaBarPrice, setWonkaBarPrice] = useState('')
  const [wonkaBarsMaxSuply, setWonkaBarsMaxSuply] = useState('')


  console.log('duration', duration, priceContractAddress, priceTokenId, wonkaBarPrice, wonkaBarsMaxSuply)

  

  const handleCreateLottery = async () => {

    if(!duration) return notification.error(<ErrorCode text='Duration is empty!' />);


    try {
      await writeYourContractAsync({
        functionName: "createLottery",
        args: [duration, priceContractAddress, priceTokenId, wonkaBarPrice, wonkaBarsMaxSuply],
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
    <>
      <p className="font-bold mt-0 mb-1">
        <code className="italic bg-base-300 text-base font-bold"></code>{text}
      </p>
    </>,
  )
}