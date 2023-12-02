import axios from "axios";
import {
  HOST,
  GET_ALL_PAGING_CHECKIN,
  GET_CHECKIN_BY_ID,
  GET_CHECKIN_BY_USERID,
  GET_CHECKIN_BY_DATE,
  CHECK_IN,
  CHECK_OUT,
  GO_OUT,
  GO_IN,
} from "../constants/contants";
import { CheckInRecord } from "../models/check-in-record";
import instance from "../constants/axios";

export const fetchCheckInTime = async (
  setSuccessMessage: Function,
  keyword?: string,
  page?: number,
  pageSize?: number,
  direction?: string
) => {
  try {
    const response = await instance.get(HOST + GET_ALL_PAGING_CHECKIN, {
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

export const fetchCheckInTimeByUserId = async (
  userId?: string,
  page?: number,
  pageSize?: number,
  direction?: string
) => {
  try {
    const response = await instance.get(HOST + GET_CHECKIN_BY_USERID, {
      params: { userId, page, pageSize },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected status: " + response.status);
    }
  } catch (error) {
    console.error("Login Error:", error);
  }
};

export const getCheckInTimeByDate = async (
  setWarnMessage: Function,
  date?: string,
  employeeId?: string
) => {
  try {
    const response = await instance.get(HOST + GET_CHECKIN_BY_DATE, {
      params: { date, employeeId },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Unexpected status: " + response.status);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      setWarnMessage(error.response.data.message);
    }
  }
};

export const checkIn = async (
  model: CheckInRecord,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    const response = await instance.post(HOST + CHECK_IN, model, {
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
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      throw error;
    }
  }
};

export const checkOut = async (
  model: CheckInRecord,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    const response = await instance.post(HOST + CHECK_OUT, model, {
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
    console.error(error.response.data.message);
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      throw error;
    }
  }
};

export const goOut = async (
  model: CheckInRecord,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    const response = await instance.post(HOST + GO_OUT, model, {
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
    console.error(error.response.data.message);
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      throw error;
    }
  }
};

export const goIn = async (
  model: CheckInRecord,
  setErrorMessage: Function,
  setSuccessMessage: Function
) => {
  try {
    const response = await instance.post(HOST + GO_IN, model, {
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
    console.error(error.response.data.message);
    if (error.response && error.response.status === 400) {
      setErrorMessage(error.response.data.message);
      throw error;
    }
  }
};
