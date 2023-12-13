"use client";

import {
  usePrepareSendTransaction,
  useSendTransaction,
  useBalance,
} from "wagmi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { disconnect } from "@wagmi/core";
import { chainsData, tokens } from "../utils/chainAndTokens";
import { useRouter } from "next/navigation";
import { parseEther } from "viem";
import CustomModal, { modalOnError } from "../components/CustomModal";
import WaitForTransaction from "./WaitForTransaction";

export interface SendERC20Props {
  selectedChain: string;
  amount: any;
  senderAddrss: any;
  chainId: number;
  callFunction: string;
  setCallFunction: Dispatch<SetStateAction<string>>;
}

export default function SendNativeCurrency(props: SendERC20Props) {
  const {
    data: dataBalance,
    isError: isErrorBalance,
    isLoading: isLoadingBalance,
  } = useBalance({
    address: props.senderAddrss, // wallet address
    // token: tokenData?.contractAddress, // balance of token
    chainId: props.chainId,
  });

  const router = useRouter();

  const [modal, setModal] = useState<any>();
  let intervalId: any;

  const handleCloseModal = () => {
    disconnect().then(() => {
      setModal(undefined);
      router.back();
    });
  };

  // prepare the transaction
  const { config, error } = usePrepareSendTransaction({
    to: chainsData[props.selectedChain]?.toAddress,
    value: parseEther(props.amount),
  });

  // get the transfer function
  const { sendTransaction, isSuccess, data, isError } = useSendTransaction({
    ...config,
    onError: (error) => {
      const cause = `${error.cause}`;
      const errMsg = "UserRejectedRequestError:";
      modalOnError(
        {
          counter: 3,
          name: `Go back after `,
          message: cause.includes(errMsg)
            ? "User rejected the request."
            : error.cause,
        },
        setModal,
        () => {
          disconnect().then(router.back);
        }
      );
    },
  });

  useEffect(() => {
    console.log("useBalance: data:=:", dataBalance);
    if (error?.name === "EstimateGasExecutionError" || isErrorBalance) {
      modalOnError({
        name: `Error Type: ${error?.name}`,
        message: "You don't have enough balance for this transaction.",
      }, setModal);
    } else if (props.callFunction === "call" && sendTransaction) {
      console.log("sending native currency:=: call:", props?.callFunction);
      sendTransaction?.();
      props.setCallFunction("done");
    }
  }, [props.callFunction, sendTransaction, error?.name]);

  return (
    <>
      {data?.hash && (
        <WaitForTransaction txh={data.hash} chainId={props.chainId} />
      )}
      <CustomModal isOpen={modal} onClose={handleCloseModal}>
        <h2>{`${
          modal?.counter ? modal?.name + modal?.counter : modal?.name
        }`}</h2>
        <p style={{ marginTop: 20 }}>{modal?.message}</p>
      </CustomModal>
    </>
    // <div>
    //   <button disabled={!write} onClick={() => write?.()}>
    //     Transfer
    //   </button>
    //   {isLoading && <div>Check Wallet</div>}
    //   {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    // </div>
  );
}

