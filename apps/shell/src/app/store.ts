import { configureStore } from '@reduxjs/toolkit';
import { toastReducer } from '@insta/ui/feedback/toast';
import { userReducer } from 'modules/user';
import { loaderReducer } from '@insta/ui/feedback/loader';
import { authReducer } from 'modules/auth';
import { getInitialTheme, themeReducer } from 'modules/theme';

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
