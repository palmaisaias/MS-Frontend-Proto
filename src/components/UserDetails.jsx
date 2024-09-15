import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'; // Import axios for making API requests
import './UserDetails.css';

const UserDetails = ({ show, handleClose, onSubmit }) => {
  // State for form fields
  const [sex, setSex] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(false);
  const [phone, setPhone] = useState('');
  const [receiveTexts, setReceiveTexts] = useState(false);

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userDetails = {
      sex,
      pronouns,
      due_date: dueDate,
      first_pregnancy: isFirstPregnancy === 'yes',
      phone,
      can_receive_texts: receiveTexts,
    };

    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken'); // Confirm the key 'authToken'
      console.log('Retrieved token:', token);

      // Make the POST request to create user details with Authorization header
      const response = await axios.post('/api/user_details', userDetails, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Including the token in the header
        }
      });
      
      console.log('User details saved successfully:', response.data);

      handleClose();
      onSubmit();

    } catch (error) {
      console.error('Error saving user details:', error);
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
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
            {/* Links */}
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
            {/* Toggle for First Pregnancy */}
            <Form.Group className="mb-3" controlId="formFirstPregnancy">
                <Form.Label>Is this your first pregnancy?</Form.Label>
                <div className="d-flex">
                    <Form.Check 
                    type="radio" 
                    label="Yes" 
                    name="firstPregnancy" 
                    id="firstPregnancyYes" 
                    value="yes"
                    checked={isFirstPregnancy === 'yes'}
                    onChange={(e) => setIsFirstPregnancy(e.target.value)} 
                    className="me-3"
                    />
                    <Form.Check 
                    type="radio" 
                    label="No" 
                    name="firstPregnancy" 
                    id="firstPregnancyNo" 
                    value="no"
                    checked={isFirstPregnancy === 'no'}
                    onChange={(e) => setIsFirstPregnancy(e.target.value)} 
                    />
                </div>
            </Form.Group>

            {/* Due Date Selector */}
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control 
                type="date" 
                className="custom-form-control" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>

            {/* Sex Dropdown */}
            <Form.Group className="mb-3" controlId="formSex">
              <Form.Label>Sex</Form.Label>
              <Form.Select 
                className="custom-form-control"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="" disabled>Select one</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Form.Select>
            </Form.Group>

            {/* Pronoun Dropdown */}
            <Form.Group className="mb-3" controlId="formPronouns">
                <Form.Label>Pronouns</Form.Label>
                <Form.Select 
                  className="custom-form-control"
                  value={pronouns}
                  onChange={(e) => setPronouns(e.target.value)}
                >
                    <option value="" disabled>Select one</option>
                    <option value="she/her">She/Her</option>
                    <option value="he/him">He/Him</option>
                    <option value="they/them">They/Them</option>
                    <option value="she/they">She/They</option>
                    <option value="he/they">He/They</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                </Form.Select>
            </Form.Group>

            {/* Phone Number Entry */}
            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="tel" 
                placeholder="Phone Number" 
                className="custom-form-control" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            {/* Checkbox for Receiving Text Messages */}
            <Form.Group className="mb-3" controlId="formReceiveTexts">
              <Form.Check 
                type="checkbox" 
                label="I would like to receive text messages"
                checked={receiveTexts}
                onChange={(e) => setReceiveTexts(e.target.checked)}
              />
            </Form.Group>

            <div className="button-container">
              <Button type="submit" className="custom-button">
                Submit
              </Button>
            </div>

            {/* Additional Section */}
            <div className="text-center mt-5">
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

export default UserDetails;
