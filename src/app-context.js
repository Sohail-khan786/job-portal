import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "./components/toast";
import { ALL_FILTERS } from "./app-contants";

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

  const [user, setUser] = useState({
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
