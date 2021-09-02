import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { searchReducer } from "./reducers/searchReducer";

import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./reducers/user";
import searchReducers from "./reducers/search";
import cartSlice from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    user: userReducers,
    search: searchReducers,
    cart: cartSlice,
  },
});

export const rootReducer = combineReducers({
  user: userReducer,
  query: searchReducer,
});
