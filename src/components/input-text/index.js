import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";

const InputText = ({
  type = "text",
  value = "",
  placeholder = "",
  onChangeHandler = () => {},
  errorText = "",
}) => {
  const { theme } = useAppContext();

  return (
    <React.Fragment>
      <input
        className="inputStyle"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
      <p className="errorText">{errorText}</p>
    </React.Fragment>
  );
};

export default InputText;
