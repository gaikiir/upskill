import { useCallback, useEffect, useState } from "react";

const fakeProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and superior sound quality",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4,
    category: "Electronics",
    badge: "Premium",
    inStock: true,
    features: ["Noise Cancellation", "40hr Battery", "Bluetooth 5.0"],
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 249.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 5,
    category: "Wearables",
    badge: "Best Seller",
    inStock: true,
    features: ["Heart Rate Monitor", "GPS Tracking", "Water Resistant"],
  },
  {
    id: 3,
    name: "Leather Backpack",
    description:
      "Stylish and durable genuine leather backpack for everyday use",
    price: 89.99,
    originalPrice: 149.99,
    image:
      "https://cdn.pixabay.com/photo/2024/12/20/16/46/baby-9280577_1280.jpg",
    rating: 4,
    category: "Fashion",
    badge: "New",
    inStock: true,
    features: ["Genuine Leather", "Laptop Compartment", "Water Resistant"],
  },
  {
    id: 4,
    name: "Coffee Maker Deluxe",
    description:
      "Professional grade coffee maker for home use with programmable features",
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    rating: 3,
    category: "Kitchen",
    badge: "Sale",
    inStock: true,
    features: ["Programmable", "12 Cup Capacity", "Auto Shut-off"],
  },
  {
    id: 5,
    name: "Milk, White",
    description:
      "Professional grade milk maker for home use with programmable features",
    price: 2.99,
    originalPrice: 4.0,
    image:
      "https://cdn.pixabay.com/photo/2019/03/26/12/55/milk-4082580_1280.jpg",
    rating: 3,
    category: "Kitchen",
    badge: "Sale",
    inStock: true,
    features: ["Programmable", "12 Cup Capacity", "Auto Shut-off"],
  },
  {
    id: 6,
    name: "Coffee Maker Deluxe",
    description:
      "Professional grade coffee maker for home use with programmable features",
    price: 1.9,
    originalPrice: 3.99,
    image:
      "https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg",
    rating: 3,
    category: "Kitchen",
    badge: "Sale",
    inStock: true,
    features: ["Programmable", "12 Cup Capacity", "Auto Shut-off"],
  },
  {
    id: 7,
    name: "Piparoni Pizza",
    description:
      "Professional grade beef Pizza with a nice taste , perfect for your health",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg",
    rating: 3,
    category: "Kitchen",
    badge: "Sale",
    inStock: true,
    features: ["Programmable", "12 Cup Capacity", "Auto Shut-off"],
  },
  {
    id: 8,
    name: "Coffee Maker Deluxe",
    description:
      "Professional grade coffee maker for home use with programmable features",
    price: 79.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500",
    rating: 3,
    category: "Kitchen",
    badge: "Sale",
    inStock: true,
    features: ["Programmable", "12 Cup Capacity", "Auto Shut-off"],
  },
];

// Simulate API delay with occasional errors for testing
const simulateApiCall = (products, delay = 4000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, delay);
  });
};

export const UseProducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  // Use useCallback to create a stable function reference
  const fetchProduct = useCallback(async () => {
    console.log("Fetching products..."); // Debug log
    try {
      setLoading(true);
      setErr(null);
      // Simulate API call with products
      const products = await simulateApiCall(fakeProducts);
      // Validate the incoming data
      const isValidatedData = products.filter(
        (item) => item.id && item.name && item.image
      );

      console.log("Products fetched:", isValidatedData.length); // Debug log
      setProduct(isValidatedData);
    } catch (error) {
      console.error("Fetch error:", error); // Debug log
      setErr(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []); // Empty deps - function is stable

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  //get single product by id
  const getProductById = useCallback(
    (id) => {
      return product.find((item) => item.id === parseInt(id));
    },
    [product]
  );

  return {
    product,
    loading,
    err,
    refetch: fetchProduct,
    getProductById,
  };
};
