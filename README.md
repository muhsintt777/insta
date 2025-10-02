## Insta - Social (React + Vite + TypeScript)

An Instagram-like SPA built with React 18, Vite, and TypeScript (strict mode). It uses Redux Toolkit for state, React Router v6 for routing, axios for HTTP with interceptors, MUI for UI primitives, react-hook-form + zod for form validation, and SCSS modules for styling.

This README covers setup, scripts, architecture, routes, environment config, and development conventions.

## Quick start

Prerequisites:

- Node.js 22+ (recommended for Vite 7)
- yarn (or your preferred package manager)

Install and run the dev server:

```bash
yarn install
yarn dev
```

Build and preview production:

```bash
yarn build
yarn preview
```

Code quality:

```bash
# Lint (eslint)
yarn lint

# Format (prettier)
yarn format
```

## Tech stack

- Build: Vite 7, TypeScript 5
- UI: React 18, @mui/material
- State: Redux Toolkit, react-redux
- Routing: react-router-dom v6
- Forms: react-hook-form, @hookform/resolvers, zod
- HTTP: axios (withCredentials, interceptors)
- Styling: SCSS/CSS modules; global styles in `src/main/index.css` and `src/main/global-style.ts`

## Scripts (from package.json)

- `dev` — start Vite dev server
- `build` — type-check (tsc) and build
- `preview` — preview the production build
- `lint` — run ESLint
- `format` — run Prettier over `./src`

## Architecture overview

Top-level structure:

```
src/
	assets/              # static images & icon components
	components/          # reusable UI components (buttons, headers, modals, etc.)
	configs/             # app config: env, http client, routes, store, constants
	features/            # domain features (auth, user, posts, comments, chat, etc.)
	hooks/               # custom hooks (e.g., typed redux hooks)
	layouts/             # app layouts (primary, secondary, auth)
	main/                # app entry, App component, global styles, route guards
	utils/               # generic utilities, types, schemas
```

Key layers/components:

- Routing (`src/main/App.tsx`): React Router v6 with nested layouts. Public auth routes and protected app routes.
- Protected routes (`src/main/protected-route.tsx` and `src/main/with-protected-route.tsx`): Redirect unauthenticated users to `/auth/login`.
- State (`src/configs/store.ts`): Redux Toolkit store with `user`, `toast`, and `loader` slices.
- HTTP (`src/configs/http.ts`): axios instance with base URL, JSON headers, and credentials enabled; response interceptor handles token refresh and unauthorized logout.
- Environment (`src/configs/env.ts`): central place to set `API_URL` and `SERVER_TYPE`.
- UI feedback: `features/loader` provides a backdrop loader; `features/toast` provides MUI Snackbar toasts.

## Routes

App routes are defined in `src/main/App.tsx` and constants in `src/configs/app-routes.ts`:

- `/` — Home (protected)
- `/friends` — Friends (protected)
- `/chat` — Chat (protected)
- `/notifications` — Notifications (protected)
- `/profile` — Profile (protected, under Secondary layout)
- `/auth/login` — Login
- `/auth/signup` — Signup
- `*` — Not found

Layouts:

- Primary layout: header + main content area
- Secondary layout: header + outlet (e.g., profile)
- Auth layout: header + outlet (login/signup)

## Environment configuration

This project uses a simple TypeScript config rather than `.env` files:

- File: `src/configs/env.ts`
- Default values:
  - `SERVER_TYPE: 'DEV' | 'PROD'`
  - `API_URL: 'https://insta-server-k0gd.onrender.com/api'`

To point to a different backend, edit `API_URL` in `env.ts`. The axios client (`src/configs/http.ts`) reads this value and sets `withCredentials: true`.

Auth flow notes:

- On app boot, `initialUserFetch` runs `AuthService.refreshAuth()` and then fetches the current user.
- If an API call returns 401 with `AUTH_TOKEN_EXPIRED`, the interceptor refreshes auth and retries the request.
- If unauthorized (`AUTH_UNAUTHORIZED`), the interceptor dispatches `logout()`.

## Path aliases

Configured in both Vite (`vite.config.ts`) and TypeScript (`tsconfig.json`):

- `assets/*` → `src/assets/*`
- `components/*` → `src/components/*`
- `configs/*` → `src/configs/*`
- `features/*` → `src/features/*`
- `hooks/*` → `src/hooks/*`
- `layouts/*` → `src/layouts/*`
- `main/*` → `src/main/*`
- `utils/*` → `src/utils/*`

Example import:

```ts
import { store } from 'configs/store';
import { Header } from 'components/headers/app-header';
```

## State slices (high level)

- `features/user/user-slice.ts` — user details, boot-time fetch, logout, and user mutations
- `features/toast` — `Toast` component and `toast-slice` for messages (MUI Snackbar + Alert)
- `features/loader` — backdrop loader and `loader-slice`

## Styling & design system

- SCSS/CSS modules for component styles
- Global styles in `src/main/index.css` and theme tokens/utilities in `src/main/global-style.ts`
- Avoid direct DOM access; prefer React patterns and MUI components

## Forms & validation

- `react-hook-form` for form state
- `zod` schemas via `@hookform/resolvers` for validation (see feature form components and `utils/schema.ts`)

## Development conventions

- TypeScript strict mode is enabled (`tsconfig.json`)
- Keep code modern, concise, and secure; avoid deprecated APIs
- Prefer feature-based folder structure and small, reusable components
- Commit messages: short and prefixed with `feat:`, `fix:`, `chore:`

## Troubleshooting

- Node version: ensure 18+ for Vite 7
- CORS/auth: axios is configured with `withCredentials`; your API must set proper CORS headers for cookies
- API URL: update `src/configs/env.ts` if your backend differs

## Project status

Feature folders exist for auth, user, posts, comments, likes, chat, notifications, loader, and toast. Not all screens may be fully implemented; protected routes are wired and boot-time user fetch is in place.

---

If you need help extending this app (e.g., enabling `.env` files, adding CI, or tests), open an issue or continue the conversation with the desired changes.
