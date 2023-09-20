import { createSlice } from "@reduxjs/toolkit";
// PayloadAction
import type { Rootstate } from "configs/store";

interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
}

interface UserState {
  status: "loading" | "successfull" | "failed" | "idle";
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  status: "loading",
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.token = null;
      state.user = null;
    },
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: Rootstate) => state.user;

export const userReducer = userSlice.reducer;
