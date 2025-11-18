import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import LikeButton from "./LikeButton";
import CommentModal from "./CommentModal";
import { useAuth } from "../hooks/useAuth";
import { getVideoById, likeVideo, unlikeVideo } from "../api/videoApi";

const VideoCard = ({ video }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const fresh = await getVideoById(video.id);
          setLiked(fresh.likedByCurrentUser || false);
        } catch {
          setLiked(false);
        }
      } else {
        const guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "[]");
        setLiked(guestLikes.includes(video.id));
      }
    };
    load();
  }, [user, video.id]);

  const handleLike = async () => {
    if (user) {
      try {
        if (liked) {
          await unlikeVideo(video.id);
        } else {
          await likeVideo(video.id);
        }
        setLiked(!liked);
      } catch (err) {
        console.error("Like toggle failed", err);
      }
    } else {
      let guestLikes = JSON.parse(localStorage.getItem("guestLikes") || "[]");
      if (liked) {
        guestLikes = guestLikes.filter((id) => id !== video.id);
      } else {
        guestLikes.push(video.id);
      }
      localStorage.setItem("guestLikes", JSON.stringify(guestLikes));
      setLiked(!liked);
    }
  };

  return (
    <div className="relative h-screen w-full snap-start flex items-center justify-center">
      <VideoPlayer src={video.blob.readSas || video.blob.url} />

      <div className="absolute bottom-40 left-4 text-black bg-white/80 px-3 py-2 rounded-lg shadow-md">
        <p className="font-bold">{video.title}</p>
        <p className="text-sm text-gray-700">@{video.publisher || "Unknown"}</p>
      </div>

      <div className="absolute right-4 bottom-40 flex flex-col items-center space-y-5 text-black">
        <LikeButton liked={liked} onToggle={handleLike} />
        <button onClick={() => setShowComments(true)} className="flex flex-col items-center">
          <span className="text-2xl">💬</span>
        </button>
      </div>

      {showComments && <CommentModal videoId={video.id} onClose={() => setShowComments(false)} />}
    </div>
  );
};

export default VideoCard;
