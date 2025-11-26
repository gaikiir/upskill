import { Carousel } from "@material-tailwind/react";
import CarouselSlide from "./CarouselSlide";

export default function MainCarousel({ data }) {
  return (
    <header className="mt-20">
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
