"use client";

import styles from "./page.module.css";

import { useState } from "react";
import ListButton from "./components/ListButton";
import { useRouter } from "next/navigation";
import { currency } from "./utils/chainAndTokens";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<any>();

  const handleContinue = () => {
    router.push(`/selectChain/${selected?.name}_${selected?.value}`);
  };

  return (
    <main className={styles.main}>
      <h3>Please select one currency</h3>

      <div style={containerStyle}>
        {currency.map((token: any, index: any) => {
          return (
            <ListButton
              key={index}
              text={token[0]}
              amount={token[1]}
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
