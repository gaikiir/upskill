export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build the list of items to render — numbers or "..." placeholders.
  // Rule: always show first, last, current, and 1 sibling either side.
  // Gaps of more than 1 page become an ellipsis.
  const getPageItems = () => {
    // For small page counts show everything — no truncation needed
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items = [];
    //page that always must appear
    const always = new Set([
      1,
      totalPages,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ]);
    const visible = [...always]
      .filter((item) => item >= 1 && item <= totalPages)
      .sort((a, b) => a - b);
    for (let i = 0; i < visible.length; i++) {
      items.push(visible[i]);
      // If the next visible page is not consecutive, insert an ellipsis
      if (i < visible.length - 1 && visible[i + 1] - visible[i] > 1) {
        items.push("...");
      }
    }
    return items;
  };

  const paginatedItems = getPageItems();

  return (
    <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page numbers + ellipses */}
      {paginatedItems.map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gray-500 select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`px-3 py-1 rounded ${
              item === currentPage ? "bg-orange-900 text-white" : "bg-gray-200"
            }`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
