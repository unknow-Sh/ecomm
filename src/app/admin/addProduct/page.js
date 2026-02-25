"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "imageUrl") {
      setFormData({ ...formData, imageUrl: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fs = new FormData();

      fs.append("name", formData.name);
      fs.append("price", formData.price);
      fs.append("description", formData.description);
      fs.append("imageUrl", formData.imageUrl);

      const res = await axios.post("/api/product", fs, {
        withCredentials: true,
      });
      if (res) {
        toast(res.data.message);
      } else {
        toast(res.data.message || "Failed to add product");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Product
        </h1>
        <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter product price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Image URL
              </label>
              <input
                type="file"
                name="imageUrl"
                onChange={handleChange}
                placeholder="Enter product image URL"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 active:scale-[0.98] transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
