import axiosInstance from "./axiosInstance";

export const getCounts = async (userId) => {
  const res = await axiosInstance.get(`/analytics/counts?userId=${userId}`);
  return res.data;
};

export const getRecent = async (userId) => {
  const res = await axiosInstance.get(`/analytics/recent?userId=${userId}`);
  return res.data;
};

export const healthCheck = async () => {
  const res = await axiosInstance.get("/analytics/health");
  return res.data;
};
