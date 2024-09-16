import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginModal.css';

const LoginModal = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axiosInstance.post('/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login successful:', response.data);

      // Store the authToken in localStorage
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('authToken', token);
        console.log('Token stored successfully:', token);

        // Optionally store user information
        if (user && user.first_name) {
          localStorage.setItem('userName', user.first_name);
          console.log('User name stored successfully:', user.first_name);
        }

        // Clear any previous error messages
        setErrorMessage('');

        // Close the modal and navigate to vision boards
        handleClose();
        onSubmit(); // If you have additional actions
        navigate('/vision-boards');
      } else {
        console.error('No token received from the server');
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
        console.error('Error during login:', error);
    
        // Set error messages and invalid fields
        setErrors({
          email: ' ',
          password: ' ',
          form: 'Invalid email or password. Please try again.',
        });
    
        // Trigger shake animation
        setShake(true);
    
        // Remove shake class after animation completes (assuming animation duration is 0.5s)
        setTimeout(() => setShake(false), 500);
      }
    };

  return (
    <Modal
        show={show}
        onHide={handleClose}
        size='lg'
        centered
        dialogClassName={`custom-modal ${shake ? 'shake' : ''}`} // Add shake class conditionally
    >
      <div className="d-flex custom-modal-content">
        {/* Purple Side */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: "#4823D1",
            width: "33%",
            color: "#fff",
            padding: "2rem",
          }}
        >
          <img className="modal-logo-spacing" src="/ModalLogo.png" alt="Logo" style={{ width: "80%", height: "auto", maxWidth: "100%" }} />
          <div className="mt-4">
            <div className="custom-link mb-3">
              <div className="circle explore-circle"></div>
              <a href="#link1" className="text-white d-block mb-2">Explore</a>
            </div>
            <div className="custom-link mb-3">
              <div className="circle curate-circle"></div>
              <a href="#link2" className="text-white d-block mb-2">Curate</a>
            </div>
            <div className="custom-link">
              <div className="circle advocate-circle"></div>
              <a href="#link3" className="text-white d-block mb-2">Advocate</a>
            </div>
          </div>
        </div>

        {/* White Side */}
        <div className='login-modal-right'>
        {/* Close Button */}
        <Button className="close-button" onClick={handleClose} aria-label="Close">&times;</Button>

        <Form onSubmit={handleFormSubmit}>
          {/* Display form error message */}
          {errors.form && <p className="error-message">{errors.form}</p>}

          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              className={`custom-form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {/* Display field-specific error */}
            {errors.email && <div className="invalid-feedback">Please enter your email.</div>}
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className={`custom-form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {/* Display field-specific error */}
            {errors.password && <div className="invalid-feedback">Please enter your password.</div>}
          </Form.Group>

          <div className="button-container">
            <Button type="submit" className="custom-button">
              Log In
            </Button>
          </div>

            {/* Additional Section */}
            <div className="text-center mt-5">
              <p>or log in with</p>
              <img src="/google-logo.png" alt="Google Sign In" width="50" height="50" className="mb-3" />
              <p className="small-text mt-3">
                By continuing, you accept the <a href="#terms">Terms of Use</a> and <a href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
