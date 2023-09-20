import { createSlice } from "@reduxjs/toolkit";
// PayloadAction
import type { Rootstate } from "configs/store";
import { User } from "utils/types";

interface InitialState {
  status: "loading" | "successfull" | "failed" | "idle";
  user: User | null;
  token: string | null;
}

const initialState: InitialState = {
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
