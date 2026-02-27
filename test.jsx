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
    rating: 5,
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
    rating: 5,
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
    rating: 4,
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
    rating: 5,
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
    rating: 4,
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
    rating: 5,
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
    rating: 5,
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
    rating: 5,
    category: "Desserts",
    badge: "Premium",
    inStock: true,
  },
];

// Configuration for testing
const CONFIG = {
  SIMULATE_ERROR: false,
  SIMULATE_SLOW_NETWORK: false,
  ERROR_RATE: 0.0,
  NETWORK_DELAY: 1500,
  SLOW_NETWORK_DELAY: 5000,
};

// Simulate API call
const SimulateApiCall = (products) => {
  return new Promise((resolve, reject) => {
    const delay = CONFIG.SIMULATE_SLOW_NETWORK
      ? CONFIG.SLOW_NETWORK_DELAY
      : CONFIG.NETWORK_DELAY;

    setTimeout(() => {
      if (CONFIG.SIMULATE_ERROR) {
        reject(
          new Error("Failed to load products. Please check your connection."),
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

// Data validation helper
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

/**
 * Custom hook for managing product data
 * @returns {Object} Product state and utilities
 * @property {Array} products - List of products
 * @property {boolean} loading - Loading state
 * @property {string|null} error - Error message
 * @property {Function} refetch - Refetch products
 * @property {Function} getProductById - Get single product by ID
 */
export const UseProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMounted = useRef(true);
  const cacheRef = useRef({
    data: null,
    timestamp: null,
  });

  //  parameter destructuring
  const fetchProduct = useCallback(async (options = {}) => {
    const { forceRefresh = false } = options;

    // Cache TTL: 5 minutes
    const CACHE_TTL = 5 * 60 * 1000;
    const now = Date.now();

    // Use cache if valid
    if (
      !forceRefresh &&
      cacheRef.current.data &&
      cacheRef.current.timestamp &&
      now - cacheRef.current.timestamp < CACHE_TTL
    ) {
      console.log("Using cached products");
      setProducts(cacheRef.current.data);
      setLoading(false);
      return;
    }

    console.log("Fetching products from API...");

    try {
      setLoading(true);
      setError(null);

      const data = await SimulateApiCall(fakeProducts);
      const validProducts = data.filter(ValidateProduct);

      if (validProducts.length === 0) {
        throw new Error("No valid products found.");
      }

      if (validProducts.length < data.length) {
        console.warn(
          `Some products failed validation. Valid: ${
            validProducts.length
          }, Invalid: ${data.length - validProducts.length}`,
        );
      }

      if (isMounted.current) {
        setProducts(validProducts);
        cacheRef.current = {
          data: validProducts,
          timestamp: now,
        };
        console.log(`Successfully loaded ${validProducts.length} products`);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);

      if (isMounted.current) {
        setError(err.message || "An unexpected error occurred.");
        setProducts([]);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchProduct();

    return () => {
      isMounted.current = false;
    };
  }, [fetchProduct]);

  /**
   * Get a single product by ID
   * @param {number|string} id - Product ID
   * @returns {Object|null} Product or null if not found
   */
  const getProductById = useCallback(
    (id) => {
      const productId = typeof id === "string" ? parseInt(id, 10) : id;

      if (isNaN(productId)) {
        console.warn(`Invalid product ID: ${id}`);
        return null;
      }

      return products.find((item) => item.id === productId) || null;
    },
    [products],
  );

  /**
   * Refetch products (forces cache refresh)
   */
  const refetch = useCallback(() => {
    console.log("Refetching products...");
    fetchProduct({ forceRefresh: true });
  }, [fetchProduct]);

  return {
    products,
    loading,
    error,
    refetch,
    getProductById,
  };
};

import { createContext, useContext } from "react";

// ============================================================================
// API SERVICE LAYER - Replace these with actual backend calls
// ============================================================================

const FavoritesAPI = {
  // Simulated API calls - replace with actual fetch/axios calls
  async fetchFavorites() {
    // TODO: Replace with: return await fetch('/api/favorites').then(r => r.json())
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  },

  async addFavorite(productId) {
    // TODO: Replace with: return await fetch('/api/favorites', { method: 'POST', body: { productId } })
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, productId }), 100);
    });
  },

  async removeFavorite(productId) {
    // TODO: Replace with: return await fetch(`/api/favorites/${productId}`, { method: 'DELETE' })
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, productId }), 100);
    });
  },

  async syncFavorites(favoriteIds) {
    // TODO: Replace with: return await fetch('/api/favorites/sync', { method: 'PUT', body: { favoriteIds } })
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 100);
    });
  },
};

// ============================================================================
// FAVORITES CONTEXT & PROVIDER
// ============================================================================

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const pendingOperations = useRef(new Set());

  // Initialize favorites from localStorage/backend
  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        const favoriteIds = await FavoritesAPI.fetchFavorites();
        setFavorites(Array.isArray(favoriteIds) ? favoriteIds : []);
      } catch (error) {
        console.error("Failed to load favorites:", error);
        // Fallback to empty array
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    initializeFavorites();
  }, []);

  // Persist to localStorage (optimistic local caching)
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
        // Handle quota exceeded or other storage errors
        if (error.name === "QuotaExceededError") {
          console.warn("LocalStorage quota exceeded");
        }
      }
    }
  }, [favorites, loading]);

  // Validate product ID
  const isValidId = useCallback((id) => {
    return id !== null && id !== undefined && id !== "";
  }, []);

  // Check if product is favorited
  const isFavorite = useCallback(
    (productId) => {
      if (!isValidId(productId)) return false;
      return favorites.includes(productId);
    },
    [favorites, isValidId],
  );

  // Toggle favorite with optimistic update + backend sync
  const toggleFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid product ID:", productId);
        return;
      }

      // Prevent duplicate operations
      if (pendingOperations.current.has(productId)) {
        return;
      }

      const isCurrentlyFavorited = favorites.includes(productId);

      // Optimistic update
      setFavorites((prev) =>
        isCurrentlyFavorited
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );

      // Track pending operation
      pendingOperations.current.add(productId);

      try {
        // Sync with backend
        if (isCurrentlyFavorited) {
          await FavoritesAPI.removeFavorite(productId);
        } else {
          await FavoritesAPI.addFavorite(productId);
        }
      } catch (error) {
        console.error("Failed to sync favorite:", error);

        // Rollback on error
        setFavorites((prev) =>
          isCurrentlyFavorited
            ? [...prev, productId]
            : prev.filter((id) => id !== productId),
        );

        // Optionally show error toast to user
        // toast.error("Failed to update favorites. Please try again.");
      } finally {
        pendingOperations.current.delete(productId);
      }
    },
    [favorites, isValidId],
  );

  // Add favorite (if not already added)
  const addFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid product ID:", productId);
        return;
      }

      if (favorites.includes(productId)) {
        return; // Already favorited
      }

      setFavorites((prev) => [...prev, productId]);

      try {
        await FavoritesAPI.addFavorite(productId);
      } catch (error) {
        console.error("Failed to add favorite:", error);
        setFavorites((prev) => prev.filter((id) => id !== productId));
      }
    },
    [favorites, isValidId],
  );

  // Remove favorite
  const removeFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid product ID:", productId);
        return;
      }

      setFavorites((prev) => prev.filter((id) => id !== productId));

      try {
        await FavoritesAPI.removeFavorite(productId);
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        setFavorites((prev) => [...prev, productId]);
      }
    },
    [isValidId],
  );

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    const previousFavorites = [...favorites];
    setFavorites([]);

    try {
      await FavoritesAPI.syncFavorites([]);
    } catch (error) {
      console.error("Failed to clear favorites:", error);
      setFavorites(previousFavorites);
    }
  }, [favorites]);

  // Get favorite count
  const favoriteCount = favorites.length;

  // Check if product is being synced
  const isSyncing = useCallback((productId) => {
    return pendingOperations.current.has(productId);
  }, []);

  const value = {
    favorites,
    favoriteCount,
    loading,
    syncing,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isSyncing,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used within a FavoritesProvider. " +
        "Wrap your app with <FavoritesProvider>.",
    );
  }

  return context;
}

// ============================================================================
// HEART ICON COMPONENT
// ============================================================================

export function HeartIcon({
  productId,
  filled = false,
  onClick,
  size = "w-5 h-5",
  disabled = false,
  colors = {
    filled: "#ef4444",
    unfilled: "#6b7280",
    hover: "#f87171",
  },
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || !productId) return;

    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Call parent handler
    if (onClick) {
      onClick(productId);
    }
  };

  return (
    <button
      type="button"
      aria-label={filled ? "Remove from favorites" : "Add to favorites"}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md 
        hover:scale-110 transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
        ${isAnimating ? "scale-110" : ""}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`
          ${size} 
          transition-all duration-300 ease-in-out
          ${isAnimating ? "scale-125" : "scale-100"}
        `}
        fill={filled ? colors.filled : "none"}
        stroke={filled ? colors.filled : colors.unfilled}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>

      {/* Pulse effect on click */}
      {isAnimating && (
        <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping pointer-events-none" />
      )}
    </button>
  );
}

// ============================================================================
// USAGE EXAMPLE COMPONENT
// ============================================================================

export function FavoriteButton({ productId }) {
  const { isFavorite, toggleFavorite, isSyncing } = useFavorites();

  return (
    <HeartIcon
      productId={productId}
      filled={isFavorite(productId)}
      onClick={toggleFavorite}
      disabled={isSyncing(productId)}
    />
  );
}

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { UseFavorites } from "../../hooks/FavoriteContext";
import UseProduct from "../../hooks/UseProduct";
import ErrorMessage from "../utilities/Error";
import HeartIcon from "../utilities/Favorite";
import { SkeletonCard } from "../utilities/Skeleton";
import StarRating from "../utilities/StarRating";

const ITEMS_PER_PAGE = 8;

export default function ProductItems() {
  const { product: products, isloading: loading, error: error } = UseProduct();
  const { toggleFavorite, isFavorite } = UseFavorites();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're on the full menu page
  const isFullMenuPage = location.pathname === "/menu";

  const categories = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return ["All Products"];
    }
    const uniqueCats = new Set(products.map((item) => item.category));
    return ["All Products", ...Array.from(uniqueCats).sort()];
  }, [products]);

  const filteredProduct = useMemo(() => {
    if (selectedCategory === "All Products") {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }, [products, selectedCategory]);

  // Limit items if not on full menu page
  const displayedProducts = useMemo(() => {
    if (isFullMenuPage) {
      return filteredProduct;
    }
    return filteredProduct.slice(0, ITEMS_PER_PAGE);
  }, [filteredProduct, isFullMenuPage]);

  const hasMoreItems = filteredProduct.length > ITEMS_PER_PAGE;

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleFavoriteClick = (itemId) => {
    toggleFavorite(itemId);
  };

  const handleViewAll = () => {
    navigate("/menu");
  };

  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <article>
            <Typography variant="h3" className="font-bold text-gray-900">
              {isFullMenuPage ? "Full Menu" : "Our Popular Menu"}
            </Typography>
            <Typography variant="small" className="text-gray-600 mt-1">
              {isFullMenuPage
                ? "Browse all available items"
                : "Discover our curated selection"}
            </Typography>
          </article>

          {/* Filter Section */}
          <div className="w-full md:w-64">
            <Select
              label="Filter by Category"
              className="bg-white"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {/* {!loading && error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )} */}

        {/* Empty State */}
        {!loading && !error && filteredProduct.length === 0 && (
          <ErrorMessage
            title="No Products Found"
            message="Check back soon for new menu items!"
          />
        )}

        {/* Product Grid */}
        {!loading && !error && displayedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedProducts.map((item) => (
                <div
                  className="group cursor-pointer"
                  key={item.id}
                  onClick={() => handleClick(item.itemID)}
                >
                  <Card className="h-full overflow-hidden rounded-none border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <CardHeader
                      className="rounded-none shadow-none m-0 relative h-40 overflow-hidden"
                      floated={false}
                      shadow={false}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute top-2 right-3 z-10">
                        <HeartIcon
                          id={item.id}
                          filled={isFavorite(item.id)}
                          onClick={handleFavoriteClick}
                        />
                      </div>
                    </CardHeader>

                    <CardBody className="p-3 relative">
                      <Typography
                        className="text-left font-semibold text-sm text-gray-600 mb-2"
                        variant="small"
                      >
                        {item.description}
                      </Typography>

                      <div className="flex items-center">
                        <StarRating
                          initialRating={item.rating ?? 0}
                          readOnly={true}
                          allowFractional={true}
                          showMessage={false}
                          showNumeric={false}
                          ratingCount={item.ratingCount ?? 0}
                          size={18}
                          className="w-full"
                        />
                      </div>
                    </CardBody>

                    <CardFooter className="p-3 flex items-center justify-between">
                      <Typography
                        variant="small"
                        className="text-gray-700 text-base"
                      >
                        {`Ksh ${item.itemPrice}`}
                        {item.originalPrice ? (
                          <span className="line-through text-gray-500 ml-1">
                            {`Ksh ${item.originalPrice}`}
                          </span>
                        ) : null}
                      </Typography>
                      {item.badge && (
                        <span className="bg-orange-700 text-white text-sm px-2 py-1 rounded-none">
                          {item.badge}
                        </span>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>

            {/* View All Button - Only show on home page when there are more items */}
            {!isFullMenuPage && hasMoreItems && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleViewAll}
                  className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-3 rounded-none"
                >
                  View All Menu
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

const fetch = require("node-fetch");

const url =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=side%20salad&diet=vegetarian&intolerances=gluten&includeIngredients=cheese%2Cnuts&excludeIngredients=eggs&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&addRecipeInstructions=false&addRecipeNutrition=false&maxReadyTime=45&ignorePantry=true&sort=max-used-ingredients&offset=0&number=10";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}




const TESTIMONIALS = [
  {
    id: 1,
    name: "Liam Young",
    role: "ReviewCollector / CEO",
    content: "It's the best plugin for that purpose, even better than the most popular of this kind of plugin. I will recommend strongly to try, it's probably you will adopt it forever. One of the best plugins I ever try!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Emma Jackson",
    role: "Testimonial Inc. / HR",
    content: "After ages in search of a decent solution to show reviews from different sources, I found this amazing tool. The guys in TrustIndex made a brilliant job developing this easy-to-use tool. I love it!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Noah King",
    role: "BigThink / CEO",
    content: "This plugin does the job, there are various layouts available, its easy to use, install and display reviews using shortcodes. Easy to set up, lots of options and high quality design.",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "Olivia Smith",
    role: "TechFlow / CTO",
    content: "Exceptional service and outstanding results. The platform exceeded all our expectations and the integration was seamless. Highly recommend to anyone looking for quality.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5
  },
  {
    id: 5,
    name: "James Wilson",
    role: "StartupHub / Founder",
    content: "Game-changing solution for our business. The team's expertise and support made the implementation smooth and efficient. Worth every penny!",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5
  }
];


const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center gap-1 my-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3;
  const totalSlides = Math.ceil(TESTIMONIALS.length / cardsPerView);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    const startIndex = currentSlide * cardsPerView;
    return TESTIMONIALS.slice(startIndex, startIndex + cardsPerView);
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 w-full py-16 px-4">
      <Typography 
        variant="h4" 
        className="text-center text-3xl font-semibold text-white mb-12"
      >
        See what our customers say about us.
      </Typography>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className="flex-shrink-0 bg-purple-500 hover:bg-purple-400 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Previous testimonials"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
                >
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {testimonial.role}
                  </p>

                  {/* Star Rating */}
                  <StarRating rating={testimonial.rating} />

                  {/* Testimonial Content */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {testimonial.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 bg-purple-500 hover:bg-purple-400 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Next testimonials"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </button>
        </div>




        {/* Indicator Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? "bg-white w-10 h-3" 
                  : "bg-purple-300 hover:bg-purple-200 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}






 <div className="flex items-center justify-center gap-6">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            aria-label="Previous testimonials"
            className="flex-shrink-0 bg-green-500 hover:bg-green-400 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="flex-1 max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testimonials.map((testimonial) => (
                <Popover
                  key={testimonial.id}
                  open={openPopoverId === testimonial.id}
                  handler={() => {}}
                  placement="bottom"
                >
                  <PopoverHandler>
                    <div
                      onMouseEnter={() => handleMouseEnter(testimonial.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Card className="overflow-hidden rounded-lg border-0 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                        <CardHeader
                          floated={false}
                          className="h-40 m-0 rounded-none shadow-none overflow-hidden"
                        >
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </CardHeader>
                        <CardBody className="text-center p-4">
                          <Typography variant="h6" className="mb-1">
                            {testimonial.name}
                          </Typography>
                          <StarRating />
                        </CardBody>
                        <CardFooter className="pt-0 px-4 pb-4">
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {testimonial.content}
                          </p>
                        </CardFooter>
                      </Card>
                    </div>
                  </PopoverHandler>
                  <PopoverContent className="z-50 max-w-sm">
                    <div className="mb-2">
                      <Typography variant="h6" className="font-bold">
                        {testimonial.name}
                      </Typography>
                      <StarRating />
                    </div>
                    <Typography variant="small" className="text-gray-700">
                      {testimonial.content}
                    </Typography>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next testimonials"
            className="flex-shrink-0 bg-green-500 hover:bg-green-400 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>








import SelectOption from "@material-tailwind/react/components/Select/SelectOption";

export function Products() {
  const { products, isloading, error, refetch } = UseProduct();
  const isFullMenuPage = location.pathname === "/menu";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get products for current page
  const displayedProducts = useMemo(() => {
    if (!isFullMenuPage) {
      // Homepage: show only first 8
      return products.slice(0, 8);
    } else {
      // Full menu: paginate
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return products.slice(startIndex, endIndex);
    }
  }, [products, currentPage, isFullMenuPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section className="bg-gray-100 p-3 my-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <article>
            <Typography variant="h3" className="font-bold text-gray-700">
              {isFullMenuPage ? "Full Menu" : "Our Popular Menu"}
            </Typography>
            <Typography variant="small" className="text-gray-600 mt-1">
              {isFullMenuPage
                ? `Browse all ${products.length} items.`
                : "Discover our curated selection"}
            </Typography>
          </article>

          <div className="w-full md:w-64">
            <Select label="Filter">
              <SelectOption value="all">All Categories</SelectOption>
              <SelectOption value="burgers">Burgers</SelectOption>
              <SelectOption value="pizzas">Pizzas</SelectOption>
            </Select>
          </div>
        </div>

        {/* Loading state */}
        {/* {isloading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )} */}

        {/* Product grid */}
        {!isloading && !error && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedProducts.map((item) => (
                <div className="group cursor-pointer" key={item.itemID}>
                  <Card className="overflow-hidden rounded-none border-0 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardHeader
                      floated={false}
                      shadow={false}
                      className="rounded-none m-0 relative h-56 overflow-hidden"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        loading="lazy"
                        className="w-full h-full rounded-none object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50">
                        <span className="text-green-500 text-xl">&#10084;</span>
                      </div>
                    </CardHeader>

                    <CardBody className="px-4 py-3">
                      <Typography
                        variant="small"
                        className="text-gray-800 font-semibold text-left text-sm mb-2 line-clamp-2 min-h-[40px]"
                      >
                        {item.itemDescription}
                      </Typography>
                      <div className="flex items-center gap-0.5 mb-3">
                        <span className="text-yellow-500 text-base">
                          &#9733;
                        </span>
                        <span className="text-yellow-500 text-base">
                          &#9733;
                        </span>
                        <span className="text-yellow-500 text-base">
                          &#9733;
                        </span>
                        <span className="text-gray-300 text-base">&#9734;</span>
                        <span className="text-gray-300 text-base">&#9734;</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-gray-700 text-base font-semibold">
                            {`Ksh ${item.itemPrice}`}
                          </span>
                          {item.originalPrice && (
                            <span className="line-through text-gray-400 text-sm">
                              {`Ksh ${item.originalPrice}`}
                            </span>
                          )}
                        </div>

                        <span className="bg-orange-700 text-white text-xs px-2 py-1 rounded-none uppercase">
                          popular
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>

            {/* View All Button - Only on homepage */}
            {!isFullMenuPage && products.length > 8 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => (window.location.href = "/menu")}
                  className="bg-orange-700 hover:bg-orange-800 px-8 py-3 rounded-none"
                >
                  View All Menu
                </Button>
              </div>
            )}

            {/* Pagination - Only on full menu page */}
            {isFullMenuPage && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 rounded-none"
                >
                  Previous
                </Button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <Button
                        key={pageNumber}
                        size="sm"
                        variant={
                          currentPage === pageNumber ? "filled" : "outlined"
                        }
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 rounded-none ${
                          currentPage === pageNumber
                            ? "bg-orange-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  size="sm"
                  variant="outlined"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 rounded-none"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Error state */}
        {!isloading && error && (
          <div className="text-center py-12">
            <Typography variant="h5" className="text-gray-600 mb-4">
              Failed to load products
            </Typography>
            <Button onClick={refetch} className="bg-orange-700 rounded-none">
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isloading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <Typography variant="h5" className="text-gray-600">
              No products available
            </Typography>
          </div>
        )}
      </section>
    </>
  );
}





import {
  IconButton,
  Rating
} from "@material-tailwind/react";
import Model from "../common/Model";
import useProduct from "../hooks/Products";
import IsEmpty from "../utilities/EmptyState";

const ITEMS_PER_PAGE = 8;
const HOME_PAGE_LIMIT = 8; // items shown on homepage (first page only)

/**
 * @param {{ isHomePage?: boolean }} props
 * isHomePage — when true, renders only the first 8 products with no pagination controls.
 * When false (Menu page), renders full paginated list.
 */
export default function Products({ isHomePage = false }) {
  const { products, loading, error, refetch } = useProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (item) => item.category?.toLowerCase() === selectedCategory
    );
  }, [products, selectedCategory]);

  // Slice for homepage: always show first HOME_PAGE_LIMIT items, no pagination
  // Slice for menu page: paginate the full filtered list
  const displayedProducts = useMemo(() => {
    if (isHomePage) {
      return filteredProducts.slice(0, HOME_PAGE_LIMIT);
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage, isHomePage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Reset to page 1 whenever category changes
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll to top of section on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Build page number buttons — show at most 5 page numbers around current
  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    for (let i = left; i <= right; i++) range.push(i);
    return range;
  }, [currentPage, totalPages]);

  // ─── Guards ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <Model>
        <SkeletonCard />
      </Model>
    );
  }

  if (error) {
    return (
      <Model>
        <ErrorMessage
          title="OOPS!"
          message={error?.message || "An unexpected error occurred, please try again"}
          onRetry={refetch}
          height="400px"
        />
      </Model>
    );
  }

  if (products.length === 0) {
    return (
      <Model>
        <IsEmpty
          title="OOPS!"
          message="There are no items to display at the moment, please try again."
          height="400px"
          action={refetch}
        />
      </Model>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="bg-gray-100 p-3 my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="text-left">
          <Typography variant="h3" className="font-bold text-gray-700">
            Our Popular Menu
          </Typography>
          <Typography variant="paragraph" className="text-gray-600 mt-1">
            Discover our curated selection
          </Typography>
        </div>
        <div className="w-full md:w-64">
          <Select label="Filter" onChange={handleCategoryChange}>
            <SelectOption value="all">All Categories</SelectOption>
            <SelectOption value="burgers">Burgers</SelectOption>
            <SelectOption value="pizzas">Pizzas</SelectOption>
          </Select>
        </div>
      </div>

      {/* Empty filtered state */}
      {displayedProducts.length === 0 ? (
        <IsEmpty
          title="No Results"
          message="No items match the selected category."
          height="300px"
        />
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedProducts.map((item) => (
              <Card
                key={item.itemID}
                className="group cursor-pointer overflow-hidden rounded-none border-0 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader
                  className="rounded-none m-0 relative h-56 overflow-hidden"
                  floated={false}
                  shadow={false}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    loading="lazy"
                    className="w-full h-full rounded-none object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50">
                    <span className="text-green-500 text-xl">&#10084;</span>
                  </div>
                </CardHeader>

                <CardBody className="px-4 py-3">
                  <Typography
                    variant="small"
                    className="text-gray-800 font-semibold text-left text-sm mb-2 line-clamp-2"
                  >
                    {item.itemDescription}
                  </Typography>
                  <div className="flex items-center gap-0.5 mb-3">
                    <Rating unratedColor="red" ratedColor="red" />
                  </div>
                </CardBody>

                <CardFooter className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-700 text-base font-semibold">
                        {`Ksh ${item.itemPrice}`}
                      </span>
                      {item.originalPrice && (
                        <span className="line-through text-gray-400 text-sm">
                          {`Ksh ${item.originalPrice}`}
                        </span>
                      )}
                    </div>
                    <span className="bg-orange-700 text-white text-xs px-2 py-1 rounded-none uppercase">
                      popular
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination — only shown on Menu page */}
          {!isHomePage && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {/* Prev */}
              <IconButton
                variant="outlined"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-none border-gray-300"
              >
                &lsaquo;
              </IconButton>

              {/* First page + ellipsis */}
              {pageNumbers[0] > 1 && (
                <>
                  <IconButton
                    variant={currentPage === 1 ? "filled" : "text"}
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className="rounded-none"
                  >
                    1
                  </IconButton>
                  {pageNumbers[0] > 2 && (
                    <span className="px-1 text-gray-500">…</span>
                  )}
                </>
              )}

              {/* Page number range */}
              {pageNumbers.map((page) => (
                <IconButton
                  key={page}
                  variant={currentPage === page ? "filled" : "text"}
                  color={currentPage === page ? "orange" : "blue-gray"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="rounded-none"
                >
                  {page}
                </IconButton>
              ))}

              {/* Last page + ellipsis */}
              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                    <span className="px-1 text-gray-500">…</span>
                  )}
                  <IconButton
                    variant={currentPage === totalPages ? "filled" : "text"}
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="rounded-none"
                  >
                    {totalPages}
                  </IconButton>
                </>
              )}

              {/* Next */}
              <IconButton
                variant="outlined"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-none border-gray-300"
              >
                &rsaquo;
              </IconButton>
            </div>
          )}

          {/* Homepage CTA to menu */}
          {isHomePage && filteredProducts.length > HOME_PAGE_LIMIT && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outlined"
                color="orange"
                className="rounded-none px-8"
                onClick={() => (window.location.href = "/menu")}
              >
                View Full Menu ({filteredProducts.length - HOME_PAGE_LIMIT} more items)
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}



