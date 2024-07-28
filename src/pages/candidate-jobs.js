import React, { useEffect, useState } from "react";
import { useAppContext } from "../app-context";
import Filters from "../components/filters";
import JobsCard from "../components/jobs-card";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { jobsList } from "../data/jobs-data";
import { DATA_SOURCE } from "../app-contants";
import { filterJobs } from "../components/filters/filter-utils";
import { useElementOnScreen } from "../hooks/useElementOnScreen";

const CandidateJobs = () => {
  const { theme, filters, setToastConfig, user, hasUserAppliedToJob, saveJobApplicationToDb, getAllJobsByPage } = useAppContext();
  const { appliedFilters } = filters || {}; 
  console.log(filters)
  const [jobs,setJobs] = useState([])
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(5);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  const fetchListingOfJobs = (pageNumber = 0, pageSize = 8) => {
    setCurrentPageNumber(pageNumber);
    try {
      const { data, page, totalPages } = getAllJobsByPage(pageNumber,pageSize,filterJobs,appliedFilters)
      setCurrentPageNumber(page)
      setTotalPages(totalPages)

      if(page == 0){
          setJobs(filterJobs([...data],appliedFilters));
      }else {
          setJobs(filterJobs([...jobs ,...data],appliedFilters));
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {

    if (isVisible && currentPageNumber < totalPages) {
      fetchListingOfJobs(currentPageNumber + 1);
    }
  }, [isVisible]);

  useEffect(() => {
    fetchListingOfJobs(0);
  }, [appliedFilters])
  

  const onApplyClick = (jobDetails) => {
    const isAlreadyApplied =  hasUserAppliedToJob(user?.id ,jobDetails?.jobId)

    if(!user?.id){
      setToastConfig({
          isOpen: true,
          text: "Login to apply for Job",
          bgColor: "red",
          textColor: "white",
        });
        return 
    }
    
    if(isAlreadyApplied){
      setToastConfig({
          isOpen: true,
          text: "Already Applied",
          bgColor: "red",
          textColor: "white",
        });
        return 
    }
    console.log(`Apply Job`, isAlreadyApplied)
    console.log(jobDetails)
    const payLoad = {
      "jobId": jobDetails?.jobId,
      "recruiterId": jobDetails?.recruiterId,
      "candidateId": user?.id
    }
    saveJobApplicationToDb(payLoad)
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
      <div className="jobsContainer">
        {(jobs || []).map((job,idx) => {
          const { jobId, companyName, jobTitle, contractLength, jobDesc, skills , isAlreadyApplied, wages} = job || {}
          return (
          <div className="jobsCardContainer"  key={jobId} ref={idx === jobs.length - 1 ? containerRef : null}>
            <JobsCard 
              key={jobId} 
              jobId={jobId}
              companyName={companyName} 
              jobTitle={jobTitle} 
              contractLength={contractLength} 
              jobDesc={jobDesc} 
              skills={skills} 
              onApplyClick={() => { onApplyClick(job) }}
              isAlreadyApplied={isAlreadyApplied}
              wages={wages}
              appliedFilters={appliedFilters}
              
            />
          </div>
          )
        })}
        
      </div>
    </div>
  );
};

export default CandidateJobs;
