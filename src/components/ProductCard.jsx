import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const defaultSize = product.sizes[0];
  const hasImage = product.image?.trim();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_38px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)]">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        {hasImage ? (
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[1/1] w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-[1/1] w-full items-center justify-center bg-[#f6efe6] text-sm text-gray-500">
            Product image
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
          {product.category}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="mt-3 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-gray-600"
        >
          {product.name}
        </Link>

        <p className="text-two-lines mt-2 text-xs leading-5 text-gray-600">
          {product.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 px-5 pb-5">
        <div>
          <p className="text-2xl font-semibold">৳{product.price}</p>
          <p className="mt-1 text-xs text-gray-500">Rating: {product.rating}</p>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, defaultSize)}
          disabled={!product.inStock}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:bg-[#f6efe6] hover:text-black disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
          aria-label={`Add ${product.name} to cart`}
        >
          {product.inStock ? <FaPlus /> : "Out"}
        </button>
      </div>
    </article>
  );
};
