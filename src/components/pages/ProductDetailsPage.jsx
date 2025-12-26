import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UseFavorites } from "../hooks/FavoriteContext";
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
  const [userRating, setUserRating] = useState(0);
  const [hasUserRated, setHasUserRated] = useState(false);

  // Update user rating when product loads
  useEffect(() => {
    if (product?.id) {
      // Load user's previous rating from localStorage
      const savedRating = localStorage.getItem(`rating_${product.id}`);
      if (savedRating) {
        setUserRating(parseFloat(savedRating));
        setHasUserRated(true);
      }
    }
  }, [product]);

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
    ? (() => {
        const original = parseFloat(product.originalPrice.replace(/[^\d.-]/g, ""));
        const current = parseFloat(product.price.replace(/[^\d.-]/g, ""));
        if (!original || original <= 0) return 0;
        return Math.round(((original - current) / original) * 100);
      })()
    : 0;

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 md:py-12">
      <div className="max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {/* Back Button */}
        <Button
          onClick={handleBack}
          variant="text"
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-6 md:p-8 lg:p-12">
            {/* Left Column - Image */}
            <div className="relative group">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square flex items-center justify-center p-4 md:p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 right-4 z-10">
                <HeartIcon
                  id={product.id}
                  filled={isFavorite(product.id)}
                  onClick={toggleFavorite}
                />
              </div>
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white text-xs md:text-sm px-4 py-2 rounded-full shadow-lg font-semibold uppercase tracking-wide">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Product Name */}
                <Typography variant="h2" className="text-gray-900 mb-4 font-bold leading-tight">
                  {product.name}
                </Typography>

                {/* Rating */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-3">
                    <Typography variant="small" className="text-gray-600 font-semibold mb-2 block">
                      Your Rating
                    </Typography>
                    <StarRating
                      initialRating={userRating}
                      showMessage={true}
                      showNumeric={true}
                      ratingCount={hasUserRated ? 1 : null}
                      size={32}
                      allowFractional={false}
                      readOnly={false}
                      color="#fbbf24"
                      onRate={(rating) => {
                        setUserRating(rating);
                        setHasUserRated(true);
                        // Save to localStorage
                        if (product?.id) {
                          localStorage.setItem(`rating_${product.id}`, rating.toString());
                        }
                        // Here you can add API call to save the rating to backend
                        console.log("User rated:", rating, "for product:", product?.id);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <Typography variant="small" className="text-gray-500 mb-2 block">
                      Average Rating
                    </Typography>
                    <StarRating
                      initialRating={product.rating}
                      showMessage={false}
                      showNumeric={true}
                      ratingCount={null}
                      size={24}
                      allowFractional={true}
                      readOnly={true}
                      color="#fbbf24"
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <Typography variant="h3" className="text-gray-900 font-bold">
                      {product.price}
                    </Typography>
                    {product.originalPrice && (
                      <>
                        <Typography
                          variant="h6"
                          className="line-through text-gray-400"
                        >
                          {product.originalPrice}
                        </Typography>
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-3 py-1.5 rounded-full font-bold shadow-md">
                          Save {discountPercent}%
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <Typography className="text-gray-700 text-base leading-relaxed">
                    {product.description}
                  </Typography>
                </div>

                {/* Category & Stock */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Typography variant="small" className="text-gray-500 mb-1">
                      Category
                    </Typography>
                    <Typography variant="small" className="font-semibold text-gray-800">
                      {product.category}
                    </Typography>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Typography variant="small" className="text-gray-500 mb-1">
                      Availability
                    </Typography>
                    <Typography
                      variant="small"
                      className={`font-semibold ${
                        product.inStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <Typography
                    variant="small"
                    className="text-gray-700 mb-3 font-semibold block"
                  >
                    Quantity
                  </Typography>
                  <div className="flex items-center gap-4">
                    <Button
                      size="md"
                      variant="outlined"
                      className="min-w-[48px] h-12 rounded-lg border-2"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <span className="text-xl font-bold">−</span>
                    </Button>
                    <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200">
                      <Typography className="font-bold text-lg text-gray-900">
                        {quantity}
                      </Typography>
                    </div>
                    <Button
                      size="md"
                      variant="outlined"
                      className="min-w-[48px] h-12 rounded-lg border-2"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!product.inStock}
                    >
                      <span className="text-xl font-bold">+</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                <Button
                  size="lg"
                  variant="outlined"
                  className="flex-1 h-14 text-base font-semibold border-2 hover:bg-gray-50"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
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
