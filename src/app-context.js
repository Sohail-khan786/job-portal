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
  const [user, setUser] = useState({
    id: "rec1",
    email: "harsh@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.RECRUITER,
    name: "Harsh",
    phone: "+91 1234"
  });

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
  
  const onLogout = () => {
    setUser({})
  }

  // jobs 

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
        onLogout,
        //jobs 
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
