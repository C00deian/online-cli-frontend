// hooks/useStopInstance.js
import axios from "axios";
import axiosInstance from "../services/axiosInstance";

export const useStopInstance = () => {

  const stopInstance = async (data) => {
    try {
      const res = await axiosInstance.post("/instance/stop", data)
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  return { stopInstance };
};
