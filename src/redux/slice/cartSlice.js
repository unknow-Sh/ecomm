import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        toast.success("Product quantity updated in cart");
      } else {
        state.items.push({ ...product, quantity: 1 });
        toast.success("Product added to cart");
      }
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
