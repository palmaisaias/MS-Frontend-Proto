import React, { useState } from "react";
import { Modal, Button, Form, CloseButton } from "react-bootstrap";
import axiosInstance, { setAxiosInterceptor } from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilter,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

const LoginModal = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear any existing tokens and user information before login. Super important. 
    // This gave me a lot of trouble because requests were being crossed and previous 
    // names were being stored locally as well. Good learning.
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLastName");

    console.log("Previous auth and name cleared");
    setAxiosInterceptor();
    console.log("Interceptor Clear");

    try {
      // Send login request to the backend
      console.log("Sending data to backend:", formData);
      const response = await axiosInstance.post("/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Login successful:", response.data);

      // Store the authToken in localStorage
      const { token, first_name, last_name } = response.data; // Directly access first_name and last_name
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token stored successfully:", token);

        // Store the user's first and last name in localStorage
        if (first_name) {
          localStorage.setItem("userName", first_name); // Store first name
          console.log("User name stored successfully:", first_name);
        }

        if (last_name) {
          localStorage.setItem("userLastName", last_name); // Store last name
          console.log("User last name stored successfully:", last_name);
        }

        // Clear any previous error messages
        setErrorMessage("");

        // Close the modal and navigate to vision boards
        handleClose();
        onSubmit(); // If we need to add any more actions upon the submittal of the form
        navigate("/vision-boards");
      } else {
        console.error("No token received from the server");
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);

      setErrors({
        email: " ",
        password: " ",
        form: "Invalid email or password. Please try again.",
      });

      // a little shaky shake animation
      setShake(true);

      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      dialogClassName={`custom-modal-one ${shake ? "shake" : ""}`} // This is cool. It allows the additon of the shake class conditionaly
    >
      <div className="d-flex custom-modal-content-one">
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
        <div className="login-modal-right-one">
          <CloseButton
            aria-label="Close"
            onClick={handleClose}
            className="close-button-one"
          />

          <Form onSubmit={handleFormSubmit}>
            {errors.form && <p className="error-message">{errors.form}</p>}

            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                className={`custom-form-control ${
                  errors.email ? "is-invalid" : ""
                }`}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="invalid-feedback">Please enter your email.</div>
              )}
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className={`custom-form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  Please enter your password.
                </div>
              )}
            </Form.Group>

            <div className="button-container-one">
              <Button type="submit" className="custom-button">
                Log In
              </Button>
            </div>

            {/* Google and Privacy Policy*/}
            <div className="text-center mt-5">
              <p>or log in with</p>
              <img
                src="/google-logo.png"
                alt="Google Sign Up"
                width="50"
                height="50"
                className="mb-3"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  (window.location.href =
                    "https://backend.melanatedsanctuary.com:5000/login/google")
                }
              />
              <p className="small-text-one mt-3">
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

export default LoginModal;
