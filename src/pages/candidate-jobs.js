import React, { useEffect, useState } from "react";
import { useAppContext } from "../app-context";
import Filters from "../components/filters";
import JobsCard from "../components/jobs-card";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { jobsList } from "../data/jobs-data";
import { DATA_SOURCE } from "../app-contants";
import { filterJobs } from "../components/filters/filter-utils";

const CandidateJobs = () => {
  const { theme, filters, setToastConfig, user } = useAppContext();
  console.log("🚀 ~ CandidateJobs ~ user:", user)
  const { appliedFilters } = filters || {}; 
  console.log(filters)
  const [jobs,setJobs] = useState([])

  const initPageData = () => {
    const jobsDataList = LocalStorageUtils.getItem(DATA_SOURCE.JOBS_LIST);
    setJobs(filterJobs(jobsDataList,appliedFilters));
  }

  useEffect(() => {
    initPageData();
  }, [appliedFilters])
  

  const onApplyClick = (jobDetails,isAlreadyApplied) => {
    if(isAlreadyApplied){
      setToastConfig({
          isOpen: true,
          text: "Already Applied",
          bgColor: "red",
          textColor: "white",
        });
    }
    console.log(`Apply Job`, isAlreadyApplied)
    console.log(jobDetails)
    setToastConfig({
          isOpen: true,
          text: "Applied Successfully",
          bgColor: "green",
          textColor: "white",
        });
  }

  return (
    <div className={`page ${theme}`}>
      <Filters />
      <p>Available Jobs</p>
      <div>
        {(jobs || []).map(job => {
          const { jobId, companyName, jobTitle, contractLength, jobDesc, skills , isAlreadyApplied, wages} = job || {}
          return <JobsCard 
            key={jobId} 
            companyName={companyName} 
            jobTitle={jobTitle} 
            contractLength={contractLength} 
            jobDesc={jobDesc} 
            skills={skills} 
            onApplyClick={() => { onApplyClick(job, isAlreadyApplied) }}
            isAlreadyApplied={isAlreadyApplied}
            wages={wages}
            appliedFilters={appliedFilters}
          />
        })}
        
      </div>
    </div>
  );
};

export default CandidateJobs;
