import { FILTERS_TYPE } from "../../app-contants";
import { haveCommonElement } from "../../utils";

export const filerByRecruiter = (jobList = [] , recruiterId) => {
    return [...jobList].filter((i)=>{
        return i.recruiterId == recruiterId;
    })
} 

export const getJobDetails = (jobList,jobId, recruiterId) => {
    console.log("🚀 ~ getJobDetails ~ recruiterId:", recruiterId)
    console.log("🚀 ~ getJobDetails ~ jobId:", jobId)
    return [...jobList].find((i)=>{
        console.log("🚀 ~ getJobDetails ~ i):", i)
        return i.recruiterId == recruiterId && i.jobId == jobId;
    })
}

const wageFilter = (jobList = [] , filterData) => {
    return [...jobList].filter((i)=>{
        return i.wages >= filterData.value;
    })
} 

const skillFilter = (jobList = [] , filterData) => {
    const { value } = filterData || []

    return [...jobList].filter((i)=>{
        return haveCommonElement(i.skills, filterData.value);
    })
} 

export const filterJobs = (jobList = [] , appliedFilters = []) => {
    let filteredJobs = [...jobList];

    appliedFilters.forEach(filterData => {
        if(filterData?.filterType === FILTERS_TYPE.WAGE){
            filteredJobs = wageFilter(filteredJobs, filterData)
        }

        if(filterData?.filterType === FILTERS_TYPE.SKILL){
            filteredJobs = skillFilter(filteredJobs, filterData)
        }
    })

    return filteredJobs
}