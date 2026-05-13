# Aventoura Deployment Guide

## 1) Backend (Render / Railway / any Node host)

### Required env vars (`Aventoura-server-side`)
- `MONGODB_URI` = your full MongoDB Atlas connection string
- `CLIENT_URL` = your deployed frontend URL (for CORS)
- `PORT` = provided by host (optional locally set `5000`)

Use `Aventoura-server-side/.env.example` as template.

### Atlas checks
- Create MongoDB user with read/write access.
- Add network access for deployment host IPs (or temporary `0.0.0.0/0` while testing).
- If password contains special chars, URL-encode them.

### Deploy settings
- Root directory: `Aventoura-server-side`
- Build command: `npm install`
- Start command: `npm start`
- Node version: `18` or `20`

### Verify
- Open `https://<your-backend-domain>/`
- Should return: `Travel web server is running`
- Open `https://<your-backend-domain>/packages`
- Should return JSON array

---

## 2) Frontend (Netlify / Firebase Hosting / Vercel)

### Required env var (`Aventoura-client-side`)
- `REACT_APP_API_BASE_URL` = your deployed backend URL (example: `https://aventoura-api.onrender.com`)

Use `Aventoura-client-side/.env.example` as template.

### Build & deploy
- Root directory: `Aventoura-client-side`
- Build command: `npm run build`
- Publish directory: `build`

### SPA routing
For Netlify, create `Aventoura-client-side/public/_redirects`:

```
/* /index.html 200
```

For Firebase, `firebase.json` is already configured with rewrite to `index.html`.

---

## 3) Post-deploy checklist
- Set backend `CLIENT_URL` to frontend domain.
- Set frontend `REACT_APP_API_BASE_URL` to backend domain.
- Redeploy both after env var changes.
- Test flows:
  - Home packages load
  - Place order
  - My orders
  - Manage all orders status update
