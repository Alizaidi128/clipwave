const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.length === 0 && (
        <p className="text-gray-400">No comments yet. Be the first!</p>
      )}
      {comments.map((c) => (
        <div key={c.id} className="text-gray-200 mb-2">
          <p className="text-sm">
            <span className="font-bold">{c.userEmail || "User"}</span>: {c.text}
          </p>
          {c.sentiment && (
            <span className="text-xs text-gray-400">{c.sentiment.sentiment}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
