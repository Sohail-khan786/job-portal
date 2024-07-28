import { ROLE_TYPES } from "../app-contants";

export const loginInfo = [
  {
    id: "rec1",
    email: "harsh@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.RECRUITER,
    name: "Harsh",
    phone: "+91 1234"
  },
  {
    id: "rec2",
    email: "Preeti@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.RECRUITER,
    name: "Preeti",
    phone: "+91 2133"
  },
  {
    id: "cad1",
    email: "Amit@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.CANDIDATE,
    name: "Amit",
    skills : ["Agile" , "SQL" , "Sales"],
    phone: "+91 412123"
  },
  {
    id: "cad2",
    email: "Rohit@gmail.com",
    password: "test1234",
    role: ROLE_TYPES.CANDIDATE,
    name: "Rohit",
    skills : ["JavaScript", "React"],
    phone: "+91 21312"
  },
];
