import { Link, useLoaderData } from "react-router";
import { ProductCard } from "../components/ProductCard";

export const Home = () => {
  const { categories, featuredProducts } = useLoaderData();

  return (
    <section>
      <h1 className="text-3xl font-semibold">Home</h1>
      <p className="mt-2">Discover the latest fashion pieces.</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Categories</h2>

        {categories.length === 0 ? (
          <p className="mt-3 text-gray-600">No categories found.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className="border p-4">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {category.description}
                </p>
                <Link
                  to={`/products?category=${category.id}`}
                  className="mt-4 inline-block text-sm font-medium underline"
                >
                  Shop {category.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium underline">
            View all
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <p className="mt-3 text-gray-600">No featured products found.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
