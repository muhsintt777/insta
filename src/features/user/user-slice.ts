import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';
import type { User, UserState } from './user-types';

const initialState = {
  details: null,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.details = null;
    },
    setProfile: (state, action: PayloadAction<User>) => {
      state.details = action.payload;
    },
    updateUserResourceCount: (
      state,
      action: PayloadAction<{
        type: 'increment' | 'decrement';
        key: 'postCount' | 'friendsCount';
      }>,
    ) => {
      if (!state.details) return;

      if (action.payload.type === 'increment') {
        state.details[action.payload.key] += 1;
      } else {
        state.details[action.payload.key] -= 1;
      }
    },
    editUser: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.details) return;
      state.details = { ...state.details, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export const userReducer = userSlice.reducer;
