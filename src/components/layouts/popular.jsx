import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import Model from "../utilities/Model";
import { SkeletonCard } from "../utilities/Skeleton";
import CardProducts from "./cardProducts";

const Home_ITEMS_COUNT = 8; // show only 6 items on home page, rest on products page with pagination

export default function PopularProducts() {
  const { products, loading, error, refetch } = useProducts();
  const navigate = useNavigate();
  // Slice products to show only first 6 items
  const displayedProducts = products.slice(0, Home_ITEMS_COUNT);

  return (
    <>
      {/* bg-gray-200  */}
      <div className="w-full py-12 ">
        <div className="flex flex-col items-center gap-4 text-left">
          <Typography
            variant="h3"
            className="font-bold text-gray-700 text-3xl md:text-4xl"
          >
            Our Popular Menu
          </Typography>
          <Typography
            variant="paragraph"
            className="text-base font-bold text-gray-600 mt-2 "
          >
            Discover our curated selection
          </Typography>
        </div>

        {loading ? (
          <Model>
            <SkeletonCard />
            <SkeletonCard />
          </Model>
        ) : error ? (
          <Model>
            <ErrorMessage
              message={
                error?.message ||
                "An unexpected error occurred, please try again"
              }
              onRetry={refetch}
              height="400px"
            />
          </Model>
        ) : displayedProducts.length === 0 ? (
          <Model>
            <IsEmpty
              title="OOPS!"
              message="There are no items to display at the moment, please try again."
              height="400px"
              action={refetch}
            />
          </Model>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 w-full">
            {displayedProducts.map((item) => (
              <CardProducts
                key={item.itemID}
                urlImage={item.imageUrl}
                alt={item.itemName}
                itemDescription={item.itemDescription}
                itemName={item.itemName}
                rating={item.rating}
                premium={item.premium}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded"
          >
            See All
          </Button>
        </div>
      </div>
    </>
  );
}
