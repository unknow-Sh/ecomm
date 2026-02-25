"use client";

import { addToCart } from "@/redux/slice/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ProductList = async ({ products }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to the dashboard! Here you can manage your products and
          orders.
        </p>
      </div>
      <div className="p-4 flex flex-wrap-4 gap-4">
        {products.map((product) => (
          <>
            <div
              key={product._id}
              className="bg-gray-100 shadow-md rounded-lg p-6"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <h2 className="text-red-500 mb-2">${product.price}</h2>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add To Cart
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ProductList;
