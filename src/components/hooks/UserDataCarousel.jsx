import { useEffect, useState } from "react";

const fakeData = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2021/07/19/16/04/pizza-6478478_1280.jpg",
    title: "Discover Nature's Beauty",
    subtitle: "Explore breathtaking landscapes and unwind in serenity.",
    ctaText: "Learn More",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2023/01/17/07/59/mossel-dish-7724006_960_720.jpg",
    title: "Urban Adventures Await",
    subtitle: "Dive into the heart of the city with vibrant experiences.",
    ctaText: "Get Started",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_960_720.jpg",
    title: "Creative Inspirations",
    subtitle: "Unlock your potential with innovative ideas and tools.",
    ctaText: "Join Now",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2015/01/16/15/01/dinner-601576_1280.jpg",
    title: "Creative Inspirations",
    subtitle: "Unlock your potential with innovative ideas and tools.",
    ctaText: "Join Now",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2016/11/08/06/45/happy-valentines-day-1807617_960_720.jpg",
    title: "Creative Inspirations",
    subtitle: "Unlock your potential with innovative ideas and tools.",
    ctaText: "Join Now",
  },
];
const UserCarouselData = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isValidateData = fakeData.filter(
        (item) => item.id && item.title && item.image
      );
      setData(isValidateData);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default UserCarouselData;
