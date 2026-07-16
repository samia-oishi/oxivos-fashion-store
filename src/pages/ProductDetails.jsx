import { useState } from "react";
import { motion } from "motion/react";
import { Link, useLoaderData } from "react-router";
import { useCart } from "../hooks/useCart";

export const ProductDetails = () => {
  const product = useLoaderData();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const hasImage = product.image?.trim();
  const sectionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section className="bg-[#fbf7f1]">
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16"
      >
        <Link
          to="/products"
          className="inline-flex h-10 items-center rounded-md border border-[#d8c8b8] px-4 text-sm font-medium transition-colors duration-200 hover:border-black"
        >
          Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="self-start lg:sticky lg:top-8"
          >
            <div className="overflow-hidden rounded-md border border-[#e3d6c8] bg-white">
              {hasImage ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-200 hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100 text-gray-500">
                  Product image
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="self-start rounded-md border border-[#e3d6c8] bg-white p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
                {product.category}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  product.inStock
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-[#eadfd4] py-5">
              <p className="text-3xl font-semibold">৳{product.price}</p>
              <p className="text-sm text-gray-600">Rating: {product.rating}</p>
            </div>

            <p className="mt-6 text-base leading-7 text-gray-700">
              {product.description}
            </p>

            <div className="mt-9">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                Select size
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 min-w-12 rounded-full border border-[#d8c8b8] px-5 text-sm font-medium transition-colors duration-200 ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => addItem(product, selectedSize)}
              disabled={!product.inStock}
              className="mt-9 h-12 w-full rounded-md bg-black px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </button>

            <div className="mt-8 grid gap-4 border-t border-[#eadfd4] pt-6 text-sm text-gray-600 sm:grid-cols-2">
              <p>Free delivery on selected new arrivals.</p>
              <p>Easy size selection before adding to cart.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
