import { ROLE_TYPES } from "../app-contants";

export const loginInfo = [
  {
    id: "rec1",
    email: "harsh@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.RECRUITER
  },
  {
    id: "rec2",
    email: "Preeti@gmail.com",
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
  {
    id: "cad2",
    email: "Rohit@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.CANDIDATE,
    name: "Rohit",
    skills : ["java","spring"]
  },
];
