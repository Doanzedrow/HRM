export interface CheckInRecord {
  id?: string;
  fullName?: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  goInTime?: string;
  goOutTime?: string;
  employeeId: string | undefined;
  minutesLate?: number;
  hoursOutside?: number;
  hoursWorking?: number;
}
