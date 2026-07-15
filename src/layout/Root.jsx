import { Outlet } from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Root = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
