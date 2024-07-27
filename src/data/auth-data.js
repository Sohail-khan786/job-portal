import { ROLE_TYPES } from "../app-contants";

export const loginInfo = [
  {
    id: "rec1",
    email: "harsh@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.RECRUITER
  },
  {
    id: "cad1",
    email: "Amit@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.CANDIDATE,
    name: "Amit",
    skills : ["react","js","html"]
  },
];
