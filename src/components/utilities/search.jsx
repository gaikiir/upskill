import { Input } from "@material-tailwind/react";

export default function Search({ query, setQuery }) {
  return (
    <div className="w-full max-w-lg">
      <Input
        placeholder="Search products..."
        label="Search here"
        size="lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-14 rounded-2xl border border-gray-300 bg-white"
      />
    </div>
  );
}
