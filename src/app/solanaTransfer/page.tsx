"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./../page.module.css";
import UniversalProvider from "@walletconnect/universal-provider";
import { WalletConnectModal } from "@walletconnect/modal";
import {
  signMessage,
  sendTransaction,
  SolanaChains,
} from "./../utils/solanaHelpers";
import { chainsData, projectId } from "../utils/chainAndTokens";
import Button from "../components/Button";

const events: string[] = [];

// 1. select chains (solana)
const chains = [`solana:${SolanaChains.MainnetBeta}`];

// 2. select methods (solana)
const methods = ["solana_signMessage", "solana_signTransaction"];

// 3. create modal instance
const modal = new WalletConnectModal({
  projectId,
  chains,
});

export default function Home() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const [toAddress, amount] = [
    chainsData["solana"]?.toAddress,
    chainsData["solana"]?.amount,
  ];

  // 4. create provider instance
  async function getProvider() {
    const provider = await UniversalProvider.init({
      logger: "error",
      projectId: projectId,
      metadata: {
        name: "WalletConnect x Solana",
        description:
          "Solana integration with WalletConnect's Universal Provider",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });

    // 5. get address once loaded
    const address =
      provider.session?.namespaces.solana?.accounts[0].split(":")[2];
    if (address) {
      console.log("address", address);
      setAddress(address);
    }

    // 6. handle display_uri event and open modal
    provider.on("display_uri", async (uri: string) => {
      console.log("uri", uri);
      await modal.openModal({
        uri,
      });
    });

    return provider;
  }

  // 7. handle connect event
  const connect = async () => {
    try {
      const provider = await getProvider();
      console.log("provider: ", provider);
      await provider.connect({
        namespaces: {
          solana: {
            methods,
            chains,
            events,
          },
        },
      });

      setIsConnected(true);
      console.log("session", provider.session);
    } catch {
      console.log("Something went wrong, request cancelled");
    }
    modal.closeModal();
  };

  // 8. handle disconnect event
  const disconnect = async () => {
    const provider = await getProvider();
    await provider?.disconnect();
    setIsConnected(false);
  };

  // // 9. handle signMessage and sendTransaction
  // const handleSign = async () => {
  //   const provider = await getProvider();
  //   const res = await signMessage(
  //     `Can i have authorize this request pls bossman - ${Date.now()}`,
  //     provider,
  //     address!
  //   );
  //   console.log(res);
  // };

  const handleSend = async () => {
    console.log("sendTx");
    const provider = await getProvider();
    const res = await sendTransaction(toAddress!, amount, provider, address!);
    console.log("res: ", res);
    await disconnect();
    router.back();
  };

  useEffect(() => {
    if (isConnected) {
      (async () => {
        await handleSend();
      })();
    }
  }, [isConnected]);

  return (
    <main className={styles.main}>
      {isConnected && (
        <div className={styles.description}>
          <p>
            <b>Address: </b>
            {address}
          </p>
          {/* <button onClick={handleSign}>Sign</button> */}
          {/* <button onClick={handleSend}>Send</button> */}
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}

      {!isConnected && <button onClick={connect}>Connect</button>}
      <div className={styles.center}></div>
      <div className={styles.grid}></div>
    </main>
  );
}
