import axiosInstance from "./axiosInstance";

export const listVideos = async (query = "") => {
  const res = await axiosInstance.get(`/videos${query ? `?q=${query}` : ""}`);
  return res.data;
};

export const getVideoById = async (id) => {
  const res = await axiosInstance.get(`/videos/${id}`);
  return res.data;
};

export const uploadVideo = async (formData) => {
  const res = await axiosInstance.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const likeVideo = async (id) => {
  const res = await axiosInstance.post(`/videos/${id}/like`);
  return res.data;
};

export const unlikeVideo = async (id) => {
  const res = await axiosInstance.post(`/videos/${id}/unlike`);
  return res.data;
};
