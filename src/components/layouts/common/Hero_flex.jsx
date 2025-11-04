const HeroFlexImages = [
  {imgId: 1,imagePath: "image/briefcase.png", imageDescription: "Business" },
  {imgId: 2,imagePath: "image/terminal.png", imageDescription: "Development" },
  {imgId: 3,imagePath: "image/language.png", imageDescription: "Language" },
  {imgId: 4,imagePath: "image/microphone.png", imageDescription: "Meeting " },
  {imgId: 5,imagePath: "image/finance.png", imageDescription: "Finance" },
  {imgId: 6,imagePath: "image/design.png", imageDescription: "Design" },
  {imgId: 7,imagePath: "image/camera.png", imageDescription: "Photography" },
  {imgId: 7,imagePath: "image/office.png", imageDescription: "Office" },
  {imgId: 8,imagePath: "image/science.png", imageDescription: "Science" },
];

export default function HeroFlexContent() {
  return (
    <section className="max-w-7xl mx-auto mt-6 px-4">
      {/* Use horizontal scroll on very small screens, but attempt single row on md+ */}
      <div className=" -mx-2">
        
        
      </div>
    </section>
  );
}


/*

{
  images = HeroFlexImages,
  folder = "/images",
  showCaptions = false,
  showLabelsBelow = true,
  id = imgId

}

<div className="flex flex-nowrap justify-center items-center px-2">
          {images.map((item, index) => {
            if (!item?.imagePath) return null;
            const src = `${folder}/${item.imagePath}`; 
            return (
              <div
                key={index.id}
                className="flex-shrink-0 w-1/6 sm:w-1/8 md:w-[10.5%] p-1"
              >
                <figure className="overflow-hidden rounded-md bg-white shadow-none hover:shadow-md transition-shadow flex items-center justify-center p-1">
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
*/ 