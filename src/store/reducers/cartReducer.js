import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: localStorage.getItem("cart")
    ? [JSON.parse(localStorage.getItem("cart"))]
    : [],
    total: 0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products = action.payload;
    },
    calculateTotal: (state, action)=> {
        //console.log(action.payload)
        state.total += action.payload
    }
  },
});

export const { addToCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
