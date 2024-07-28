import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "./components/toast";
import { ALL_FILTERS, DATA_SOURCE, ROLE_TYPES } from "./app-contants";
import { LocalStorageUtils } from "./local-storage-crud-utls";

const ThemeContext = createContext();

export const useAppContext = () => {
  return useContext(ThemeContext);
};

export const AppContext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toastConfig, setToastConfig] = useState({
    isOpen: false,
  });

  const [filters, setFilters] = useState({
    allFIlters: [...ALL_FILTERS],
    appliedFilters : []
  });

  // TODO : 
  const [user, setUser] = useState({})


  // recruiter user
  // const [user, setUser] = useState({
  //   id: "rec1",
  //   email: "harsh@gmail.com",
  //   password: "test1234",
  //   role: ROLE_TYPES.RECRUITER,
  //   name: "Harsh",
  //   phone: "+91 1234"
  // });

  // candidate user
//   const [user, setUser] = useState({
//   "id": "cad1",
//   "email": "Amit@gmail.com",
//   "password": "test1234",
//   "role": "CANDIDATE",
//   "name": "Amit",
//   "skills": [
//     "Agile",
//     "SQL",
//     "Sales"
//   ],
//   "phone": "+91 412123",
//   "githubProfileLink": "https://api.github.com/users/Sohail-khan786/repos"
// })
  // filters
  const updateAppliedFilters = (filterData) => {
    let appliedFiltersUpdated = [...(filters?.appliedFilters || [])].filter(i => i.filterType !== filterData?.filterType);
    appliedFiltersUpdated.push(filterData);
    setFilters(prev => {
      return {
        ...prev,
        appliedFilters: appliedFiltersUpdated
      }
    })
  }

  const removeAppliedFilters = (filterType) => {
    let appliedFiltersUpdated = [...(filters?.appliedFilters || [])].filter(i => i.filterType !== filterType);
    setFilters(prev => {
      return {
        ...prev,
        appliedFilters: appliedFiltersUpdated
      }
    })
  }

  //Login
  const onLoginSuccess = (userData) => {
    setUser({ ...userData , password : "" })
  }

  const updateUserInfo = (userData) => {
    setUser({ ...userData , password : "" })
    const loginInfo = LocalStorageUtils.getItem(DATA_SOURCE.AUTH_DATA)
    const loginInfoUpdated = (loginInfo || []).map(u => {
      if(u.id ===  userData.id){
        return {
          ...userData,
          password: u.password
        }
      }else {
        return {...u}
      }
    }) 
    LocalStorageUtils.setItem(DATA_SOURCE.AUTH_DATA, loginInfoUpdated)    
  }

  const findUserById = (id) => {
    const loginInfo = LocalStorageUtils.getItem(DATA_SOURCE.AUTH_DATA)
    return [...loginInfo].find(u => u?.id == id)
  }
  
  const onLogout = () => {
    setUser({})
  }

  // jobs 

  const getAppliedUser = (jobId) => {
    const applicantIds = [...LocalStorageUtils.getItem(DATA_SOURCE.APPLIED_JOBS)].filter( item => item.jobId == jobId).map(item => item.candidateId);
    const allUsers =  LocalStorageUtils.getItem(DATA_SOURCE.AUTH_DATA);

    return [...allUsers].filter(i => applicantIds.includes(i?.id));
  }

  const hasUserAppliedToJob = (cid,jobId) => {
    const userFound = [...LocalStorageUtils.getItem(DATA_SOURCE.APPLIED_JOBS)].filter( item => item.jobId == jobId).find(item => item.candidateId == cid);

    return !!userFound;
  }

  const saveJobApplicationToDb = (payLoad) => {
    let allAppliedJobsUpdated = [...LocalStorageUtils.getItem(DATA_SOURCE.APPLIED_JOBS)];
    allAppliedJobsUpdated = [payLoad , ...[...LocalStorageUtils.getItem(DATA_SOURCE.APPLIED_JOBS)]]
    LocalStorageUtils.setItem(DATA_SOURCE.APPLIED_JOBS, allAppliedJobsUpdated)  
    let jobsApplicantData = LocalStorageUtils.getItem(DATA_SOURCE.JOB_APPLICANTS)
    if(!jobsApplicantData[payLoad?.jobId])  {
      jobsApplicantData[payLoad?.jobId] = 1;
    }else {
      jobsApplicantData[payLoad?.jobId] = jobsApplicantData[payLoad?.jobId] +  1;
    }
    LocalStorageUtils.setItem(DATA_SOURCE.JOB_APPLICANTS, jobsApplicantData)  
  }
  const getAllJobs = () => {
    return LocalStorageUtils.getItem(DATA_SOURCE.JOBS_LIST);
  }

  const getAllJobsByPage = (page,size) => {
    const allJobs = getAllJobs();
    const startIndex = page * size;
    const endIndex = page * size + size;

    return {data : allJobs.slice(startIndex,endIndex), page , size , totalPages : Math.ceil(allJobs/size)};
  }

  

  const postJobtoDb = (jobData) => {
    const jobs = LocalStorageUtils.getItem(DATA_SOURCE.JOBS_LIST)
    const jobsUpdated = [{ ...jobData} , ...jobs]
    LocalStorageUtils.setItem(DATA_SOURCE.JOBS_LIST, jobsUpdated)    
    return jobsUpdated;
  }


  // jobs applicant data
  const getJobApplicantNumber = (jobId) => {
    const jobsApplicantData = LocalStorageUtils.getItem(DATA_SOURCE.JOB_APPLICANTS)
    if(!jobsApplicantData[jobId])  {
      return 0;
    }
    return jobsApplicantData[jobId];
  }

  const getJobApplicantData = () => {
    const jobsApplicantData = LocalStorageUtils.getItem(DATA_SOURCE.JOB_APPLICANTS)
    return jobsApplicantData;
  }

  

  

  // theme
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ 
        // theme
        theme, 
        toggleTheme, 
        // toast
        setToastConfig, 
        // filters
        filters, 
        updateAppliedFilters, 
        removeAppliedFilters,
        //Login
        user,
        onLoginSuccess,
        updateUserInfo,
        findUserById,
        onLogout,
        //jobs 
        getAppliedUser,
        hasUserAppliedToJob,
        saveJobApplicationToDb,
        getAllJobs,
        getAllJobsByPage,
        postJobtoDb,
        // jobs applicant data
        getJobApplicantNumber,
        getJobApplicantData
      }}>
      {children}
      <Toast
        isOpen={toastConfig.isOpen}
        text={toastConfig?.text}
        bgColor={toastConfig?.bgColor}
        textColor={toastConfig?.textColor}
        onCloseCallBack={() => {
          setToastConfig((prev) => {
            return { ...prev, isOpen: false };
          });
        }}
      />
    </ThemeContext.Provider>
  );
};
