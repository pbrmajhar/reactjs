import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { _id: "", name: "", email: "", role: "", token: "" }},
  reducers: {
    loginReducer : (state, action) => {
          state.value = action.payload
      },
      logoutReducer: (state) => {
        state.value = {}
      }
  }, 
});

export const {loginReducer, logoutReducer} = userSlice.actions
export default userSlice.reducer