import { createBrowserRouter } from "react-router";
import { Root } from "../layout/Root";
import { Cart } from "../pages/Cart";
import { ErrorPage } from "../pages/ErrorPage";
import { Home } from "../pages/Home";
import { ProductDetails } from "../pages/ProductDetails";
import { Products } from "../pages/Products";

const loadJson = async (path) => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Response("Could not load data", { status: response.status });
  }

  return response.json();
};

export const homeLoader = async () => {
  const [products, categories] = await Promise.all([
    loadJson("/products.json"),
    loadJson("/categories.json"),
  ]);

  return {
    categories,
    featuredProducts: products.filter((product) => product.isFeatured),
  };
};

export const productsLoader = async () => {
  const [products, categories] = await Promise.all([
    loadJson("/products.json"),
    loadJson("/categories.json"),
  ]);

  return { products, categories };
};

export const productDetailsLoader = async ({ params }) => {
  const products = await loadJson("/products.json");
  const product = products.find((item) => item.id === params.productId);

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return product;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
        loader: productDetailsLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);
