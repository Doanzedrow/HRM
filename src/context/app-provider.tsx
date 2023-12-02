import React, { useState, useEffect } from "react";
import { AppContext } from "./app-context";
import { Employee } from "../models/employee";
import { AuthRes } from "../models/auth";

interface Props {
  children: React.ReactNode;
}
const AppProvider: React.FC<Props> = ({ children }) => {
  const [employee, setEmployee] = useState<AuthRes | null>(null);
  useEffect(() => {
    const storedUserJSON = localStorage.getItem("user");
    if (storedUserJSON) {
      const storedUser = JSON.parse(storedUserJSON) as AuthRes;
      setEmployee(storedUser);
    }
  }, []);
  return (
    <AppContext.Provider value={{ employee, setEmployee }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
