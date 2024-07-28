import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import ButtonCustom from "../button-custom";
import InputText from "../input-text";
import { FILTERS_TYPE } from "../../app-contants";

const SkillsFilter = ({
    onApplyClick = () => {},
    onRemoveClick = () => {}
}) => {
  const { theme, filters } = useAppContext();
  const { allFIlters , appliedFilters } = filters || {};
  const skillFilterData =   (allFIlters || []).find(filterData => filterData?.filterType === FILTERS_TYPE.SKILL);
  const appliedSkillFiltersData =   (appliedFilters || []).find(filterData => filterData?.filterType === FILTERS_TYPE.SKILL);
  

  const [selectedSkills , setSelectedSkills] = useState([ ...(appliedSkillFiltersData?.value || []) ]);

  const onFilterItemClick = (skillClicked) => {
    let selectedSkillsUpdated = [...selectedSkills];
    if(selectedSkills.includes(skillClicked)){
        selectedSkillsUpdated = selectedSkillsUpdated.filter(item => item !== skillClicked);
    }else {
        selectedSkillsUpdated.push(skillClicked)
    }
    setSelectedSkills(selectedSkillsUpdated);

  }

  return (
    skillFilterData ?
        <div className="filterModal">
            <div className="filterModalContent">
                <h1>Skills Filter</h1>
                <p>Add Relevent Skills</p>
                <div className="skillsCtn">
                    {
                        (skillFilterData?.value || []).map(filterItem => {
                            return (
                                <div key={filterItem} className="checkBoxInput" >
                                    <input
                                        type="checkbox"
                                        onChange={()=>{}}
                                        checked={selectedSkills.includes(filterItem)}
                                        onClick={() => onFilterItemClick(filterItem)}
                                    /><span>{filterItem}</span>
                                </div>
                            )
                        })
                    }
                    
                </div>
                
                <ButtonCustom text="Apply" onClick={() => onApplyClick(FILTERS_TYPE.SKILL,selectedSkills)} />
                <br/>
                <ButtonCustom text="Remove" onClick={() => onRemoveClick(FILTERS_TYPE.SKILL)} />
            </div>
        </div>
        :
        null
  );
};

export default SkillsFilter;
