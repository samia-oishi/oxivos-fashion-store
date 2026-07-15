import { createBrowserRouter } from "react-router";
import { Root } from "../layout/Root";
import { Cart } from "../pages/Cart";
import { Home } from "../pages/Home";
import { ProductDetails } from "../pages/ProductDetails";
import { Products } from "../pages/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);
