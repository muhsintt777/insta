import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// PayloadAction
import type { Rootstate } from 'configs/store';
import { COMMON_ERROR_MESSAGE } from 'configs/constants';
import { AuthService } from 'features/auth/auth-service';
import { User, UserSlice } from './user';
import { UserService } from './user-service';

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
    updateUserResourceCount: (
      state,
      action: PayloadAction<{
        type: 'increament' | 'decreament';
        key: 'postCount' | 'friendsCount';
      }>,
    ) => {
      if (state.status !== 'SUCCESS' || state.details === null) return;

      if (action.payload.type === 'increament') {
        state.details[action.payload.key] += 1;
      } else {
        state.details[action.payload.key] -= 1;
      }
    },
    editUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.status !== 'SUCCESS') return;
      state.details = { ...state.details, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialUserFetch.pending, (state) => {
        const newState: UserSlice = { status: 'LOADING', details: null };
        Object.assign(state, newState);
      })
      .addCase(
        initialUserFetch.fulfilled,
        (state, action: PayloadAction<User>) => {
          const newState: UserSlice = {
            status: 'SUCCESS',
            details: action.payload,
          };
          Object.assign(state, newState);
        },
      )
      .addCase(initialUserFetch.rejected, (state, action) => {
        const newState: UserSlice = {
          status: 'FAILED',
          details: null,
          error: action.error.message || COMMON_ERROR_MESSAGE,
        };
        Object.assign(state, newState);
      });
  },
});

export const initialUserFetch = createAsyncThunk(
  'user/initialUserFetch',
  async () => {
    await AuthService.refreshAuth();
    const result = await UserService.fetchCurrentUser();
    return result;
  },
);

export const { logout, updateUser, updateUserResourceCount, editUser } =
  userSlice.actions;

export const selectUser = (state: Rootstate) => state.user;
export const selectUserApiStatus = (state: Rootstate) => state.user.status;

export const userReducer = userSlice.reducer;
