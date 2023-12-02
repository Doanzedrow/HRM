export const HOST = "https://localhost:7146";

//Auth
export const LOGIN = "/api/Authentication/login";
export const LOGOUT = "/api/Authentication/logout";
export const CHANGE_PASSWORD = "/api/Authentication/change-password";
//Department
export const GET_ALL_DEPARTMENT = "/api/Department/get-all-department";
export const ADD_DEPARTMENT = "/api/Department/add-department";
export const DELETE_DEPARTMENT = "/api/Department/delete-department/";
export const UPDATE_DEPARTMENT = "/api/Department/update-department/";
//Recruitment
export const GET_ALL_RECRUITMENT =
  "/api/Recruitment/get-all-recruitment?keyword=";
export const ADD_RECRUITMENT = "/api/Recruitment/add-recruitment";
export const DELETE_RECRUITMENT = "/api/Recruitme nt/delete-recruitment/";
export const UPDATE_RECRUITMENT = "/api/Recruitment/update-recruitment/";
export const GET_RECRUITMENT = "/api/Recruitment/get-recruitment/";
//Position
export const GET_ALL_POSITION = "/api/Position/get-all-positions";
export const ADD_POSITION = "/api/Position/add-position";
export const DELETE_POSITION = "/api/Position/delete-position/";
export const UPDATE_POSITION = "/api/Position/update-position/";
export const SEARCH_POSITION = "/api/Position/search-positions?name=?";
// Absence
export const GET_ALL_ABSENCES = "/api/Absence/get-all-absences?keyword=";
export const GET_ALL_ABSENCE_BY_ID = "/api/Absence/get-all-absence-by-id/";
export const BOOKING_ABSENCE = "/api/Absence/booking-absence/";
export const REMOVE_ABSENCE = "/api/Absence/remove-absence/";
//HolidayConfig
export const GET_ALL_HOLIDAY_CONFIG = "/api/HolidayConfig/get-all-holiday";
export const ADD_HOLIDAY_CONFIG = "/api/HolidayConfig/add-holiday-config";
//ApplicationForm
export const ADD_APPLICATION = "/api/ApplicationForm/add-application";
//Candidate
export const GET_ALL_CANDIDATES = "/api/Candidate/get-all-candidates?keyword=";
//Responsive
export const RESPONSIVE_FOR_TABLE = {
  x: 60,
};

//ApplicationUSer
export const GET_ALL_PAGING_EMPLOYEE =
  "/api/ApplicationUser/get-all-paging-employee";
export const GET_ALL_EMPLOYEE = "/api/ApplicationUser/get-all-employee";
export const ADD_EMPLOYEE = "/api/Authentication/registeration";
export const DELETE_EMPLOYEE = "/api/ApplicationUser/delete-applicationUser/";
export const GET_EMPLOYEE = "/api/ApplicationUser/get-employee/";
export const GET_EMPLOYEESTATUS = "/api/ApplicationUser/get-employee-status";
export const UPDATE_EMPLOYEE = "/api/ApplicationUser/update-employee/";
export const IMAGE_URL_AVATAR = HOST + "/assets/avatars/";

//CheckInRecord
export const GET_ALL_PAGING_CHECKIN =
  "/api/CheckInRecord/get-all-paging-check-in";
export const GET_CHECKIN_BY_ID = "/api/CheckInRecord/get-check-in-byId/";
export const GET_CHECKIN_BY_USERID = "/api/CheckInRecord/get-check-in-byUserid";
export const GET_CHECKIN_BY_DATE = "/api/CheckInRecord/get-check-in/";
export const CHECK_IN = "/api/CheckInRecord/check-in";
export const CHECK_OUT = "/api/CheckInRecord/check-out";
export const GO_OUT = "/api/CheckInRecord/go-out";
export const GO_IN = "/api/CheckInRecord/go-in";

//Payroll
export const GET_ALL_PAGING_PAYROLL = "/api/Payroll/get-all-paging-payroll";
export const ADD_PAYROLL = "/api/Payroll/add-payroll";
