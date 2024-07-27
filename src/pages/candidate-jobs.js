import React from "react";
import { useAppContext } from "../app-context";

const CandidateJobs = () => {
  const { theme } = useAppContext();

  return (
    <div className={`page ${theme}`}>
      <h1>CandidateJobs Page</h1>
    </div>
  );
};

export default CandidateJobs;
