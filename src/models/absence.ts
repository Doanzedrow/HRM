export interface Absence {
  id?: number;
  leaveType: LeaveType;
  type: number;
  fromDateSingle?: string;
  shiftTypeSingle?: ShiftType | null;
  fromDateMulti?: string;
  shiftTypeFromDateMulti?: ShiftType | null;
  toDateMulti?: string;
  shiftTypeToDateMulti?: ShiftType | null;
  reason?: string;
  applicationUserId: string | undefined;
  employeeName?: string;
  hourDeducted?: number;
}
export enum ShiftType {
  Morning = 0,
  Afternoon = 1,
  AllDay = 2,
}
export enum LeaveType {
  AnnualLeave = 0,
  WeddingLeave = 1,
  CompassionateLeave = 2,
  LeaveWithoutPay = 3,
  MaternityLeave = 4,
  PaternityLeave = 5,
  OneMoreChild = 6,
  AdoptionLeave = 7,
  SickLeave = 8,
  ChildSickLeaveUnder3YearsOld = 9,
  ChildSickLeaveUnder7YearsOld = 10,
}
export const AbsenceShiftTypeLabel = new Map<ShiftType, string>([
  [ShiftType.Morning, "Morning"],
  [ShiftType.Afternoon, "Afternoon"],
  [ShiftType.AllDay, "All day"],
]);
export const LeaveTypeLabel = new Map<LeaveType, string>([
  [LeaveType.AnnualLeave, "Annual leave"],
  [LeaveType.WeddingLeave, "Wedding leave"],
  [LeaveType.CompassionateLeave, "Compassionate leave"],
  [LeaveType.LeaveWithoutPay, "Leave without pay"],
  [LeaveType.MaternityLeave, "Maternity leave"],
  [LeaveType.PaternityLeave, "Paternity leave"],
  [LeaveType.OneMoreChild, "One more child"],
  [LeaveType.AdoptionLeave, "Adoption leave"],
  [LeaveType.SickLeave, "Sick leave"],
  [
    LeaveType.ChildSickLeaveUnder3YearsOld,
    "Child sick leave under 3 years old",
  ],
  [
    LeaveType.ChildSickLeaveUnder7YearsOld,
    "Child sick leave under 7 years old",
  ],
]);
