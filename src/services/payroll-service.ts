import axios from "axios";
import {
  HOST,
  GET_ALL_PAGING_PAYROLL,
  ADD_PAYROLL,
} from "../constants/contants";
import { Payroll } from "../models/payroll";
import instance from "../constants/axios";

export const fetchAllPayroll = async (
  setSuccessMessage: Function,
  keyword?: string,
  page?: number,
  pageSize?: number,
  mounth?: number,
  year?: number,
  direction?: string
) => {
  try {
    const response = await instance.get(HOST + GET_ALL_PAGING_PAYROLL, {
      params: { keyword, page, pageSize, mounth, year },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const message = response.data.message;
    if (response.status === 200) {
      setSuccessMessage(message);
      return response.data;
    } else {
      throw new Error("Unexpected status: " + response.status);
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
};

export const addPayroll = async (
  model: Payroll,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    debugger;
    const response = await instance.post(HOST + ADD_PAYROLL, model, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const message = response.data.message;
    if (response.status === 200) {
      setSuccessMessage(message);
      return response.data;
    } else {
      throw new Error("Unexpected status: " + response.status);
    }
  } catch (error: any) {
    console.error(error);
    if (error.response.data && error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      throw error;
    }
  }
};
