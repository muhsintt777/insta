import { configureStore } from '@reduxjs/toolkit';
import { toastReducer } from 'shared/feedback/toast';
import { userReducer } from 'features/user';
import { loaderReducer } from 'shared/feedback/loader';
import { authReducer } from 'features/auth';
import { getInitialTheme, themeReducer } from 'features/theme';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    loader: loaderReducer,
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
