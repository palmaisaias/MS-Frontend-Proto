import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AccountCreated.css';

const AccountCreated = ({ show, handleClose }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (show) { // Just makes sure the modal is swon before the timer starts
      const timer = setTimeout(() => {
        handleClose(); // Close the modal
        navigate('/vision-boards'); // Navigate to VisionBoards page immaditely after the clock runs out
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
        {/* I left this space in case we want to add a button instead of just having it time out into the new page */}
      </div>
    </Modal>
  );
};

export default AccountCreated;
