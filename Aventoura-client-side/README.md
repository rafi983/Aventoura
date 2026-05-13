# Aventoura - Travel Planner Website

Live-site : https://aventoura.netlify.app/

This webpage is all about a travel planner website for the tourists.

### `Website-information`

- This website has three different routes in the navbar. And All these three routes are private

- In the Home page, there are a banner, some key travel packages of our company, all our travel packages featured in this page , info about company and a minimalistic footer.

- User can book any of our packages from our featured packages . If any user is not logged in he/she is gonna go the login page and after login , will be redirected to the place order page where user can give information of them and finally place order.

- After place order, user can see his placed order in my-orders page where he/she can delete order if they want to.

- In manage all orders page, all of the orders placed by different users are visible where we can delete the order and also update the delivery status of the order.

- In add package page, we can create a new travel package and after it's done, new package will be displayed in our home page.

- This website is built with the power of React js along with react-bootstrap, firebase, react-router, node js, mongodb and express js

## Local setup

1. Create `.env` in client root:

```
REACT_APP_API_BASE_URL=http://localhost:5000
```

2. Run client:

```
npm install
npm start
```

3. Run backend from `Aventoura-server-side` with valid MongoDB env vars.

## Deployment

- Set client env var `REACT_APP_API_BASE_URL` to deployed backend URL.
- Set backend env var `CLIENT_URL` to deployed frontend URL.
- See root `DEPLOYMENT.md` for full deployment steps.
