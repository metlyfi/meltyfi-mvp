// CardNft.tsx

import React, { ReactNode } from 'react';
import CustomCard from './Card';
import Image from 'next/image';

interface CardLotteryProps {
  lottery: any;
}

const CardLottery: React.FC<CardLotteryProps> = ({ lottery }) => {
  return (
    <CustomCard className='p-0'>
      <div className="flex items-center space-x-4 text-choco px-3">
          <Image
            src={'/chocolate/01.png'}
            alt={'title'}
            width={200}
            height={200}
            className="w-48 h-48 object-cover"
          />
          <div className="flex-1 text-sm">
            <div className='text-choco text-sm'>Loan Requests</div>
            <div className='text-white text-3xl font-bold'>$ 50,000</div>

            <div className='text-choco text-sm'>Market Price</div>
            <div className='text-white text-2xl font-bold'>$ 100,000</div>

            <div className='mt-3'>
              <span className='text-choco text-xs'>Amount Funded</span>
              <span className='text-white text-xs ps-2'>$25,000</span>
            </div>
            <div>
              <progress className="progress progress-secondary w-full rounded-full" value="50" max="100"></progress>
            </div>
          </div>
        </div>

        <div className='flex bg-[#763C0055] justify-between px-3'>
          <div className='text-choco text-center p-2'>Tickets Price<div className='text-white text-2xl'>$100</div></div>
          <div className='text-choco text-center p-2'>Interest Rate<div className='text-white text-2xl'>10%</div></div>
          <div className='text-choco text-center p-2'>Due Date<div className='text-white text-md'>1/1/2026</div></div>
        </div>

        <div className="flex items-center space-x-4 text-choco">
          <Image
            src={'/wonkabar.png'}
            alt={'title'}
            width={200}
            height={132}
            className="object-cover"
          />
          <div className="flex flex-col justify-center w-full px-3">
            <div className="flex items-center space-x-2 mb-2 justify-center">
              <span className="text-choco text-sm">Remaining tickets:</span>
              <span className="text-white text-sm">250/500</span>
            </div>
            <button className='btn-green text-3xl'>
              Buy <div className='text-sm'>Wonka Bar</div>
            </button>
          </div>
        </div>




        <div className='flex bg-[#763C0055] rounded-br-[55px] justify-center'>
          <div className='p-3 justify-center'>
            <span className='text-choco text-sm'>
              Opened by:
            </span>
            <span className='text-white text-sm ps-2'>
              0x39Dc…82ab
            </span>
          </div>
        </div>
    </CustomCard>
  );
};

export default CardLottery;