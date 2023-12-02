import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/authenticate/login";
import ForgotPassword from "./components/authenticate/forgot-password";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DepartmentList from "./components/department/department-list";
import RecruitmentList from "./components/recruitment/recruitment-list";
import AppProvider from "./context/app-provider";
import RecruitmentDetail from "./components/recruitment/recruitment-detail";
import HolidayConfig from "./components/holiday/holiday-config";
import EmployeeList from "./components/Employee/employee-list";
import EmployeeDetail from "./components/Employee/employee-detail";
import Home from "./components/Home/home";
import AbsenceList from "./components/absence/absence-list";
import PositionList from "./components/position/position-list";
import ApplicationForm from "./components/application/application-form";
import NotFound from "./components/Not found/404";
import ViolatingList from "./components/violating/violating-list";
import CandidateList from "./components/candidate/candidate-list";
import PayrollList from "./components/payroll/payroll-list";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <AppProvider>
      <BrowserRouter>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/department-list" element={<DepartmentList />} />
            <Route path="/recruitment-list" element={<RecruitmentList />} />
            <Route path="/candidate-list" element={<CandidateList />} />
            <Route
              path="/position-list"
              element={<PositionList></PositionList>}
            />
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/violating-list" element={<ViolatingList />} />
            <Route path="/payroll-list" element={<PayrollList />} />

            <Route
              path="/position-list"
              element={<PositionList></PositionList>}
            />
            <Route path="/application-form" element={<ApplicationForm />} />
            <Route
              path="/recruitment-detail/:id"
              element={<RecruitmentDetail />}
            />
            <Route path="/holiday-config" element={<HolidayConfig />} />
            <Route path="/employee-detail/:id" element={<EmployeeDetail />} />
            <Route path="/absence-list" element={<AbsenceList />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </React.StrictMode>
      </BrowserRouter>
    </AppProvider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
