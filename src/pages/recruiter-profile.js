import React, { useState , useEffect} from "react";
import { useAppContext } from "../app-context";
import { filerByRecruiter } from "../components/filters/filter-utils";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { DATA_SOURCE } from "../app-contants";
import JobsCard from "../components/jobs-card";

const RecruiterProfile = () => {
  const { theme, user } = useAppContext();
  const [jobs,setJobs] = useState([])

  const initPageData = (recruiterId) => {
    const jobsDataList = LocalStorageUtils.getItem(DATA_SOURCE.JOBS_LIST);
    setJobs(filerByRecruiter(jobsDataList,recruiterId));
  }

  useEffect(() => {
    if(user?.id){
      initPageData(user?.id);
    }
  }, [user?.id])

  return (
    <div className={`page ${theme}`}>
      <h1>Add a job</h1>

      <br/>
      <br/>
      <br/>
      <p>List of All Jobs Posted By You</p>
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
            appliedFilters={[]}
            showCta={false}
          />
        })}
        
      </div>
    </div>
  );
};

export default RecruiterProfile;
