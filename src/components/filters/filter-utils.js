import { FILTERS_TYPE } from "../../app-contants";

const wageFilter = (jobList = [] , filterData) => {
    return [...jobList].filter((i)=>{
        return i.wages >= filterData.value;
    })
} 

export const filterJobs = (jobList = [] , appliedFilters = []) => {
    let filteredJobs = [...jobList];

    appliedFilters.forEach(filterData => {
        if(filterData?.filterType === FILTERS_TYPE.WAGE){
            filteredJobs = wageFilter(filteredJobs, filterData)
        }
    })

    return filteredJobs
}