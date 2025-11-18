import { useState } from "react";
import { uploadVideo } from "../api/videoApi";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("General");
  const [ageRating, setAgeRating] = useState("PG");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("ageRating", ageRating);
    setLoading(true);

    try {
      await uploadVideo(formData);
      setSuccess(true);
      setFile(null);
      setTitle("");
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg w-full max-w-lg space-y-5"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Upload Your Video</h2>
          <p className="text-gray-500 text-sm mt-1">Share your creativity with the world</p>
        </div>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm text-center">
            ✅ Video uploaded successfully!{" "}
            <Link to="/" className="text-green-800 font-semibold hover:underline">
              Go to Home
            </Link>
          </div>
        )}

        <input
          type="text"
          placeholder="Video Title"
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>General</option>
          <option>Music</option>
          <option>Comedy</option>
          <option>Sports</option>
        </select>

        <select
          className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-sm focus:ring-2 focus:ring-green-500 outline-none"
          value={ageRating}
          onChange={(e) => setAgeRating(e.target.value)}
        >
          <option>PG</option>
          <option>18+</option>
        </select>

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-green-500 transition rounded-xl p-6 cursor-pointer bg-gray-50">
          <span className="text-gray-500 text-sm mb-2">
            {file ? `Selected: ${file.name}` : "Click to select or drag and drop video"}
          </span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
