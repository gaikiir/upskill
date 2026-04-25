export function Container({
  maxWidth = "max-w-7xl",
  padding = "px-4 py-6",
  className = "",
  children,
}) {
  return (
    <section
      className={`mt-28 w-full ${maxWidth} mx-auto ${padding} ${className}`}
    >
      {children}
    </section>
  );
}
