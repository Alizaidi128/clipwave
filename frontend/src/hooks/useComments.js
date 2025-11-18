import { useState, useEffect } from "react";
import { listComments, addComment } from "../api/commentApi";

export const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!videoId) return;
    setLoading(true);
    try {
      const data = await listComments(videoId);
      setComments(data);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async (text) => {
    const newComment = await addComment({ videoId, text });
    setComments((prev) => [newComment.comment, ...prev]);
    return newComment;
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return { comments, loading, fetchComments, postComment };
};
