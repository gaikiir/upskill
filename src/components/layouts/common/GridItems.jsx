import { UseProducts } from "../../hooks/useProduct";
import EmptyState from "../utilities/EmptyState";
import ErrorMessage from "../utilities/Error";
import IsLoading from "../utilities/Loading";
import CardItem from "./CardItems";

export default function GridItem() {
  const { product, loading, err, refetch } = UseProducts();

  // // Debug logging
  // console.log("GridItem state:", {
  //   productCount: product?.length,
  //   loading,
  //   hasError: !!err,
  // });

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto">
        <div className="mt-4">
          <IsLoading message="Loading products..." height="400px" />
        </div>
      </section>
    );
  }
  if (err) {
    return (
      <section className="w-full max-w-7xl mx-auto">
        <article className="mt-3">
          <ErrorMessage
            message={err}
            title="Oops! Failed to load Product"
            onRetry={() => {
              console.log("Retry button clicked!"); // Debug log
              refetch();
            }}
            height="400px"
          />
        </article>
      </section>
    );
  }
  if (!product || product.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto">
        <article>
          <EmptyState />
        </article>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 my-3 px-3 py-5">
      <CardItem product={product} />
    </section>
  );
}
