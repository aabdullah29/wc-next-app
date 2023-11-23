import { usdc_abi, usdt_abi, usdc_mumbai_abi } from "../assets/abi.json";

export const projectId: string = "0854ce5ff73158f88d93e8f047ff33d7";

export const chains: any = {
  eth: true,
  matic: true,
};

export const chainsData: any = {
  eth: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
    amount: "0.0001",
  },
  polygon_mumbai: {
    toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
    amount: "0.0001",
  },
  solana: {
    toAddress: "FsHdPWvGPPz4i2KB8UdXi1bHQwHXHNTdARMbzfQyJh8H",
    amount: 1000,
  }
};

export const tokens: any = {
  1: {},
  5: {
    eth: {
      toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: "0.0001",
    },
    usdc: {
      contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 10000000,
      abi: [...usdc_abi],
    },
    usdt: {
      contractAddress: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 10000000,
      abi: [...usdt_abi],
    },
  },
  80001: {
    polygon_mumbai: {
      toAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: "0.0001",
    },
    mumbaiUsdc: {
      contractAddress: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
      recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
      amount: 1000000,
      abi: [...usdc_mumbai_abi],
    },
  },
};
