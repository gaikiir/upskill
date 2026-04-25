// Arrow icon components
function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5 z-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-5 h-5 z-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
// Carousel slide with entrance animation
// Arrow button shared style
export function ArrowButton({ onClick, direction }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="
        absolute top-1/2 -translate-y-1/2
        z-50 flex items-center justify-center
        w-11 h-11 rounded-full
        text-white
        border border-white/20
        backdrop-blur-sm
        transition-all duration-200
        hover:scale-110 hover:bg-white/30
        active:scale-95
      "
      style={{
        background: "rgba(0, 0, 0, 0.35)",
        [direction === "prev" ? "left" : "right"]: "1.25rem",
      }}
    >
      {direction === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}
