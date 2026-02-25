"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });
      if (res) {
        toast.success(res.data.message);
        router.push("/dashboard");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
          {" "}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enter Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition mb-4"
            />
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enter Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition mb-6"
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
