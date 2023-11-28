"use client";

import styles from "../../../page.module.css";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react";
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useToken,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import SendERC20 from "../../SendERC20";
import { disconnect } from "@wagmi/core";
import { nativeCurrency, chainsData } from "../../../utils/chainAndTokens";
import { useRouter } from "next/navigation";

export default function Home({
  params: { chain, tokenName },
}: {
  params: {
    chain: string;
    tokenName: string;
  };
}) {
  const router = useRouter();
  const [callFunction, setCallFunction] = useState<string>("");
  const [connectButton, setConnectButton] = useState<Boolean>(false);

  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { config, error } = usePrepareSendTransaction({
    to: chainsData[chain]?.toAddress,
    value: parseEther(chainsData[chain]?.amount),
  });
  const { sendTransaction, isSuccess, data, isError } =
    useSendTransaction(config);

  useEffect(() => {
    console.log("isError===: ", isError);
  }, [isError]);

  useEffect(() => {
    // at page reload
    setConnectButton(false);
    return () => {
      setTimeout(() => {
        disconnect().then(() => {
          if (isDisconnected) {
            console.log("++disconnect++");
            // router.back();
          }
          setConnectButton(true);
        });
      }, 800);
    };
  }, []);

  useEffect(() => {
    console.log(`
    \nisDisconnected: ${isDisconnected}
    \nselectedNetworkId: ${selectedNetworkId}
    \nfromAddress: ${address}
    \ntoAddress: ${chainsData[chain]?.toAddress}
    \nsendAmount: ${chainsData[chain]?.amount}`);
    if (address && selectedNetworkId && !isDisconnected) {
      setTimeout(() => {
        if (
          nativeCurrency[tokenName] &&
          callFunction !== "call" &&
          callFunction !== "done"
        ) {
          if (sendTransaction) {
            console.log("::::sending coin::", nativeCurrency[tokenName]);
            sendTransaction?.();
            setCallFunction("call");
          }
        } else if (tokenName !== "erc") {
          console.log("::::sending erc20::");
          setCallFunction("call");
        }
      }, 1500);
    }
  }, [address, selectedNetworkId, isDisconnected, tokenName, sendTransaction]);

  useEffect(() => {
    if (isSuccess || isError) {
      console.log("isSuccess , isError :::: ", isSuccess, isError);
      console.log("tx data:::: ", JSON.stringify(data));
      (async () => {
        await disconnect();
        router.back();
      })();
    }
  }, [isSuccess, isError, callFunction]);

  return (
    <main className={styles.main}>
      {
        <div className={styles.description}>
          {tokenName && !nativeCurrency[tokenName] && selectedNetworkId && (
            <SendERC20
              {...{
                tokenName: tokenName,
                senderAddrss: address,
                chainId: Number(selectedNetworkId),
                callFunction: callFunction,
                setCallFunction: setCallFunction,
              }}
            />
          )}
        </div>
      }

      <div className={styles.description}></div>
      <div className={styles.center}>
        {tokenName && connectButton && (
          <w3m-button balance={"show"} size={"md"}></w3m-button>
        )}
        {/* <button onClick={disconnect}>Disconnect</button> */}
      </div>
      <div className={styles.grid}></div>
    </main>
  );
}
