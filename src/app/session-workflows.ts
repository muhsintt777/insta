import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService, userActions } from 'features/user';
import { AuthService, authActions } from 'features/auth';
import type { LoginParams } from 'features/auth';

const loadCurrentUser = async (dispatch: (action: unknown) => unknown) => {
  const user = await UserService.fetchCurrentUser();
  dispatch(userActions.setProfile(user));
};

export const signIn = async (
  dispatch: (action: unknown) => unknown,
  credentials: LoginParams,
) => {
  dispatch(authActions.sessionLoading());
  try {
    const token = await AuthService.login(credentials);
    dispatch(authActions.setToken(token));
    await loadCurrentUser(dispatch);
    dispatch(authActions.sessionAuthenticated());
  } catch (error) {
    dispatch(authActions.sessionFailed());
    dispatch(userActions.clearProfile());
    throw error;
  }
};

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(authActions.sessionLoading());

    try {
      const token = await AuthService.refreshAuth();
      dispatch(authActions.setToken(token));
      await loadCurrentUser(dispatch);
      dispatch(authActions.sessionAuthenticated());
    } catch (error) {
      dispatch(authActions.sessionFailed());
      dispatch(userActions.clearProfile());
      return rejectWithValue(error);
    }
  },
);

export const signOut = async (dispatch: (action: unknown) => unknown) => {
  await AuthService.signout();
  dispatch(authActions.sessionUnauthenticated());
  dispatch(userActions.clearProfile());
};

export const refreshAuthToken = async (
  dispatch: (action: unknown) => unknown,
) => {
  const token = await AuthService.refreshAuth();
  dispatch(authActions.setToken(token));
  return token;
};
