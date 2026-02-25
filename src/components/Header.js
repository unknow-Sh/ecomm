"use client";

import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Ecommerce</h1>
            <div className="flex items-center gap-3">
              <a href="/" className="px-3 py-2 hover:bg-gray-700 rounded">
                Home
              </a>
              <a href="/about" className="px-3 py-2 hover:bg-gray-700 rounded">
                About
              </a>
              <a
                href="/contact"
                className="px-3 py-2 hover:bg-gray-700 rounded"
              >
                Contact
              </a>
              <span className="px-3 py-2 bg-blue-600 rounded">
                Cart: {totalQty}
              </span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
