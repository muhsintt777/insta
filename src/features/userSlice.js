import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const initialState = {
  user: null,
  userInfo: {},
  userInfoStatus: null,
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
      state.userInfo = {};
      state.userInfoStatus = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.userInfoStatus = "loading";
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfoStatus = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.userInfoStatus = "failed";
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.userInfo;

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (uid) => {
    const docRef = doc(db, "users", uid);
    const response = await getDoc(docRef);
    return { ...response.data() };
  }
);

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
