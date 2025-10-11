## Insta - Social (React + Redux + TypeScript)

An Instagram-like SPA built with React 18, Vite, and TypeScript (strict mode). It uses Redux Toolkit for state, React Router v6 for routing, axios for HTTP with interceptors, MUI for UI primitives, react-hook-form + zod for form validation, and SCSS modules for styling.

This README covers setup, scripts, architecture, routes, environment config, and development conventions.

## Quick start

Prerequisites:

- Node.js 22
- yarn

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

Key layers/components:

- Routing (`src/main/App.tsx`): React Router v6 with nested layouts. Public auth routes and protected app routes.
- Protected routes (`src/main/protected-route.tsx` and `src/main/with-protected-route.tsx`): Redirect unauthenticated users to `/auth/login`.
- State (`src/configs/store.ts`): Redux Toolkit store with `user`, `toast`, and `loader` slices.
- HTTP (`src/configs/http.ts`): axios instance with base URL, JSON headers, and credentials enabled; response interceptor handles token refresh and unauthorized logout.
- Environment (`src/configs/env.ts`): central place to set `API_URL` and `SERVER_TYPE`.
- UI feedback: `features/loader` provides a backdrop loader; `features/toast` provides MUI Snackbar toasts.

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

- Node version: ensure 22+ for vite 7
- CORS/auth: axios is configured with `withCredentials`; your API must set proper CORS headers for cookies
- API URL: update `src/configs/env.ts` if your backend differs
