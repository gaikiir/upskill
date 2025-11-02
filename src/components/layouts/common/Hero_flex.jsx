const HeroFlexImages = [
  { imagePath: "briefcase.png", imageDescription: "Business" },
  { imagePath: "terminal.png", imageDescription: "Development" },
  { imagePath: "language.png", imageDescription: "Language" },
  { imagePath: "microphone.png", imageDescription: "Meeting " },
  { imagePath: "finance.png", imageDescription: "Finance" },
  { imagePath: "design.png", imageDescription: "Design" },
  { imagePath: "camera.png", imageDescription: "Photography" },
  { imagePath: "office.png", imageDescription: "Office" },
  { imagePath: "science.png", imageDescription: "Science" },
];

export default function HeroFlexContent({
  images = HeroFlexImages,
  folder = "/images",
  showCaptions = false,
  showLabelsBelow = true,
}) {
  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">
      {/* Use horizontal scroll on very small screens, but attempt single row on md+ */}
      <div className=" -mx-2">
        <div className="flex flex-nowrap justify-center items-center px-2">
          {images.map((item, index) => {
            if (!item?.imagePath) return null;
            const src = `${folder}/${item.imagePath}`; 
            return (
              <div
                key={index}
                className="flex-shrink-0 w-1/6 sm:w-1/8 md:w-[10.5%] p-1"
              >
                <figure className="overflow-hidden rounded-md bg-white shadow-sm hover:shadow-md transition-shadow flex items-center justify-center p-1">
                  <img
                    src={src}
                    alt={item.imageDescription || item.imagePath}
                    className="max-w-full h-14 sm:h-16 md:h-14 object-contain bg-gray-50"
                  />
                  {item.imageDescription && (
                    <figcaption
                      className={`px-1 py-0.5 text-[10px] text-gray-600 ${
                        showCaptions ? "" : "sr-only"
                      }`}
                    >
                      {item.imageDescription}
                    </figcaption>
                  )}
                </figure>
              </div>
            );
          })}
        </div>
        {showLabelsBelow && (
          <div className="flex flex-nowrap justify-center items-center px-2 mt-2">
            {images.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/6 sm:w-1/8 md:w-[10.5%] p-1 text-center"
              >
                <span className="text-xs text-gray-700">
                  {item.imageDescription}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
