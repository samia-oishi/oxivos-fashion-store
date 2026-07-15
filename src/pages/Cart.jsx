import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";

export const Cart = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const {
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    total,
  } = useCart();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setShippingInfo((currentInfo) => ({
      ...currentInfo,
      [name]: value,
    }));
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault();
    toast.success("Order confirmed");
    setIsCheckoutOpen(false);
    setShippingInfo({
      name: "",
      phone: "",
      address: "",
    });
  };

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
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(true)}
                className="border px-4 py-2"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="border px-4 py-2"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">Shipping Info</h2>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="border px-3 py-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleConfirmOrder} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full border px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full border px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Address</span>
                <textarea
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="mt-2 w-full border px-3 py-2"
                />
              </label>

              <button type="submit" className="border px-4 py-2">
                Confirm order
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
