import { Link } from "react-router";

export const ProductCard = ({ product }) => {
  return (
    <article className="border p-4">
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square w-full object-cover"
      />
      <p className="text-sm text-gray-600">{product.category}</p>
      <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
      <p className="mt-2 text-gray-700">${product.price}</p>
      <p className="mt-3 text-sm text-gray-600">{product.description}</p>
      <Link
        to={`/products/${product.id}`}
        className="mt-4 inline-block text-sm font-medium underline"
      >
        View details
      </Link>
    </article>
  );
};
