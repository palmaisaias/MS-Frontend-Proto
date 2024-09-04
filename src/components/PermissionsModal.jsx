import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './PermissionsModal.css';

const PermissionsModal = ({ show, handleClose, onSkip, onContinue }) => {
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
        <div className='permission-modal-right'>
          {/* Close Button */}
          <Button
            variant="light"
            className="close-button"
            onClick={handleClose}
            aria-label="Close"
          >
            &times;
          </Button>

          {/* New Heading */}
          <h3 style={{ textAlign: 'left', fontWeight: 'bold' }}>
            Enable permissions for a more personalized experience
          </h3>

          {/* Permission Options */}
          <Form>
            <Form.Group controlId="formNotifications" className="mt-4 custom-checkbox">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Notifications</span>
                    <br />
                    <span style={{ fontSize: '1rem' }}>
                      Allow MS to deliver reminders and proactive messages
                    </span>
                  </>
                }
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formCalendar" className="mt-4 custom-checkbox">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Calendar</span>
                    <br />
                    <span style={{ fontSize: '1rem' }}>
                      Allows to set reminders for important appointments
                    </span>
                  </>
                }
                className="mb-3"
              />
            </Form.Group>

            {/* Buttons */}
            <div className="button-container d-flex flex-column align-items-center">
              <Button className="custom-button-skipper mb-2 w-100" onClick={onSkip}>
                Skip
              </Button>
              <Button type="button" className="custom-button-continuer w-100" onClick={onContinue}>
                Continue
              </Button>
            </div>

            {/* Additional Section */}
            <div className="text-center mt-5">
              <p className="small-text mt-3">
                By continuing, you accept the <a href="#terms">Terms of Use</a> and 
                <a href="#privacy">Privacy Policy</a>.
              </p>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default PermissionsModal;
