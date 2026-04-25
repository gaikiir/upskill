import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

// No query param — this API does not support server-side search.
// All filtering is done client-side in ProductMenu.
const BASE_URL = "/api/Restaurant/items?sortbyprice=asc";

export function useProducts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const controllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(BASE_URL, {
        signal: controller.signal,
      });

      setProducts(response.data);
    } catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError") return;
      setError(err.message || "An error occurred while fetching products");
    } finally {
      if (controllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
