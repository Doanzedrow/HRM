import { HOST, ADD_APPLICATION } from "../constants/contants";
import { Application } from "../models/application_form";
import instance from "../constants/axios";

export const addApplication = async (
  application: Application
) => {
  try {
    const response = await instance.post(
      HOST + ADD_APPLICATION , application,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
      return response.data;
    
  } catch (error) {
    
  }
};
