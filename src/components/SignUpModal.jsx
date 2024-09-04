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
            style={{
              width: "80%",  // Set to a percentage for responsiveness
              height: "auto",  // Maintain aspect ratio
              maxWidth: "100%",  // Ensures it doesn't overflow
            }}
          />
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
                <Form.Control
                  type="date"
                  placeholder="MM/DD/YYYY"
                  style={{
                    backgroundColor: "#643AFD",
                    color: "#ffffff",
                    border: "2px solid #ffffff",
                    borderRadius: "50px",
                    width: "125px",
                    padding: "0.5rem",
                    WebkitAppearance: "none",  // Removes default styling in WebKit browsers
                    MozAppearance: "textfield",  // Removes default styling in Firefox
                    appearance: "none",  // Removes default styling
                  }}
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
