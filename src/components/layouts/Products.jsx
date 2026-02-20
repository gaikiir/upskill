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
import { useState } from "react";
import Model from "../common/Model";
import useProduct from "../hooks/Products";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import { SkeletonCard } from "../utilities/Skeleton";

export default function Products() {
  const { products, loading, error, refetch } = useProduct();

  const [currentPage, setCurrentPage] = useState(0);

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

  if (products.length === 0) {
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
            <Typography variant="h3" className="font-bold text-gray-700">
              Our Popular Menu
            </Typography>
            <Typography variant="paragraph" className="text-gray-600 mt-1">
              Discover our curated selection
            </Typography>
          </div>
          <div className="w-full md:w-64">
            <Select label="Filter">
              <SelectOption value="all">All Categories</SelectOption>
              <SelectOption value="burgers">Burgers</SelectOption>
              <SelectOption value="pizzas">Pizzas</SelectOption>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((item) => (
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
      </section>
    </>
  );
}
