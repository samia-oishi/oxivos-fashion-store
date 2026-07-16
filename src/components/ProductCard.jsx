import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const defaultSize = product.sizes[0];
  const hasImage = product.image?.trim();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-[#e3d6c8] bg-white transition duration-200 hover:-translate-y-1">
      <div className="overflow-hidden">
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[3/4] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-[3/4] w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
            Product image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
          {product.category}
        </p>
        <h2 className="mt-2 text-lg font-semibold leading-snug">
          {product.name}
        </h2>
        <div className="mt-2 flex items-center justify-between gap-3 border-y border-[#eadfd4] py-2">
          <p className="text-lg font-semibold">৳{product.price}</p>
          <p className="text-xs text-gray-500">Rating: {product.rating}</p>
        </div>
        <p className="text-two-lines mt-3 text-sm leading-6 text-gray-600">
          {product.description}
        </p>
      </div>
      <div className="flex border-t border-[#eadfd4]">
        <Link
          to={`/products/${product.id}`}
          className="flex h-12 flex-1 items-center justify-center px-4 text-sm font-medium transition-colors duration-200 hover:bg-[#f6efe6]"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={() => addItem(product, defaultSize)}
          disabled={!product.inStock}
          className="h-12 flex-1 border-l border-[#eadfd4] bg-black px-4 text-sm font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        >
          {product.inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </article>
  );
};
