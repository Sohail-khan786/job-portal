import React from "react";
import { useAppContext } from "../app-context";

const CandidateProfile = () => {
  const { theme } = useAppContext();

  return (
    <div className={`page ${theme}`}>
      <h1>CandidateProfile Page</h1>
    </div>
  );
};

export default CandidateProfile;
