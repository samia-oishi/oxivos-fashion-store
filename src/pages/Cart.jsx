import { Link } from "react-router";
import { useCart } from "../hooks/useCart";

export const Cart = () => {
  const {
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    total,
  } = useCart();

  return (
    <section>
      <h1 className="text-3xl font-semibold">Cart</h1>

      {cartItems.length === 0 ? (
        <div className="mt-6">
          <p>Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-block underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-6">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="border p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">৳{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.cartItemId)}
                      className="border px-3 py-1"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.cartItemId)}
                      className="border px-3 py-1"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      className="border px-3 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border p-4">
            <p className="text-xl font-semibold">Total: ৳{total}</p>
            <button
              type="button"
              onClick={clearCart}
              className="mt-4 border px-4 py-2"
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
