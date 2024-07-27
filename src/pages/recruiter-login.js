import React from "react";
import { ROLE_TYPES } from "../app-contants";
import LoginForm from "../components/login-form";
import { useAppContext } from "../app-context";
import { useNavigate } from "react-router-dom";

const RecruiterLogin = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const onRecruiterLoginSuccess = () => {
    navigate("/recruiter/profile");
  };

  return (
    <div className={`page ${theme}`}>
      <h1>Recruiter Login Page</h1>
      <p>Find Your Next Talent</p>
      <LoginForm
        role={ROLE_TYPES.RECRUITER}
        onLoginSuccessCb={onRecruiterLoginSuccess}
      />
    </div>
  );
};

export default RecruiterLogin;
