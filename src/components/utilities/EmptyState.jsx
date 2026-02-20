export default function IsEmpty({
  title = "No data available",
  message,
  icon,
  action,
  height = "400px",
}) {
  return (
    <div
      className="flex items-center justify-center bg-red-100"
      style={{ height }}
    >
      <div className="text-center px-6 max-w-md">
        {icon || (
          <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-200">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        )}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        {message && <p className="text-gray-700 text-md mb-6">{message}</p>}
        {action && (
          <button
            onClick={action}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
