import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserService, userActions } from 'features/current-user';
import { AuthService, authActions } from 'features/auth';

const loadCurrentUser = async (dispatch: (action: unknown) => unknown) => {
  const user = await UserService.fetchCurrentUser();
  dispatch(userActions.setProfile(user));
};

export const establishSession = async (
  dispatch: (action: unknown) => unknown,
) => {
  dispatch(authActions.sessionLoading());
  try {
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
      await AuthService.refreshAuth();
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

export const refreshSession = async () => {
  await AuthService.refreshAuth();
};
