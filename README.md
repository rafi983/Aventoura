# Aventoura

Aventoura is a full-stack travel planning web application.

- Frontend: React (Create React App)
- Backend: Node.js + Express
- Database: MongoDB Atlas
- Auth: Firebase (Google login)

This repository contains both frontend and backend in separate folders.

## Project structure

- `Aventoura-client-side` - React frontend
- `Aventoura-server-side` - Express API backend
- `render.yaml` - Render blueprint for backend deployment
- `DEPLOYMENT.md` - deployment-focused quick guide

## Prerequisites

- Node.js `>=18 <23` (Node 18 or 20 recommended)
- npm
- MongoDB Atlas connection string
- Firebase project credentials for client auth

## Environment variables overview

### Backend (`Aventoura-server-side`)

Required:
- `MONGODB_URI` - full Mongo connection string
- `CLIENT_URL` - deployed frontend URL for CORS

Optional:
- `PORT` - defaults to `5000`
- `DB_USER` and `DB_PASS` - legacy fallback if `MONGODB_URI` is not used

### Frontend (`Aventoura-client-side`)

- `REACT_APP_API_BASE_URL` - backend API base URL

Recommended values:
- Development: `https://aventoura-api.onrender.com` (or local API if desired)
- Production: `https://aventoura-api.onrender.com`

## Local development

### 1) Install dependencies

Backend:

```bash
cd Aventoura-server-side
npm install
```

Frontend:

```bash
cd Aventoura-client-side
npm install
```

### 2) Configure env files

Backend (`Aventoura-server-side/.env`):

```env
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
PORT=5000
```

Frontend (`Aventoura-client-side/.env.development`):

```env
REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com
```

### 3) Run apps

Backend:

```bash
cd Aventoura-server-side
npm start
```

Frontend:

```bash
cd Aventoura-client-side
npm start
```

## Available scripts

### Backend (`Aventoura-server-side/package.json`)

- `npm start` - start API server
- `npm run start-dev` - start with nodemon
- `npm run seed` - seed initial packages in MongoDB

### Frontend (`Aventoura-client-side/package.json`)

- `npm start` - run dev server
- `npm run build` - production build
- `npm test` - run tests

## Deployment summary

### Backend on Render

- Uses `render.yaml`
- Root dir: `Aventoura-server-side`
- Build: `npm install`
- Start: `npm start`
- Env vars: `MONGODB_URI`, `CLIENT_URL`

### Frontend on Vercel

- Root dir: `Aventoura-client-side`
- Build: `npm run build`
- Output: `build`
- Env var: `REACT_APP_API_BASE_URL=https://aventoura-api.onrender.com`

## Common issues

### Data not showing in frontend

Check:
1. Backend API works: `https://aventoura-api.onrender.com/packages`
2. Frontend env var points to backend URL
3. Backend `CLIENT_URL` includes frontend domain
4. After env changes, redeploy frontend/backend

### Mongo parse error on backend deploy

Make sure `MONGODB_URI` starts with:
- `mongodb://` or
- `mongodb+srv://`

### CORS errors

Ensure backend `CLIENT_URL` is set correctly in Render, and redeploy backend.

## Additional docs

- See `Aventoura-client-side/README.md` for frontend details
- See `Aventoura-server-side/README.md` for backend details
- See `DEPLOYMENT.md` for deployment checklist
