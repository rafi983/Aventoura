import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
import notfound from "../../images/notfound.jpg";
import "./NotFound.css";

const NotFound = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <img src={notfound} className="notfound-img" alt="" />
      </div>
      <Button variant="success btn-home" onClick={goToHome}>
        Back To Home
      </Button>
    </>
  );
};

export default NotFound;
