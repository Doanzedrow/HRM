import {
  HOST,
  GET_ALL_ABSENCES,
  GET_ALL_ABSENCE_BY_ID,
  BOOKING_ABSENCE,
  REMOVE_ABSENCE,
} from "../constants/contants";
import { Absence } from "../models/absence";
import instance from "../constants/axios";
import { message } from "antd";

export const fetchAbsences = async (keyword: string) => {
  try {
    return await instance.get(HOST + GET_ALL_ABSENCES + keyword, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};

export const fetchAbsenceById = async (id: number) => {
  try {
    return await instance.get(HOST + GET_ALL_ABSENCE_BY_ID + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};

export const bookingAbsence = async (absence: Absence) => {
  try {
    const response = await instance.post(HOST + BOOKING_ABSENCE, absence, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    return null;
  }
};

export const removeAbsence = async (id: number) => {
  try {
    const response = await instance.delete(HOST + REMOVE_ABSENCE + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    return null;
  }
};
