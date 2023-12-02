import { message } from "antd";
import axios from "axios";
import { stat } from "fs";
import useCookies from "react-cookie/es6/useCookies";

const instance = axios.create({
  baseURL: "https://localhost:7146/api",
});

export const useApi = () => {
  const [cookies] = useCookies(["jwt"]);
  instance.interceptors.request.use((config) => {
    const token = cookies.jwt;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.jwt}`;
    }
    return config;
  });

  return instance;
};
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        message.error(error.response.data);
      } //else if (status === 401) {
      //     message.error("You don't have permission !");
      //     window.location.href = "/login";
      //   } else if (status === 409) {
      //     message.error("Conflict");
      //   } else if (status === 500) {
      //     message.error(error.response.data);
      //   }
      //   //message.error(error.response.data.message);
      // } else if (error.request) {
      //   console.error("No response from server:", error.request);
      // } else {
      //   console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  }
);
export default instance;
