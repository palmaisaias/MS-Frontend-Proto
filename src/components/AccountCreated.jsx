import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './AccountCreated.css';

const AccountCreated = ({ show, handleClose }) => {
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
        <h1 className="fade-in-text">Welcome to Your Sanctuary...</h1>
        {/* Continue Button */}
        <Button className="continue-button mt-4" onClick={handleClose}>
          Continue to profile
        </Button>
      </div>
    </Modal>
  );
};

export default AccountCreated;
