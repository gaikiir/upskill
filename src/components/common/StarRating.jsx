import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

export default function StarRating({
  maxStars = 5, // Renamed for clarity
  initialRating = 0,
  onRate,
  size = 24,
  color = "#fbbf24",
  message = ["Terrible", "Bad", "Good", "Amazing", "Excellent"],
  showMessage = true,
  readOnly = false, // New: For list view, disable interaction
  allowFractional = false, // New: Support partial stars for averages
  showNumeric = false, // Show numeric rating value
  ratingCount = null, // Show review count
  className = "", // Additional className
}) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  // Sync rating with initialRating prop changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);
  //handle rating function
  function handleRating(newRating) {
    //prevent changes in read only
    if (readOnly) return;
    // set rating
    setRating(newRating);
    if (onRate) {
      onRate(newRating);
    }
  }

  

  // Dynamic color based on rating
  const getMessageColor = (rating) => {
    const colors = {
      1: "#ef4444",
      2: "#f97316",
      3: "#eab308",
      4: "#84cc16",
      5: "#22c55e",
    };
    return colors[Math.round(rating)] || "#6b7280"; // Round for color
  };
  //get current message base on over or rating
  const currentRating = hover || rating;

  //get currentMessage base on length of the message
  const currentMessage =
    currentRating > 0 ? message[Math.floor(currentRating) - 1] : "";

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

  // Calculate fill percentage for fractional stars
  const getFillPercentage = (index) => {
    if (!allowFractional) return null;
    const starValue = index + 1;
    if (rating >= starValue) return 100;
    if (rating > index && rating < starValue) {
      const fill = (rating - index) * 100;
      return Math.max(0, Math.min(100, fill));
    }
    return 0;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div style={containerStyle} className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: maxStars }).map((_, i) => {
            const starValue = i + 1;
            const isFull = hover ? hover >= starValue : rating >= starValue;
            const fillPct = getFillPercentage(i);
            
            return (
              <Star
                key={i}
                full={isFull}
                fillPercentage={fillPct}
                onHoverIn={() => !readOnly && setHover(starValue)}
                onHoverOut={() => !readOnly && setHover(0)}
                onRate={() => handleRating(starValue)}
                color={color}
                size={size}
                readOnly={readOnly}
              />
            );
          })}
        </div>
        
        {/* Numeric rating and count */}
        <div className="flex items-center gap-2">
          {showNumeric && (
            <Typography 
              variant="small" 
              className="font-semibold text-gray-700"
              style={{ fontSize: `${size / 1.4}px` }}
            >
              {rating > 0 ? rating.toFixed(1) : "0.0"}
            </Typography>
          )}
          {ratingCount !== null && ratingCount !== undefined && (
            <Typography 
              variant="small" 
              className="text-gray-500"
              style={{ fontSize: `${size / 1.6}px` }}
            >
              ({ratingCount} {ratingCount === 1 ? "review" : "reviews"})
            </Typography>
          )}
        </div>
      </div>
      
      {/* Message display */}
      {showMessage && currentMessage && (
        <Typography style={messageStyle}>{currentMessage}</Typography>
      )}
    </div>
  );
}

function Star({
  full,
  fillPercentage,
  size,
  color,
  onRate,
  onHoverIn,
  onHoverOut,
  readOnly,
}) {
  const starContainer = {
    height: `${size}px`,
    width: `${size}px`,
    color,
    display: "block",
    cursor: readOnly ? "default" : "pointer",
    position: "relative",
  };

  const partialStyle =
    fillPercentage !== null && fillPercentage > 0 && fillPercentage < 100
      ? { 
          clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
          width: "100%",
          height: "100%"
        }
      : {};

  return (
    <span
      role="button"
      onClick={!readOnly ? onRate : undefined}
      onMouseEnter={!readOnly ? onHoverIn : undefined}
      onMouseLeave={!readOnly ? onHoverOut : undefined}
      style={starContainer}
    >
      {/* Empty star background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        />
      </svg>
      {/* Full or partial fill */}
      {(full || (fillPercentage !== null && fillPercentage > 0)) && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={color}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={color}
          style={{ 
            ...partialStyle, 
            position: "absolute", 
            top: 0, 
            left: 0,
            width: "100%",
            height: "100%"
          }}
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