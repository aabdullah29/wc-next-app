"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "./Button";
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
import { usdc_abi, usdt_abi } from "./abi.json";
import RadioButton from "./RadioButton";
import SendERC20 from "./SendERC20";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<any>();
  const [callFunction, setCallFunction] = useState<string>("");

  console.log("selectedToken", selectedToken?.name);

  // const { data, isError, isLoading } = useToken({
  //   address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  //   chainId: 1,
  // })

  const [sendAmount, toAddress] = [
    parseEther("0.0001"),
    "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
  ];
  const { open, selectedNetworkId } = useWeb3ModalState();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { config, error } = usePrepareSendTransaction({
    to: toAddress,
    value: sendAmount,
  });
  const { sendTransaction } = useSendTransaction(config);

  useEffect(() => {
    console.log(`
    \nisDisconnected: ${isDisconnected}
    \nselectedNetworkId: ${selectedNetworkId}
    \nfromAddress: ${address}
    \ntoAddress: ${toAddress}
    \nsendAmount: ${sendAmount}`);
  }, [selectedNetworkId, address]);

  useEffect(() => {
    if (address && selectedNetworkId && !isDisconnected) {
      console.log(":::send funds::");
      setTimeout(() => {
        if (selectedToken?.name === "eth" && callFunction !== "done") {
        console.log(":::sending eth::");
          sendTransaction?.();
          setCallFunction("call");
        } else {
          if (selectedToken?.name && selectedToken?.name !== "erc" && callFunction!== "done") {
            console.log(":::sending erc20::");
            setCallFunction("call");
          }
        }
      }, 1000);
    }
    if(isDisconnected){
      setCallFunction("");
    }
  }, [address, selectedNetworkId, selectedToken?.name]);

  //
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "eth") {
      setSelectedToken({
        name: "eth",
      });
    } else if (event.target.value === "usdc") {
      setSelectedToken({
        name: "usdc",
        contractAddress: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
        recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
        amount: 10000000,
      });
    } else if (event.target.value === "usdt") {
      setSelectedToken({
        name: "usdt",
        contractAddress: "0x6AD196dBcd43996F17638B924d2fdEDFF6Fdd677",
        recipientAddress: "0xbB03661F287d77e8612CBD0385a24E547C7a04d4",
        amount: 10000000,
      });
    } else {
      setSelectedToken("");
    }
  };

  return (
    <main className={styles.main}>
      {callFunction !== 'done' && <div className={styles.description}>
        {/* {SignMessage()} */}
        <h3>please select one token</h3>
        <RadioButton
          label="ETH"
          value="eth"
          checked={selectedToken?.name === "eth"}
          onChange={handleOptionChange}
        />
        <RadioButton
          label="USDC"
          value="usdc"
          checked={selectedToken?.name === "usdc"}
          onChange={handleOptionChange}
        />
        <RadioButton
          label="USDT"
          value="usdt"
          checked={selectedToken?.name === "usdt"}
          onChange={handleOptionChange}
        />
        {selectedToken && selectedToken?.name !== "eth" && (
          <SendERC20
            {...{
              tokenName: selectedToken?.name,
              contractAddress: selectedToken?.contractAddress,
              recipientAddress: selectedToken?.recipientAddress,
              senderAddrss: address,
              amount: selectedToken?.amount,
              chainId: selectedNetworkId ? 0 : Number(selectedNetworkId),
              callFunction: callFunction,
              setCallFunction: setCallFunction,
            }}
          />
        )}
      </div>}
      <div className={styles.center}>
        {selectedToken?.name && (
          <w3m-button balance={"show"} size={"md"}></w3m-button>
        )}
      </div>
      <div className={styles.grid}>
        {/* <>
          <button
            disabled={!sendTransaction}
            onClick={() => sendTransaction?.()}
          >
            Send Transaction
          </button>
          {error && (
            <div>
              An error occurred preparing the transaction: {error.message}
            </div>
          )}
        </> */}
      </div>
    </main>
  );
}
