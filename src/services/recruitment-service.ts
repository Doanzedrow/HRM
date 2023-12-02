import {
  HOST,
  GET_ALL_RECRUITMENT,
  DELETE_RECRUITMENT,
  ADD_RECRUITMENT,
  UPDATE_RECRUITMENT,
  GET_RECRUITMENT,
} from "../constants/contants";
import { Recruitment } from "../models/recruitment";
import instance from "../constants/axios";

export const fetchRecruitments = async (keyword?: string) => {
  try {
    return await instance.get(HOST + GET_ALL_RECRUITMENT + keyword, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    
  } catch (error) {}
};

export const getRecruitment = async (id: string) => {
  try {
    const result = await instance.get(HOST + GET_RECRUITMENT + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {}
};

export const addRecruitment = async (recruitment: Recruitment) => {
  try {
    const response = await instance.post(HOST + ADD_RECRUITMENT, recruitment, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {}
};

export const updateRecruitment = async (
  id: string,
  recruitment: Recruitment
) => {
  try {
    const response = await instance.put(
      HOST + UPDATE_RECRUITMENT + id,
      recruitment,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return null;
  }
};

export const deleteRecruitment = async (id: string) => {
  try {
    return await instance.delete(HOST + DELETE_RECRUITMENT + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};
