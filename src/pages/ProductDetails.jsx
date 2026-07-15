import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { useCart } from "../hooks/useCart";

export const ProductDetails = () => {
  const product = useLoaderData();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <section>
      <Link to="/products" className="text-sm underline">
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="border p-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
              Product image
            </div>
          )}
          <p className="text-sm text-gray-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-xl">৳{product.price}</p>
          <p className="mt-2 text-sm text-gray-600">Rating: {product.rating}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <button
            type="button"
            onClick={() => addItem(product, selectedSize)}
            disabled={!product.inStock}
            className="mt-6 border px-4 py-2 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {product.inStock ? "Add to cart" : "Out of stock"}
          </button>
        </div>

        <div className="border p-6">
          <h2 className="text-xl font-semibold">Product Options</h2>

          <div className="mt-4">
            <h3 className="font-medium">Sizes</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border px-3 py-1 text-sm ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            {product.inStock ? "In stock" : "Currently unavailable"}
          </p>
        </div>
      </div>
    </section>
  );
};
