import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
};

// const chain = process.env.NETWORK_NAME ? chains?.[process.env.NETWORK_NAME as keyof typeof chains] : chains.hardhat;

  // chains.hardhat
  // chains.rootstockTestnet
  const chain = chains.rootstockTestnet // chains[process.env.NETWORK_NAME as keyof typeof chains]  || chains.hardhat;
  // const chain = chains.hardhat
  // console.log("chain", chain);

  // const chain = chains.rootstockTestnet;
const scaffoldConfig = {
  // The networks on which your DApp is live
  // targetNetworks: process.env.NETWORK_NAME === 'rootstockTestnet' ? [chains.rootstockTestnet] : [chains.hardhat],
  targetNetworks: [chain],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
