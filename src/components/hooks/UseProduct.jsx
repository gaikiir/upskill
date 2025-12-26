import { useCallback, useEffect, useRef, useState } from "react";

const fakeProducts = [
  {
    id: 1,
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
    price: "$12.99",
    originalPrice: "$15.99",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    rating: 4.8,
    ratingCount: 124,
    category: "Pizza",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon butter sauce and vegetables",
    price: "$24.99",
    originalPrice: "$29.99",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
    rating: 4.9,
    ratingCount: 89,
    category: "Main Course",
    badge: "Chef's Special",
    inStock: true,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan and homemade dressing",
    price: "$8.99",
    originalPrice: "$11.99",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
    rating: 4.5,
    ratingCount: 67,
    category: "Appetizers",
    badge: "New",
    inStock: true,
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center and vanilla ice cream",
    price: "$7.99",
    originalPrice: "$9.99",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500",
    rating: 4.9,
    ratingCount: 156,
    category: "Desserts",
    badge: "Sale",
    inStock: true,
  },
  {
    id: 5,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice, no added sugar",
    price: "$4.99",
    originalPrice: "$6.99",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
    rating: 4.3,
    ratingCount: 43,
    category: "Beverages",
    badge: "Fresh",
    inStock: true,
  },
  {
    id: 6,
    name: "Cappuccino",
    description: "Italian espresso with steamed milk and foam",
    price: "$3.99",
    originalPrice: "$5.99",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500",
    rating: 4.7,
    ratingCount: 201,
    category: "Beverages",
    badge: "Popular",
    inStock: true,
  },
  {
    id: 7,
    name: "Beef Burger",
    description: "Premium beef patty with cheddar, lettuce, and special sauce",
    price: "$14.99",
    originalPrice: "$18.99",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    rating: 4.6,
    ratingCount: 178,
    category: "Main Course",
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: 8,
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: "$6.99",
    originalPrice: "$8.99",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    rating: 5.0,
    ratingCount: 92,
    category: "Desserts",
    badge: "Premium",
    inStock: true,
  },
];

const CONFIG = {
  SIMULATE_ERROR: false,
  SIMULATE_SLOW_NETWORK: false,
  ERROR_RATE: 0.0,
  NETWORK_DELAY: 1500,
  SLOW_NETWORK_DELAY: 5000,
};

const SimulateApiCall = (products) => {
  return new Promise((resolve, reject) => {
    const delay = CONFIG.SIMULATE_SLOW_NETWORK
      ? CONFIG.SLOW_NETWORK_DELAY
      : CONFIG.NETWORK_DELAY;

    setTimeout(() => {
      console.log("✅ API Call Resolved with products:", products.length);

      if (CONFIG.SIMULATE_ERROR) {
        reject(
          new Error("Failed to load products. Please check your connection.")
        );
        return;
      }

      if (Math.random() < CONFIG.ERROR_RATE) {
        reject(new Error("Network error occurred. Please try again."));
        return;
      }

      resolve(products);
    }, delay);
  });
};

const ValidateProduct = (product) => {
  const requiredFields = [
    "id",
    "name",
    "image",
    "description",
    "price",
    "originalPrice",
    "rating",
    "category",
    "badge",
    "inStock",
  ];

  return requiredFields.every((field) => {
    const value = product[field];
    return value !== null && value !== undefined && value !== "";
  });
};

export const UseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ FIX: Don't use isMounted ref - it causes issues with Strict Mode
  const cacheRef = useRef({ data: null, timestamp: null });
  const fetchInProgress = useRef(false);

  const fetchProduct = useCallback(async (options = {}) => {
    const { forceRefresh = false } = options;

    // Prevent duplicate fetches
    if (fetchInProgress.current && !forceRefresh) {
      console.log("⏸️ Fetch already in progress, skipping");
      return;
    }

    const CACHE_TTL = 5 * 60 * 1000;
    const now = Date.now();

    // Check cache
    if (
      !forceRefresh &&
      cacheRef.current.data &&
      cacheRef.current.timestamp &&
      now - cacheRef.current.timestamp < CACHE_TTL
    ) {
      console.log("📋 Using cached products:", cacheRef.current.data.length);
      setProducts(cacheRef.current.data);
      setLoading(false);
      return;
    }

    console.log("🌐 Fetching products from API...");
    fetchInProgress.current = true;

    try {
      setLoading(true);
      setError(null);

      const data = await SimulateApiCall(fakeProducts);
      console.log("📦 Received data:", data.length);

      const validProducts = data.filter(ValidateProduct);
      console.log("✅ Valid products after validation:", validProducts.length);

      if (validProducts.length === 0) {
        throw new Error("No valid products found.");
      }

      if (validProducts.length < data.length) {
        console.warn(
          `⚠️ Some products failed validation. Valid: ${
            validProducts.length
          }, Invalid: ${data.length - validProducts.length}`
        );
      }

      // ✅ FIX: Always update state (removed isMounted check)
      console.log("💾 Setting products to state");
      setProducts(validProducts);
      cacheRef.current = {
        data: validProducts,
        timestamp: now,
      };
      console.log(`✅ Successfully loaded ${validProducts.length} products`);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
      setError(err.message || "An unexpected error occurred.");
      setProducts([]);
    } finally {
      setLoading(false);
      fetchInProgress.current = false;
      console.log("🏁 Fetch complete");
    }
  }, []);

  // ✅ FIX: Simplified useEffect
  useEffect(() => {
    console.log("🎬 UseProducts mounted, initiating fetch");
    fetchProduct();
  }, [fetchProduct]);

  const getProductById = useCallback(
    (id) => {
      const productId = typeof id === "string" ? parseInt(id, 10) : id;

      if (isNaN(productId)) {
        console.warn(`⚠️ Invalid product ID: ${id}`);
        return null;
      }

      return products.find((item) => item.id === productId) || null;
    },
    [products]
  );

  const refetch = useCallback(() => {
    console.log("🔄 Manual refetch triggered");
    fetchProduct({ forceRefresh: true });
  }, [fetchProduct]);

  // Debug log
  console.log("📊 UseProducts state:", {
    productsCount: products.length,
    loading,
    error,
    hasCachedData: !!cacheRef.current.data,
  });

  return {
    products,
    loading,
    error,
    refetch,
    getProductById,
  };
};
