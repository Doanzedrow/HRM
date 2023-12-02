import axios from "axios";
import { HOST, GET_ALL_POSITION, ADD_POSITION, UPDATE_POSITION,SEARCH_POSITION,DELETE_POSITION } from "../constants/contants";
import { Position } from "../models/position";
import instance from "../constants/axios";
export const fetchPositions = async () => {
  try {
    const response = await instance.get(HOST + GET_ALL_POSITION, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {

  }
};

export const getPosition = async (keyword: string) => {
  try {
    const result = await instance.get(HOST + SEARCH_POSITION + keyword, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return result.data;
  } catch (error) {}
};

export const addPosition = async (position: Position) => {
  try {
    const response = await instance.post(HOST + ADD_POSITION, position, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {}
};

export const updatePosition = async (
  id: string,
  position: Position
) => {
  try {
    const response = await instance.put(
      HOST + UPDATE_POSITION + id,
      position,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {}
};

export const deletePosition = async (id: string) => {
  try {
    return await instance.delete(HOST + DELETE_POSITION + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};
