"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { ReactNode } from "react";
import { projectId, allChains } from "../utils/chainAndTokens";

// 1. Get projectId

// 2. Create wagmiConfig
const metadata = {
  name: "LocalHostWeb3Modal",
  description: "Web3Modal Localhost Wallet Connect Example",
  url: "https://htb.optimusfox.org/dashboard",
  icons: ["assets/icon.pmg"],
};

const wagmiConfig = defaultWagmiConfig({
  chains: allChains,
  projectId,
  metadata,
});

// 3. Create modal
const provider = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains: allChains,
  // defaultChain: allChains[0],
  featuredWalletIds: [],
  customWallets: [
    {
      id: 'myCustomWallet',
      name: 'My Custom Wallet',
      image_url: 'https://dev-front.soco-test.com/static/media/logo.55c72974ad636b375573.png', // Optional
      mobile_link: 'https://dev-front.soco.com/dashboard', // Optional - Deeplink or universal
    }
  ]
});

export default function ProviderWeb3Modal({
  children,
}: {
  children: ReactNode;
}) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
