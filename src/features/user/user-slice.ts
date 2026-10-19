import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Rootstate } from 'app/store';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';
import type { User, UserState } from './user-types';

const initialState = {
  status: 'LOADING',
  details: null,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      Object.assign(state, { status: 'LOADING', details: null });
    },
    loadFailed: (state, action: PayloadAction<string | undefined>) => {
      Object.assign(state, {
        status: 'FAILED',
        details: null,
        error: action.payload || COMMON_ERROR_MESSAGE,
      });
    },
    logout: (state) => {
      const newState: UserState = { status: 'LOGGED_OUT', details: null };
      Object.assign(state, newState);
    },
    login: (state, action: PayloadAction<User>) => {
      const newState: UserState = {
        status: 'SUCCESS',
        details: action.payload,
      };
      Object.assign(state, newState);
    },
    updateUserResourceCount: (
      state,
      action: PayloadAction<{
        type: 'increment' | 'decrement';
        key: 'postCount' | 'friendsCount';
      }>,
    ) => {
      if (state.status !== 'SUCCESS' || state.details === null) return;

      if (action.payload.type === 'increment') {
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
});

export const userActions = userSlice.actions;

export const selectUser = (state: Rootstate) => state.user;
export const selectUserStatus = (state: Rootstate) => state.user.status;

export const userReducer = userSlice.reducer;
