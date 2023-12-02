export interface Payroll {
  id?: string;
  fullName?: string;
  date: Date;
  employeeId?: string | undefined;
  minutesLate?: number;
  hoursWorking?: number;
  total?: number;
  salary?: number;
}
