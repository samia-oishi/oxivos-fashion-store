import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [isDeliveryBarOpen, setIsDeliveryBarOpen] = useState(true);
  const linkClass = ({ isActive }) =>
    `text-sm ${isActive ? "font-semibold text-black" : "text-gray-600"}`;

  return (
    <header className="bg-white shadow-[0_8px_22px_rgba(0,0,0,0.04)]">
      {isDeliveryBarOpen && (
        <div className="relative bg-[#f6efe6] px-10 py-2 text-center text-xs uppercase tracking-[0.2em] text-gray-700">
          Free delivery on selected new arrivals
          <button
            type="button"
            onClick={() => setIsDeliveryBarOpen(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-base leading-none text-gray-500 transition-colors duration-200 hover:text-black"
            aria-label="Close delivery message"
          >
            ×
          </button>
        </div>
      )}

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
            Shop
          </NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart ({totalItems})
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
