import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import Navmenu from "../Navmenu/Navmenu";
import Footer from "../Footer/Footer";
import "./ManageAllOrders.css";

const ManageAllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allOrdersSpinner, setAllOrdersSpinner] = useState(false);
  useEffect(() => {
    fetch("https://obscure-shore-02398.herokuapp.com/allorders")
      .then((res) => res.json())
      .then((data) => {
        setAllOrdersSpinner(true);
        setAllOrders(data);
      });
  }, [allOrders]);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      fetch(`https://obscure-shore-02398.herokuapp.com/allorders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("deleted successfully");
          const remainingOrders = allOrders.filter((order) => order._id !== id);
          setAllOrders(remainingOrders);
        });
    }
  };

  const handleStatus = (id) => {
    fetch(`https://obscure-shore-02398.herokuapp.com/allorders/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: allOrders[0]?.status,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("status changed");
        }
      });
  };

  return (
    <>
      <Navmenu />
      <div className="allorderscontainer">
        {allOrdersSpinner ? (
          <Container>
            <Row className="my-5">
              {allOrders?.map((orders, index) => (
                <Col md={4} key={index}>
                  <Card
                    style={{
                      height: "47rem",
                      marginTop: "1.5rem",
                      backgroundColor: "#301934",
                      color: "#fff",
                      border: "none",
                      outline: "none",
                    }}
                  >
                    <Card.Img variant="top" src={orders?.img} style={{height: '290px'}}/>
                    <Card.Body>
                      <Card.Title className="fs-3 fw-bold">
                        {orders?.title}
                      </Card.Title>
                      <Card.Text>{orders?.desc}</Card.Text>
                      <Card.Text className="fs-2 fw-bold">
                        {orders?.price} $
                      </Card.Text>

                      <Card.Text className="fw-bold">
                        <span className="d-block">Ordered By:</span> <br />
                        Email: {orders?.data?.email}
                        <br /> Name: {orders?.data.name}
                      </Card.Text>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(orders?._id)}
                      >
                        Delete Order
                      </Button>

                      <div className=" mt-3 d-flex align-items-center">
                        <Button
                          variant="danger"
                          onClick={() => handleStatus(orders?._id)}
                        >
                          update status
                        </Button>

                        <Card.Text className="fs-4 ms-4 fw-bold d-inline-block">
                          Status: {orders?.status}
                        </Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          <Spinner className="order-spinner" animation="grow" variant="info" />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ManageAllOrders;
