import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./providers/CartProvider";
import { router } from "./routes/Router";

export const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={1500} />
    </CartProvider>
  );
};
