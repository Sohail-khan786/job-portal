import React from "react";
import { ROLE_TYPES, ROUTES } from "../app-contants";
import LoginForm from "../components/login-form";
import { useAppContext } from "../app-context";
import { useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const onCandidateLoginSuccess = () => {
    navigate(ROUTES.CANDIDATE_JOBS);
  };

  return (
    <div className={`page ${theme}`}>
      <h1>Candidate Login Page</h1>
      <p>Find Your Next Opportunity</p>
      <LoginForm
        role={ROLE_TYPES.CANDIDATE}
        onLoginSuccessCb={onCandidateLoginSuccess}
      />
    </div>
  );
};

export default JobSeekerLogin;
