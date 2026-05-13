# Aventoura Server (Backend)

This is the Express + MongoDB backend API for Aventoura.

## Tech stack

- Node.js + Express
- MongoDB Atlas with official `mongodb` driver
- CORS + JSON REST API
- dotenv for environment variables

## Entry point

- `index.js`

## Prerequisites

- Node.js `>=18 <23`
- npm
- MongoDB Atlas database and user

## Environment variables

Create `Aventoura-server-side/.env`.

Required (recommended):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
CLIENT_URL=https://your-frontend-domain.vercel.app
PORT=5000
```

Optional legacy fallback if `MONGODB_URI` is not provided:

```env
DB_USER=your_db_user
DB_PASS=your_db_password
```

Reference template: `Aventoura-server-side/.env.example`

## Run locally

```bash
npm install
npm start
```

Server starts on `http://localhost:5000` by default.

## Scripts

- `npm start` - start production server
- `npm run start-dev` - start with nodemon
- `npm run seed` - insert initial package data into MongoDB

## API endpoints

### Health

- `GET /` - server status message

### Packages

- `GET /packages` - list all packages
- `GET /packages/:id` - get package by id
- `POST /packages` - create package

### User orders

- `POST /myorders` - create order
- `GET /myorders` - list all orders
- `GET /myorders/:email` - list orders by user email
- `DELETE /myorders/:id` - delete order

### Admin orders

- `GET /allorders` - list all orders
- `GET /allorders/:id` - get order by id
- `PUT /allorders/:id` - update status to approved
- `DELETE /allorders/:id` - delete order

## CORS behavior

The server allows:

- `http://localhost:3000`
- `http://localhost:3001`
- `CLIENT_URL` from env
- Any `*.vercel.app` domain (to support Vercel previews/production)

If requests are blocked in browser, check `CLIENT_URL` and redeploy backend.

## Seeding data

To add initial packages:

```bash
npm run seed
```

Seed script inserts demo package records into `travel_plan.packages`.

## Deployment (Render)

This repo includes `../render.yaml`.

Expected Render settings:

- Root Directory: `Aventoura-server-side`
- Build Command: `npm install`
- Start Command: `npm start`
- Node Version: `20` (or `18`)
- Env vars:
  - `MONGODB_URI`
  - `CLIENT_URL`

## Troubleshooting

### `MongoParseError: Invalid scheme`

`MONGODB_URI` is malformed. Must start with `mongodb://` or `mongodb+srv://`.

### Mongo SSL / TLS errors

Check:

- Atlas cluster is running
- Atlas DB user/password is correct
- Atlas Network Access allows your host/IP
- URI password is URL-encoded for special characters

### `Cannot GET /packages`

Usually means server failed before route registration (often DB connection error). Check startup logs.

## Related docs

- Root docs: `../README.md`
- Frontend docs: `../Aventoura-client-side/README.md`
- Deployment details: `../DEPLOYMENT.md`
