import { useEffect, useState } from "react";

const fakeData = [
  {
    id: 1,
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/13/56/asian-1870022_1280.jpg",
    title: "Discover Nature's Beauty",
    subtitle: "Explore breathtaking landscapes and unwind in serenity.",
    ctaText: "Learn More",
  },
  {
    id: 2,
    image:
      "https://cdn.pixabay.com/photo/2018/07/10/10/29/girl-3528292_1280.jpg",
    title: "Urban Adventures Await",
    subtitle: "Dive into the heart of the city with vibrant experiences.",
    ctaText: "Get Started",
  },
  {
    id: 3,
    image:
      "https://cdn.pixabay.com/photo/2021/02/18/12/03/people-6027028_1280.jpg",
    title: "Creative Inspirations",
    subtitle: "Unlock your potential with innovative ideas and tools.",
    ctaText: "Join Now",
  },
  {
    id: 4,
    image:
      "https://cdn.pixabay.com/photo/2025/01/30/20/09/read-9370928_1280.jpg",
    title: "Creative Inspirations",
    subtitle: "Unlock your potential with innovative ideas and tools.",
    ctaText: "Join Now",
  },
  {
    id: 5,
    image:
      "https://cdn.pixabay.com/photo/2016/11/14/03/16/book-1822474_1280.jpg",
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
      await new Promise((resolve) => setTimeout(resolve, 4000));
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
