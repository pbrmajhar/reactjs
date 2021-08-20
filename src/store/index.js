import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import { searchReducer } from "./reducers/searchReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  query: searchReducer,
});
