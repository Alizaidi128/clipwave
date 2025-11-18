import { useVideos } from "../hooks/useVideos";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const { videos, loading } = useVideos();

  if (loading) return <div className="text-center mt-10 text-gray-900">Loading videos...</div>;

  return (
    <div className="bg-white h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No videos found.</p>
      ) : (
        videos.map((video) => <VideoCard key={video.id} video={video} />)
      )}
    </div>
  );
};

export default Home;
