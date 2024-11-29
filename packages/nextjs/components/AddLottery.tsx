// AddLottery.tsx
import React, { ReactNode, use, useEffect, useState } from 'react';
import CustomCard from './Card';
import { AddressInput, EtherInput, InputBase, IntegerInput } from './scaffold-eth';
import { useDeployedContractInfo, useScaffoldWriteContract } from '~~/hooks/scaffold-eth';
import { notification } from '~~/utils/scaffold-eth';
// import { useAccount, useWriteContract } from 'wagmi';

const SendTx: React.FC<any> = ({
  priceContractAddress, priceTokenId, wonkaBarPrice, wonkaBarsMaxSuply, duration, loadingSubmit, setLoadingSubmit, setShow
}) => {
  const contractName = "MeltyFiNFT";
  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const { writeContractAsync, isPending } = useScaffoldWriteContract(contractName);
  console.log('->DeployedContractData', deployedContractData);
  
    const date = new Date(duration);
    const timestamp = date.getTime() / 1000; 

    const makeTx = async () => {
      console.log('->Make Tx', {isPending})
      
      try {
        await writeContractAsync({
          functionName: "createLottery",
          args: [BigInt(timestamp), priceContractAddress, BigInt(priceTokenId), BigInt(wonkaBarPrice),BigInt(wonkaBarsMaxSuply)],
        });
      } catch (error) {
        console.log('->Error', error);
      }
    }

    useEffect(() => {
      if(deployedContractData) makeTx()
    }, [deployedContractData])

    useEffect(() => {
      if(isPending) return
      setLoadingSubmit(false)
      setShow(false)
    }, [isPending])
    

  return (<></>)
}

const AddLottery: React.FC<any> = ({ setShow }) => {
  const { writeContractAsync, isPending } = useScaffoldWriteContract("MeltyFiNFT");

  const [duration, setDuration] = useState('')
  const [priceContractAddress, setPriceContractAddress] = useState('')
  const [priceTokenId, setPriceTokenId] = useState('')
  const [wonkaBarPrice, setWonkaBarPrice] = useState('')
  const [wonkaBarsMaxSuply, setWonkaBarsMaxSuply] = useState('')

  const [approveDone, setApproveDone] = useState(false)

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // const { writeContract } = useWriteContract()

  // getApproved

  const handleCreateLottery = async () => {
    if(!duration) return notification.error(<ErrorCode text='Duration is empty!' />);
    if(!priceContractAddress) return notification.error(<ErrorCode text='Contract Address is empty!' />);
    if(!priceTokenId) return notification.error(<ErrorCode text='NFT ID is empty!' />);
    if(!wonkaBarPrice) return notification.error(<ErrorCode text='Ticker Price is empty!' />);
    if(!wonkaBarsMaxSuply) return notification.error(<ErrorCode text='Tickers Qumtity is empty!' />);

    const date = new Date(duration);
    const timestamp = date.getTime() / 1000; 

    try {
      setLoadingSubmit(true)
        // await writeYourContractAsync({
        //   functionName: "approve",
        //   args: [
        //     '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
        //     BigInt(priceTokenId),
        //   ],
        // });
        // setApproveDone(true)

        await writeContractAsync({
          functionName: "createLottery",
          args: [BigInt(timestamp), priceContractAddress, BigInt(priceTokenId), BigInt(wonkaBarPrice), BigInt(wonkaBarsMaxSuply)],
        });
    
    } catch (e) {
      console.error("Error setting greeting:", e);
    } finally {
      setLoadingSubmit(false)
      setShow(false)
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
            disabled={loadingSubmit}
          >
            {loadingSubmit ? 'Loading...' : 'Create Lottery'}
          </button>

          {/* {approveDone ? <SendTx 
            priceContractAddress={priceContractAddress}
            priceTokenId={priceTokenId} 
            wonkaBarPrice={wonkaBarPrice} 
            wonkaBarsMaxSuply={wonkaBarsMaxSuply} 
            duration={duration}
            loadingSubmit={loadingSubmit}
            setLoadingSubmit={setLoadingSubmit}
            setShow={setShow}
          /> : null} */}
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
