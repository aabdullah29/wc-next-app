"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./../../../page.module.css";
import UniversalProvider from "@walletconnect/universal-provider";
import { WalletConnectModal } from "@walletconnect/modal";
import { chainsData, projectId } from "../../../utils/chainAndTokens";

const events: string[] = [];

// 1. select chains (bitcoin)
const chains = [`bitcoin:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`];

// 2. select methods (bitcoin)
const methods = ["bitcoin_signTransaction"];

// 3. create modal instance
const modal = new WalletConnectModal({
  projectId,
  chains,
});

export default function Home({
  params,
}: {
  params: {
    chain: string;
    token: string;
  };
}) {
  const [selectedChain, token] = [
    decodeURIComponent(params.chain),
    params.token,
  ];
  const tokenName = token.substring(0, token.indexOf("_"));
  const tokenAmount = token.substring(token.indexOf("_") + 1, token.length);

  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const toAddress = chainsData["bitcoin"]?.toAddress;
  // 4. create provider instance
  async function getProvider() {
    console.log("getProvider");
    const provider = await UniversalProvider.init({
      logger: "error",
      projectId: projectId,
      metadata: {
        name: "WalletConnect x Bitcoin",
        description:
          "Bitcoin integration with WalletConnect's Universal Provider",
        url: "https://walletconnect.com/",
        icons: ["https://avatars.githubusercontent.com/u/37784886"],
      },
    });

    // 5. get address once loaded
    console.log("address", provider.session);
    const address =
      provider.session?.namespaces.bitcoin?.accounts[0].split(":")[2];
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
      // console.log("provider: ", provider);
      // await provider.connect({
      //   namespaces: {
      //     bitcoin: {
      //       methods,
      //       chains,
      //       events,
      //     },
      //   },
      // });

      await provider.connect({
        namespaces: {
          bitcoin: {
            methods: [],
            chains: ["bitcoin:000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"],
            events: ["chainChanged", "accountsChanged"],
            rpcMap: {
              "000000000019d6689c085ae165831e93": `https://rpc.walletconnect.com?chainId=${chains[0]}&projectId=${projectId}`,
            },
          },
        },
        // pairingTopic: '<123...topic>', // optional topic to connect to
        // skipPairing: false // optional to skip pairing ( later it can be resumed by invoking .pair())
      });

      setIsConnected(true);
      console.log("session", provider.session);
    } catch (e) {
      console.log("connect Error: ", e);
    }
    modal.closeModal();
  };

  // 8. handle disconnect event
  const disconnect = async () => {
    const provider = await getProvider();
    await provider?.disconnect();
    setIsConnected(false);
  };

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
