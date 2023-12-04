"use client";

import styles from "../../page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { network, networkForCurrency } from "@/app/utils/chainAndTokens";
import ListButton from "@/app/components/ListButton";

export default function SelectChain({
  params: { currency },
}: {
  params: { currency: string };
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<any>();

  const chain = currency.substring(0, currency.indexOf("_"));

  const handleContinue = () => {
    if (selected?.name === network.solana) {
      router.replace(`/solanaTransfer`);
    } else {
      router.replace(`/transfer/${selected?.name}/${currency}`);
    }
  };

  return (
    <main className={styles.main}>
      {<div className={styles.description}></div>}

      <h3>Please select one Network</h3>
      <div style={containerStyle}>
        {chain &&
          networkForCurrency[chain] &&
          networkForCurrency[chain].map((net: string, index: any) => {
            return (
              <ListButton
                key={index}
                text={net.replace("_", " ")}
                amount={undefined}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
      </div>
      <div>
        <button
          style={selected ? btnStyle : { ...btnStyle, backgroundColor: "grey" }}
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </button>
      </div>
    </main>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: "white",
  width: "80%",
  height: 400,
  overflowY: "auto",
  border: "1px solid #ccc",
  padding: "10px",
  position: "relative",
};

const btnStyle: React.CSSProperties = {
  paddingLeft: 80,
  paddingRight: 80,
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: "rgb(113, 93, 221)",
  color: "white",
  borderRadius: 10,
  fontSize: 18,
};
