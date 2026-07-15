import { RouterProvider } from "react-router";
import { CartProvider } from "./providers/CartProvider";
import { router } from "./routes/Router";

export const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};
