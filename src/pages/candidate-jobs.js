import React, { useEffect, useState } from "react";
import { useAppContext } from "../app-context";
import Filters from "../components/filters";
import JobsCard from "../components/jobs-card";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { jobsList } from "../data/jobs-data";
import { DATA_SOURCE } from "../app-contants";

const CandidateJobs = () => {
  const { theme } = useAppContext();
  const [jobs,setJobs] = useState([])

  useEffect(() => {
    const jobsDataList = LocalStorageUtils.getItem(DATA_SOURCE.JOBS_LIST);
    setJobs(jobsDataList);
  }, [])
  

  const onApplyClick = (jobDetails) => {
    console.log(`Apply Job`)
    console.log(jobDetails)
  }

  return (
    <div className={`page ${theme}`}>
      <Filters />
      <p>Available Jobs</p>
      <div>
        {(jobs || []).map(job => {
          const { jobId, companyName, jobTitle, contractLength, jobDesc, skills} = job || {}
          return <JobsCard 
            key={jobId} 
            companyName={companyName} 
            jobTitle={jobTitle} 
            contractLength={contractLength} 
            jobDesc={jobDesc} 
            skills={skills} 
            onApplyClick={() => { onApplyClick(job) }}
          />
        })}
        
      </div>
    </div>
  );
};

export default CandidateJobs;
