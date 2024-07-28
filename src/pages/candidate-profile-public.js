import React, { useState, useEffect } from "react";
import { useAppContext } from "../app-context";
import "./styles.css";
import { useParams } from "react-router-dom";
import GithubProfileSection from "../components/github-profile-section";


const CandidateProfilePublic = () => {
    let { cid } = useParams();

  const { theme , findUserById} = useAppContext();
  const [userData , setUserData] = useState(null);
  const { name , skills , githubProfileLink , phone } =  userData || {  name : "" , skills : [] , githubProfileLink : "" }
  
  useEffect(()=>{
    if(cid){
      const userDataFetched = findUserById(cid)
      setUserData(userDataFetched)
    }

  },[cid])
  

  return (
    <div className={`page ${theme}`}>
      <h1>{`Name : ${name}`}</h1>
      <p>{`Phone : ${phone}`}</p>
      <div className="skillsCtn">
        <p>Skills :</p>
        <ul>
          {
              (skills || []).map(skillName => {
                  return (
                      <li key={skillName}  >
                          {skillName}
                      </li>
                  )
              })
          }
        </ul>
          
          
      </div>
      
      <br/>
      <GithubProfileSection title={`Repos by ${name} :`} githubProfileLink={githubProfileLink} />
    </div>
  );
};

export default CandidateProfilePublic;
