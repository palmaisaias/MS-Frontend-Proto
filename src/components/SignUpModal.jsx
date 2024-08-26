import React from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import './SignUpModal.css';

const SignUpModal = ({ show, handleClose, onSubmit }) => {
  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSubmit(); // Trigger the onSubmit prop passed from the parent component
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      size='lg' 
      centered
      dialogClassName="custom-modal"
    >
      <div className="d-flex custom-modal-content">
        {/* Purple Side */}
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: "#6338FD", 
            width: "33%",
            color: "#fff",
            padding: "2rem",
          }}
        >
          <img className='modal-logo-spacing' src="/ModalLogo.png" alt="Logo" width="181" height="235" />
          <div className="mt-4">
            <a href="#link1" className="text-white d-block mb-2 custom-link explore-circle">
              Explore
            </a>
            <a href="#link2" className="text-white d-block mb-2 custom-link curate-circle">
              Curate
            </a>
            <a href="#link3" className="text-white d-block mb-2 custom-link advocate-circle">
              Advocate
            </a>
          </div>
        </div>

        {/* White Side */}
        <div style={{ width: "67%", padding: "2rem", position: "relative" }}>
          {/* Close Button */}
          <Button
            variant="light"
            className="close-button"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </Button>

          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" className="custom-form-control" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Email" className="custom-form-control" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" className="custom-form-control" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIdentity">
                <Form.Label>How do you identify</Form.Label>
                <Form.Select className="custom-form-control" defaultValue="">
                    <option value="" disabled>Select one</option>
                    <option value="American Indian or Alaska native">American Indian or Alaska native</option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Hispanic or Latino">Hispanic or Latino</option>
                    <option value="Middle Eastern or North African">Middle Eastern or North African</option>
                    <option value="Native Hawaiian or Pacific Islander">Native Hawaiian or Pacific Islander</option>
                    <option value="White">White</option>
                </Form.Select>
            </Form.Group>
                
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" placeholder="MM/DD/YYYY" className="custom-form-control-date" />
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
