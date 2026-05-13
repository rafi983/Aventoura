import { useHistory, useLocation } from "react-router-dom";
import Navmenu from "../Navmenu/Navmenu";

import { Image } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import google from "../../images/google.png";
import "./Login.css";

const Login = () => {
  const { signInUsingGoogle, setIsLoading } = useAuth();

  const location = useLocation();
  const history = useHistory();

  const redirect_uri = location.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInUsingGoogle()
      .then(() => {
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
