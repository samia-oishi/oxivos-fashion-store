import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const defaultSize = product.sizes[0];

  return (
    <article className="border p-4">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
          Product image
        </div>
      )}
      <p className="text-sm text-gray-600">{product.category}</p>
      <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
      <p className="mt-2 text-gray-700">৳{product.price}</p>
      <p className="mt-1 text-sm text-gray-600">Rating: {product.rating}</p>
      <p className="mt-3 text-sm text-gray-600">{product.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          to={`/products/${product.id}`}
          className="text-sm font-medium underline"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={() => addItem(product, defaultSize)}
          disabled={!product.inStock}
          className="border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:text-gray-400"
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </article>
  );
};
