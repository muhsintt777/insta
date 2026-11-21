import type { AuthSessionStatus } from '@insta/contracts';
import { createSlice } from '@reduxjs/toolkit';

export type AuthStatus = AuthSessionStatus;

export interface AuthState {
  status: AuthStatus;
}

const initialState: AuthState = {
  status: 'LOADING',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionLoading: (state) => {
      state.status = 'LOADING';
    },
    sessionAuthenticated: (state) => {
      state.status = 'AUTHENTICATED';
    },
    sessionUnauthenticated: (state) => {
      state.status = 'UNAUTHENTICATED';
    },
    sessionFailed: (state) => {
      state.status = 'FAILED';
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
