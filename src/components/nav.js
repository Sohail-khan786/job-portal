import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../app-context";
import { ROLE_TYPES, ROUTES } from "../app-contants";

const Nav = () => {
  const { theme, toggleTheme, onLogout, user } = useAppContext();
  // console.log("🚀 ~ Nav ~ user:", user)

  const toggleMode = () => {
    toggleTheme();
  };


  const profilePath = user?.role === ROLE_TYPES.CANDIDATE ? ROUTES.CANDIDATE_PROFILE : ROLE_TYPES.RECRUITER_PROFILE;

  return (
    <nav className={`navbar ${theme}`}>
      <div>
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
      </div>
      {user?.email && <div>
        <Link to={profilePath}>{user?.name}</Link>
        <Link to="/" onClick={onLogout}>Logout</Link>
      </div>}
    </nav>
  );
};

export default Nav;
