import React, { useState, useEffect } from "react";
import { useAppContext } from "../app-context";
import "./styles.css";
import { FILTERS_TYPE } from "../app-contants";
import ButtonCustom from "../components/button-custom";
import InputText from "../components/input-text";


const CandidateProfile = () => {
  const { theme, filters, user, updateUserInfo, setToastConfig } = useAppContext();
  
  const { allFIlters } = filters || {};
  const skillFilterData =   (allFIlters || []).find(filterData => filterData?.filterType === FILTERS_TYPE.SKILL);

  const [selectedSkills , setSelectedSkills] = useState([ ...(user?.skills || []) ]);
  const [repos , setRepos] = useState([]);
  const githubProfileLinkParts = (user?.githubProfileLink || "").split("/");
  const [githubProfileName, setGithubProfileName] = useState(user?.githubProfileLink ? githubProfileLinkParts[githubProfileLinkParts.length - 2] : "");
  // const [githubProfileLink, ] = useState(user?.githubProfileLink || "");


  const onSkillClick = (skillClicked) => {
    let selectedSkillsUpdated = [...[...selectedSkills]];
    if(selectedSkills.includes(skillClicked)){
        selectedSkillsUpdated = selectedSkillsUpdated.filter(item => item !== skillClicked);
    }else {
        selectedSkillsUpdated.push(skillClicked)
    }
    setSelectedSkills(selectedSkillsUpdated);
  }

  const fetchGithubRepos = async (githubProfileLinkPassed) => {
    try {
      const resposData = await fetch(githubProfileLinkPassed);
      const resposDataJson = await resposData.json();

      if(resposDataJson?.status !== "404"){
        console.log("🚀 ~ fetchGithubRepos ~ resposDataJson:", resposDataJson)
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

  const updateUserDataToDb = (userDataUpdate) => {
    setToastConfig({
            isOpen: true,
            text: "User Data Updated",
            bgColor: "Green",
            textColor: "white",
          });
    updateUserInfo(userDataUpdate);
  }

  const onUpdateGithub  = async () => {
    const githubProfileLink = `https://api.github.com/users/${githubProfileName}/repos`;
    const resp = await fetchGithubRepos(githubProfileLink);
    if(resp !== "error"){
      const userDataUpdate = { ...user, githubProfileLink };
      updateUserDataToDb(userDataUpdate)
    }
  }

  const onUpdateSkills = () => {
    const userDataUpdate = { ...user, skills: selectedSkills };
    updateUserDataToDb(userDataUpdate)
  }

  const onRepoClick = (linkPassed) => {
    window.open(linkPassed, '_blank').focus();
  }

  useEffect(() => {
    if(user?.githubProfileLink){
      fetchGithubRepos(user?.githubProfileLink)
    }    
  }, [user?.githubProfileLink])
  

  return (
    <div className={`page ${theme}`}>
      <h1>Add Your Details</h1>
      <div className="skillsCtn">
          {
              (skillFilterData?.value || []).map(filterItem => {
                  return (
                      <div key={filterItem} className="checkBoxInput" >
                          <input
                              type="checkbox"
                              onChange={()=>{}}
                              checked={selectedSkills.includes(filterItem)}
                              onClick={() => onSkillClick(filterItem)}
                          /><span>{filterItem}</span>
                      </div>
                  )
              })
          }
          
      </div>
      <ButtonCustom text={"update skills"} onClick={onUpdateSkills} />
      <br/>
      <br/>
      <div className="inputWrapper">
        <InputText
          type="text"
          value={githubProfileName}
          placeholder={"Enter Github Profile Name"}
          onChangeHandler={(e) => setGithubProfileName(e.target.value)}
          errorText={""}
        />
      </div>
      <ButtonCustom text={"update Github"} onClick={onUpdateGithub} />
      <br/>
      <br/>
      <div>
        <p>List of all you Repos : </p>
        <ul>
          {
            (repos || []).map(repo => {
              const { id , html_url } =  repo || {}
              return <li key={id} onClick={() => { onRepoClick(html_url) }}><span>{html_url}</span></li>
            })
          }
          
        </ul>
      </div>
    </div>
  );
};

export default CandidateProfile;
