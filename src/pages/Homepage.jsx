import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './Homepage.css';
import SignUpModal from '../components/SignUpModal'; // Import the sign-up modal component
import UserDetails from '../components/UserDetails'; // Import the user-details modal component
import AccountCreated from '../components/AccountCreated'; // Import the account-created modal component

const Homepage = () => {
  // State management for all modals
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAccountCreated, setShowAccountCreated] = useState(false);

  // Handle closing of all modals
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseUserDetails = () => setShowUserDetails(false);
  const handleCloseAccountCreated = () => setShowAccountCreated(false);

  // Handle showing of SignUp modal
  const handleShowSignUp = () => setShowSignUp(true);

  // Handle sign-up form submission and show the user details modal
  const handleSignUpSubmit = () => {
    setShowSignUp(false);
    setShowUserDetails(true); // Open UserDetails instead of PermissionsModal
  };

  // Handle user details submission and show the account created modal
  const handleUserDetailsSubmit = () => {
    setShowUserDetails(false);
    setShowAccountCreated(true); // Open AccountCreated modal after user details are submitted
  };

  return (
    <Container fluid className="homepage">
      {/* Navigation Bar */}
      <Navbar expand="lg" className="navbar-custom w-100">
        <Container fluid className="px-0">
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img
              src="/Frame.png"
              alt="The Melanated Sanctuary Logo"
              width="394"
              height="132"
              className="d-inline-block align-top logo-image"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#about-us">About Us</Nav.Link>
              <Nav.Link href="#login">Login</Nav.Link>
              <Nav.Link href="#sign-up" className="nav-link-signup" onClick={handleShowSignUp}>
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Header Section */}
      <Container fluid className="px-0">
        <Row className="header-section mx-0 d-flex align-items-center" style={{ maxHeight: '550px' }}>
          <Col md={4} className="text-left footer-linking header-text d-flex align-items-center">
            <div>
              <h1>
                Black women are <br /> 3 times more likely to face <br /> perinatal depression and <br /> childbirth complications.
              </h1>
              <p>We see you. We hear you <br />We want you to own your maternal <br />health and confidence</p>
              <Button variant="outline-light" className="show-me-btn">Show me</Button>
            </div>
          </Col>
          <Col md={8} className="px-0 d-flex align-items-center">
            <img
              src="/Group_Home.png"
              alt="A relevant and impactful image"
              className="img-fluid w-100"
              style={{ maxHeight: '550px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Container>

      {/* Main Content Sections */}
      <Container fluid className="px-0">
        <Row className="content-section section-1 mx-0">
          <Col md={6} className="section-image">
            <img 
              src="/first.png" 
              alt="Help" 
              className="img-fluid" />
          </Col>
          <Col md={5} className="text-center section-text d-flex flex-column justify-content-center">
            <h3 style={{ fontFamily: "'Lato', serif" }}>Enter "The Melanated Sanctuary"</h3>
            <p>
              A personalized, culturally relevant guide, designed by and for melanated mamas, to navigate this journey with confidence and joy.
            </p>
          </Col>
        </Row>

        <Row className="content-section section-2 mx-0">
          <Col md={6} className="section-image-middle order-md-last">
            <img 
              src="/second.png" 
              alt="Explore" 
              className="img-fluid" />
          </Col>
          <Col md={6} className="text-center section-text">
            <h3 style={{ fontFamily: "'Lato', serif" }}>Explore & Curate</h3>
            <p>
              Think of it as your own personal curated vision board for your pregnancy, birth, 
              and postpartum journey—equipping you to prioritize your holistic well-being throughout.
            </p>
          </Col>
        </Row>

        <Row className="content-section section-3 mx-0">
          <Col md={6} className="section-image">
            <img 
              src="/third.png" 
              alt="Help" 
              className="img-fluid" />
          </Col>
          <Col md={5} className="text-center section-text">
            <h3 style={{ fontFamily: "'Lato', serif" }}>Help Spread the Word</h3>
            <p>
              We bridge the gap until healthcare and society offer the culturally competent care all mothers deserve. 
              Together, let's rewrite the narrative and empower you and your community to own your maternal health.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <Container fluid className="footer-section footer-linking">
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

          {/* Column 3: Disclaimer */}
          <Col md={4} className="text-center text-md-start">
            <p className="mb-0"></p>
          </Col>

          {/* Column 2 custom-link: Navigation Links */}
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

      {/* Sign-Up Modal */}
      <SignUpModal show={showSignUp} handleClose={handleCloseSignUp} onSubmit={handleSignUpSubmit} />

      {/* User Details Modal */}
      <UserDetails show={showUserDetails} handleClose={handleCloseUserDetails} onSubmit={handleUserDetailsSubmit} />

      {/* Account Created Modal */}
      <AccountCreated show={showAccountCreated} handleClose={handleCloseAccountCreated} />
    </Container>
  );
};

export default Homepage;
