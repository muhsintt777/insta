import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userInfo: {},
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
      state.userInfo = null;
      console.log("user logged out");
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.userInfo;

export const { login, logout, addUserInfo } = userSlice.actions;

export default userSlice.reducer;
