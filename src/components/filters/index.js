import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import WagesFilter from "./wages-filter";
import { FILTERS_TYPE } from "../../app-contants";

const Filters = () => {
  const { theme , updateAppliedFilters } = useAppContext();
  const [filterModalToShow, setFilterModalToShow] = useState("");

  const onApplyClick = (filterType , value) => {
    updateAppliedFilters({ filterType, value })
    setFilterModalToShow("")
  }

  const getFilterModal = () => {
    if(filterModalToShow === FILTERS_TYPE.WAGE){
      return <WagesFilter onApplyClick={onApplyClick}/>
    }
    return null;
  }


  return (
    <div>
      <div className="filterHeading">Filter</div>
      <div className={`filterCtn ${theme}`}>
        
        <div className="filterItemPill" onClick={() => { setFilterModalToShow(FILTERS_TYPE.SKILL)}} >
          skills
        </div>
        <div className="filterItemPill" onClick={() => { setFilterModalToShow(FILTERS_TYPE.WAGE) }}>
          wages
        </div>
      </div>
        {getFilterModal()}
    </div>
  );
};

export default Filters;
