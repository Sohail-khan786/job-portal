import React, { useState, useEffect } from "react";
import { useAppContext } from "../../app-context";


const GithubProfileSection = ({
    title = "List of all you Repos :",
    githubProfileLink = ""
}) => {

  const { theme, setToastConfig } = useAppContext();
  

  const [repos , setRepos] = useState([]);





  const onRepoClick = (linkPassed) => {
    window.open(linkPassed, '_blank').focus();
  }

  const fetchGithubRepos = async (githubProfileLinkPassed) => {
    try {
      const resposData = await fetch(githubProfileLinkPassed);
      const resposDataJson = await resposData.json();

      if(resposDataJson?.status !== "404"){
        setRepos(resposDataJson)
        return resposDataJson;
      }else {
        setToastConfig({
          isOpen: true,
          text: "Github Profile not found",
          bgColor: "red",
          textColor: "white",
        });
        return "error";
      }
      
    } catch (error) {
      setToastConfig({
          isOpen: true,
          text: "System Error Occured",
          bgColor: "red",
          textColor: "white",
        });
    }
  }

  useEffect(() => {
    if(githubProfileLink){
      fetchGithubRepos(githubProfileLink)
    }    
  }, [githubProfileLink])
  

  return (
    <div>
      {(repos || []).length > 0 && <div>
        <p>{title} </p>
        <ul>
          {
            (repos || []).map(repo => {
              const { id , html_url } =  repo || {}
              return <li key={id} onClick={() => { onRepoClick(html_url) }}><span>{html_url}</span></li>
            })
          }
          
        </ul>
      </div>}
    </div>
  );
};

export default GithubProfileSection;
