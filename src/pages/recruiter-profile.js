import React, { useState , useEffect} from "react";
import { useAppContext } from "../app-context";
import { filerByRecruiter } from "../components/filters/filter-utils";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { DATA_SOURCE, FILTERS_TYPE, ROUTES } from "../app-contants";
import JobsCard from "../components/jobs-card";
import ButtonCustom from "../components/button-custom";
import InputText from "../components/input-text";
import { isEmpty } from "../utils";
import { Routes, Route, useParams , useNavigate} from 'react-router-dom';


const RecruiterProfile = () => {
  let { jobId } = useParams();
  const navigate = useNavigate();
  
  const { theme,user, filters, setToastConfig, postJobtoDb, getJobApplicantData, getAllJobs } = useAppContext();
  const { allFIlters  } = filters || {};
  const skillFilterData =   (allFIlters || []).find(filterData => filterData?.filterType === FILTERS_TYPE.SKILL);


  const [jobs,setJobs] = useState([])
  const [selectedSkills , setSelectedSkills] = useState([]);
  const [isFromSubmitAttempted,setIsFromSubmitAttempted] = useState(false)
  const [jobToPost,setJobToPost] = useState({})
  const [totalJobCount , setTotalJobCount] = useState(0);
  const [jobApplicantMap,setJobApplicantMap] = useState(getJobApplicantData())

  const [file, setFile] = useState(null);


  const initPageData = (recruiterId) => {
    setJobToPost({})
    setSelectedSkills([])
    setIsFromSubmitAttempted(false)
    const jobsDataList = getAllJobs();
    const jobsByRecruiter = filerByRecruiter(jobsDataList,recruiterId);
    setTotalJobCount(jobsDataList.length);
    setJobs([...filerByRecruiter(jobsDataList,recruiterId)]);
  }

  
  const jobFormFields = [
    { type : "text" , placeholder : "Enter Company Name", fieldName : "companyName" , fieldValue : jobToPost["companyName"] || "" , onChangeHandler : (e) => setJobToPost(prev => {return {...prev , companyName :e.target.value}}) , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "text" , placeholder : "Enter Job title", fieldName : "jobTitle" , fieldValue : jobToPost["jobTitle"] || "" , onChangeHandler : (e) => setJobToPost(prev => {return {...prev , jobTitle :e.target.value}}) , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "number" , placeholder : "Enter Contract length in months", fieldName : "contractLength" , fieldValue : jobToPost["contractLength"] || "" , onChangeHandler : (e) => setJobToPost(prev => {return {...prev , contractLength :e.target.value}}) , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "text" , placeholder : "Enter Job Description", fieldName : "jobDesc" , fieldValue : jobToPost["jobDesc"] || "" , onChangeHandler : (e) => setJobToPost(prev => {return {...prev , jobDesc :e.target.value}}) , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "number" , placeholder : "Enter Wage", fieldName : "wages" , fieldValue : jobToPost["wages"] || "" , onChangeHandler : (e) => setJobToPost(prev => {return {...prev , wages :e.target.value}}) , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "dropdown" , placeholder : "select skills", fieldName : "skills" , fieldValue : jobToPost["skills"] || "" , onChangeHandler : () => {} , validator : (value) => { return isEmpty(value || "") && isFromSubmitAttempted ? "Field Cannot be empty" : "" } },
    { type : "file" , placeholder : "Atach Job Document", fieldName : "jdFile" , validator : () => { return "" }  }
  ]

  useEffect(() => {
    if(user?.id){
      initPageData(user?.id);
    }
  }, [user?.id])

  const doesFormDataHaveError = () => {

    for(let idx in jobFormFields){
      const forItem = jobFormFields[idx];
      const { placeholder, fieldName } =  forItem || {};
      const errorMessage = placeholder;
      const isCurrentFormFieldValid = !!jobToPost[fieldName];
      if(!isCurrentFormFieldValid){
        return errorMessage;
      }
      
    }

    return "";
  }


  const onPostJobClick = () => {
    setIsFromSubmitAttempted(true);
    const errorMessage = doesFormDataHaveError();
    if(errorMessage){
      setToastConfig({
          isOpen: true,
          text: errorMessage,
          bgColor: "red",
          textColor: "white",
        });
        return;
    }else {
      const jobToPostUpdated = { ...jobToPost , recruiterId: user?.id , jobId: totalJobCount + 1 }
      
      postJobtoDb(jobToPostUpdated)
      initPageData(user?.id);
      setToastConfig({
          isOpen: true,
          text: "Job Posted SuccessFully",
          bgColor: "Green",
          textColor: "white",
        });
    }
  }

  const onSkillClick = (skillClicked) => {
    let selectedSkillsUpdated = [...[...selectedSkills]];
    if(selectedSkills.includes(skillClicked)){
        selectedSkillsUpdated = selectedSkillsUpdated.filter(item => item !== skillClicked);
    }else {
        selectedSkillsUpdated.push(skillClicked)
    }
    setSelectedSkills(selectedSkillsUpdated);
    setJobToPost(prev => {return {...prev , skills :selectedSkillsUpdated}})
  }

  const onJDFileChange = e => {
    const fileDetails = e.target.files[0];
    const { size, type, name } = fileDetails || {};

    const maxSize = 16 * 1024; 
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    

    if (!allowedTypes.includes(type)) {
        setToastConfig({
          isOpen: true,
          text: 'Invalid file type. Only PDF and Word documents are allowed',
          bgColor: "red",
          textColor: "white",
        });
        return;
    }

    if (size > maxSize) {
        setToastConfig({
          isOpen: true,
          text: 'File size exceeds 16KB',
          bgColor: "red",
          textColor: "white",
        });
        return;
    }
    setJobToPost({ ...jobToPost , jdFile : name })
    setFile(fileDetails);
};


  const getFormField = (formItem, idx) => {
    const { type, fieldValue, placeholder, onChangeHandler, validator } = formItem || {};
    const errorText = validator(fieldValue);

    if(type === "text" || type === "number"){
      return <InputText
        key={idx}
        type={type}
        value={fieldValue}
        placeholder={placeholder}
        onChangeHandler={onChangeHandler}
        errorText={errorText}
      />
    }

    if(type === "file"){
      return <div key={idx}>
        <p>Add JD Document : </p>
        <input type="file" className="fileInput" onChange={onJDFileChange} />
      </div>
    }

    if(type === "dropdown"){
      return <div key={idx}>
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
                                        onClick={() => onSkillClick(filterItem)}
                                    /><span>{filterItem}</span>
                                </div>
                            )
                        })
                    }
                    
                </div>
      </div>
    }
    
  }

  const openJobDetailPage = (jobIdPassed) => {
    let jobDetailsRouteParts = ROUTES.RECRUITER_JOB_DETAIL.split(":")
    jobDetailsRouteParts[1] = jobIdPassed
    const finalRoute = jobDetailsRouteParts.join("");
    navigate(finalRoute)
  }



  return (
    <div className={`page ${theme}`}>
      <h1>Add a job</h1>
      {
        (jobFormFields || []).map((formItem, idx) => {
            return getFormField(formItem, idx)
        })
      }
      
      <ButtonCustom text="Post Job" onClick={onPostJobClick} />
      <br/>
      <br/>
      <br/>
      <p>List of All Jobs Posted By You</p>
      <div>
        {(jobs || []).map(job => {
          const { jobId, companyName, jobTitle, contractLength, jobDesc, skills , isAlreadyApplied, wages} = job || {}
          return <JobsCard
            onCardClick={(jobId) => { openJobDetailPage(jobId) }}
            key={jobId} 
            jobId={jobId}
            companyName={companyName} 
            jobTitle={jobTitle} 
            contractLength={contractLength} 
            jobDesc={jobDesc} 
            skills={skills} 
            onApplyClick={() => { onApplyClick(job, isAlreadyApplied) }}
            isAlreadyApplied={isAlreadyApplied}
            wages={wages}
            appliedFilters={[]}
            showCta={false}
            jobApplicantsNumber={jobApplicantMap[jobId]}
          />
        })}
        
      </div>
    </div>
  );
};

export default RecruiterProfile;
