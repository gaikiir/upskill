export default function CarouselSlide({
  image,
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) {
  return (
    <div className="relative h-[400px] w-full">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/800x600?text=Image+Not+Found";
        }}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-2xl">
          <h2 className="text-4xl font-bold mb-3">{title}</h2>
          <p className="text-lg mb-6">{subtitle}</p>
          <button
            onClick={() => onCtaClick?.()}
            className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
