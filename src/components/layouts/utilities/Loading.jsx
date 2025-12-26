export default function IsLoading({
  message = "loading...",
  fullScreen = false,
  height = "400px",
}) {
  const containerClass = fullScreen
    ? "flex items-center justify-center bg-white/50 z-50"
    : "flex items-center justify-center bg-gray-100";

  return (
    <>
      <div className={containerClass} style={!fullScreen ? { height } : {}}>
        <div className="text-center">
          {/* spinner */}
          <article className="inline-block h-8 w-8 animate-spin rounded-full border-r-transparent border-4 border-solid  border-blue-700  mb-4"></article>
          <p className="text-gray-600 text-lg">{message}</p>
        </div>
      </div>
    </>
  );
}
