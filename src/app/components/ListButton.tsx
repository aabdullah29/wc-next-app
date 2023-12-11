// components/RadioButton.tsx

import React, { SetStateAction } from "react";

export default function ListButton({
  text,
  amount,
  selected,
  setSelected,
}: {
  text: string;
  amount: any;
  selected: any;
  setSelected: (event: SetStateAction<any>) => void;
}) {
  return (
    <div
      style={containerStyle}
      onClick={() => {
        setSelected({ name: text, value: amount });
      }}
      id={text}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "black",
            ...(amount ? {} : { paddingTop: 10, paddingLeft: 10 }),
          }}
        >
          {text.toUpperCase()}
        </p>
        {amount && <p style={{ fontSize: 10, color: "grey" }}>{amount}</p>}
      </div>
      {selected?.name === text && (
        <div style={imgStyle}>
          <img
            width={30}
            height={30}
            src="https://icones.pro/wp-content/uploads/2021/02/icone-de-tique-ronde-grise.png"
          />
        </div>
      )}
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  backgroundColor: "#f3f3f3",
  border: "1px solid rgb(113, 93, 221)",
  borderRadius: 5,
  paddingInline: 10,
  paddingBlock: 10,
  width: "98%",
  height: 60,
  marginBottom: 5,
  marginRight: "1%",
  marginLeft: "1%",
  display: "flex",
};

const imgStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
