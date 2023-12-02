import {
  HOST,
  GET_ALL_DEPARTMENT,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "../constants/contants";
import { Department } from "../models/department";
import instance from "../constants/axios";

export const fetchDepartments = async (keyword?: string) => {
  try {
    const result =  await instance.get(HOST + GET_ALL_DEPARTMENT, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching data from API", error);
    throw error;
  }
};

export const addDepartment = async (model: Department) => {
  const result = await instance.post(HOST + ADD_DEPARTMENT, model, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  return result.data;
};

export const deleteDepartment = async (id: string) => {
  return await instance.delete(HOST + DELETE_DEPARTMENT + id, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

export const updateDepartment = async (id: string, department:Department) => {
  const result = await instance.put(HOST + UPDATE_DEPARTMENT + id, department, {
    headers:{
     Authorization: "Bearer " + localStorage.getItem("token"),
    }
   });
  return result.data;
};