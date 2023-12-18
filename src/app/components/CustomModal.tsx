// components/CustomModal.tsx
import React, { ReactNode, useEffect } from "react";

interface CustomModalProps {
  isOpen: any;
  onClose: any;
  children: ReactNode;
}
let intervalId: any;
let inSetTimeout: any;

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    return () => {clearInterval(intervalId);}
  }, []);

  const closeHandle = ()=>{
    inSetTimeout = null;
    clearInterval(intervalId);
    onClose();
  }
  if (!isOpen) {
    return null;
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalContentStyle}>{children}</div>
        <div style={btnWraperStyle}>
          <button style={closeBtnStyle} onClick={closeHandle}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;

export const modalOnError = (model: any, setModal: any, _inSetTimeout?: any) => {
  if (_inSetTimeout && model?.counter) {
    inSetTimeout = _inSetTimeout;
    setModal({ ...model });
    // start counter
    intervalId = setInterval(() => {
      setModal((prev: any) => {
        return { ...prev, counter: prev?.counter - 1 };
      });
    }, 1000);
    // counter end
    setTimeout(() => {
      clearInterval(intervalId);
      setModal(undefined);
      inSetTimeout && inSetTimeout();
    }, Number(`${model.counter}000`));
    // return interval ref
    return intervalId;
  } else {
    setModal({ ...model });
  }
};

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
