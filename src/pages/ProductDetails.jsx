import { Link, useLoaderData } from "react-router";

export const ProductDetails = () => {
  const product = useLoaderData();

  return (
    <section>
      <Link to="/products" className="text-sm underline">
        Back to products
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="border p-6">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
          <p className="text-sm text-gray-600">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 text-xl">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
        </div>

        <div className="border p-6">
          <h2 className="text-xl font-semibold">Product Options</h2>

          <div className="mt-4">
            <h3 className="font-medium">Sizes</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span key={size} className="border px-3 py-1 text-sm">
                  {size}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Colors</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <span key={color} className="border px-3 py-1 text-sm">
                  {color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
