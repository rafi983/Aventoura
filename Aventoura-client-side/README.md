# Aventoura Client (Frontend)

This is the React frontend for Aventoura.

## Tech stack

- React 17 (Create React App)
- React Router v5
- React Bootstrap + Bootstrap
- Firebase authentication
- Axios + Fetch for API calls

## Features

- Home page with tour package listing
- Google login authentication
- Private routes for order-related pages
- Place order flow
- My orders management (user side)
- Manage all orders (admin side)
- Add package flow

## Folder notes

- `src/components` - all UI pages/components
- `src/hooks` - custom hooks like auth/firebase hook
- `src/context` - auth context provider
- `src/apiBaseUrl.js` - centralized backend API base URL
- `public/_redirects` - SPA routing support for Netlify

## Prerequisites

- Node.js `>=18 <23`
- npm
- Backend API running (local or deployed)
- Firebase config set in frontend firebase config files

## Environment variables

Create env files in `Aventoura-client-side`.

### `.env.development`

```env
REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com
```

### `.env.production`

```env
REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com
```

`REACT_APP_API_BASE_URL` is used by `src/apiBaseUrl.js`.

## Local development

```bash
npm install
npm start
```

App runs at `http://localhost:3000`.

## Build

```bash
npm run build
```

Build output is generated in `build/`.

## Scripts

- `npm start` - run dev server
- `npm run build` - create production build
- `npm test` - run tests
- `npm run eject` - eject CRA config

## Deployment

### Vercel

- Root Directory: `Aventoura-client-side`
- Build Command: `npm run build`
- Output Directory: `build`
- Environment Variable:
  - `REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com`

If CRA warnings fail build in CI, set `CI=false` in Vercel env variables.

### Netlify

- Base directory: `Aventoura-client-side`
- Build command: `npm run build`
- Publish directory: `build`
- Env var: `REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com`

`public/_redirects` is already included for SPA route refresh support.

## Troubleshooting

### Failed to fetch

- Verify `REACT_APP_API_BASE_URL` is correct
- Verify backend endpoint works: `https://aventoura-api.onrender.com/packages`
- Restart frontend after env changes

### Local frontend still calling localhost backend

- Check `src/apiBaseUrl.js`
- Ensure `.env.development` is present and frontend was restarted

### Vercel builds with yarn unexpectedly

- Ensure `yarn.lock` is removed and committed
- Keep only `package-lock.json`

## Related docs

- Root docs: `../README.md`
- Backend docs: `../Aventoura-server-side/README.md`
- Deployment checklist: `../DEPLOYMENT.md`
