// AddLottery.tsx
import React, { ReactNode, use, useEffect, useState } from 'react';
import CustomCard from './Card';
import { AddressInput, EtherInput, InputBase, IntegerInput } from './scaffold-eth';
import { useDeployedContractInfo, useScaffoldWriteContract, useTargetNetwork, useTransactor, useWatchBalance } from '~~/hooks/scaffold-eth';
import { notification } from '~~/utils/scaffold-eth';
// import { useAccount, useWriteContract } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { SelectNFT } from './SelectNFT';


const approveNFT = async (wagmiContractWrite: any, writeTx: any, { contractAddress, approveTo, tokenId }: any) => {
  const nftAbi = [
    {
      inputs: [
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      ],
      name: 'getApproved',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  try {
    // Altrimenti, procedi con l'approvazione
    const makeWriteWithParams = () =>
      wagmiContractWrite.writeContractAsync({
        abi: nftAbi,
        address: contractAddress,
        functionName: 'approve',
        args: [approveTo, tokenId],
      });

    const writeTxResult = await writeTx(makeWriteWithParams);
    return writeTxResult;
  } catch (error) {
    console.error('Error during approval:', error);
    throw error;
  }
};

const SendTx: React.FC<any> = ({
  priceContractAddress, priceTokenId, wonkaBarPrice, wonkaBarsMaxSuply, duration, loadingSubmit, setLoadingSubmit, setShow
}) => {
  const contractName = "MeltyFiNFT";
  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const { writeContractAsync, isPending } = useScaffoldWriteContract(contractName);
  // console.log('->DeployedContractData', deployedContractData);
  const [isRunning, setIsRunning] = useState(false)
  
    const date = new Date(duration);
    const timestamp = date.getTime() / 1000; 

    const makeTx = async () => {
      // console.log('->Make Tx', {isPending})
      setIsRunning(true)
      
      try {
        await writeContractAsync({
          functionName: "createLottery",
          args: [BigInt(timestamp), priceContractAddress, BigInt(priceTokenId), BigInt(wonkaBarPrice),BigInt(wonkaBarsMaxSuply)],
        });
        setLoadingSubmit(false)
        setShow(false)
        // refresh page
        window.location.reload()
    
      } catch (error) {
        console.log('->Error', error);
      }
    }

    useEffect(() => {
      if(deployedContractData && !isRunning) makeTx()
        // console.log({deployedContractData, writeContractAsync, isPending});
        
    }, [deployedContractData, writeContractAsync, isPending])

    // useEffect(() => {
    //   if(isPending) return
    //   // setLoadingSubmit(false)
    //   // setShow(false)
    // }, [isPending])
    

  return (<>Allowance Made!</>)
}

const AddLottery: React.FC<any> = ({ setShow }) => {
  // const { writeContractAsync, isPending } = useScaffoldWriteContract("MeltyFiNFT");
  const { data: deployedContractData } = useDeployedContractInfo("MeltyFiNFT");
  // console.log('deployedContractData', deployedContractData);
  
  // const { writeContractAsync, isPending } = useScaffoldWriteContract("TestCollection");
  const writeTx = useTransactor()
  const wagmiContractWrite = useWriteContract();

  const [duration, setDuration] = useState('')
  const [nftData, setNftData] = useState({
    addressNFT: '',
    nftID: ''
  })
  // const [priceContractAddress, setPriceContractAddress] = useState('')
  // const [priceTokenId, setPriceTokenId] = useState('')
  const [wonkaBarPrice, setWonkaBarPrice] = useState('')
  const [wonkaBarsMaxSuply, setWonkaBarsMaxSuply] = useState('')

  const [approveDone, setApproveDone] = useState(false)

  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // const { writeContract } = useWriteContract()

  const handleCreateLottery = async () => {
    if(!duration) return notification.error(<ErrorCode text='Duration is empty!' />);
    if(!nftData.addressNFT) return notification.error(<ErrorCode text='Contract Address is empty!' />);
    if(!nftData.nftID) return notification.error(<ErrorCode text='NFT ID is empty!' />);
    // if(!priceContractAddress) return notification.error(<ErrorCode text='Contract Address is empty!' />);
    // if(!priceTokenId) return notification.error(<ErrorCode text='NFT ID is empty!' />);
    if(!wonkaBarPrice) return notification.error(<ErrorCode text='Ticker Price is empty!' />);
    if(!wonkaBarsMaxSuply) return notification.error(<ErrorCode text='Tickers Qumtity is empty!' />);

    try {
      setLoadingSubmit(true)
      const option = {
        contractAddress: nftData.addressNFT, 
        approveTo: deployedContractData?.address, 
        tokenId: nftData.nftID
      }
      await approveNFT(wagmiContractWrite, writeTx, option)

        // await writeContractAsync({
        //   functionName: "approve",
        //   args: [
        //     deployedContractData?.address,
        //     BigInt(priceTokenId),
        //   ],
        // });
        setApproveDone(true)

        // await writeContractAsync({
        //   functionName: "createLottery",
        //   args: [BigInt(timestamp), priceContractAddress, BigInt(priceTokenId), BigInt(wonkaBarPrice), BigInt(wonkaBarsMaxSuply)],
        // });
    
    } catch (e) {
      console.error("Error setting greeting:", e);
    } finally {
      setLoadingSubmit(false)
      // setShow(false)
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
          <SelectNFT 
            nftData={nftData}
            setNftData={setNftData}
          />
        </div>
        {/* <div className='mt-3'>
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
        </div> */}
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

          {approveDone ? <SendTx 
            priceContractAddress={nftData.addressNFT}
            priceTokenId={nftData.nftID} 
            wonkaBarPrice={wonkaBarPrice} 
            wonkaBarsMaxSuply={wonkaBarsMaxSuply} 
            duration={duration}
            loadingSubmit={loadingSubmit}
            setLoadingSubmit={setLoadingSubmit}
            setShow={setShow}
          /> : null}
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


