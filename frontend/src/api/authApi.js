import axiosInstance from "./axiosInstance";
import { saveToken, clearToken } from "../utils/storage";

export const register = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  if (res.data.token) saveToken(res.data.token);
  return res.data;
};

export const login = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  if (res.data.token) saveToken(res.data.token);
  return res.data;
};

export const getMe = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const setRole = async (role) => {
  const res = await axiosInstance.post("/auth/role", { role });
  return res.data;
};

export const logout = () => {
  clearToken();
};
