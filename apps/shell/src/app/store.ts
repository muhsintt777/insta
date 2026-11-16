import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'features/current-user';
import { authReducer } from 'features/auth';
import { getInitialTheme, themeReducer } from 'features/theme';

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
