import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// PayloadAction
import type { Rootstate } from 'configs/store';
import { User, UserSlice } from './user-types';
import { userService } from './user-service';
import { COMMON_ERROR_MESSAGE } from 'configs/constants';

const initialState = {
  status: 'LOADING',
  details: null,
} as UserSlice;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      const newState: UserSlice = { status: 'LOGGED_OUT', details: null };
      Object.assign(state, newState);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const newState: UserSlice = {
        status: 'SUCCESS',
        details: action.payload,
      };
      Object.assign(state, newState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        const newState: UserSlice = { status: 'LOADING', details: null };
        Object.assign(state, newState);
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          const newState: UserSlice = {
            status: 'SUCCESS',
            details: action.payload,
          };
          Object.assign(state, newState);
        },
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        const newState: UserSlice = {
          status: 'FAILED',
          details: null,
          error: action.error.message || COMMON_ERROR_MESSAGE,
        };
        Object.assign(state, newState);
      });
  },
});

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    const result = await userService.fetchCurrentUser();
    return result;
  },
);

export const { logout, updateUser } = userSlice.actions;

export const selectUser = (state: Rootstate) => state.user.details;
export const selectUserApiStatus = (state: Rootstate) => state.user.status;

export const userReducer = userSlice.reducer;
