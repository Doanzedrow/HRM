import { EmployeeCategory } from "./employee";
export interface Recruitment {
  id?: string;
  jobDescription: string;
  salaryMin: number;
  salaryMax: number;
  category?: EmployeeCategory | null;
  positionName?: string;
  employeeName?: string;
  positionId: string;
  applicationUserId: string | undefined;
  version?: number;
}
