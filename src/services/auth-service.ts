import axios from "axios";
import { CHANGE_PASSWORD, HOST, LOGIN } from "../constants/contants";
import { AuthReq, ChangePasswordReq } from "../models/auth";
import instance from "../constants/axios";
export const Auth = async (auth: AuthReq) => {
  try {
    const result = await instance.post(HOST + LOGIN, auth);
    return result.data;
  } catch (error) {}
};

export const changePassword = async (model: ChangePasswordReq) => {
  try {
    const result = await instance.post(HOST + CHANGE_PASSWORD, model);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    return null;
  }
};
