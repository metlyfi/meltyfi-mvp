// AddLottery.tsx
import React, { ReactNode, useState } from 'react';
import CustomCard from './Card';
import { InputBase } from './scaffold-eth';
import { useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { parseEther } from 'viem';

const AddLottery: React.FC<any> = ({  }) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("MeltyFiNFT");

  const [formValue, setFormValue] = useState({
    duration: '',
    priceContractAddress: '',
    priceTokenId: '',
    wonkaBarPrice: '',
    wonkaBarsMaxSuply: ''
  })

  console.log('value', formValue)


  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormValue({...formValue, [name]: value})
  }

  const handleCreateLottery = async () => {
    try {
      await writeYourContractAsync({
        functionName: "createLottery",
        args: [parseEther(formValue.duration), formValue.priceContractAddress, parseEther(formValue.priceTokenId), parseEther(formValue.wonkaBarPrice), parseEther(formValue.wonkaBarsMaxSuply)],
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
            name='duration'
            value={formValue.duration}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase 
            placeholder='NFT Address'
            name='priceContractAddress'
            value={formValue.priceContractAddress}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase 
            placeholder='NFT ID'
            name='priceTokenId'
            value={formValue.priceTokenId}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase
            placeholder='Ticket Price' 
            name='wonkaBarPrice'
            value={formValue.wonkaBarPrice}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase
            placeholder='Tickets Quantity' 
            name='wonkaBarsMaxSuply'
            value={formValue.wonkaBarsMaxSuply}
            onChange={handleChange}
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