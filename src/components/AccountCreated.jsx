import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AccountCreated.css';

const AccountCreated = ({ show, handleClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (show) { // Ensure the modal is shown before setting timeout
      const timer = setTimeout(() => {
        handleClose(); // Close the modal
        navigate('/vision-boards'); // Navigate to VisionBoards page
      }, 4000); // 4 seconds delay

      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [show, handleClose, navigate]); // Dependencies for useEffect

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      size='lg'
      centered
      dialogClassName="account-created-modal"
    >
      <div className="account-created-content">
        {/* Welcome Message */}
        <h1 className="fade-in-text">Creating Account...</h1>
        {/* You can keep the button if you want user interaction */}
      </div>
    </Modal>
  );
};

export default AccountCreated;
