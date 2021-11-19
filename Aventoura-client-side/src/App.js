import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home/Home";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MyOrders from "./components/MyOrders/MyOrders";
import ManageAllOrders from "./components/ManageAllOrders/ManageAllOrders";
import AddPackage from "./components/AddPackage/AddPackage";
import NotFound from "./components/NotFound/NotFound";

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
