import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './Homepage.css';
import SignUpModal from '../components/SignUpModal'; // Import the sign-up modal component
import PermissionsModal from '../components/PermissionsModal'; // Import the permissions modal component
import AccountCreated from '../components/AccountCreated'; // Import the account-created modal component

const Homepage = () => {
  // State management for all modals
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);
  const [showAccountCreated, setShowAccountCreated] = useState(false);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleClosePermissions = () => setShowPermissions(false);
  const handleCloseAccountCreated = () => setShowAccountCreated(false);

  const handleShowSignUp = () => setShowSignUp(true);

  // Handle sign-up form submission and show the permissions modal
  const handleSignUpSubmit = () => {
    setShowSignUp(false);
    setShowPermissions(true);
  };

  // Handle skip or continue actions in the permissions modal
  const handlePermissionsSkip = () => {
    setShowPermissions(false);
    setShowAccountCreated(true);
  };

  const handlePermissionsContinue = () => {
    setShowPermissions(false);
    setShowAccountCreated(true);
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
      <Row className="content-section section-1 mx-0 align-items-stretch">
        <Col md={6} className="section-image d-flex">
          <img 
            src="/first.png" 
            alt="Create Profile" 
            className="img-fluid"
          />
        </Col>
        <Col md={5} className="text-center section-text d-flex flex-column justify-content-center">
          <h3 style={{ fontFamily: "'Lato', serif" }}>Create your profile</h3>
          <p>
            Set up an account on your phone or desktop. It's best to use your name, a
            photo of yourself, and a short bio that includes the topics you're into.
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
            <h3 style={{ fontFamily: "'Lato', serif" }}>Explore and Curate</h3>
            <p>
              Collect content into your own Magazine. It’s an easy way to save and organize articles, videos, photos,
              podcasts, etc. You can create a Magazine for anything you can imagine — like planning a road trip, saving
              recipes or sharing industry news.
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
            <h3 style={{ fontFamily: "'Lato', serif" }}>Help and share the word</h3>
            <p>
              Set up an account on your phone or desktop. 
              It's best to use your name, a photo of yourself and 
              a short bio that includes the topics you're into.
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
            <p className="mb-0">
              
            </p>
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

      {/* Permissions Modal */}
      <PermissionsModal 
        show={showPermissions} 
        handleClose={handleClosePermissions} 
        onSkip={handlePermissionsSkip}
        onContinue={handlePermissionsContinue}
      />

      {/* Account Created Modal */}
      <AccountCreated 
        show={showAccountCreated} 
        handleClose={handleCloseAccountCreated} 
      />
    </Container>
  );
};

export default Homepage;
