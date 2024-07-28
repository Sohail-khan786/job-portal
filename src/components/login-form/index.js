import React, { useState } from "react";
// import { loginInfo } from "../../data/auth-data";
import { useAppContext } from "../../app-context";
import { isValidEmail, isValidPassword } from "../../utils";
import ButtonCustom from "../button-custom";
import InputText from "../input-text";
import Toast from "../toast";
import "./styles.css";
import { LocalStorageUtils } from "../../local-storage-crud-utls";
import { DATA_SOURCE } from "../../app-contants";

const LoginForm = ({
  role,
  onLoginSuccessCb = () => {},
  onLoginFailedCb = () => {},
}) => {
  const { theme, setToastConfig, onLoginSuccess, onLogout } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginCtaClick = () => {
    if (!role) {
      return;
    }
    const loginInfo = LocalStorageUtils.getItem(DATA_SOURCE.AUTH_DATA)
    const isUserFound = loginInfo.find((i) => {
      return i.email === email && i.password === password && i.role === role;
    });

    if (!isUserFound) {
      onLogout()
      onLoginFailedCb();
      setToastConfig((prev) => {
        return {
          isOpen: true,
          text: "Login Failed",
          bgColor: "red",
          textColor: "white",
        };
      });
    } else {
      onLoginSuccess(isUserFound);
      onLoginSuccessCb();
      setToastConfig((prev) => {
        return {
          isOpen: true,
          text: "Login Success",
          bgColor: "Green",
          textColor: "white",
        };
      });
    }
  };

  const getEmailErrorText = () => {
    const isValid = isValidEmail(email);
    if (!email || isValid) {
      return "";
    } else {
      return "Not a Valid Email";
    }
  };

  const getPasswordErrorText = () => {
    const isValid = isValidPassword(password);
    if (!password || isValid) {
      return "";
    } else {
      return "Not a Valid Password";
    }
  };

  const errorTextEmail = getEmailErrorText();
  const errorTextEmailPassword = getPasswordErrorText();
  const shouldLoginCtaDisable =
    errorTextEmail || errorTextEmailPassword || !email || !password;

  return (
    <div>
      <div className="inputWrapper">
        <InputText
          type="text"
          value={email}
          placeholder={"Enter Email"}
          onChangeHandler={(e) => setEmail(e.target.value)}
          errorText={errorTextEmail}
        />
      </div>
      <div className="inputWrapper">
        <InputText
          type="password"
          value={password}
          placeholder={"Enter Password"}
          onChangeHandler={(e) => setPassword(e.target.value)}
          errorText={errorTextEmailPassword}
        />
      </div>
      <div className="loginCta">
        <ButtonCustom
          text="Login"
          onClick={onLoginCtaClick}
          disabled={shouldLoginCtaDisable}
        />
      </div>
    </div>
  );
};

export default LoginForm;
