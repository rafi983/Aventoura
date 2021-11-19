import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Navmenu from "../Navmenu/Navmenu";
import Footer from "../Footer/Footer";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import "./MyOrders.css";

const MyOrders = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    fetch(`https://obscure-shore-02398.herokuapp.com/myorders/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyOrders(data);
        setOrdersLoading(true);
      });
  }, []);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      fetch(`https://obscure-shore-02398.herokuapp.com/myorders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("deleted successfully");
          const remainingOrders = myOrders.filter((order) => order._id !== id);
          setMyOrders(remainingOrders);
        });
    }
  };
  return (
    <>
      <Navmenu />
      <div className="orderscontainer">
        {ordersLoading ? (
          <Container className="orders-container">
            <Row className="my-5">
              <Col>
                <Row>
                  {myOrders?.map((order) => (
                    <Col md={4} key={order?.title}>
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
                        <Card.Img variant="top" src={order?.img} style={{height: '290px'}}/>
                        <Card.Body>
                          <Card.Title className="fs-3 fw-bold">
                            {order?.title}
                          </Card.Title>
                          <Card.Text>{order?.desc}</Card.Text>
                          <Card.Text className="fs-2 fw-bold">
                            {order?.price} $
                          </Card.Text>

                          <div className="d-flex align-items-center">
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(order?._id)}
                            >
                              Cancel Order
                            </Button>

                            <Card.Text className="fs-4 ms-4 fw-bold d-inline-block">
                              Status: {order?.status}
                            </Card.Text>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <Spinner
            className="order-spinner"
            animation="grow"
            variant="danger"
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
