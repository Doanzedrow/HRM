import { createContext } from "react";
import { Employee } from "../models/employee";
import { AuthRes } from "../models/auth";

interface AppContextType {
  employee: AuthRes | null;
  setEmployee: React.Dispatch<React.SetStateAction<AuthRes | null>>;
}
const initialEmployee: AuthRes = {
  email: "",
  accessToken: "",
  refreshToken: "",
  fullName: "",
  userId: "",
};

export const AppContext = createContext<AppContextType>({
  employee: initialEmployee,
  setEmployee: () => {},
});
