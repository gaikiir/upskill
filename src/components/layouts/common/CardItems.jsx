import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { UseFavorites } from "../../hooks/FavoriteContext";
import ErrorMessage from "../utilities/Error";
import HeartIcon from "../utilities/Favorite";
import { SkeletonCard } from "../utilities/Skeleton";
import StarRating from "../utilities/StarRating";

export default function CardItem({ products, loading, error, refetch }) {
  const { toggleFavorite, isFavorite } = UseFavorites();
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const navigate = useNavigate();

  const categories = useMemo(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return ["All Products"];
    }
    const uniqueCats = new Set(products.map((item) => item.category));
    return ["All Products", ...Array.from(uniqueCats).sort()];
  }, [products]);

  const filteredProduct = useMemo(() => {
    if (selectedCategory === "All Products") {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // HeartIcon already handles e.stopPropagation() internally
  const handleFavoriteClick = (itemId) => {
    toggleFavorite(itemId);
  };

  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <article>
            <Typography variant="h3" className="font-bold text-gray-900">
              Our Popular Menu
            </Typography>
            <Typography variant="small" className="text-gray-600 mt-1">
              Discover our curated selection
            </Typography>
          </article>

          {/* Filter Section */}
          <div className="w-full md:w-64">
            <Select
              label="Filter by Category"
              className="bg-white"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {/* Empty State */}
        {!loading && !error && filteredProduct.length === 0 && (
          <ErrorMessage
            title="No Products Found"
            message="Check back soon for new menu items!"
          />
        )}

        {/* Product Grid */}
        {!loading && !error && filteredProduct.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProduct.map((item) => (
              <div
                className="group cursor-pointer"
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <Card className="h-full overflow-hidden rounded-none border border-gray-200 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader
                    className="rounded-none shadow-none m-0 relative h-40 overflow-hidden"
                    floated={false}
                    shadow={false}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* ✅ FIXED: Removed inline arrow function, just pass the function */}
                    <div className="absolute top-2 right-3 z-10">
                      <HeartIcon
                        id={item.id}
                        filled={isFavorite(item.id)}
                        onClick={handleFavoriteClick}
                      />
                    </div>
                  </CardHeader>

                  <CardBody className="p-3 relative">
                    <Typography
                      className="text-left font-semibold text-sm text-gray-600 mb-2"
                      variant="small"
                    >
                      {item.description}
                    </Typography>

                    <div className="flex items-center">
                      <StarRating
                        initialRating={item.rating ?? 0}
                        readOnly={true}
                        allowFractional={true}
                        showMessage={false}
                        showNumeric={false}
                        ratingCount={item.ratingCount ?? 0}
                        size={18}
                        className="w-full"
                      />
                    </div>
                  </CardBody>

                  <CardFooter className="p-3 flex items-center justify-between">
                    <Typography
                      variant="small"
                      className="text-gray-700 text-base"
                    >
                      {item.price}
                      {item.originalPrice && (
                        <span className="line-through text-gray-500 ml-1">
                          {item.originalPrice}
                        </span>
                      )}
                    </Typography>
                    {item.badge && (
                      <span className="bg-orange-700 text-white text-sm px-2 py-1 rounded-none">
                        {item.badge}
                      </span>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
