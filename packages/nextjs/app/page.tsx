"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import CustomCard from "~~/components/Card";
import CardLoop from "~~/components/CardLoop";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const cardItems = [
    {
      title: "Unlock Liquidity with MeltyFi",
      image: "/chocolate/01.png",
      text: "MeltyFi is the first Web3 protocol designed to make your illiquid assets, such as NFTs, liquid without the risk of liquidation. Forget harsh margin requirements like 30% on asset value MeltyFi offers flexibility, with the potential to unlock 100% or more of your asset's worth."
    },
    {
      title: "No Liquidation Risk",
      image: "/chocolate/02.png",
      text: "Unlike traditional lending, MeltyFi eliminates the risk of forced liquidation of your NFTs. Borrow with confidence, knowing your collateral is safe and secure."
    },
    {
      title: "DAO for Fair Valuations",
      image: "/chocolate/03.png", 
      text: "Join a peer-to-peer community where projects are evaluated collaboratively. MeltyFi empowers borrowers and lenders to connect seamlessly, creating a transparent and efficient ecosystem for capital access."
    },
    {
      title: "Peer-to-Pool Lending Made Simple",
      image: "/chocolate/04.png",
      text: "MeltyFi introduces peer-to-pool lending, enabling easy access to capital. Borrowers secure funds while lenders provide liquidity, ensuring mutual benefits within the ecosystem."
    },
    {
      title: "Win Rewards with Lottery Mechanics",
      image: "/chocolate/05.png",
      text: "Lenders aren't just earning interest—they're part of a unique lottery system. If a borrower defaults, lenders have the chance to win the NFT used as collateral, adding an exciting layer of reward."
    },
    {
      title: "ChocoChips for Active Participation",
      image: "/chocolate/06.png",
      text: "Engage with the MeltyFi ecosystem and earn ChocoChips as rewards. From providing liquidity to participating in lotteries, every action is rewarded in this innovative protocol."
    },
    {
      title: "Secure & Transparent Smart Contract",
      image: "/chocolate/07.png",
      text: "MeltyFi's smart contracts ensure a seamless borrowing and lending experience. The MeltyFiNFT contract manages lotteries, loans, and rewards with complete transparency and trust."
    },
    {
      title: "No Floor Price Dependency",
      image: "/chocolate/08.png",
      text: "With MeltyFi, your collateral isn't limited by traditional floor price constraints. Unlike other platforms, MeltyFi allows you to unlock up to 100% or even more of your asset's value. This groundbreaking approach provides unmatched flexibility and ensures your NFTs reach their full borrowing potential, without undervaluation or restrictive loan-to-value ratios."
    }
  ];


  return (
    <div className="">
      <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">

          {/* <CustomCard>CustomCard</CustomCard> */}
          <CardLoop items={cardItems} />
          
        </div>
      </div>
    </div>  
  );
};

export default Home;


/* <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </> */