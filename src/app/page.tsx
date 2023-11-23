"use client";

import styles from "./page.module.css";

import { ChangeEvent } from "react";
import RadioButton from "./components/RadioButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  // set selecter token's data
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === "solana"){
      router.push(`/solanaTransfer`);

    }else{
      router.push(`/selectToken/${event.target.value}`);
    }
  };

  return (
    <main className={styles.main}>
      {
        <div className={styles.description}>
          <h3>Please select one chain</h3>
          <RadioButton
            label="ETH"
            value="eth"
            checked={false}
            onChange={handleOptionChange}
          />
          <RadioButton
            label="Mumbai"
            value="polygon_mumbai"
            checked={false}
            onChange={handleOptionChange}
          />
          <RadioButton
            label="Solana"
            value="solana"
            checked={false}
            onChange={handleOptionChange}
          />
        </div>
      }

      <div className={styles.center}></div>
      <div className={styles.grid}></div>
    </main>
  );
}
