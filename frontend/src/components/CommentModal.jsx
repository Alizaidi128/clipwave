import { useState } from "react";
import { useComments } from "../hooks/useComments";
import { useAuth } from "../hooks/useAuth";

const CommentModal = ({ videoId, onClose }) => {
  const { comments, postComment } = useComments(videoId);
  const { user } = useAuth();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await postComment(text);
    setText("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-end z-50">
      <div className="w-full max-h-[75%] bg-white rounded-t-3xl overflow-hidden flex flex-col shadow-2xl">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 tracking-wide">Comments</h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-gray-100 rounded-xl px-3 py-2 text-sm text-gray-900 shadow-sm"
              >
                <span className="font-semibold text-red-500">{c.userEmail || "User"}</span>
                <p className="mt-1">{c.text}</p>
                {c.sentiment?.sentiment && (
                  <span className="block mt-1 text-xs text-gray-500 italic">
                    {c.sentiment.sentiment}
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        {user && (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-gray-50"
          >
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 text-gray-900 text-sm rounded-full px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-full text-sm font-medium text-white transition"
            >
              Post
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
