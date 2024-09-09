import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Import axios
import './SignUpModal.css';

const SignUpModal = ({ show, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API request
      const response = await axios.post('/api/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Signup successful:', response.data);

      // Check if token is in the response and store it in localStorage
      const { token } = response.data;
      if (token) {
        localStorage.setItem('authToken', token); // Store the token in localStorage
        console.log('Token stored successfully:', token);
      } else {
        console.error('No token received from the server');
      }

      // Close the modal and call the parent onSubmit handler
      handleClose();
      onSubmit(); // Proceed to the next step, like UserDetailsModal

    } catch (error) {
      console.error('Error during sign up:', error);
      // Optionally handle errors (show an error message to the user)
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size='lg' centered dialogClassName="custom-modal">
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
        <div className='signup-modal-right'>
          {/* Close Button */}
          <Button className="close-button" onClick={handleClose} aria-label="Close">&times;</Button>

          <Form onSubmit={handleFormSubmit}>
            {/* First Name Field */}
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

            {/* Last Name Field */}
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

            {/* Email Field */}
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

            {/* Password Field */}
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
              <Button type="submit" className="custom-button">
                Sign Up
              </Button>
            </div>

            {/* Additional Section */}
            <div className="text-center mt-5">
              <p>or sign up with</p>
              <img src="/google-logo.png" alt="Google Sign Up" width="50" height="50" className="mb-3" />
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

export default SignUpModal;
