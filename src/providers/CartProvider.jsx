import { useState } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, size) => {
    const cartItemId = `${product.id}-${size}`;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, cartItemId, size, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.cartItemId !== cartItemId),
    );
    toast.info("Item removed from cart");
  };

  const increaseQuantity = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (cartItemId) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const cartInfo = {
    cartItems,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    total,
    totalItems,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
};
