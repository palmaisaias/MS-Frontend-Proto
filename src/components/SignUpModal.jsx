import React, { useState } from "react";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";
import axiosInstance, { setAxiosInterceptor } from "../services/axiosInstance";
import "./SignUpModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faHandHoldingHeart } from "@fortawesome/free-solid-svg-icons";

const SignUpModal = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing tokens before sign-up!
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLastName");

    console.log("Previous auth and name cleared");
    setAxiosInterceptor();
    console.log("Interceptor Clear"); // this is for the axiosInstance 

    try {
      const response = await axiosInstance.post("/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Signup successful:", response.data);

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token stored successfully:", token);

        // Store user's name in localStorage. We end up using this for the welcome message
        if (user && user.first_name) {
          localStorage.setItem("userName", user.first_name);
          console.log("User name stored successfully:", user.first_name);
        }

        if (user && user.last_name) {
          localStorage.setItem("userLastName", user.last_name);
          console.log("User last name stored successfully:", user.last_name);
        }

        handleClose();
        onSubmit();
      } else {
        console.error("No token received from the server");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      dialogClassName="custom-modal"
    >
      <div className="d-flex custom-modal-content">
        {/* Left Side */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: "#4823D1",
            width: "33%",
            color: "#fff",
            padding: "2rem",
          }}
        >
          <img
            className="modal-logo-spacing"
            src="/ModalLogo.png"
            alt="Logo"
            style={{ width: "80%", height: "auto", maxWidth: "100%" }}
          />
          <div className="mt-4">
            <div className="custom-link mb-3">
              <div className="circle explore-circle d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faSearch} style={{ color: "#4823d1" }} />
              </div>
              <a href="#link1" className="text-white d-block mb-2">
                Explore
              </a>
            </div>
            <div className="custom-link mb-3">
              <div className="circle curate-circle d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faFilter} style={{ color: "#4823d1" }} />
              </div>
              <a href="#link2" className="text-white d-block mb-2">
                Curate
              </a>
            </div>
            <div className="custom-link">
              <div className="circle advocate-circle d-flex justify-content-center align-items-center">
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  style={{ color: "#4823d1" }}
                />
              </div>
              <a href="#link3" className="text-white d-block mb-2">
                Advocate
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="signup-modal-right">
          <CloseButton
            aria-label="Close"
            onClick={handleClose}
            className="close-button-one"
          />

          <Form onSubmit={handleFormSubmit}>
            {/* First Name */}
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                className="custom-form-control"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                className="custom-form-control"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                className="custom-form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="custom-form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="button-container">
              <Button type="submit" className="sign-up-button">
                Sign Up
              </Button>
            </div>

            {/* Google and Privacy Terms*/}
            <div className="text-center mt-5">
              <p style={{ color: "white" }}>or sign up with</p>
              <img
                src="/google-logo.png"
                alt="Google Sign Up"
                width="50"
                height="50"
                className="mb-3"
                style={{ cursor: 'pointer' }}
                onClick={() => window.location.href = "https://backend.melanatedsanctuary.com:5000/login/google"}
              />
              <p className="small-text mt-3">
                By continuing, you accept the <a href="#terms">Terms of Use</a>{" "}
                and <a href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
