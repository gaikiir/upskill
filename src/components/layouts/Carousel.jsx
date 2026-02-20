import { Carousel } from "@material-tailwind/react";
import CarouselSlide from "../common/CarouselSlide";
import Model from "../common/Model";
import UseCarouselData from "../hooks/UseDataCarousel";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import Loading from "../utilities/Loading";

export default function HeroCarousel() {
  const { data, loading, error, refetch } = UseCarouselData();

  // 1. Loading state — show spinner/skeleton while fetching
  if (loading) {
    return (
      <Model className="mt-28">
        <Loading message="Loading carousel..." height="400px" />
      </Model>
    );
  }

  // 2. Error state — show error message with retry option
  if (!loading && error) {
    return (
      <Model className="mt-28">
        <ErrorMessage
          title="Failed to load carousel"
          message={
            error?.message || "An unexpected error occurred, please try again!"
          }
          height="400px"
          onRetry={refetch}
        />
      </Model>
    );
  }

  // 3. Empty state — data fetched successfully but no items returned
  if (!loading && !error && data.length === 0) {
    return (
      <Model className="mt-28">
        <IsEmpty
          title="No carousel items"
          message="There are no items to display at the moment, please try again."
          height="400px"
          action={refetch}
        />
      </Model>
    );
  }

  // 4. Success state — data exists, render carousel
  // No need to re-check loading/error here — early returns above already guarantee
  // that if we reach this point: loading=false, error=null, data has items.
  return (
    <header className="mt-28">
      <Carousel
        autoplay={true}
        autoplayDelay={4000}
        loop={true}
        prevArrow={() => null}
        nextArrow={() => null}
        navigation={({ activeIndex, setActiveIndex, length }) => (
          <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2">
            {Array.from({ length }, (_, i) => (
              <span
                key={i}
                className={`block cursor-pointer rounded-full transition-all ${
                  activeIndex === i ? "w-9 h-2 bg-white" : "w-4 h-2 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {data.map((item) => (
          <CarouselSlide
            key={item.id}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            ctaText={item.ctaText}
          />
        ))}
      </Carousel>
    </header>
  );
}
