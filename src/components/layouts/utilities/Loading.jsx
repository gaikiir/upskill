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
          <article className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-red-400 border-r-transparent mb-4"></article>
          <p className="text-gray-600 text-lg">{message}</p>
        </div>
      </div>
    </>
  );
}
