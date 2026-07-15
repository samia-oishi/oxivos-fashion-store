import { useLoaderData } from "react-router";
import { ProductCard } from "../components/ProductCard";

export const Products = () => {
  const { categories, products } = useLoaderData();

  return (
    <section>
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-2">Browse the current collection.</p>

      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category.id} className="border px-3 py-1 text-sm">
              {category.name}
            </span>
          ))}
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-8 text-gray-600">No products found.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
