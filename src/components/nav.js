import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../app-context";
import { PROTECTED_ROUTES, ROLE_TYPES, ROUTES } from "../app-contants";

const Nav = () => {
  const { theme, toggleTheme, onLogout, user, setToastConfig } = useAppContext();
  const location = useLocation()
  const navigate = useNavigate();


  const checkPathProtection = (locationPassed) => {
    const isPathProtected = PROTECTED_ROUTES.includes(locationPassed?.pathname) || PROTECTED_ROUTES.includes(`${locationPassed?.pathname}/`)
    if(isPathProtected && !user?.id){
      setToastConfig({
          isOpen: true,
          text: "Please login to access this route",
          bgColor: "red",
          textColor: "white",
        });
        navigate(ROUTES.HOME)
        return 
    }
  }

  useEffect(() => {
    checkPathProtection(location)
  },[location])

  // console.log("🚀 ~ Nav ~ user:", user)

  const toggleMode = () => {
    toggleTheme();
  };


  const profilePath = user?.role === ROLE_TYPES.CANDIDATE ? ROUTES.CANDIDATE_PROFILE : ROLE_TYPES.RECRUITER_JOBS;

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
