import React from "react";
import { useAppContext } from "../app-context";

const About = () => {
  const { theme } = useAppContext();

  return (
    <div className={`page ${theme}`}>
      <h1>About Page</h1>
      <p>Learn more about us here!</p>
    </div>
  );
};

export default About;
