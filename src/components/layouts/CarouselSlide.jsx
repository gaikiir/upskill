import { useEffect, useState } from "react";

export default function CarouselSlide({
  image,
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 50);
    return () => {
      clearTimeout(t);
      setVisible(false);
    };
  }, [image]); // Re-trigger on slide change via image key

  return (
    <div className="relative h-[480px] w-full overflow-hidden">
      {/* Image with subtle zoom-in animation */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out"
        style={{ transform: visible ? "scale(1.06)" : "scale(1)" }}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/800x600?text=Image+Not+Found";
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Text content with fade + slide-up animation */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transition: "opacity 700ms ease, transform 700ms ease",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <div className="text-center text-white px-6 max-w-2xl">
          <h2
            className="text-4xl font-bold mb-3 drop-shadow-lg"
            style={{
              transition:
                "opacity 800ms ease 100ms, transform 800ms ease 100ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {title}
          </h2>
          <p
            className="text-lg mb-7 text-white/85"
            style={{
              transition:
                "opacity 800ms ease 220ms, transform 800ms ease 220ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {subtitle}
          </p>
          <button
            onClick={() => onCtaClick?.()}
            className="bg-white text-gray-900 px-7 py-3 rounded-lg font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-lg"
            style={{
              transition:
                "opacity 800ms ease 340ms, transform 800ms ease 340ms, background-color 200ms, scale 150ms",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
