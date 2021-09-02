import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: { value: {text: ''} },
  reducers: {
    search: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { search } = searchSlice.actions;
export default searchSlice.reducer;
