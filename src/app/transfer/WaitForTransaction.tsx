"use client";

import { useWaitForTransaction } from "wagmi";
import { useState } from "react";
import { disconnect } from "@wagmi/core";
import { useRouter } from "next/navigation";
import CustomModal from "../components/CustomModal";

export interface WaitForTransactionProps {
  txh: `0x${string}`;
  chainId: number;
}

export default function WaitForTransaction(props: WaitForTransactionProps) {
  const router = useRouter();
  const [modal, setModal] = useState<any>();
  const handleCloseModal = () => {
    disconnect().then(() => {
      setModal(undefined);
      router.back();
    });
  };

  // waiting until transaction is processed
  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    chainId: props.chainId,
    hash: props.txh,
    onSuccess(data) {
      console.log("Success", data);
      const status = `${data.from === data.to ? "cancel" : data.status}`;
      setModal({
        name: `Status: ${status}`,
        message:
          status === "success"
            ? "Transaction has been sueecssfuly completed."
            : status === "cancel"
            ? "Transaction has been canceled by user. "
            : "Transaction has been reverted.",
      });
    },
    onError(error) {
      console.log("Error", error);
      setModal({
        name: `Error Type: ${error.name}`,
        message: "Transaction has been canceled.",
      });
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  return (
    <>
      <h4 style={{ width: "100%", textAlign: "center", color: "black" }}>
        Wait for transaction complete...
      </h4>
      <CustomModal isOpen={modal} onClose={handleCloseModal}>
        <h2>{modal?.name}</h2>
        <p style={{ marginTop: 20 }}>{modal?.message}</p>
      </CustomModal>
    </>
  );
}
