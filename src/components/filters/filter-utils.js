import { FILTERS_TYPE } from "../../app-contants";
import { haveCommonElement } from "../../utils";

export const filerByRecruiter = (jobList = [] , recruiterId) => {
    return [...jobList].filter((i)=>{
        return i.recruiterId === recruiterId;
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