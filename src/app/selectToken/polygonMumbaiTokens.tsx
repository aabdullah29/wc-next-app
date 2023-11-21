import { ChangeEvent } from "react";
import RadioButton from "../components/RadioButton";
import styles from "../page.module.css";

export default function PolygonMumbaiTokens(props: any) {
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "matic") {
      props?.setSelectedToken({
        name: "matic",
      });
    } else if (event.target.value === "mumbaiUsdc") {
      props?.setSelectedToken({
        name: "mumbaiUsdc",
      });
    } else {
      props?.setSelectedToken("");
    }
  };

  return (
    <div className={styles.description}>
      <RadioButton
        label="MATIC"
        value="matic"
        checked={props?.selectedToken?.name === "matic"}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="Mumbai USDC"
        value="mumbaiUsdc"
        checked={props?.selectedToken?.name === "mumbaiUsdc"}
        onChange={handleOptionChange}
      />
    </div>
  );
}
