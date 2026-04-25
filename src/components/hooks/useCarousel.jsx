import axios from "axios";
import { useEffect, useRef, useState } from "react";

const apiUrl = "/api/Restaurant/10/menu";

export default function useCarousel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Holds the active controller so fetchData can always reference the latest one
  const controllerRef = useRef(null);

  async function fetchData() {
    // Abort any in-flight request before starting a new one (handles refetch race)
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Fresh controller for this fetch
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(apiUrl, {
        signal: controller.signal,
      });

      setData(response.data);
    } catch (err) {
      // Abort is intentional — not a real error, don't update state
      if (axios.isCancel(err) || err.name === "CanceledError") return;

      setError(err.message || "An error occurred while fetching carousel data");
    } finally {
      // Only update loading if this controller is still the active one.
      // Prevents a slower previous fetch from clearing loading prematurely.
      if (controllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(
    function () {
      fetchData();
      return function () {
        // Abort the in-flight request on unmount
        if (controllerRef.current) {
          controllerRef.current.abort();
          console.log("carousel data successfully cleaned up");
        }
      };
    },
    [],
  );

  return { data, loading, error, refetch: fetchData };
}
