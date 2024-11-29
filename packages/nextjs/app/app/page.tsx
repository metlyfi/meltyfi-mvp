"use client";

import type { NextPage } from "next";
import { useState } from "react";
import { useAccount } from "wagmi";
import AddLottery from "~~/components/AddLottery";
import CustomCard from "~~/components/Card";
import CardLottery from "~~/components/CardLottery";
import ModalContentBox from "~~/components/ModalContentBox";

const Dapp: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [show, setShow] = useState(false);
  
  return (
    <div className="">
        <ModalContentBox handleShow={{ show, setShow }}>
            <AddLottery />
        </ModalContentBox>
      <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <CustomCard className="bg-[#763C00] bg-opacity-60 p-2">
            <div className="grid grid-cols-2 gap-2 w-full items-center">
                <div className="ps-5">
                    1 Open Lottery
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
        </CustomCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full mt-5">

        <CardLottery lottery={{name: 'name'}}/>
        </div>
      </div>
    </div>  
  );
};

export default Dapp;
