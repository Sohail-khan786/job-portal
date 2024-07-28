import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import ButtonCustom from "../button-custom";
import { FILTERS_TYPE } from "../../app-contants";

const JobsCard = ({
  onCardClick = () => {},
  onApplyClick = () => {},
  jobId,
  companyName = "",
  jobTitle = "",
  contractLength = "",
  jobDesc = "",
  skills = [],
  wages,
  appliedFilters,
  showCta = true,
  jobApplicantsNumber
}) => {
  const { theme } = useAppContext();
  const appliedSkillFiltersData =   (appliedFilters || []).find(filterData => filterData?.filterType === FILTERS_TYPE.SKILL);
  const appliedSkills = [ ...(appliedSkillFiltersData?.value || [])];


  return (
    <div className="jobsCard" onClick={()=>{onCardClick(jobId)}}>
        <div>
          <p>{`Company : ${companyName}`}</p>
        </div>
        <div>
          <p>{jobTitle}</p>
        </div>
        <div>
          <p>{`Contract Length : ${contractLength}`}</p>
        </div>
        
        <div>
          <p>{`Wages : ${wages}/hr`}</p>
        </div>
        <div>
          <p>{jobDesc}</p>
        </div>
        <div>
          <p>Skills : 
            {
              (skills || []).map(skill => {
                return <span className={`skillsBox ${appliedSkills.includes(skill) ? "skillsActive" : ""}`} key={skill} >{skill}</span>
              })
            }
          </p>
        </div>
        {jobApplicantsNumber && <div>
          <p>{`Job Appliants : ${jobApplicantsNumber}`}</p>
        </div>}
        {showCta && <ButtonCustom text="Apply" onClick={onApplyClick} />}
    </div>
  );
};

export default JobsCard;
