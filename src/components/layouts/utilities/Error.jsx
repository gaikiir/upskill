export default function ErrorMessage({
  title = "Something went wrong",
  message,
  onRetry,
  fullScreen = false,
  height = "400px",
}) {
  const containerClass = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white z-50"
    : "flex items-center justify-center bg-red-50";

  return (
    <div className={containerClass} style={!fullScreen ? { height } : {}}>
      <div className="text-center p-6 max-w-md">
        {/* error svg icon */}
        <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-100">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        {message && <p className="text-gray-600 text-sm mb-6">{message}</p>}
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
