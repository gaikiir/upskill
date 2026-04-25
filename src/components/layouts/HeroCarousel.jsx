import { Carousel } from "@material-tailwind/react";
import useCarousel from "../hooks/useCarousel";
import { ArrowButton } from "../utilities/ArrowButton";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import Loading from "../utilities/Loading";
import Model from "../utilities/Model";
import CarouselSlide from "./CarouselSlide";
export function HeroCarousel() {
  const { data, loading, error, refetch } = useCarousel();

  return (
    <header className="relative overflow-hidden">
      {loading ? (
        <Model>
          <Loading message="Loading carousel..." height="480px" />
        </Model>
      ) : error ? (
        <Model>
          <ErrorMessage
            title="Failed to load carousel"
            message={error || "An unexpected error occurred, please try again!"}
            height="480px"
            onRetry={refetch}
          />
        </Model>
      ) : data?.length === 0 ? (
        <Model>
          <IsEmpty
            title="No carousel items"
            message="There are no items to display at the moment, please try again."
            height="480px"
            action={refetch}
          />
        </Model>
      ) : (
        <Carousel
          autoplay={true}
          autoplayDelay={4000}
          loop={true}
          prevArrow={({ handlePrev }) => (
            <ArrowButton onClick={handlePrev} direction="prev" />
          )}
          nextArrow={({ handleNext }) => (
            <ArrowButton onClick={handleNext} direction="next" />
          )}
          navigation={({ activeIndex, setActiveIndex, length }) => (
            <div className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 gap-2">
              {Array.from({ length }, (_, i) => (
                <span
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="block cursor-pointer rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === i ? "2.25rem" : "1rem",
                    height: "0.5rem",
                    background:
                      activeIndex === i
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          )}
        >
          {data.map((item) => (
            <CarouselSlide
              key={item.itemID}
              image={item.imageUrl}
              title={item.itemName}
              subtitle={item.itemDescription}
              ctaText={item.itemName}
            />
          ))}
        </Carousel>
      )}
    </header>
  );
}
