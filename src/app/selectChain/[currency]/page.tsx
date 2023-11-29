"use client";

import styles from "../../page.module.css";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import RadioButton from "@/app/components/RadioButton";
import { network, networkForCurrency } from "@/app/utils/chainAndTokens";

export default function Home({
  params: { currency },
}: {
  params: { currency: string };
}) {
  const router = useRouter();

  const chain = currency.substring(0, currency.indexOf("_"));
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === network.solana) {
      router.replace(`/solanaTransfer`);
    } else {
      router.replace(`/transfer/${event.target.value}/${currency}`);
    }
  };

  return (
    <main className={styles.main}>
      {<div className={styles.description}></div>}

      <h3>Please select one Network</h3>
      <div className={styles.description}>
        {chain &&
          networkForCurrency[chain] &&
          networkForCurrency[chain].map((net: string) => {
            return (
              <RadioButton
                label={net.replace("_", " ").toUpperCase()}
                value={net}
                checked={false}
                onChange={handleOptionChange}
              />
            );
          })}
      </div>
      <div className={styles.center}></div>
      <div className={styles.grid}></div>
    </main>
  );
}
