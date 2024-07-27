import React from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import ButtonCustom from "../button-custom";

const JobsCard = ({
  onApplyClick = () => {},
  companyName = "",
  jobTitle = "",
  contractLength = "",
  jobDesc = "",
  skills = [],
  wages
}) => {
  const { theme } = useAppContext();

  return (
    <div className="jobsCard">
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
                return <span className="skillsBox" key={skill} >{skill}</span>
              })
            }
          </p>
        </div>
        <ButtonCustom text="Apply" onClick={onApplyClick} />
    </div>
  );
};

export default JobsCard;
