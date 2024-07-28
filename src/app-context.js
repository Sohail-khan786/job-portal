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
    id: "cad1",
    email: "Amit@gmail.com",
    password: "",
    role: ROLE_TYPES.CANDIDATE,
    name: "Amit",
    skills : ["Agile" , "SQL" , "Sales"],
    phone: "+91 412123",
    githubProfileLink : "https://api.github.com/users/Sohail-khan786/repos"
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
        onLogout
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
