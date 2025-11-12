import { Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ProgramGrid from "../layouts/common/ProgramGrid";

export default function HomePage() {
  // Updated: State for dynamic image data (array of objects for flexibility)
  // Each item: { id, image: url, title: string, subtitle: string, ctaText?: string }
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New: Track failed images per slide for targeted error handling
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    // Simulate dynamic fetch (replace with real API call, e.g., fetch('/api/slides'))
    const fetchImgData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Mock API response - in reality: const res = await fetch('/api/hero-slides');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        const mockData = [
          {
            id: 1,
            image:
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
            title: "Discover Nature's Beauty",
            subtitle: "Explore breathtaking landscapes and unwind in serenity.",
            ctaText: "Learn More",
          },
          {
            id: 2,
            image:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
            title: "Urban Adventures Await",
            subtitle:
              "Dive into the heart of the city with vibrant experiences.",
            ctaText: "Get Started",
          },
          {
            id: 3,
            image:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
            title: "Creative Inspirations",
            subtitle: "Unlock your potential with innovative ideas and tools.",
            ctaText: "Join Now",
          },
          {
            id: 4,
            image:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
            title: "Creative Inspirations",
            subtitle: "Unlock your potential with innovative ideas and tools.",
            ctaText: "Join Now",
          },
        ];
        setImgData(mockData);
      } catch (err) {
        setError("Failed to load carousel data. Please try refreshing.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImgData();
  }, []);

  // New: Handle image load error - add to failed set for fallback rendering
  const handleImageError = (slideId) => {
    setFailedImages((prev) => new Set([...prev, slideId]));
  };

  // New: Fallback image (local or placeholder)
  const fallbackImage = "/images/fallback-slide.jpg"; // Add a local fallback image to your public folder

  if (loading) {
    return (
      <div className="bg-blue-gray-500 w-full h-full max-w-7xl">
        <header className="mt-12">
          {/* Efficient: Simple skeleton loader for the entire carousel */}
          <div className="relative w-full h-96 bg-gray-300 animate-pulse rounded-none"></div>
        </header>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-blue-gray-100 w-full h-full max-w-7xl">
        <header className="mt-12">
          <div className="relative w-full h-96 bg-red-100 flex items-center justify-center rounded-none">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        </header>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full max-w-7xl ">
        <header className="mt-20 mb-3">
          <Carousel
            autoplay={true}
            autoplayDelay={4000}
            loop={true}
            prevArrow={() => null}
            nextArrow={() => null}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {imgData.map((slide) => (
              <div key={slide.id} className="relative w-full h-96">
                {/* Dynamic image with error handling & lazy loading */}
                <img
                  src={failedImages.has(slide.id) ? fallbackImage : slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-none"
                  loading="lazy" // Efficient: Native lazy loading for better performance
                  onError={() => handleImageError(slide.id)}
                />
                {/* Overlay: Text & Button - positioned responsively */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-base md:text-lg mb-4 max-w-md leading-relaxed drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  {slide.ctaText && (
                    <button
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors shadow-lg"
                      onClick={() => {
                        // Dynamic button action - e.g., navigate, track click
                        console.log(`CTA clicked for slide: ${slide.title}`);
                        // window.location.href = '/signup'; // Example
                      }}
                    >
                      {slide.ctaText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Carousel>
        </header>
        <ProgramGrid/>
      </div>
    </>
  );
}
