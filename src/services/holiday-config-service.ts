import {
  HOST,
  GET_ALL_HOLIDAY_CONFIG,
  ADD_HOLIDAY_CONFIG,
} from "../constants/contants";
import instance from "../constants/axios";
import { HolidayConfigModel } from "../models/holiday-config";

export const fetchHolidayConfig = async () => {
  try {
    return await instance.get(HOST + GET_ALL_HOLIDAY_CONFIG, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    throw err;
  }
};

export const addHolidayConfig = async (model: HolidayConfigModel) => {
  const result = await instance.post(HOST + ADD_HOLIDAY_CONFIG, model, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
  });
  return result.data;
};
