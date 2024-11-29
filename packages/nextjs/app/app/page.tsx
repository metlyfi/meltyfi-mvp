"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import AddLottery from "~~/components/AddLottery";
import CustomCard from "~~/components/Card";
import CardLottery from "~~/components/CardLottery";
import Loading from "~~/components/Loading";
import ModalContentBox from "~~/components/ModalContentBox";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Dapp: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [show, setShow] = useState(false);
  const [notFound, setNotFound] = useState(false);
  

  const { data: TotalLotteries, isLoading: isTotalLotteriesLoading } = useScaffoldReadContract({
    contractName: "MeltyFiNFT",
    functionName: "getTotalLotteriesCreated",
  });


  useEffect(() => {
    // if (TotalLotteries) getLotteries();
    // else 
    if (!isTotalLotteriesLoading && TotalLotteries === BigInt(0)) {
        console.log('->Fine', TotalLotteries);
        setNotFound(true);
    }
  }, [TotalLotteries]);
  // console.log('->TotalLotteries', TotalLotteries);
  
  return (
    <div className="">
        <ModalContentBox handleShow={{ show, setShow }}>
            <AddLottery setShow={setShow} />
        </ModalContentBox>
      <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="bg-[#763C00] bg-opacity-60 p-2 rounded-full">
            <div className="grid grid-cols-2 gap-2 w-full items-center ">
                <div className="ps-5">
                    {TotalLotteries ? <h1 className="text-lg text-white ">Total Lotteries: {Number(TotalLotteries)}</h1> : null}
                </div>
                <div className="flex justify-end pe-5">
                    <button className="btn-green" onClick={(e) => {
                        e.preventDefault();
                        setShow(true);
                    }}>
                        Create Lottery
                    </button>
                </div>
            </div>    
        </div>
        {isTotalLotteriesLoading
            ? <Loading />
            : null
        }
        {notFound
            ? <>
                <div className="p-5 text-center">
                    No Lottery Found
                </div>
            </>
            : null
        }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mt-5">
            {!isTotalLotteriesLoading
                ? <>
                    {!notFound
                        ? <>
                        {
                        Array.from({ length: Number(TotalLotteries) }).map((_, index) => {
                            return <CardLottery key={index} lotteryId={index} />;
                        })}
                        </>
                        : null
                    }
                </>
                : null
            }
        
        </div>
      </div>
    </div>  
  );
};

export default Dapp;
