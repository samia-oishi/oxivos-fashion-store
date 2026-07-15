import { RouterProvider } from "react-router";
import { router } from "./routes/Router";

export const App = () => {
  return <RouterProvider router={router} />;
};
