import { DatePickerProps } from "antd";

export interface Application {
    id: string;
    fullName: string;
    gender: Gender;
    dob: Date;
    nationality: string;
    presentAddress: string;
    phoneNumber: string;
    email: string;
    expectedSalary: number;
    cVUrl: string;
    formFile: File; 
    status: CandidateStatus; 
    recruitmentId: string;
  }
  
  export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other",
  }
  
  export enum CandidateStatus {
    Pending = "Pending",
    Accepted = "Accepted",
    Rejected = "Rejected",
  }
  

  