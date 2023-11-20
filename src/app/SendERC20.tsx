"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "./Button";
import { useContractWrite, usePrepareContractWrite, useBalance } from "wagmi";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parseEther } from "viem";
import { usdc_abi as usdcABI, usdt_abi as usdtABI } from "./abi.json";
import { disconnect } from "@wagmi/core";
export interface SendERC20Props {
  tokenName: string;
  contractAddress: any;
  recipientAddress: string;
  senderAddrss: any;
  amount: number;
  chainId: number;
  callFunction: string;
  setCallFunction: Dispatch<SetStateAction<string>>;
}

export default function SendERC20(props: SendERC20Props) {
  const {
    data: dataBalance,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    address: props.senderAddrss, // wallet address
    token: props.contractAddress, // balance of token
    chainId: props.chainId,
  });

  console.log("useBalance: data:: ", dataBalance);

  const usdt_abi: any = [...usdtABI];
  const usdc_abi: any = [...usdcABI];
  // prepare the transaction
  const { config } = usePrepareContractWrite({
    address: props.contractAddress,
    abi: props?.tokenName === "usdt" ? usdt_abi : usdc_abi,
    functionName: "transfer",
    args: [
      props.recipientAddress,
      props.amount, // convert to wei
    ],
    chainId: props.chainId,
  });

  // get the transfer function
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    console.log(":::sending erc20 call: ", props?.callFunction);
    if (props.callFunction === "call" && write) {
        write?.();
        props.setCallFunction("done");
    }
  }, [props.callFunction, write]);

  useEffect(() => {
    if (isSuccess) {
      console.log('tx data:::: ',JSON.stringify(data));
      (async () => {
        await disconnect();
      })();
    }
  }, [isSuccess]);

  return (
    // <div>
    //   <button disabled={!write} onClick={() => write?.()}>
    //     Transfer
    //   </button>
    //   {isLoading && <div>Check Wallet</div>}
    //   {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    // </div>
    <></>
  );
}
