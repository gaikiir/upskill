import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UseFavorites } from "../hooks/UseFavorite";
import { ProductDetails } from "../hooks/UseProductDetails";
import EmptyState from "../layouts/utilities/EmptyState";
import ErrorMessage from "../layouts/utilities/Error";
import HeartIcon from "../layouts/utilities/Favorite";
import IsLoading from "../layouts/utilities/Loading";
import StarRating from "../layouts/utilities/StarRating";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error, refetch } = ProductDetails(id);
  const { toggleFavorite, isFavorite } = UseFavorites();
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <section className="bg-gray-50 w-full max-w-7xl mx-auto min-h-screen">
        <div className="mt-20">
          <IsLoading message="Loading product details..." height="400px" />
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-gray-50 w-full max-w-7xl mx-auto min-h-screen">
        <div className="mt-20">
          <ErrorMessage
            title="Failed to Load Product"
            message={error}
            height="400px"
            onRetry={refetch}
          />
          <div className="text-center mt-4">
            <Button onClick={handleBack} variant="outlined">
              Go Back
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Not found state
  if (!product) {
    return (
      <section className="bg-gray-50 w-full max-w-7xl mx-auto min-h-screen">
        <div className="mt-20">
          <EmptyState
            title="Product Not Found"
            message="The product you're looking for doesn't exist."
            height="400px"
          />
          <div className="text-center mt-4">
            <Button onClick={handleBack}>Back to Products</Button>
          </div>
        </div>
      </section>
    );
  }

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center py-8">
      <div className="max-w-6xl w-full mx-auto px-4">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="text"
          className="mb-4 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Button>

        {/* Product Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-h-[85vh] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Column - Image */}
            <div className="relative flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-md h-auto rounded-lg shadow-md object-contain"
              />
              <div className="absolute top-4 right-4">
                <HeartIcon
                  id={product.id}
                  filled={isFavorite(product.id)}
                  onClick={toggleFavorite}
                />
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-700 text-white text-sm px-3 py-1 rounded shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="flex flex-col">
              {/* Product Name */}
              <Typography variant="h3" className="text-gray-900 mb-3">
                {product.name}
              </Typography>

              {/* Rating */}
              <div className="mb-4">
                <StarRating
                  initialRating={product.rating}
                  showMessage={true}
                  size={24}
                />
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <Typography variant="h4" className="text-gray-900 font-bold">
                    ${product.price}
                  </Typography>
                  {product.originalPrice && (
                    <>
                      <Typography
                        variant="h6"
                        className="line-through text-gray-500"
                      >
                        ${product.originalPrice}
                      </Typography>
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-semibold">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <Typography className="text-gray-700 text-left mb-6 leading-relaxed">
                {product.description}
              </Typography>

              {/* Category & Stock */}
              <div className="mb-6 space-y-2 text-left">
                <Typography variant="small" className="text-gray-600">
                  Category:{" "}
                  <span className="font-semibold text-gray-800">
                    {product.category}
                  </span>
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Availability:{" "}
                  <span
                    className={`font-semibold ${
                      product.inStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </Typography>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6 text-left">
                <Typography
                  variant="small"
                  className="text-gray-700 mb-2 font-semibold"
                >
                  Quantity:
                </Typography>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography className="w-12 mb-5 text-center font-semibold text-lg">
                    {quantity}
                  </Typography>
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outlined"
                  className="flex-1"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
