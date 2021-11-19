import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import './Package.css'

const Package = (props) => {
  const { img, title, desc, price, _id } = props.pkg;

  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/placeorder/${id}`);
  };

  return (
    <Col md={4}>
      <Card
        style={{
          height: "36rem",
          marginTop: "1.5rem",
          backgroundColor: "#301934",
          color: "#fff",
          border: "none",
          outline: "none",
        }}
      >
        <Card.Img variant="top" src={img} className="order-img" style={{height: '290px'}}/>
        <Card.Body>
          <Card.Title className="fs-3 fw-bold">{title}</Card.Title>
          <Card.Text>{desc}</Card.Text>
          <Card.Text className="fs-2 fw-bold">{price} $</Card.Text>
          <Button
            onClick={() => handleClick(props.pkg._id)}
            style={{ backgroundColor: "#8c7ae6" }}
          >
            Book Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Package;
