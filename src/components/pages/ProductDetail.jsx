import { useMemo } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function ProductDetail() {
  const context = useOutletContext() || {};
  const contextProducts = context.products || [];
  const contextLoading = context.loading || false;

  const { products: fetchedProducts = [], loading: fetchedLoading = false } =
    useProducts();
  const products =
    contextProducts.length > 0 ? contextProducts : fetchedProducts;
  const loading = contextProducts.length > 0 ? contextLoading : fetchedLoading;

  const { productId } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((item) => String(item.itemID) === String(productId)),
    [products, productId],
  );

  const closeOverlay = () => navigate("/menu");

  if (loading) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={closeOverlay}
    >
      <div
        className="relative w-full max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={closeOverlay}
          className="absolute right-4 top-4 rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
        >
          Close
        </button>
        {!product ? (
          <div>
            <h2 className="text-2xl font-semibold mb-3">Product not found</h2>
            <p className="text-gray-600 mb-4">
              We could not find that item. Please try again.
            </p>
            <button
              onClick={closeOverlay}
              className="rounded bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              Go back
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <img
              src={product.imageUrl}
              alt={product.itemName}
              className="h-80 w-full rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.itemName}</h1>
              <p className="text-gray-600 mb-4">{product.itemDescription}</p>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                Ksh {product.itemPrice}
                {product.originalPrice && (
                  <span className="ml-2 text-gray-400 line-through text-base">
                    Ksh {product.originalPrice}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Category:</strong>{" "}
                {product.categoryName || "Uncategorized"}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Item ID:</strong> {product.itemID}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
