import React from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";

const ButtonCustom = ({ text = "", onClick = () => {}, disabled = false }) => {
  const { theme } = useAppContext();

  return (
    <button
      className={`btnStyles ${theme}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonCustom;
