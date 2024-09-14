import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './BirthPlan.css';
import axiosInstance from '../services/axiosInstance';

const BirthPlan = () => {
  const [birthPlanData, setBirthPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to handle notes click
  const handleNotesClick = () => {
    // Implement your logic here
    console.log('Notes icon clicked');
  };

  useEffect(() => {
    axiosInstance.get('/vision-boards/4/content')
      .then(response => {
        setBirthPlanData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching birth plan data:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="birth-plan-page">
      {/* Navigation Bar */}
      <Navbar expand="lg" className="navbar-custom w-100">
        <Container fluid className="px-0">
          {/* Use Link component for client-side navigation */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/Frame.png"
              alt="The Melanated Sanctuary Logo"
              className="d-inline-block align-top logo-image"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Item className="search-bar-container">
                <form className="d-flex" action="#search">
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <button type="submit" className='submit-button-search'>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </Nav.Item>
              <Nav.Link as={Link} to="/notes" onClick={handleNotesClick} className="notes-link">
                <FontAwesomeIcon icon={faStickyNote} />
              </Nav.Link>
              <Nav.Link as={Link} to="/profile" className="profile-link">
                <FontAwesomeIcon icon={faUserCircle} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

        {/* Main Content */}
        <div className="content-container">
         <Container className="mt-4">
            {loading && <div>Loading birth plan...</div>}
            {error && <div>Error loading birth plan. Please try again later.</div>}
            {!loading && !error && birthPlanData && (
            <div>
                <h1 className="birth-plan-title">{birthPlanData.name}</h1>
                <div className="birth-plan-content">
                <p>{birthPlanData.description}</p>
                {/* You can render additional fields if needed */}
                </div>
            </div>
            )}
         </Container>
        </div>

      {/* Footer Section */}
      <Container fluid className="footer-section">
        <Row className="py-4">
          {/* Column 1: Newsletter Section */}
          <Col md={4} className="text-center text-md-start">
            <h5>Receive our monthly newsletter</h5>
            <p>Stay updated with our latest news and resources.</p>
            <form className="d-flex align-items-center bottom-form-pad">
              <input
                type="email"
                className="form-control me-2 custom-link"
                placeholder="Enter your email"
              />
              <Button variant="light" className="flex-shrink-0">Sign Up</Button>
            </form>
          </Col>

          {/* Column 3: Placeholder or Additional Info */}
          <Col md={4} className="text-center text-md-start">
            {/* You can add any additional content here */}
          </Col>

          {/* Column 2: Navigation Links */}
          <Col md={4} className="text-center text-md-start section-links">
            <Nav className="flex-column">
              <Nav.Link href="#publishers" className="footer-linking">Publishers</Nav.Link>
              <Nav.Link href="#story" className="footer-linking">Our Story</Nav.Link>
              <Nav.Link href="#privacy" className="footer-linking">Privacy Policy</Nav.Link>
              <Nav.Link href="#help" className="footer-linking">Help</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BirthPlan;
