export function Container({
  maxWidth = "max-w-7xl",
  width = "w-full",
  height = "h-full",
  margin = "mx-auto",
  className = "",
  padding = "p-4",
  // bgColor = "bg-gray-100",
  children,
  centered = false, 
}) {
  const marginClass = centered ? "mx-auto" : margin;

  return (
    <div
      className={`${maxWidth} ${width} ${height} ${marginClass} ${padding}  ${className}`}
    >
      {children}
    </div>
  );
}
