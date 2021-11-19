import React, { useEffect, useState } from "react";
import "./Home.css";
import aboutImg from "../../images/about-img.jpg";
import Navmenu from "../Navmenu/Navmenu";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Package from "../Package/Package";
import imgOne from "../../images/img1.jpg";
import imgTwo from "../../images/img2.jpg";
import imgThree from "../../images/img3.jpg";
import imgFour from "../../images/img4.jpg";
import Footer from "../Footer/Footer";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pkgLoading, setPkgLoading] = useState(false);

  useEffect(() => {
    fetch("https://obscure-shore-02398.herokuapp.com/packages")
      .then((res) => res.json())
      .then((data) => {
        setPkgLoading(true);
        setPackages(data);
      });
    setLoading(true);
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Navmenu />
          <div className="banner">
            <div className="banner-content">
              <h1 className="text-white">
                Explore New Worlds
                <br /> With Us
              </h1>
              <p className="text-white text-center mt-5">
                Travelling is the Most peaceful thing in this universe.To make
                you happy, We want to bring smile to your face.We have too many
                travel packages for you.
              </p>
              <Button variant="info" className="ms-auto">
                Scroll Below
              </Button>
            </div>
          </div>
          <div className="about">
            <Container>
              <Row className="my-5 d-flex align-items-center">
                <Col md={6}>
                  <h3 className="fw-bold">About Us</h3>
                  <h1>
                    Travel the world one <br /> place at a time
                  </h1>
                  <p>
                    There are so many attractive places you can visit.We are
                    providing the best travel package for you.Besides this, you
                    will be given tour guide for every package u choose.
                  </p>
                  <div className="country-box d-flex align-items-center w-50 p-3 rounded-3">
                    <i className="fas fa-globe globe"></i>
                    <h4 className="ms-2">
                      100+ <span className="d-block">Countries</span>
                    </h4>
                  </div>
                </Col>
                <Col md={6}>
                  <Image src={aboutImg} className="about-img" fluid />
                </Col>
              </Row>
            </Container>
          </div>
          <div className="packages-container">
            <h1 className="text-center">
              Some of our tour plans <br /> you might like
            </h1>
            <Container>
              <Row>
                {pkgLoading ? (
                  <>
                    {packages?.map((pkg) => (
                      <Package key={pkg.title} pkg={pkg} />
                    ))}
                  </>
                ) : (
                  <Spinner
                    className="tour-spinner"
                    animation="grow"
                    variant="success"
                  />
                )}
              </Row>
            </Container>
          </div>
          <div className="travel-gallery">
            <Container>
              <Row>
                <Col md={5}>
                  <h3 className="gallery-title">Our Tour Gallery</h3>
                  <h1 className="travel-title">
                    BEST TRAVELER'S <br /> SHARED PHOTOS
                  </h1>
                  <p className="my-3">
                    Many of our tour travellers share their photo with us.We are
                    happy to share their best moments with us.These photos are
                    from different parts of the worlds.
                  </p>
                  <Image className="one" src={imgOne} alt="" fluid />
                </Col>
                <Col
                  md={7}
                  className="gallery-pics"
                  style={{ paddingLeft: "6.5rem" }}
                >
                  <Image className="two" src={imgTwo} alt="" fluid />
                  <Image className="ms-4 three" src={imgThree} alt="" fluid />
                  <Image className="mt-3" src={imgFour} alt="" fluid />
                </Col>
              </Row>
            </Container>
          </div>
          <Footer />
        </>
      ) : (
        <Spinner animation="border" variant="danger" className="spinner" />
      )}
    </>
  );
};

export default Home;
