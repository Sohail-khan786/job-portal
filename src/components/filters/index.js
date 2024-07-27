import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import WagesFilter from "./wages-filter";
import { FILTERS_TYPE } from "../../app-contants";

const Filters = () => {
  const { theme, filters , updateAppliedFilters, removeAppliedFilters } = useAppContext();
  const { appliedFilters } = filters || {}; 
  const [filterModalToShow, setFilterModalToShow] = useState("");

  const onApplyClick = (filterType , value) => {
    updateAppliedFilters({ filterType, value })
    setFilterModalToShow("")
  }

  const onRemoveClick = (filterType) => {
    removeAppliedFilters(filterType)
    setFilterModalToShow("")
  }

  const getFilterModal = () => {
    if(filterModalToShow === FILTERS_TYPE.WAGE){
      return <WagesFilter onApplyClick={onApplyClick} onRemoveClick={onRemoveClick}/>
    }
    return null;
  }

  const filtersToShow = [
    { name : FILTERS_TYPE.SKILL , onClick: () => { setFilterModalToShow(FILTERS_TYPE.SKILL)} , displayValue : "skills" , isFilterActive : (appliedFilters || []).find(i => i.filterType === FILTERS_TYPE.SKILL)   },
    { name : FILTERS_TYPE.WAGE , onClick: () => { setFilterModalToShow(FILTERS_TYPE.WAGE)} , displayValue : "wages" , isFilterActive : (appliedFilters || []).find(i => i.filterType === FILTERS_TYPE.WAGE)   }
    
  ] 


  return (
    <div>
      <div className="filterHeading">Filter</div>
      <div className={`filterCtn ${theme}`}>
        {(filtersToShow || []).map(filterData => {
          const { name, onClick , isFilterActive, displayValue} = filterData || {}
          return <div key={name} className={`${isFilterActive ? "filterItemPillActive" : "filterItemPill"}`} onClick={onClick} >
                  {displayValue}
                </div>
        })}
        
      </div>
        {getFilterModal()}
    </div>
  );
};

export default Filters;
