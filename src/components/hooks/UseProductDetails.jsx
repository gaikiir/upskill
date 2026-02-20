import { useEffect, useState } from "react";
import { UseProducts } from "./UseProduct";


export const ProductDetails = (productId) => {
  const {
    products: allProducts,
    loading: LoadingAll,
    error: errAll,
  } = UseProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (!productId) {
      setError("Product Id is Required");
      setLoading(false);
      return;
    }

    //wait for product to load
    if (LoadingAll) {
      setLoading(true);
      return;
    }

    // Check for errors from main products hook
    if (errAll) {
      setError(errAll);
      setLoading(false);
      return;
    }

    //find the product
    const foundProduct = Array.isArray(allProducts)
      ? allProducts.find((p) => p.id === parseInt(productId))
      : null;
    if (foundProduct) {
      setProduct(foundProduct);
      setError(null);
    } else {
      setError("Product Not found");
      setProduct(null);
    }
    setLoading(false);
  }, [productId, allProducts, LoadingAll, errAll]);
  return { product, loading, error, refetch: () => {} };
};
