import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "./components/toast";

const ThemeContext = createContext();

export const useAppContext = () => {
  return useContext(ThemeContext);
};

export const AppContext = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toastConfig, setToastConfig] = useState({
    isOpen: false,
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode ? "dark" : "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setToastConfig }}>
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
