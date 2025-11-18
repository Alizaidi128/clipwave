import { useState, useEffect } from "react";
import { listVideos, getVideoById, uploadVideo, likeVideo, unlikeVideo } from "../api/videoApi";

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (query = "") => {
    setLoading(true);
    try {
      const data = await listVideos(query);
      setVideos(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoById = async (id) => {
    return await getVideoById(id);
  };

  const upload = async (formData) => {
    const data = await uploadVideo(formData);
    setVideos((prev) => [data.video, ...prev]);
    return data;
  };

  const like = async (id) => {
    return await likeVideo(id);
  };

  const unlike = async (id) => {
    return await unlikeVideo(id);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return { videos, loading, fetchVideos, fetchVideoById, upload, like, unlike };
};
