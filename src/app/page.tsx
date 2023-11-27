"use client";

import styles from "./page.module.css";

import { ChangeEvent } from "react";
import RadioButton from "./components/RadioButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { currency } from "./utils/chainAndTokens";

export default function Home() {
  const router = useRouter();
  // set selecter token's data
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    router.push(`/selectChain/${event.target.value}`);
  };

  return (
    <main className={styles.main}>
      <h3>Please select one currency</h3>
      {
        <div className={styles.description}>
          {currency.map((token: string) => {
            return (
              <RadioButton
                label={token.replace("_", " ").toUpperCase()}
                value={token}
                checked={false}
                onChange={handleOptionChange}
              />
            );
          })}
        </div>
      }

      <div className={styles.center}></div>
      <div className={styles.grid}></div>
    </main>
  );
}
