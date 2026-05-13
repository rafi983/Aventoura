import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AddPackage from "./components/AddPackage/AddPackage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ManageAllOrders from "./components/ManageAllOrders/ManageAllOrders";
import MyOrders from "./components/MyOrders/MyOrders";
import NotFound from "./components/NotFound/NotFound";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/myorders">
            <MyOrders />
          </PrivateRoute>

          <PrivateRoute exact path="/addpackage">
            <AddPackage />
          </PrivateRoute>

          <PrivateRoute exact path="/allorders">
            <ManageAllOrders />
          </PrivateRoute>

          <PrivateRoute exact path="/placeorder/:id">
            <PlaceOrder />
          </PrivateRoute>

          <Route exact path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
