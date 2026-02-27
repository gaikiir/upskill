import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Rating,
  Select,
  Typography,
} from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom"; // for navigation from home page
import Model from "../common/Model";
import useProduct from "../hooks/Products";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import { SkeletonCard } from "../utilities/Skeleton";

const ITEM_PER_PAGE = 8;
const Home_ITEMS_COUNT = 8; //show only 8 items on home page, rest on products page with pagination

export default function Products({ isHomePage = false }) {
  const { products, loading, error, refetch } = useProduct();
  // paginate products
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    // test filter by category if category is selected, otherwise return all
    if (selectedCategory === "All") return products;
    // filter the products by category, assuming product has a category field
    return products.filter(
      (items) => items.category?.toLowerCase() === selectedCategory,
    );
  }, [products, selectedCategory]);

  // derive current page slice – home page only ever shows `Home_ITEMS_COUNT` items
  const pagedProducts = useMemo(() => {
    if (isHomePage) {
      return filteredProducts.slice(0, Home_ITEMS_COUNT);
    }
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    return filteredProducts.slice(start, start + ITEM_PER_PAGE);
  }, [filteredProducts, currentPage, isHomePage]);

  //handle category change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // reset to first page on category change
  };

  if (loading) {
    return (
      <Model>
        <SkeletonCard />
      </Model>
    );
  }

  if (error) {
    return (
      <Model>
        <ErrorMessage
          title="OOPS!"
          message={
            error?.message || "An unexpected error occurred, please try again"
          }
          onRetry={refetch}
          height="400px"
        />
      </Model>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <Model>
        <IsEmpty
          title="OOPS!"
          message="There are no items to display at the moment, please try again."
          height="400px"
          action={refetch}
        />
      </Model>
    );
  }

  return (
    <>
      <section className="bg-gray-100 p-3 my-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="text-left">
            {isHomePage ? (
              <>
                <Typography variant="h3" className="font-bold text-gray-700">
                  Our Popular Menu
                </Typography>
                <Typography variant="paragraph" className="text-gray-600 mt-1">
                  Discover our curated selection
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h3" className="font-bold text-gray-700">
                  Our main menu
                </Typography>
                <Typography variant="paragraph" className="text-gray-600 mt-1">
                  Browse our complete menu
                </Typography>
              </>
            )}
          </div>
          {!isHomePage && (
            <div className="w-full md:w-72">
              <Select
                label="Filter by Category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <SelectOption value="All">All Categories</SelectOption>
                <SelectOption value="burgers">Burgers</SelectOption>
                <SelectOption value="pizzas">Pizzas</SelectOption>
              </Select>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pagedProducts.map((item) => (
            <Card
              key={item.itemID}
              className="group cursor-pointer overflow-hidden rounded-none border-0 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader
                className="rounded-none m-0 relative h-56 overflow-hidden"
                floated={false}
                shadow={false}
              >
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  loading={"eager"}
                  className="w-full h-full rounded-none object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50">
                  <span className="text-green-500 text-xl">&#10084;</span>
                </div>
              </CardHeader>

              <CardBody className="px-4 py-3">
                <Typography
                  variant="small"
                  className="text-gray-800 font-semibold text-left text-sm mb-2 line-clamp-2"
                >
                  {item.itemDescription}
                </Typography>
                <div className="flex items-center gap-0.5 mb-3">
                  <Rating unratedColor="red" ratedColor="red" />
                </div>
              </CardBody>

              <CardFooter className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-700 text-base font-semibold">
                      {`Ksh ${item.itemPrice}`}
                    </span>
                    {item.originalPrice && (
                      <span className="line-through text-gray-400 text-sm">
                        {`Ksh ${item.originalPrice}`}
                      </span>
                    )}
                  </div>
                  <span className="bg-orange-700 text-white text-xs px-2 py-1 rounded-none uppercase">
                    popular
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* bottom controls */}
        {isHomePage ? (
          <div className="text-center mt-6">
            <Link
              to="/menu"
              className="inline-block px-6 py-2 bg-orange-700 text-white rounded hover:bg-orange-700/90 transition-colors duration-300"
            >
              See all products
            </Link>
          </div>
        ) : (
          filteredProducts.length > ITEM_PER_PAGE && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from(
                { length: Math.ceil(filteredProducts.length / ITEM_PER_PAGE) },
                (_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1 ? "bg-gray-200" : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
          )
        )}
      </section>
    </>
  );
}
