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
          }, Invalid: ${data.length - validProducts.length}`
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
    [products]
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



import {
  createContext,
  useContext
} from "react";

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
    [favorites, isValidId]
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
          : [...prev, productId]
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
            : prev.filter((id) => id !== productId)
        );

        // Optionally show error toast to user
        // toast.error("Failed to update favorites. Please try again.");
      } finally {
        pendingOperations.current.delete(productId);
      }
    },
    [favorites, isValidId]
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
    [favorites, isValidId]
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
    [isValidId]
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
        "Wrap your app with <FavoritesProvider>."
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