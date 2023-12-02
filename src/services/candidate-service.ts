import { HOST, GET_ALL_CANDIDATES } from "../constants/contants";
import instance from "../constants/axios";

export const fetchCandidates = async (keyword?: string) => {
  try {
    return await instance.get(HOST + GET_ALL_CANDIDATES + keyword, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {}
};
