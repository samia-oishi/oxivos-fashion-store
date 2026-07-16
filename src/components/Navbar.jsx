import { Link, NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const { totalItems } = useCart();
  const linkClass = ({ isActive }) =>
    `text-sm ${isActive ? "font-semibold text-black" : "text-gray-600"}`;

  return (
    <header className="border-b bg-white">
      <div className="border-b bg-[#f6efe6] px-4 py-2 text-center text-xs uppercase tracking-[0.2em] text-gray-700">
        Free delivery on selected new arrivals
      </div>

      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="text-center text-xl font-semibold tracking-[0.15em] sm:text-left"
        >
          OXIVOS
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({totalItems})
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
