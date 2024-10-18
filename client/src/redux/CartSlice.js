import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: JSON.parse(localStorage.getItem("cart")) || [],
};

// card slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const product = action.payload;

      const productExists = state.carts.find(
        (item) => item._id === product._id
      );

      if (productExists) {
        // If product exists, update its quantity
        state.carts = state.carts.map((item) =>
          item._id === product._id ? { ...item, qnty: item.qnty + 1 } : item
        );
      } else {
        // If it's a new product, add it to the cart
        state.carts.push({ ...product, qnty: 1 });
      }
    },

    // remove particular items
    removeToCart: (state, action) => {
      const data = state.carts.filter((ele) => ele._id !== action.payload);
      state.carts = data;
    },

    removeSingleItems: (state, action) => {
      const itemIndex = state.carts.findIndex(
        (item) => item._id === action.payload // Using the ID passed to identify the item
      );

      if (itemIndex !== -1) {
        // Check if the item exists in the cart
        if (state.carts[itemIndex].qnty > 1) {
          state.carts[itemIndex].qnty -= 1; // Decrease quantity if greater than 1
        } else {
          // Remove item if quantity is 1
          state.carts.splice(itemIndex, 1);
        }
      } else {
        console.warn(`Item with ID ${action.payload} not found in cart`); // Debugging line
      }
    },

    // clear cart
    emptycartIteam: (state, action) => {
      state.carts = [];
    },

    setCart: (state, action) => {
      state.carts = action.payload;
    },
  },
});

export const {
  addToCart,
  removeToCart,
  removeSingleItems,
  emptycartIteam,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
