import { usdc_abi, usdt_abi, usdc_mumbai_abi } from "../assets/abi.json";
import { mainnet, goerli, polygonMumbai, sepolia } from "viem/chains";

// wallet connect project id
export const projectId: string = "0854ce5ff73158f88d93e8f047ff33d7";

// all chains
export const allChains = [mainnet, goerli, sepolia, polygonMumbai];
export const network = {
  ethereum: mainnet.name,
  goerli: goerli.name,
  sepolia: sepolia.name,
  polygon_mumbai: polygonMumbai.name,
  solana: "solana",
};

// all currency list
export const currency: any = [
  ["eth", "0.0001"],
  ["usdc", 10000000],
  ["usdt", 2000000],
  ["matic", "0.0001"],
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
  matic: [network.polygon_mumbai],
  sol: [network.solana],
};

// native blockchain currency for direct transfer
export const nativeCurrency: any = {
  eth: true,
  matic: true,
};

// for native currensy transfer
export const chainsData: any = {
  [network.ethereum]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
  },
  [network.sepolia]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
  },
  [network.goerli]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
  },
  [network.polygon_mumbai]: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
  },
  [network.solana]: {
    toAddress: "FsHdPWvGPPz4i2KB8UdXi1bHQwHXHNTdARMbzfQyJh8H",
  },
};

// for other tokens transfer [1st key is chain id][2nd key is token/currency]
export const tokens: any = {
  [mainnet.id]: {},
  [sepolia.id]: {
    usdc: {
      contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
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
      contractAddress: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdt_abi],
    },
  },
  [polygonMumbai.id]: {
    usdc: {
      contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      abi: [...usdc_mumbai_abi],
    },
  },
};
