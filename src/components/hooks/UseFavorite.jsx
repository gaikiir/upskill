import { useEffect, useState } from "react";

export const UseFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };
  // Add favorite
  const AddFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites((prev) => [...prev, id]);
    }
  };
  // Remove favorite
  const RemoveFavorite = (id) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };
  // Clear favorites
  const ClearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    AddFavorite,
    RemoveFavorite,
    ClearFavorites,
  };
};
