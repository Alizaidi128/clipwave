import { useEffect, useState } from "react";
import { getCounts, getRecent } from "../api/analyticsApi";
import { useAuth } from "../hooks/useAuth";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ videos: 0, comments: 0 });
  const [recent, setRecent] = useState({ recentVideos: [], recentComments: [] });

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      try {
        const c = await getCounts(user.id || user.sub);
        const r = await getRecent(user.id || user.sub);
        setCounts(c);
        setRecent(r);
      } catch {
        console.log("Error loading dashboard data");
      }
    };
    loadData();
  }, [user]);

  const sentimentBadge = (sentiment) => {
    if (!sentiment) return null;
    if (sentiment.sentiment === "positive")
      return <span className="px-2 py-1 text-xs font-semibold text-green-700 border border-green-300 rounded-full bg-green-50">Positive {Math.round(sentiment.confidenceScores.positive * 100)}%</span>;
    if (sentiment.sentiment === "negative")
      return <span className="px-2 py-1 text-xs font-semibold text-red-700 border border-red-300 rounded-full bg-red-50">Negative {Math.round(sentiment.confidenceScores.negative * 100)}%</span>;
    return <span className="px-2 py-1 text-xs font-semibold text-yellow-700 border border-yellow-300 rounded-full bg-yellow-50">Neutral {Math.round(sentiment.confidenceScores.neutral * 100)}%</span>;
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 p-6">
      <h1 className="text-3xl font-extrabold mb-8">Creator Dashboard</h1>

      <div className="flex gap-6 mb-10">
        <div className="flex-1 bg-white rounded-xl p-6 text-center shadow-md">
          <p className="text-sm text-gray-500">Videos</p>
          <p className="text-4xl font-bold text-red-600">{counts.videos}</p>
        </div>
        <div className="flex-1 bg-white rounded-xl p-6 text-center shadow-md">
          <p className="text-sm text-gray-500">Comments</p>
          <p className="text-4xl font-bold text-pink-600">{counts.comments}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>
          {recent.recentVideos.length === 0 ? (
            <p className="text-gray-500">No uploads yet.</p>
          ) : (
            <ul className="space-y-3">
              {recent.recentVideos.map((v) => (
                <li key={v.id} className="bg-gray-100 rounded-lg p-3">
                  <p className="font-semibold text-gray-900">{v.title}</p>
                  <p className="text-xs text-gray-600">{v.genre}</p>
                  <p className="text-xs text-gray-500">{formatDate(v.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Recent Comments</h2>
          {recent.recentComments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <ul className="space-y-3">
              {recent.recentComments.map((c) => {
                const video = recent.recentVideos.find((v) => v.id === c.videoId);
                return (
                  <li key={c.id} className="bg-gray-100 rounded-lg p-3 space-y-1">
                    <p className="text-sm text-gray-800">💬 {c.text || "(no text)"}</p>
                    <p className="text-xs text-gray-600">
                      On <span className="font-semibold">{video ? video.title : "Unknown"}</span>
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(c.createdAt)}</p>
                    {sentimentBadge(c.sentiment)}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
