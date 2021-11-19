import React from "react";
import useFirebase from "../../hooks/useFirebase";
import Navmenu from "../Navmenu/Navmenu";
import { useHistory, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { Button, Image } from "react-bootstrap";
import "./Login.css";
import google from "../../images/google.png";

const Login = () => {
  const { signInUsingGoogle, user, setUser, setIsLoading } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const redirect_uri = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInUsingGoogle()
      .then((result) => {
        history.push(redirect_uri);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <>
      <Navmenu />
      <div className="login-container">
        <h1>Login With</h1>

        <Image
          onClick={handleGoogleSignIn}
          src={google}
          alt=""
          className="google-icon"
          fluid
        />
      </div>
    </>
  );
};

export default Login;
