import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService } from 'features/user/user-service';
import { userActions } from 'features/user/user-slice';
import { AuthService } from './auth-service';
import type { LoginParams } from './auth-service';
import { authActions } from './auth-slice';

const loadCurrentUser = async (dispatch: (action: unknown) => unknown) => {
  const user = await UserService.fetchCurrentUser();
  dispatch(userActions.login(user));
};

export const signIn = async (
  dispatch: (action: unknown) => unknown,
  credentials: LoginParams,
) => {
  const token = await AuthService.login(credentials);
  dispatch(authActions.setToken(token));
  await loadCurrentUser(dispatch);
};

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(userActions.startLoading());

    try {
      const token = await AuthService.refreshAuth();
      dispatch(authActions.setToken(token));
      await loadCurrentUser(dispatch);
    } catch (error) {
      dispatch(userActions.loadFailed());
      return rejectWithValue(error);
    }
  },
);
