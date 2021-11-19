import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Navmenu from "../Navmenu/Navmenu";
import Footer from "../Footer/Footer";
import "./PlaceOrder.css";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PlaceOrder = () => {
  const { id } = useParams();
  const [singlePackage, setSinglePackage] = useState({});
  const { user } = useAuth();

  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`https://obscure-shore-02398.herokuapp.com/myorders`, {
        img: singlePackage?.img,
        title: singlePackage?.title,
        desc: singlePackage?.desc,
        price: singlePackage?.price,
        email: data.email,
        status: "Pending",
        data,
      })
      .then((res) => {
        if (res.data.insertedId) {
          alert("order placed successfully");
          reset();
        }
      });
  };

  useEffect(() => {
    fetch(`https://obscure-shore-02398.herokuapp.com/packages/${id}`)
      .then((res) => res.json())
      .then((data) => setSinglePackage(data));
  });

  const handleClickHome = () => {
    history.push("/");
  };

  return (
    <>
      <Navmenu />
      <div className="single-package">
        <Container>
          <Row className="mt-5 d-flex align-items-center">
            <Col md={8}>
              <Row className="d-flex align-items-center">
                <Col md={6}>
                  <h1>{singlePackage.title}</h1>
                  <p>{singlePackage.desc}</p>
                  <h2 className="fw-bold">{singlePackage?.price} $</h2>
                  <Button variant="warning" onClick={handleClickHome}>
                    Go Back
                  </Button>
                </Col>
                <Col md={6}>
                  <Image src={singlePackage.img} className="pkgImg" fluid />
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  defaultValue={user.displayName}
                  placeholder="Your name"
                  {...register("name")}
                />
                <input
                  defaultValue={user.email}
                  placeholder="Email..."
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">This field is required</span>
                )}

                <input
                  defaultValue=""
                  placeholder="city"
                  {...register("city")}
                />

                <input
                  defaultValue=""
                  placeholder="address"
                  {...register("address")}
                />
                <input
                  type="number"
                  defaultValue=""
                  placeholder="phone"
                  {...register("phone")}
                />
                <textarea
                  rows={5}
                  cols={53}
                  className="mt-4"
                  placeholder="Description (optional)"
                ></textarea>
                <input type="submit" value="Place Order" />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;
