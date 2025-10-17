import { configureStore } from '@reduxjs/toolkit';
import { toastReducer } from 'features/toast/toast-slice';
import { userReducer } from 'features/user/user-slice';
import { loaderReducer } from 'features/loader/loader-slice';
import { authReducer } from 'features/auth/auth-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    loader: loaderReducer,
    auth: authReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
