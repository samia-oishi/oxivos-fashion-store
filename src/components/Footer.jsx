export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-semibold tracking-[0.15em]">OXIVOS</h2>
          <p className="mt-4 text-sm text-gray-300">
            Modern fashion essentials built for everyday confidence.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-300">
            <span>New Arrivals</span>
            <span>Women</span>
            <span>Men</span>
            <span>Accessories</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Support</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-gray-300">
            <span>Shipping</span>
            <span>Returns</span>
            <span>Size Guide</span>
            <span>Contact</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm text-gray-300">
            Get updates about new products and seasonal edits.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-gray-400">
        © 2026 Oxivos Fashion Store. All rights reserved.
      </div>
    </footer>
  );
};
