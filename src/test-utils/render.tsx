import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';

// Create minimal test slices that mirror the app structure without service dependencies
// This avoids importing actual slices which pull in axios through circular dependencies
const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'LOGGED_OUT' as 'LOGGED_OUT' | 'SUCCESS' | 'LOADING' | 'FAILED',
    details: null as null | Record<string, unknown>,
  },
  reducers: {
    login: (state, action) => {
      state.status = 'SUCCESS';
      state.details = action.payload;
    },
    logout: (state) => {
      state.status = 'LOGGED_OUT';
      state.details = null;
    },
  },
});

const toastSlice = createSlice({
  name: 'toast',
  initialState: { show: false, severity: 'info' as const, message: '' },
  reducers: {
    show: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});

const loaderSlice = createSlice({
  name: 'loader',
  initialState: { showBackdrop: false },
  reducers: {
    showBackdrop: (state) => {
      state.showBackdrop = true;
    },
    hideBackdrop: (state) => {
      state.showBackdrop = false;
    },
  },
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null as string | null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'light' as 'light' | 'dark' },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  toast: toastSlice.reducer,
  loader: loaderSlice.reducer,
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
});

export type TestRootState = ReturnType<typeof rootReducer>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<TestRootState>;
  route?: string;
}

/**
 * Custom render function that wraps components with Redux Provider and MemoryRouter.
 * Use this for testing components that depend on Redux state or React Router.
 *
 * @example
 * ```tsx
 * const { store } = renderWithProviders(<MyComponent />, {
 *   preloadedState: { user: { status: 'SUCCESS', details: mockUser } },
 *   route: '/profile',
 * });
 * ```
 */
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = '/', ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as TestRootState,
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export type AppStore = ReturnType<typeof configureStore<typeof rootReducer>>;
