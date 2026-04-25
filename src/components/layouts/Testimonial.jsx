import { Carousel, Rating, Typography } from "@material-tailwind/react";
import { ArrowButton } from "../utilities/ArrowButton";
const testimonials = [
  {
    id: 1,
    name: "Liam Young",
    content:
      "It's the best plugin for that purpose, even better than the most popular of this kind of plugin. I will recommend strongly to try, it's probably you will adopt it forever. One of the best plugins I ever try!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Jackson",
    content:
      "After ages in search of a decent solution to show reviews from different sources, I found this amazing tool. The guys in TrustIndex made a brilliant job developing this easy-to-use tool. I love it!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Noah King",
    content:
      "This plugin does the job, there are various layouts available, its easy to use, install and display reviews using shortcodes. Easy to set up, lots of options and high quality design.",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Olivia Smith",
    content:
      "Exceptional service and outstanding results. The platform exceeded all our expectations and the integration was seamless. Highly recommend to anyone looking for quality.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "James Wilson",
    content:
      "Game-changing solution for our business. The team's expertise and support made the implementation smooth and efficient. Worth every penny!",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
  },
];

export default function Testimonial() {
  return (
    // px-4 bg-gray-100
    <div className="py-12 mt-5">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <Carousel
            autoplay={true}
            autoplayDelay={4000}
            loop={true}
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i
                        ? "w-8 bg-green-600"
                        : "w-4 bg-green-600/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
            prevArrow={({ handlePrev }) => (
              <ArrowButton onClick={handlePrev} direction="prev" />
            )}
            nextArrow={({ handleNext }) => (
              <ArrowButton onClick={handleNext} direction="next" />
            )}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-12 py-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-40 h-40 rounded-full shadow-xl object-cover "
                    />
                  </div>

                  <div className="flex-1 text-center lg:text-left">
                    <Typography variant="h4" className="mb-2 text-gray-900">
                      {testimonial.name}
                    </Typography>

                    <div className="flex justify-center lg:justify-start mb-4">
                      <Rating value={testimonial.rating} readonly />
                    </div>

                    <Typography className="text-gray-700 leading-relaxed">
                      {testimonial.content}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
