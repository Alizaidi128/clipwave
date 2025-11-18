import axiosInstance from "./axiosInstance";

export const listComments = async (videoId) => {
  const res = await axiosInstance.get(`/comments/${videoId}`);
  return res.data;
};

export const addComment = async (data) => {
  const res = await axiosInstance.post("/comments", data);
  return res.data;
};
