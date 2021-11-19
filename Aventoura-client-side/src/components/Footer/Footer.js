import React from "react";
import footerImg from "../../images/footerImg1.png";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Container>
        <Row>
          <Col md={5}>
            <h1>About Aventoura</h1>
            <p>
              We are a travel planner.We provide a cheapest travel <br />
              package for tourist at a high quality.
            </p>
            <Image src={footerImg} />
          </Col>
          <Col md={4} className="contact">
            <h1>Contact Us</h1>
            <p>
              You can make touch with us at any time <br /> for the tourism
              purpose at cheap price.
            </p>
            <div className="contact d-flex flex-column">
              <div className="d-flex align-items-center">
                <i className="fas fa-phone"></i>
                <span className="ms-2">+01 (977) 2599 12</span>
              </div>

              <div className="d-flex align-items-center mt-3">
                <i className="fas fa-envelope"></i>
                <span className="ms-2">aventoura@gmail.com</span>
              </div>

              <div className="d-flex align-items-center mt-3">
                <i className="fas fa-map-marker-alt"></i>
                <span className="ms-2">California, USA</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h1>Subscribe Us</h1>
            <p>You can subscribe for updates</p>
            <input
              type="email"
              className="px-4 py-3 rounded-3"
              placeholder="Your Email"
            />
            <Button variant="info" className="px-5 py-3 ms-2 mt-3 rounded-3">
              Subscribe Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
