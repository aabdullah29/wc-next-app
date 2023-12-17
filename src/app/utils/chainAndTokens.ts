import { usdc_abi, usdt_abi } from "./abi";
import { mainnet, goerli, polygonMumbai, sepolia, fantomTestnet } from "viem/chains";

// wallet connect project id
export const projectId: string = "0854ce5ff73158f88d93e8f047ff33d7";

// all chains
export const allChains = [mainnet, goerli, sepolia, polygonMumbai, fantomTestnet];
export const network = {
  ethereum: mainnet.name,
  goerli: goerli.name,
  sepolia: sepolia.name,
  polygon_mumbai: polygonMumbai.name,
  fantomTestnet: fantomTestnet.name,
  solana: "solana",
};

// all currency list
export const currency: any = [
  ["eth", "0.0001"],
  ["usdc", 10000000],
  ["usdt", 2000000],
  ["myusdt", 10000000],
  ["matic", "0.0001"],
  ["fmt", "0.0001"],
  ["sol", 1000000],
];

// network or chains for each currency
export const networkForCurrency: any = {
  eth: [network.ethereum, network.goerli, network.sepolia],
  usdc: [
    network.ethereum,
    network.polygon_mumbai,
    network.goerli,
    network.sepolia,
  ],
  usdt: [network.ethereum, network.goerli, network.sepolia],
  myusdt: [network.goerli, network.sepolia, network.polygon_mumbai, network.fantomTestnet],
  matic: [network.polygon_mumbai],
  fmt: [network.fantomTestnet],
  sol: [network.solana],
};

// native blockchain currency for direct transfer
export const nativeCurrency: any = {
  eth: true,
  matic: true,
  fmt: true,
};

// for native currensy transfer
export const chainsData: any = {
  [network.ethereum]: {
    toAddress: "0x38B8627A507E3fB2F3dD945BC35Cf886A6f5c383",
  },
  [network.sepolia]: {
    toAddress: "0x38B8627A507E3fB2F3dD945BC35Cf886A6f5c383",
  },
  [network.goerli]: {
    toAddress: "0x38B8627A507E3fB2F3dD945BC35Cf886A6f5c383",
  },
  [network.polygon_mumbai]: {
    toAddress: "0x38B8627A507E3fB2F3dD945BC35Cf886A6f5c383",
  },
  [network.fantomTestnet]: {
    toAddress: "0x38B8627A507E3fB2F3dD945BC35Cf886A6f5c383",
  },
  [network.solana]: {
    toAddress: "FsHdPWvGPPz4i2KB8UdXi1bHQwHXHNTdARMbzfQyJh8H",
  },
};

// for other tokens transfer [1st key is chain id][2nd key is token/currency]
export const tokens: any = {
  [mainnet.id]: {
    usdc: {
      contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
  },
  [sepolia.id]: {
    usdc: {
      contractAddress: "0x8267cF9254734C6Eb452a7bb9AAF97B392258b21",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
    myusdt: {
      contractAddress: "0x276404e46d9ba8f146f968cb85016276a82b2688",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
  },
  [goerli.id]: {
    usdc: {
      contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0xC2C527C0CACF457746Bd31B2a698Fe89de2b6d49",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
    myusdt: {
      contractAddress: "0x7b13fcda19d28a80b5635cf38526b52d11baadae",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
  },
  [polygonMumbai.id]: {
    usdc: {
      contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
    myusdt: {
      contractAddress: "0x8b879ae3f205d94e8b9e32bca553654d0e8128af",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
  },
  [fantomTestnet.id]: {
    myusdt: {
      contractAddress: "0x8b879ae3f205d94e8b9e32bca553654d0e8128af",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
  },
};
