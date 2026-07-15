import { Link, NavLink } from "react-router";
import { useCart } from "../hooks/useCart";

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">
          Oxivos Fashion Store
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({totalItems})</NavLink>
        </div>
      </nav>
    </header>
  );
};
