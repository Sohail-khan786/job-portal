import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../app-context";

const Nav = () => {
  const { theme, toggleTheme } = useAppContext();

  const toggleMode = () => {
    toggleTheme();
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div className="mode-switch">
        <label>
          <input
            type="checkbox"
            onChange={toggleMode}
            checked={theme === "dark"}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Nav;
