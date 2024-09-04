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
        <h1 className="fade-in-text">Creating Account...</h1>
        {/* Continue Button IF we want to have a button in this portion OR we can just have it fade away and open the new page*/} 
        {/* <Button className="continue-button mt-4" onClick={handleClose}>
          Continue to profile
        </Button> */}
      </div>
    </Modal>
  );
};

export default AccountCreated;
