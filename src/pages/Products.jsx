import { motion } from "motion/react";
import { FaSearch } from "react-icons/fa";
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
  const sectionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };
  const gridAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };
  const cardAnimation = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };
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
    <section className="bg-[#fbf7f1]">
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-gray-500">
          Shop the edit
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Products
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">
          {activeCategory
            ? `Browse ${activeCategory.name.toLowerCase()} products selected for everyday styling.`
            : "Browse refined pieces across clothing, accessories, and footwear."}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
          <motion.aside
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="self-start rounded-md border border-[#e3d6c8] bg-[#f6efe6] p-5 lg:sticky lg:top-8"
          >
            <h2 className="text-lg font-semibold">Filters</h2>

            {categories.length > 0 && (
              <div className="mt-7">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Categories
                </h3>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to={getFilterUrl("category", "")}
                    className={`flex h-11 items-center rounded-md border border-[#d8c8b8] px-4 text-sm transition-colors duration-200 ${
                      !selectedCategory
                        ? "bg-black text-white"
                        : "bg-white/60 text-gray-700 hover:border-black"
                    }`}
                  >
                    All
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={getFilterUrl("category", category.id)}
                      className={`flex h-11 items-center rounded-md border border-[#d8c8b8] px-4 text-sm transition-colors duration-200 ${
                        selectedCategory === category.id
                          ? "bg-black text-white"
                          : "bg-white/60 text-gray-700 hover:border-black"
                      }`}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-[#e3d6c8] pt-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Price
              </h3>
              <div className="mt-4">
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>৳{selectedMinPrice}</span>
                  <span>৳{selectedMaxPrice}</span>
                </div>

                <div className="relative mt-5 h-7">
                  <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-[#e1d7cc]" />
                  <div
                    className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-black"
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
                    className="price-range absolute inset-0 z-10 h-7 w-full appearance-none bg-transparent"
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
                    className="price-range absolute inset-0 z-20 h-7 w-full appearance-none bg-transparent"
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
                    className="mt-4 text-sm underline"
                  >
                    Clear price
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-[#e3d6c8] pt-7">
              <Link
                to={getFilterUrl(
                  "newArrival",
                  selectedNewArrival ? "" : "true",
                )}
                className={`flex h-11 items-center rounded-md border border-[#d8c8b8] px-4 text-sm transition-colors duration-200 ${
                  selectedNewArrival
                    ? "bg-black text-white"
                    : "bg-white/60 text-gray-700 hover:border-black"
                }`}
              >
                New arrivals
              </Link>
            </div>
          </motion.aside>

          <div>
            <motion.div
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 rounded-md border border-[#e3d6c8] bg-[#f6efe6] p-5 sm:grid-cols-2"
            >
              <label>
                <span className="text-sm font-medium">Search products</span>
                <div className="relative mt-2">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
                  <input
                    type="search"
                    value={searchText}
                    onChange={(event) =>
                      updateSearchParams("search", event.target.value)
                    }
                    placeholder="Search by name"
                    className="h-12 w-full rounded-md border border-[#d8c8b8] bg-white px-4 pl-10 text-sm outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-black"
                  />
                </div>
              </label>

              <label>
                <span className="text-sm font-medium">Sort products</span>
                <select
                  value={sortBy}
                  onChange={(event) =>
                    updateSearchParams("sort", event.target.value)
                  }
                  className="mt-2 h-12 w-full rounded-md border border-[#d8c8b8] bg-white px-4 text-sm outline-none transition-colors duration-200 focus:border-black"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price low to high</option>
                  <option value="price-high">Price high to low</option>
                  <option value="rating">Highest rating</option>
                </select>
              </label>
            </motion.div>

            {visibleProducts.length === 0 ? (
              <motion.div
                variants={sectionAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-8 rounded-md border border-[#e3d6c8] bg-white p-10 text-center"
              >
                <p className="text-gray-600">No products found.</p>
              </motion.div>
            ) : (
              <motion.div
                variants={gridAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-8 grid items-stretch gap-7 sm:grid-cols-2 xl:grid-cols-3"
              >
                {visibleProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={cardAnimation}
                    className="h-full"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
