import { Link, useLoaderData, useSearchParams } from "react-router";
import { ProductCard } from "../components/ProductCard";

export const Products = () => {
  const { categories, products } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const lowestPrice = Math.min(...products.map((product) => product.price));
  const highestPrice = Math.max(...products.map((product) => product.price));
  const selectedCategory = searchParams.get("category");
  const selectedMinPrice = Number(searchParams.get("minPrice")) || lowestPrice;
  const selectedMaxPrice = Number(searchParams.get("maxPrice")) || highestPrice;
  const selectedNewArrival = searchParams.get("newArrival") === "true";
  const searchText = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  const minPricePercent =
    ((selectedMinPrice - lowestPrice) / (highestPrice - lowestPrice)) * 100;
  const maxPricePercent =
    ((selectedMaxPrice - lowestPrice) / (highestPrice - lowestPrice)) * 100;
  const activeCategory = categories.find(
    (category) => category.id === selectedCategory,
  );
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesPrice =
      product.price >= selectedMinPrice && product.price <= selectedMaxPrice;
    const matchesNewArrival = selectedNewArrival ? product.newArrival : true;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return (
      matchesCategory && matchesPrice && matchesNewArrival && matchesSearch
    );
  });
  const visibleProducts = [...filteredProducts].sort(
    (firstProduct, secondProduct) => {
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
    },
  );

  const updateSearchParams = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    setSearchParams(nextParams);
  };

  const updatePriceParams = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);
    const priceValue = Number(value);
    const nextMinPrice =
      name === "minPrice"
        ? Math.min(priceValue, selectedMaxPrice)
        : selectedMinPrice;
    const nextMaxPrice =
      name === "maxPrice"
        ? Math.max(priceValue, selectedMinPrice)
        : selectedMaxPrice;

    if (nextMinPrice === lowestPrice) {
      nextParams.delete("minPrice");
    } else {
      nextParams.set("minPrice", String(nextMinPrice));
    }

    if (nextMaxPrice === highestPrice) {
      nextParams.delete("maxPrice");
    } else {
      nextParams.set("maxPrice", String(nextMaxPrice));
    }

    setSearchParams(nextParams);
  };

  const getFilterUrl = (name, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(name, value);
    } else {
      nextParams.delete(name);
    }

    const queryString = nextParams.toString();

    return queryString ? `/products?${queryString}` : "/products";
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold">Products</h1>
      <p className="mt-2">
        {activeCategory
          ? `Browse ${activeCategory.name.toLowerCase()} products.`
          : "Browse the current collection."}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="self-start border p-4 lg:sticky lg:top-6">
          <h2 className="text-lg font-semibold">Filters</h2>

          {categories.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium">Categories</h3>
              <div className="mt-3 flex flex-col gap-2">
                <Link
                  to={getFilterUrl("category", "")}
                  className={`border px-3 py-2 text-sm ${
                    !selectedCategory ? "bg-black text-white" : ""
                  }`}
                >
                  All
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={getFilterUrl("category", category.id)}
                    className={`border px-3 py-2 text-sm ${
                      selectedCategory === category.id
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-medium">Price</h3>
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>৳{selectedMinPrice}</span>
                <span>৳{selectedMaxPrice}</span>
              </div>

              <div className="relative mt-4 h-6">
                <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-gray-200" />
                <div
                  className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-red-500"
                  style={{
                    left: `${minPricePercent}%`,
                    right: `${100 - maxPricePercent}%`,
                  }}
                />
                <input
                  type="range"
                  min={lowestPrice}
                  max={highestPrice}
                  step="100"
                  value={selectedMinPrice}
                  onChange={(event) =>
                    updatePriceParams("minPrice", event.target.value)
                  }
                  className="price-range absolute inset-0 z-10 h-6 w-full appearance-none bg-transparent"
                  aria-label="Minimum price"
                />
                <input
                  type="range"
                  min={lowestPrice}
                  max={highestPrice}
                  step="100"
                  value={selectedMaxPrice}
                  onChange={(event) =>
                    updatePriceParams("maxPrice", event.target.value)
                  }
                  className="price-range absolute inset-0 z-20 h-6 w-full appearance-none bg-transparent"
                  aria-label="Maximum price"
                />
              </div>

              {(selectedMinPrice !== lowestPrice ||
                selectedMaxPrice !== highestPrice) && (
                <button
                  type="button"
                  onClick={() => {
                    const nextParams = new URLSearchParams(searchParams);
                    nextParams.delete("minPrice");
                    nextParams.delete("maxPrice");
                    setSearchParams(nextParams);
                  }}
                  className="mt-3 text-sm underline"
                >
                  Clear price
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Link
              to={getFilterUrl("newArrival", selectedNewArrival ? "" : "true")}
              className={`block border px-3 py-2 text-sm ${
                selectedNewArrival ? "bg-black text-white" : ""
              }`}
            >
              New arrivals
            </Link>
          </div>
        </aside>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
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
                onChange={(event) =>
                  updateSearchParams("sort", event.target.value)
                }
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
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
