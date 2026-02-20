import { Spinner } from "@material-tailwind/react";

export default function Loading({
  message = "loading...",
  fullScreen = false,
  height = "400px",
}) {
  const containerClass = fullScreen
    ? "flex items-center justify-center bg-red-100 z-30 fixed inset-0"
    : "flex items-center justify-center bg-red-100";

  return (
    <>
      <div className={containerClass} style={!fullScreen ? { height } : {}}>
        <div className="flex text-center align-center justify-center gap-4">
          {/* spinner */}
          <Spinner className="h-12 w-12" color="teal" />
          <p className="text-gray-600 mt-3 text-lg">{message}</p>
        </div>
      </div>
    </>
  );
}
