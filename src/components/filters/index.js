import React from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";

const Filters = () => {
  const { theme } = useAppContext();

  return (
    <div>
      <div className="filterHeading">Filter</div>
      <div className={`filterCtn ${theme}`}>
        
        <div className="filterItemPill">
          skills
        </div>
        <div className="filterItemPill">
          wages
        </div>
      </div>
    </div>
  );
};

export default Filters;
