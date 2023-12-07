// components/CustomModal.tsx
import React, { ReactNode } from "react";

interface CustomModalProps {
  isOpen: any;
  onClose: any;
  children: ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalContentStyle}>{children}</div>
        <div style={btnWraperStyle}>
          <button style={closeBtnStyle} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

const modalOverlayStyle: React.CSSProperties = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 1,
};

const modalStyle: React.CSSProperties = {
  background: "white",
  width: "60%",
  padding: 20,
  borderRadius: 8,
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
};

const modalContentStyle: React.CSSProperties = {
  // width:"60%"
};

const btnWraperStyle: React.CSSProperties = {
  paddingTop: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const closeBtnStyle: React.CSSProperties = {
  width: "60%",
  height: "10%",
  cursor: "pointer",
  marginTop: 10,
};
