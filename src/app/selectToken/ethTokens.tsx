import {
  ChangeEvent,
} from "react";
import RadioButton from "../components/RadioButton";
import styles from "../page.module.css";

export default function EthTokens(props: any) {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "eth") {
      props?.setSelectedToken({
        name: "eth",
      });
    } else if (event.target.value === "usdc") {
      props?.setSelectedToken({
        name: "usdc",
      });
    } else if (event.target.value === "usdt") {
      props?.setSelectedToken({
        name: "usdt",
      });
    } else {
      props?.setSelectedToken("");
    }
  };

  return (
    <div className={styles.description}>
      <RadioButton
        label="ETH"
        value="eth"
        checked={props?.selectedToken?.name === "eth"}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="USDC"
        value="usdc"
        checked={props?.selectedToken?.name === "usdc"}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="USDT"
        value="usdt"
        checked={props?.selectedToken?.name === "usdt"}
        onChange={handleOptionChange}
      />
    </div>
  );
}
