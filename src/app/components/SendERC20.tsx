"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button from "./Button";
import { useContractWrite, usePrepareContractWrite, useBalance } from "wagmi";
import { Dispatch, SetStateAction, useEffect } from "react";
import { parseEther } from "viem";
import { disconnect } from "@wagmi/core";
import { tokens } from "../utils/chainAndTokens";
import { useRouter } from "next/navigation";


export interface SendERC20Props {
  tokenName: string;
  senderAddrss: any;
  chainId: number;
  callFunction: string;
  setCallFunction: Dispatch<SetStateAction<string>>;
}

export default function SendERC20(props: SendERC20Props) {

  const tokenData =
    props?.chainId &&
    props?.tokenName &&
    tokens[props?.chainId] &&
    tokens[props?.chainId][props?.tokenName]
      ? tokens[props?.chainId][props?.tokenName]
      : tokens[5]["usdc_abi"];


  const {
    data: dataBalance,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    address: props.senderAddrss, // wallet address
    token: tokenData?.contractAddress, // balance of token
    chainId: props.chainId,
  });
  const router = useRouter();
  console.log("useBalance: data:: ", dataBalance);
  // prepare the transaction
  const { config } = usePrepareContractWrite({
    address: tokenData?.contractAddress,
    abi: tokenData?.abi,
    functionName: "transfer",
    args: [
      tokenData?.recipientAddress,
      tokenData?.amount, // convert to wei
    ],
    chainId: props.chainId,
  });

  // get the transfer function
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    if (props.callFunction === "call" && write) {
      console.log("=====> sending erc20 call: ", props?.callFunction);
      write?.();
      props.setCallFunction("done");
    }
  }, [props.callFunction, write]);

  useEffect(() => {
    if (isSuccess) {
      console.log("tx data:::: ", JSON.stringify(data));
      (async () => {
        await disconnect();
        router.back();
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
