import { UseProducts } from "../../hooks/UseProduct";
import CardItem from "./CardItems";

export default function GridItem() {
  const { products, loading, error, refetch } = UseProducts();

  return (
    <section className="bg-gray-50 my-3 px-3 py-5">
      <CardItem
        products={products || []} 
        loading={loading}
        error={error}
        refetch={refetch}
      />
    </section>
  );
}
