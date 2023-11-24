"use client";

import styles from "../../page.module.css";
import { useEffect, useState } from "react";
import EthTokens from "../ethTokens";
import PolygonMumbaiTokens from "../polygonMumbaiTokens";
import { useRouter } from "next/navigation";

export default function Home({ params }: { params: { chain: string } }) {
  const router = useRouter();
  const [selectedToken, setSelectedToken] = useState<any>();

  useEffect(() => {
    if (selectedToken?.name) {
      router.replace(`/transfer/${params?.chain}/${selectedToken?.name}`);
    }
  }, [selectedToken?.name]);

  return (
    <main className={styles.main}>
      {<div className={styles.description}></div>}

      <h3>Please select one token</h3>
      <div className={styles.description}>
        {params?.chain === "eth" && (
          <EthTokens
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          />
        )}
        {params?.chain === "polygon_mumbai" && (
          <PolygonMumbaiTokens
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          />
        )}
      </div>
      <div className={styles.center}></div>
      <div className={styles.grid}></div>
    </main>
  );
}
