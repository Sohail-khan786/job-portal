import React, { useEffect } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";

const Toast = ({
  isOpen = false,
  text = "",
  bgColor = "green",
  textColor = "white",
  onCloseCallBack = () => {},
}) => {
  const { theme } = useAppContext();

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => {
        onCloseCallBack();
      }, 2000);
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      className="toastStyle"
      style={{ background: bgColor, color: textColor }}
    >
      {text}
    </div>
  ) : (
    <React.Fragment />
  );
};

export default Toast;
