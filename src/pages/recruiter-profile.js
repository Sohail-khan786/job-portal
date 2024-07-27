import React from "react";
import { useAppContext } from "../app-context";

const RecruiterProfile = () => {
  const { theme } = useAppContext();

  return (
    <div className={`page ${theme}`}>
      <h1>RecruiterProfile Page</h1>
    </div>
  );
};

export default RecruiterProfile;
