import React, { useState , useEffect} from "react";
import { useAppContext } from "../app-context";
import { filerByRecruiter, getJobDetails } from "../components/filters/filter-utils";
import { LocalStorageUtils } from "../local-storage-crud-utls";
import { DATA_SOURCE, ROUTES } from "../app-contants";
import { useNavigate, useParams } from 'react-router-dom';
import JobsCard from "../components/jobs-card";

const JobDetailsRecruiter = () => {
    
    let { jobId } = useParams();
    const navigate = useNavigate();


    const { theme,user , getAllJobs, getJobApplicantData, getAppliedUser } = useAppContext();
    const [jobData,setjobData] = useState();
    const [jobApplicantMap,setJobApplicantMap] = useState(getJobApplicantData())
    const [appliedUsers,setAppliedUsers] = useState([]);




    const initPageData = (recruiterId) => {
        const jobsDataList = getAllJobs();
        const jobByRecruiter = getJobDetails(jobsDataList, jobId, recruiterId);
        const usersThatAppliedForJob = getAppliedUser(jobId);
        setAppliedUsers(usersThatAppliedForJob || [])
        setjobData(jobByRecruiter);

        if(!jobByRecruiter){
            setToastConfig({
                isOpen: true,
                text: "Job Not Found",
                bgColor: "red",
                textColor: "white",
                });
        }
    }

    const onUserClick = (userIdPassed) => {
        let userDetailsRouteParts = ROUTES.RECRUITER_CANDIDATE_PROFILE_PREVIEW.split(":")
        userDetailsRouteParts[1] = userIdPassed
        const finalRoute = userDetailsRouteParts.join("");
        navigate(finalRoute)
    }




useEffect(() => {
    if(user?.id){
        initPageData(user?.id);
    }
}, [user?.id])


    return (
    <div className={`page ${theme}`}>
        <div>
            {
                jobData ?
                <div>
                    <p>Job Details</p>
                    <JobsCard
                        key={jobData?.jobId} 
                        jobId={jobData?.jobId} 
                        companyName={jobData?.companyName} 
                        jobTitle={jobData?.jobTitle} 
                        contractLength={jobData?.contractLength} 
                        jobDesc={jobData?.jobDesc} 
                        skills={jobData?.skills} 
                        onApplyClick={() => { onApplyClick(job, isAlreadyApplied) }}
                        isAlreadyApplied={false}
                        wages={jobData?.wages}
                        appliedFilters={[]}
                        showCta={false}
                        jobApplicantsNumber={jobApplicantMap[jobId]}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <p>List of Applicants</p>
                    <ul>
                        {
                            (appliedUsers || []).map(userItem => {
                                const { name , id , skills} = userItem || {}
                                return <li key={id} onClick={() => { onUserClick(id) }} className="applicantItem" >{name} : {(skills || []).join(" , ")}</li>
                            })
                        }
                    </ul>
                </div>
                
                :
                <p>Job Not Found</p>
            }
        </div>
        
    </div>
);
};

export default JobDetailsRecruiter;
