import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'modules/user';
import { authReducer } from 'modules/auth';
import { getInitialTheme, themeReducer } from 'modules/theme';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    theme: themeReducer,
  },
  preloadedState: {
    theme: {
      theme: getInitialTheme(),
    },
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
