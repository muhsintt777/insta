import { configureStore } from '@reduxjs/toolkit';
import { toastReducer } from 'features/toast/toast-slice';
import { userReducer } from 'features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
