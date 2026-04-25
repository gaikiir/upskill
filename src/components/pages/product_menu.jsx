import { Typography } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Container } from "../layouts/Container";
import CardProducts from "../layouts/cardProducts";
import IsEmpty from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import Model from "../utilities/Model";
import Pagination from "../utilities/Pagination";
import { SkeletonCard } from "../utilities/Skeleton";
import Search from "../utilities/search";

const ITEMS_PER_PAGE = 8;

export default function ProductMenu() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Hook fetches all products once — no query param needed.
  // The API doesn't support server-side search, so we filter client-side below.
  const { products = [], loading, error, refetch } = useProducts();

  // Client-side filtering — runs on the already-fetched products array.
  // useMemo avoids recomputing on every render; only runs when products or
  // query actually change.
  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((item) =>
      item.itemName?.toLowerCase().includes(term),
    );
  }, [products, query]);

  //focus on press enter key or a tab and esc key 

  useEffect(()=>{

  },)

  // Pagination is computed from filteredProducts, not raw products.
  // So page count automatically adjusts when the user searches.
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1); // reset to page 1 on new search
  };

  return (
    <Container>
      {/* bg-gray-200 px-4  */}
      <div className="w-full py-12 ">
        <div className="overflow-hidden rounded-none">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Typography variant="h3" className="font-bold text-gray-800">
                Our main menu
              </Typography>
              <Typography variant="paragraph" className="mt-2 text-gray-600">
                Browse our complete menu
              </Typography>
            </div>
            <Search query={query} setQuery={handleQueryChange} />
          </div>

          <div className="mt-12">
            {loading ? (
              <Model>
                <SkeletonCard />
              </Model>
            ) : error ? (
              <Model>
                <ErrorMessage
                  message={error?.message || "Couldn't load menu products"}
                  height="400px"
                  onRetry={refetch}
                />
              </Model>
            ) : paginatedProducts.length === 0 ? (
              <Model>
                <IsEmpty
                  title="No products found"
                  message={
                    query.trim()
                      ? `No results for "${query}". Try a different search.`
                      : "This menu doesn't have any products. Check back later."
                  }
                  height="400px"
                  action={refetch}
                />
              </Model>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {paginatedProducts.map((item) => (
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

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
