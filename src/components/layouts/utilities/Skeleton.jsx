export function SkeletonCard() {
  return (
    <div className="border border-gray-200 bg-white shadow-md animate-pulse">
      <div className="h-40 bg-gray-300"></div>
      <div className="p-3 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 rounded"></div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
