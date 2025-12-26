import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

const FavoriteApi = {
  async fetchFavorites() {
    try {
      const stored = localStorage.getItem("favorites");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      console.error("Failed to parse favorites from localStorage:", err);
      return [];
    }
  },

  async addFavorite(productId) {
    return new Promise((res) => {
      setTimeout(() => res({ success: true, productId }), 100);
    });
  },

  async removeFavorite(productId) {
    return new Promise((res) =>
      setTimeout(() => res({ success: true, productId }), 100)
    );
  },

  async syncFavorite(productIds) {
    return new Promise((res) => {
      setTimeout(() => res({ success: true, productIds }), 100);
    });
  },
};

// Create the context
const FavoriteContext = createContext(null);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const pendingOperation = useRef(new Set());

  // Initialize favorites from localStorage
  useEffect(() => {
    const initiatingFavorites = async () => {
      try {
        const favoriteIds = await FavoriteApi.fetchFavorites();
        setFavorites(Array.isArray(favoriteIds) ? favoriteIds : []);
      } catch (err) {
        console.log("Failed to load favorite", err);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    initiatingFavorites();
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (err) {
        console.error("Failed to save favorites to localStorage:", err);
        if (err.name === "QuotaExceededError") {
          console.warn("LocalStorage quota exceeded");
        }
      }
    }
  }, [favorites, loading]);

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

  // Toggle favorite
  const toggleFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid product ID:", productId);
        toast.error("Invalid product ID");
        return;
      }

      // Prevent duplicate operations
      if (pendingOperation.current.has(productId)) {
        return;
      }

      const isCurrentlyFavorited = favorites.includes(productId);

      setFavorites((prev) =>
        isCurrentlyFavorited
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );

      // Track pending operation
      pendingOperation.current.add(productId);

      try {
        // Sync with backend
        if (isCurrentlyFavorited) {
          await FavoriteApi.removeFavorite(productId);
          toast.success("Removed from favorites", {
            duration: 2000,
            position: "top-right",
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          });
        } else {
          await FavoriteApi.addFavorite(productId);
          toast.success("Added to favorites successfully!", {
            duration: 2000,
            position: "top-right",
            style: {
              background: "#22c55e",
              color: "#fff",
            },
          });
        }
      } catch (error) {
        console.error("Failed to sync favorite:", error);

        // Rollback on error
        setFavorites((prev) =>
          isCurrentlyFavorited
            ? [...prev, productId]
            : prev.filter((id) => id !== productId)
        );

        toast.error("Failed to update favorites. Please try again.", {
          duration: 3000,
          position: "top-right",
        });
      } finally {
        pendingOperation.current.delete(productId);
      }
    },
    [favorites, isValidId]
  );

  // Add favorite
  const addFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid Product Id", productId);
        toast.error("Invalid product ID");
        return;
      }
      if (favorites.includes(productId)) {
        return;
      }
      setFavorites((prev) => [...prev, productId]);

      try {
        await FavoriteApi.addFavorite(productId);
        toast.success("Added to favorites successfully!", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "#22c55e",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Failed to add favorite:", error);
        setFavorites((prev) => prev.filter((id) => id !== productId));
        toast.error("Failed to add favorite. Please try again.", {
          duration: 3000,
          position: "top-right",
        });
      }
    },
    [favorites, isValidId]
  );

  // Remove favorite
  const removeFavorite = useCallback(
    async (productId) => {
      if (!isValidId(productId)) {
        console.warn("Invalid product ID:", productId);
        toast.error("Invalid product ID");
        return;
      }
      setFavorites((prev) => prev.filter((id) => id !== productId));

      try {
        await FavoriteApi.removeFavorite(productId);
        toast.success("Removed from favorites", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "#ef4444",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Failed to remove favorite:", error);
        setFavorites((prev) => [...prev, productId]);
        toast.error("Failed to remove favorite. Please try again.", {
          duration: 3000,
          position: "top-right",
        });
      }
    },
    [isValidId]
  );

  // Clear all favorites
  const clearFavorites = useCallback(async () => {
    const previousFavorites = [...favorites];
    setFavorites([]);

    try {
      await FavoriteApi.syncFavorite([]);
      toast.success("All favorites cleared", {
        duration: 2000,
        position: "top-right",
      });
    } catch (error) {
      console.error("Failed to clear favorites:", error);
      setFavorites(previousFavorites);
      toast.error("Failed to clear favorites. Please try again.", {
        duration: 3000,
        position: "top-right",
      });
    }
  }, [favorites]);

  // Get favorite count
  const favoriteCount = favorites.length;

  // Check if product is being synced
  const isSyncing = useCallback((productId) => {
    return pendingOperation.current.has(productId);
  }, []);

  const value = {
    favorites,
    isFavorite,
    favoriteCount,
    clearFavorites,
    isSyncing,
    removeFavorite,
    addFavorite,
    toggleFavorite,
    syncing,
    loading,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function UseFavorites() {
  const context = useContext(FavoriteContext);

  if (!context) {
    throw new Error(
      "UseFavorites must be used within a FavoriteProvider. " +
        "Wrap your app with <FavoriteProvider>."
    );
  }

  return context;
}
