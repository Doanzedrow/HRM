export interface Employee {
  id?: string;
  code?: string;
  fullName: string;
  address: string;
  salary: number;
  avatar?: string;
  formFile?: File | null;
  gender: Gender;
  dob: Date;
  email: string;
  placeOfBirth: string;
  bankAccount: string;
  bankName: string;
  startDate: Date;
  employeeStatus: EmployeeStatus;
  employmentCategory: EmployeeCategory;
  employeeLevel: EmployeeLevel;
  departmentId?: string;
  positionId: string;
  userName: string;
  passWord: string;
  departmentName?: string;
  phoneNumber: string;
  role?: Role;
  version?: string;
}

export enum Role {
  Admin = 0,
  Staff = 1,
  HR = 2,
}
export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}
export enum EmployeeStatus {
  Working = 0,
  Leaving = 1,
}
export enum EmployeeLevel {
  Intern = 0,
  Fresher = 1,
  Junior = 2,
  Intermediate = 3,
  Senior = 4,
  Lead = 5,
  SeniorLead = 6,
  Expert = 7,
}
export enum EmployeeCategory {
  FullTime = 0,
  PartTime = 1,
  Intern = 2,
}
export const EmploymentCategoryLabel = new Map<EmployeeCategory, string>([
  [EmployeeCategory.FullTime, "Full time"],
  [EmployeeCategory.PartTime, "Part time"],
  [EmployeeCategory.Intern, "Intern"],
]);
export const GenderLabel = new Map<Gender, string>([
  [Gender.Male, "Male"],
  [Gender.Female, "Female"],
  [Gender.Other, "Other"],
]);
export const EmploymentStatusLabel = new Map<EmployeeStatus, string>([
  [EmployeeStatus.Leaving, "Leaving"],
  [EmployeeStatus.Working, "Working"],
]);
export const EmploymentLevelLabel = new Map<EmployeeLevel, string>([
  [EmployeeLevel.Intern, "Intern"],
  [EmployeeLevel.Fresher, "Fresher"],
  [EmployeeLevel.Junior, "Junior"],
  [EmployeeLevel.Intermediate, "Intermediate"],
  [EmployeeLevel.Senior, "Senior"],
  [EmployeeLevel.Lead, "Lead"],
  [EmployeeLevel.SeniorLead, "Senior lead"],
  [EmployeeLevel.Expert, "Expert"],
]);
export const RoleLabel = new Map<Role, string>([
  [Role.Admin, "Admin"],
  [Role.Staff, "Staff"],
  [Role.HR, "HR"],
]);
