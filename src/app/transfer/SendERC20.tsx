"use client";

import { useContractWrite, usePrepareContractWrite, useBalance } from "wagmi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disconnect } from "@wagmi/core";
import { tokens } from "../utils/chainAndTokens";
import { useRouter } from "next/navigation";
import CustomModal from "../components/CustomModal";

export interface SendERC20Props {
  tokenName: string;
  tokenAmount: any;
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
  const [modal, setModal] = useState<any>();
  const handleCloseModal = () => {
    disconnect().then(()=>{
      setModal(undefined);
      router.back();
    })
  };

  // prepare the transaction
  const { config, error } = usePrepareContractWrite({
    address: tokenData?.contractAddress,
    abi: tokenData?.abi,
    functionName: "transfer",
    args: [
      tokenData?.recipientAddress,
      props.tokenAmount, // convert to wei
    ],
    chainId: props.chainId,
  });

  // get the transfer function
  const { data, isLoading, isSuccess, isError, write } =
    useContractWrite(config);

  useEffect(() => {
    setModal(undefined);
    console.log("useBalance: data:=:", dataBalance);
    if (
      (error || isErrorBalance) &&
      Number(dataBalance?.formatted ?? 0) <= 0
    ) {
      setModal({
        name: `Error Type: transferAmountExceedsBalance`,
        message: "You don't have enough tokens for this transaction.",
      });
    } else if (props.callFunction === "call" && write) {
      console.log("sending erc20:=: call:", props?.callFunction);
      write?.();
      props.setCallFunction("done");
    }
  }, [props.callFunction, write, dataBalance]);

  useEffect(() => {
    if (isSuccess || isError) {
      console.log("isSuccess, isError :=:", isSuccess, isError);
      console.log("tx data:=:", JSON.stringify(data));
      (async () => {
        await disconnect();
        router.back();
      })();
    }
  }, [isSuccess, isError]);

  return (
    <CustomModal isOpen={modal} onClose={handleCloseModal}>
      <h2>{modal?.name}</h2>
      <p style={{ marginTop: 20 }}>{modal?.message}</p>
    </CustomModal>
    // <div>
    //   <button disabled={!write} onClick={() => write?.()}>
    //     Transfer
    //   </button>
    //   {isLoading && <div>Check Wallet</div>}
    //   {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    // </div>
  );
}
