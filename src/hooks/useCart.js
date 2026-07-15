import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const cartInfo = useContext(CartContext);

  if (!cartInfo) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cartInfo;
};
