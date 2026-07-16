import { useState } from "react";
import { FaBars, FaBagShopping, FaXmark } from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const { totalItems } = useCart();
  const [isDeliveryBarOpen, setIsDeliveryBarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `text-sm transition-colors duration-200 ${
      isActive ? "font-semibold text-black" : "text-gray-600 hover:text-black"
    }`;
  const mobileLinkClass = ({ isActive }) =>
    `text-lg transition-colors duration-200 ${
      isActive ? "font-semibold text-black" : "text-gray-600 hover:text-black"
    }`;

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

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6efe6] text-lg text-black md:hidden"
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <Link
          to="/"
          className="text-xl font-semibold tracking-[0.15em]"
          onClick={() => setIsMenuOpen(false)}
        >
          OXIVOS
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f6efe6] text-lg text-black transition-colors duration-200 hover:bg-[#eadfd4]"
            aria-label="Cart"
          >
            <FaBagShopping />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#e8b425] px-1 text-xs font-semibold text-black">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>

        <NavLink
          to="/cart"
          className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f6efe6] text-lg text-black md:hidden"
          aria-label="Cart"
        >
          <FaBagShopping />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#9ccc1f] px-1 text-xs font-semibold text-black">
              {totalItems}
            </span>
          )}
        </NavLink>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />

          <div className="relative h-full w-72 bg-white px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-semibold tracking-[0.15em]"
              >
                OXIVOS
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6efe6]"
                aria-label="Close menu"
              >
                <FaXmark />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <NavLink
                to="/"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={mobileLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
