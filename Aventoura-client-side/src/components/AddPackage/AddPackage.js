import axios from "axios";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import API_BASE_URL from "../../apiBaseUrl";
import addPackageImg from "../../images/addPackageImg.png";
import Footer from "../Footer/Footer";
import Navmenu from "../Navmenu/Navmenu";
import "./AddPackage.css";

const AddPackage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${API_BASE_URL}/packages`, data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Package added successfully");
          reset();
        }
      });
  };

  return (
    <>
      <Navmenu />
      <div className="add-package">
        <Container>
          <Row className="d-flex align-items-center mt-5">
            <Col md={6}>
              <form className="shipping-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  defaultValue={""}
                  placeholder="Package Image URL"
                  {...register("img")}
                  required
                />

                <input
                  defaultValue={""}
                  placeholder="Tour Package Name"
                  {...register("title")}
                  required
                />

                <input
                  type="number"
                  defaultValue=""
                  placeholder="Price"
                  {...register("price")}
                  required
                />
                {errors.email && (
                  <span className="error">This field is required</span>
                )}

                <textarea
                  defaultValue={""}
                  rows={5}
                  cols={53}
                  className="mt-4"
                  placeholder="Package Description"
                  {...register("desc")}
                  required
                ></textarea>
                <input type="submit" value="Add Package" />
              </form>
            </Col>
            <Col md={6} className="mt-4">
              <Image src={addPackageImg} fluid />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddPackage;
