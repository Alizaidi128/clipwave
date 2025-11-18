const LikeButton = ({ liked, onToggle }) => {
  return (
    <button onClick={onToggle} className="flex flex-col items-center">
      <span className="text-2xl">
        {liked ? "❤️" : "🤍"}
      </span>
    </button>
  );
};

export default LikeButton;
