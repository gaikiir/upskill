import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const apiUrl =
  "https://fakerestaurantapi.runasp.net/api/Restaurant/items?sortbyprice=asc";
const proxyUrl = "https://corsproxy.io?" + encodeURIComponent(apiUrl);
export default function useProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const controllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    // create a fresh controller for each fetch and save it for cleanup
    const controller = new AbortController();
    // abort previous request (if any) to avoid overlaps
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const respond = await axios.get(proxyUrl, {
        timeout: 10000, // 10 second timeout
        signal: controller.signal,
      });

      // If another fetch started or the component unmounted, ignore this response
      if (controllerRef.current !== controller) return;

      // Validate response shape
      if (!respond?.data || !Array.isArray(respond.data)) {
        throw new Error("Invalid response data");
      }

      setProducts(respond.data);
      console.log("Products fetched successfully:", respond.data);
    } catch (err) {
      // Detect cancellations (Axios CanceledError / AbortController cancellations)
      const isCanceled =
        (axios.isCancel && axios.isCancel(err)) ||
        err?.name === "CanceledError" ||
        err?.code === "ERR_CANCELED";

      if (isCanceled) {
        // If this was the active request, clear its loading state and silently return
        if (controllerRef.current === controller) setLoading(false);
        return;
      }

      // Normalize error message safely and only set error if this is still the active request
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch products";
      if (controllerRef.current === controller) setError(message);
      console.error(err);
    } finally {
      // Only clear loading for the request that is still current
      if (controllerRef.current === controller) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    return () => {
      // abort the most recent request on unmount
      if (controllerRef.current) controllerRef.current.abort();
      console.log("you have successfully cleanUp",)
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
