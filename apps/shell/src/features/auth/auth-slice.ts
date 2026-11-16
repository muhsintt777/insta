import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthStatus =
  | 'LOADING'
  | 'AUTHENTICATED'
  | 'UNAUTHENTICATED'
  | 'FAILED';

export interface AuthState {
  token: string | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  token: null,
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
      state.token = null;
      state.status = 'UNAUTHENTICATED';
    },
    sessionFailed: (state) => {
      state.token = null;
      state.status = 'FAILED';
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
