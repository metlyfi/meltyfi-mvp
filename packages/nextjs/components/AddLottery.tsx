// AddLottery.tsx
import React, { ReactNode, useState } from 'react';
import CustomCard from './Card';
import { InputBase } from './scaffold-eth';

const AddLottery: React.FC<any> = ({  }) => {
  const [value, setValue] = useState({
    duration: '',
    priceContractAddress: '',
    priceTokenId: '',
    wonkaBarPrice: '',
    wonkaBarsMaxSuply: ''
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setValue({...value, [name]: value})
  }


  return (
    <CustomCard className='border-green-600 p-5'>
        <div className='mt-3'>
          <InputBase
            placeholder='Duration'
            name='duration'
            value={value.duration}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase 
            placeholder='NFT Address'
            name='priceContractAddress'
            value={value.priceContractAddress}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase 
            placeholder='NFT ID'
            name='priceTokenId'
            value={value.priceTokenId}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase
            placeholder='Ticket Price' 
            name='wonkaBarPrice'
            value={value.wonkaBarPrice}
            onChange={handleChange}
          />
        </div>
        <div className='mt-3'>
          <InputBase
            placeholder='Tickets Quantity' 
            name='wonkaBarsMaxSuply'
            value={value.wonkaBarsMaxSuply}
            onChange={handleChange}
          />
        </div>
        <div className='mt-2'>
          <button className='btn-green w-full'>
            Create Lottery
          </button>
        </div>
    </CustomCard>
  );
};

export default AddLottery;