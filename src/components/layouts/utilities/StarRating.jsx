import { Typography } from "@material-tailwind/react";
import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

export default function StarRating({
  maxstars = 5,
  initialRating = 0,
  onRate,
  size = 24,
  color = "#fbbf24",
  message = ["Terrible", "Bad", "Good", "Amazing", "Excellent"],
  showMessage = true,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  //handle rating function
  function handleRating(newRating) {
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  }

  const textStyle = {
    lineHeight: "1",
    color,
    margin: "0",
    fontSize: `${size / 1.6}px`,
  };

  // Dynamic color based on rating
  const getMessageColor = (rating) => {
    const colors = {
      1: "#ef4444", // red
      2: "#f97316", // orange
      3: "#eab308", // yellow
      4: "#84cc16", // lime
      5: "#22c55e", // green
    };
    return colors[rating] || "#6b7280";
  };
  //get current message base on over or rating
  const currentRating = hover || rating;

  //get currentMessage base on length of the message
  const currentMessage = currentRating > 0 ? message[currentRating - 1] : "";
  const messageStyle = {
    display: "inline-block",
    fontSize: `${size / 1.3}px`,
    fontWeight: "700",
    color: getMessageColor(currentRating),
    marginTop: "8px",
    padding: "6px 16px",
    background: `${getMessageColor(currentRating)}15`,
    borderRadius: "20px",
    border: `2px solid ${getMessageColor(currentRating)}30`,
    transition: "all 0.3s ease",
    letterSpacing: "0.5px",
    textTransform: "capitalize",
  };
  return (
    <div style={containerStyle}>
      {Array.from({ length: maxstars }).map((_, i) => (
        <Star
          key={i}
          full={hover ? hover >= i + 1 : rating >= i + 1}
          onHoverIn={() => setHover(i + 1)}
          onHoverOut={() => setHover(0)}
          onRate={() => handleRating(i + 1)}
          color={color}
          size={size}
        />
      ))}
      <Typography variant="small" style={textStyle}>
        {currentMessage || 0}
      </Typography>

      {/* showlogue message l */}

      {showMessage && currentMessage && (
        <Typography style={messageStyle}>{currentMessage}</Typography>
      )}
    </div>
  );
}

function Star({ full, size, color, onRate, onHoverIn, onHoverOut }) {
  const starContainer = {
    height: `${size}px`,
    width: `${size}px`,
    color,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      style={starContainer}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      )}
    </span>
  );
}
