export default function Model({
  children,
  maxHeight = "max-h-screen",
  minHeight,
  padding = "p-0",
  className = "",
  fullWidth = false,
  fullHeight = false,
  centered = true,
  bgColor = "bg-gray-100",
  flexDirection = "flex-col",
  justify = "justify-start",
  align = "items-stretch",
  marginx = "my-3",
  gap = "gap-4",
  overflow = "overflow-hidden",
  display = "flex", // Added for clarity
}) {
  const widthClass = fullWidth ? "w-full" : "max-w-7xl";
  const heightClass = fullHeight ? "h-screen" : maxHeight;
  const minHeightClass = minHeight || "";
  const centerClass = centered ? "mx-auto" : "";

  // Combine all classes, removing any potential duplicates/empties
  const combinedClasses = [
    display,
    flexDirection,
    justify,
    align,
    marginx,
    gap,
    heightClass,
    minHeightClass,
    widthClass,
    bgColor,
    centerClass,
    padding,
    overflow,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={combinedClasses}>{children}</div>;
}
