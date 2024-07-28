import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AppContext } from "./app-context";

import Navbar from "./components/nav";

import About from "./pages/about";
import Blog from "./pages/blog";
import Home from "./pages/home";
import RecruiterLogin from "./pages/recruiter-login";
import CandidateProfile from "./pages/candidate-profile";
import CandidateJobs from "./pages/candidate-jobs";
import RecruiterProfile from "./pages/recruiter-profile";

import "./styles.css";
import JobSeekerLogin from "./pages/job-seeker-login";
import Toast from "./components/toast";
import { DATA_SOURCE, ROUTES } from "./app-contants";
import { jobsList } from "./data/jobs-data";
import { LocalStorageUtils } from "./local-storage-crud-utls";
import { loginInfo } from "./data/auth-data";
import { JOB_APPLICANTS } from "./data/job-applicats";


const App = () => {

  const initData = () => {
    // LocalStorageUtils.setItem(DATA_SOURCE.JOBS_LIST,jobsList);
    // LocalStorageUtils.setItem(DATA_SOURCE.AUTH_DATA,loginInfo);
    // LocalStorageUtils.setItem(DATA_SOURCE.JOB_APPLICANTS,JOB_APPLICANTS);
  }

  useEffect(()=>{
    // initData()
  },[])

  return (
    <AppContext>
      <Router>
        <Navbar />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.RECRUITER_LOGIN} element={<RecruiterLogin />} />
          <Route path={ROUTES.RECRUITER_PROFILE} element={<RecruiterProfile />} />
          <Route path={ROUTES.CANDIDATE_LOGIN} element={<JobSeekerLogin />} />
          <Route path={ROUTES.CANDIDATE_PROFILE} element={<CandidateProfile />} />
          <Route path={ROUTES.CANDIDATE_JOBS} element={<CandidateJobs />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
        </Routes>
      </Router>
    </AppContext>
  );
};

export default App;
