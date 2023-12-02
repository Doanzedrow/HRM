import axios from "axios";
import {
  HOST,
  GET_ALL_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_ALL_PAGING_EMPLOYEE,
  GET_EMPLOYEESTATUS,
} from "../constants/contants";
import { Employee } from "../models/employee";
import instance from "../constants/axios";
export const fetchApplication = async (
  setSuccessMessage: Function,
  keyword?: string,
  page?: number,
  pageSize?: number,
  direction?: string
) => {
  try {
    const response = await instance.get(HOST + GET_ALL_PAGING_EMPLOYEE, {
      params: { keyword, page, pageSize },
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
export const getAllEmployee = async (setSuccessMessage: Function) => {
  try {
    return await instance.get(HOST + GET_ALL_EMPLOYEE, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
    // console.error("Login Error:", error);
  }
};

export const getEmployeeStatus = async (
  keyword: string,
  page?: number,
  pageSize?: number
) => {
  try {
    const response = await instance.get(HOST + GET_EMPLOYEESTATUS, {
      params: { keyword, page, pageSize },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    throw error;
  }
};

export const getEmployee = async (
  id: string,
  setSuccessMessage: Function,
  setErrorMessage: Function
) => {
  try {
    const response = await instance.get(HOST + GET_EMPLOYEE + id, {
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
    if (error.response && error.response.status === 404) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const addEmployee = async (
  model: Employee,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    const response = await instance.post(HOST + ADD_EMPLOYEE, model, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
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
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data);
      throw error;
    } else {
      throw error;
    }
  }
};
export const updateEmployee = async (
  id: string,
  employee: Employee,
  setSuccessMessageUpdate: Function,
  setErrorMessage: Function
) => {
  try {
    const response = await instance.put(HOST + UPDATE_EMPLOYEE + id, employee, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    const message = response.data.message;
    if (response.status === 200) {
      setSuccessMessageUpdate(message);
      return response.data;
    } else {
      throw new Error("Unexpected status: " + response.status);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      throw error;
    } else {
      throw error;
    }
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    return await instance.delete(HOST + DELETE_EMPLOYEE + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};
