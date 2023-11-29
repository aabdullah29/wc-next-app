"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet, goerli, polygonMumbai } from "viem/chains";
import { ReactNode } from "react";
import { projectId } from "../utils/chainAndTokens";

// 1. Get projectId

// 2. Create wagmiConfig
const metadata = {
  name: "LocalHostWeb3Modal",
  description: "Web3Modal Localhost Wallet Connect Example",
  url: "http://localhost:3000",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, goerli, arbitrum, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
const provider = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  featuredWalletIds: [],
});

export default function ProviderWeb3Modal({
  children,
}: {
  children: ReactNode;
}) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
