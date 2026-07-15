import { Outlet, useNavigation } from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Root = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {isLoading && <p className="mb-4 text-sm text-gray-600">Loading...</p>}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
