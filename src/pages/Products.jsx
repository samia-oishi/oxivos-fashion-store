import { Link, useLoaderData, useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";

export const Products = () => {
  const { categories, products } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchText = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  const activeCategory = categories.find(
    (category) => category.id === selectedCategory,
  );
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });
  const visibleProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortBy === "price-low") {
      return firstProduct.price - secondProduct.price;
    }

    if (sortBy === "price-high") {
      return secondProduct.price - firstProduct.price;
    }

    if (sortBy === "rating") {
      return secondProduct.rating - firstProduct.rating;
    }

    return 0;
  });

  const updateSearchParams = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    setSearchParams(nextParams);
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-2">
        {activeCategory
          ? `Browse ${activeCategory.name.toLowerCase()} products.`
          : "Browse the current collection."}
      </p>

      {categories.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/products"
            className={`border px-3 py-1 text-sm ${
              !selectedCategory ? "bg-black text-white" : ""
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className={`border px-3 py-1 text-sm ${
                selectedCategory === category.id ? "bg-black text-white" : ""
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label>
          <span className="text-sm font-medium">Search products</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) =>
              updateSearchParams("search", event.target.value)
            }
            placeholder="Search by name"
            className="mt-2 w-full border px-3 py-2"
          />
        </label>

        <label>
          <span className="text-sm font-medium">Sort products</span>
          <select
            value={sortBy}
            onChange={(event) => updateSearchParams("sort", event.target.value)}
            className="mt-2 w-full border px-3 py-2"
          >
            <option value="">Default</option>
            <option value="price-low">Price low to high</option>
            <option value="price-high">Price high to low</option>
            <option value="rating">Highest rating</option>
          </select>
        </label>
      </div>

      {visibleProducts.length === 0 ? (
        <p className="mt-8 text-gray-600">No products found.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
