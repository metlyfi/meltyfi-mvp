// CardNft.tsx

import React, { ReactNode } from 'react';
import CustomCard from './Card';
import Image from 'next/image';
import { useScaffoldReadContract, useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import Loading from './Loading';
import { bigintToDate } from '~~/utils/utils';
import { Address } from './scaffold-eth';
import { parseUnits, formatEther, parseEther } from 'viem';
import { useAccount } from 'wagmi';

interface CardLotteryProps {
  lotteryId: any;
}

const CardLottery: React.FC<CardLotteryProps> = ({ lotteryId }) => {
  const { address: connectedAddress } = useAccount();

  const { writeContractAsync, isPending } = useScaffoldWriteContract("MeltyFiNFT");

  const { data: lottery, isLoading: isLotteryLoading } = useScaffoldReadContract({
    contractName: "MeltyFiNFT",
    functionName: "getLottery",
    args: [BigInt(lotteryId)],
  });

  console.log('->lottery', lottery);
  
  const getAmount = (): bigint => {
    if (!lottery?.wonkaBarPrice || !lottery?.wonkaBarsMaxSupply) return BigInt(0)
    return lottery?.wonkaBarPrice * lottery?.wonkaBarsMaxSupply
  }

  
  const getAmountFunded = (isAmount: boolean): bigint | number => {
    if (!lottery?.wonkaBarsSold || !lottery?.wonkaBarsMaxSupply) return 0;
  
    if (isAmount) {
      // Restituisce l'importo totale in BigInt
      return Number(BigInt(lottery?.wonkaBarsSold) * BigInt(lottery?.wonkaBarPrice));
    } else {
      // Calcola la percentuale e restituisce un numero
      const percentage = (Number(lottery?.wonkaBarsSold) / Number(lottery?.wonkaBarsMaxSupply)) * 100;
      return Math.min(percentage, 100);
    }
  }

  const getImageUrl = (id: bigint): string => {
    const imageNumber = Number(id % BigInt(8)); 
    const formattedNumber = (imageNumber + 1).toString().padStart(2, '0'); 
    return `/chocolate/${formattedNumber}.png`;
  }
  
  
  const handleBuy = async (e: any) => {
    e.preventDefault();
    console.log('->Buy');

    try {
      await writeContractAsync(
        {
          functionName: "buyWonkaBars",
          args: [BigInt(lotteryId), BigInt(1)],
          value: lottery?.wonkaBarPrice,
        },
        {
          onBlockConfirmation: (txnReceipt: any) => {
            console.log("📦 Transaction blockHash", txnReceipt.blockHash);
          },
        },
      );
    } catch (e) {
      console.error("Error setting greeting", e);
    }

  }
  
  return (
    <CustomCard className='p-0'>
      {isLotteryLoading ? <div>
        <Loading />
      </div> : <>
        <div className="flex items-center space-x-4 text-choco px-3">
            <Image
              src={getImageUrl(lottery?.id || BigInt(0))}
              alt={'title'}
              width={200}
              height={200}
              className="w-48 h-48 object-cover"
            />
            <div className="flex-1 text-sm">
              <div className='text-choco text-sm'>Loan Requests</div>
              <div className='text-white text-3xl font-bold'>
              {Number(getAmount())} <span className='text-sm'>wei</span>
              </div>

              <div className='text-choco text-sm'>Market Price</div>
              <div className='text-white text-2xl font-bold'>$ 100,000</div>

              <div className='mt-3'>
                <span className='text-choco text-xs'>Amount Funded</span>
                <span className='text-white text-xs ps-2'>
                  {getAmountFunded(true)} <span className='text-xs'>wei</span>
                </span>
              </div>
              <div>
                <progress className="progress progress-secondary w-full rounded-full" value={getAmountFunded(false) as number} max="100"></progress>
              </div>
            </div>
          </div>

          <div className='flex bg-[#763C0055] justify-between px-3'>
            <div className='text-choco text-center p-2'>Tickets Price<div className='text-white text-2xl'>
              {/* {formatEther(lottery?.wonkaBarPrice || BigInt(0))} */}
              {Number(lottery?.wonkaBarPrice)} <span className='text-xs'>wei</span>
              </div></div>
            <div className='text-choco text-center p-2'>Interest Rate<div className='text-white text-2xl'>5%</div></div>
            <div className='text-choco text-center p-2'>Due Date<div className='text-white text-md'>
              {bigintToDate(lottery?.expirationDate || BigInt(0))}
              </div></div>
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
                <span className="text-white text-sm">{Number(lottery?.wonkaBarsSold)}/{Number(lottery?.wonkaBarsMaxSupply)}</span>
              </div>
              {connectedAddress === lottery?.owner
                ? <>
                  {lottery?.state === 0 ? <button className='btn-choco text-3xl'>
                    Repay <div className='text-sm'>Loan</div>
                  </button> : <div>Lottery Deleted</div>}
                </>
                : <>
                
                {lottery?.state === 0 && <button className='btn-green text-3xl' onClick={handleBuy} disabled={isPending}>
                  {isPending ? 'Signing Tx...' : <>Buy <div className='text-sm'>Wonka Bar</div></>}
                </button>}

                {(lottery?.state === 1 || lottery?.state === 2) && <button className='btn-green text-3xl'>
                  Melt Your<div className='text-sm'>Wonka Bar</div>
                </button>}

                {lottery?.state === 3 && <div>Lottery Deleted</div>}

                </>

              }
              

            </div>
          </div>




          <div className='flex bg-[#763C0055] rounded-br-[55px] justify-center'>
            <div className="p-3 justify-center flex items-center space-x-4 text-choco px-3">
              <span className='text-choco text-sm'>
                Opened by:
              </span>
              <span className='text-white text-sm ps-2'>
                <Address address={lottery?.owner} />
              </span>
            </div>
          </div>
      
      </>}

      
    </CustomCard>
  );
};

export default CardLottery;