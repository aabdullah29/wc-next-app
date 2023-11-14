"use client"

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, goerli } from 'viem/chains'
import { ReactNode } from 'react'

// 1. Get projectId
const projectId = '0854ce5ff73158f88d93e8f047ff33d7'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, goerli, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function ProviderWeb3Modal({children}:{children:ReactNode}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  )
}





// "use client";

// import Image from "next/image";
// import styles from "./page.module.css";
// import Button from "./Button";
// import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
// import {
//   useAccount,
//   useSignMessage,
//   usePrepareSendTransaction,
//   useSendTransaction,
// } from "wagmi";
// import { useEffect } from "react";
// import { parseEther } from "viem";

// export default function Home() {
//   // const { open, close } = useWeb3Modal()
//   const [sendAmount, toAddress] = [
//     parseEther("0.0001"),
//     "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
//   ];
//   const { open, selectedNetworkId } = useWeb3ModalState();
//   const { address, isConnecting, isDisconnected } = useAccount();
//   const { config, error } = usePrepareSendTransaction({
//     to: toAddress,
//     value: sendAmount,
//   });
//   const { sendTransaction } = useSendTransaction(config);

//   // const useAccountFn = ()=>{
//   //   if (isConnecting) return <div>Connecting…</div>
//   //   if (isDisconnected) return <div>Disconnected</div>
//   //   return <div>{address}</div>
//   // }

//   // function Sign() {
//   //   const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
//   //     message: 'gm wagmi frens'
//   //   })

//   //   return (
//   //     <div>
//   //       <button disabled={isLoading} onClick={() => signMessage()}>
//   //         Sign message
//   //       </button>
//   //       {isSuccess && <div>Signature: {data}</div>}
//   //       {isError && <div>Error signing message</div>}
//   //     </div>
//   //   )
//   // }

//   useEffect(() => {
//     console.log(`open: ${open} 
//     \nisConnecting: ${isConnecting}
//     \nselectedNetworkId: ${selectedNetworkId}
//     \nfromAddress: ${address}
//     \ntoAddress: ${toAddress}
//     \nsendAmount: ${sendAmount}`);
//   }, [isConnecting, open, selectedNetworkId, address]);

//   // useEffect(() => {
//   //   if (isConnecting) {
//   //     console.log("isConnecting::", isConnecting);
//   //     setTimeout(() => {
//   //       sendTransaction?.();
//   //     }, 3000);
//   //   }
//   // }, [isConnecting, address]);

//   // useEffect(() => {
//   //   if (error) {
//   //     console.error(error.message);
//   //   }
//   // }, [error]);

//   return (
//     <main className={styles.main}>
//       <div className={styles.description}></div>
//       <div className={styles.center}>
//         <w3m-button balance={"show"} size={"md"}></w3m-button>
//       </div>
//       <div className={styles.grid}>
//         <>
//           <button
//             disabled={!sendTransaction}
//             onClick={() => sendTransaction?.()}
//           >
//             Send Transaction
//           </button>
//           {error && (
//             <div>
//               An error occurred preparing the transaction: {error.message}
//             </div>
//           )}
//         </>
//       </div>
//     </main>
//   );
// }
