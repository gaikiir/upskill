import { useState } from "react";

export default function HeartIcon({
  filled,
  id,
  onClick,
  size = "w-5 h-5",
  colors = {
    filled: "#ef4444", // Red when filled
    unfilled: "#6b7280", // Gray when unfilled
    hover: "#f87171", // Light red on hover
  },
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    if (onClick && id) {
      onClick(id);
    }
  };

  return (
    <button
      aria-label={filled ? "Remove from favorites" : "Add to favorites"}
      onClick={handleClick}
      className={`
        p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
        hover:scale-110 transition-all duration-200
        ${isAnimating ? "animate-ping-once" : ""}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`
          ${size} 
          transition-all duration-300 ease-in-out
          ${isAnimating ? "scale-125" : "scale-100"}
        `}
        fill={filled ? colors.filled : "none"}
        stroke={filled ? colors.filled : colors.unfilled}
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Pulse effect on click */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping"></span>
      )}
    </button>
  );
}


