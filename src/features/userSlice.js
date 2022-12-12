import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      console.log("user logged out");
    },
  },
});

export const selectUser = (state) => state.user.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
