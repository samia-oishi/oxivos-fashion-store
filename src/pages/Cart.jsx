import { useState } from "react";
import { motion } from "motion/react";
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
  const sectionAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

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
    <section className="bg-[#fbf7f1]">
      <motion.div
        variants={sectionAnimation}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16"
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-gray-500">
          Your order
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Cart
        </h1>

        {cartItems.length === 0 ? (
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 rounded-md bg-[#f6efe6] p-10 text-center shadow-[0_14px_35px_rgba(0,0,0,0.06)] sm:p-14"
          >
            <p className="text-lg font-medium">Your cart is empty.</p>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Explore the collection and add your favorite pieces before
              checkout.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex h-12 items-center rounded-md bg-black px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
            >
              Browse products
            </Link>
          </motion.div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <motion.div
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-5"
            >
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="rounded-md bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.06)] sm:p-5"
                >
                  <div className="grid gap-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-full rounded-md object-cover sm:h-24 sm:w-24"
                      />
                    ) : (
                      <div className="flex h-28 w-full items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500 sm:h-24 sm:w-24">
                        Product image
                      </div>
                    )}

                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Size: {item.size}
                      </p>
                      <p className="mt-2 font-medium">৳{item.price}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <div className="flex items-center rounded-md border border-[#d8c8b8]">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.cartItemId)}
                          className="h-10 w-10 text-sm transition-colors duration-200 hover:bg-[#f6efe6]"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.cartItemId)}
                          className="h-10 w-10 text-sm transition-colors duration-200 hover:bg-[#f6efe6]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-sm text-gray-500 underline transition-colors duration-200 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="self-start rounded-md bg-[#f6efe6] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:sticky lg:top-8"
            >
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="mt-5 space-y-3 py-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-semibold">৳{total}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="h-12 rounded-md bg-black px-4 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-colors duration-200 hover:bg-gray-800"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="h-12 rounded-md border border-[#d8c8b8] px-4 text-sm font-medium transition-colors duration-200 hover:border-black"
                >
                  Clear cart
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isCheckoutOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 px-4">
            <motion.div
              variants={sectionAnimation}
              initial="hidden"
              animate="visible"
              className="w-full max-w-lg rounded-md bg-white p-6 shadow-xl sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Shipping Info</h2>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="h-10 rounded-md border border-[#d8c8b8] px-4 text-sm transition-colors duration-200 hover:border-black"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleConfirmOrder} className="mt-7 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2 h-12 w-full rounded-md border border-[#d8c8b8] px-4 text-sm outline-none transition-colors duration-200 focus:border-black"
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
                    className="mt-2 h-12 w-full rounded-md border border-[#d8c8b8] px-4 text-sm outline-none transition-colors duration-200 focus:border-black"
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
                    className="mt-2 w-full rounded-md border border-[#d8c8b8] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-black"
                  />
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="h-12 rounded-md border border-[#d8c8b8] px-5 text-sm font-medium transition-colors duration-200 hover:border-black"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-12 rounded-md bg-black px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
                  >
                    Confirm order
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
