export const ROLE_TYPES = {
  CANDIDATE: "CANDIDATE",
  RECRUITER: "RECRUITER",
};

export const ROUTES = {
  HOME: "/",
  RECRUITER_LOGIN: "/recruiter-login",
  RECRUITER_PROFILE: "/recruiter/profile",
  CANDIDATE_LOGIN: "/candidate-login",
  CANDIDATE_JOBS: "/candidate/jobs",
  CANDIDATE_PROFILE: "/candidate/profile",
  ABOUT: "/about",
  BLOG: "/blog",
};


export const DATA_SOURCE = {
  JOBS_LIST: "JOBS_LIST",
  AUTH_DATA: "AUTH_DATA",
  JOB_APPLICANTS: "JOB_APPLICANTS"
}

export const FILTERS_TYPE = {
  SKILL: "SKILL",
  WAGE: "WAGE"
}

export const ALL_FILTERS = [
  { filterType : FILTERS_TYPE.SKILL , value : ["JavaScript", "React", "Agile" , "SQL" , "Sales"] },
  { filterType : FILTERS_TYPE.WAGE , value : 0 }
]
