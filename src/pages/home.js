import React from "react";
import ButtonCustom from "../components/button-custom";
import { useAppContext } from "../app-context";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { ROUTES } from "../app-contants";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useAppContext();
  // const history = useHistory();

  const redirectTo = (path = "") => {
    navigate(path);
  };

  return (
    <div className={`page ${theme}`}>
      <h1>Welcome</h1>
      <p>
        Connecting Talent with Opportunity: Your Ultimate Recruiting and Job
        Search Solution
      </p>
      <div className="describeYourSelfSection">
        <p>How do you describe yourself ?</p>
        <div className="ctaWrapper">
          <div className="cta">
            <ButtonCustom
              text="Recruiter"
              onClick={() => {
                redirectTo(ROUTES.RECRUITER_LOGIN);
              }}
            />
          </div>
          <div>
            <ButtonCustom
              text="Freelancer"
              onClick={() => {
                redirectTo(ROUTES.CANDIDATE_LOGIN);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
