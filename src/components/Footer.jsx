// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import './Footer.css'; // Make sure to create and link the corresponding CSS file

const Footer = () => {
  return (
    <Container fluid className="footer-section footer-linking">
      <Row className="py-4">
        {/* Column 1: Newsletter Section */}
        <Col md={4} className="text-center text-md-start">
          <h5>Receive our monthly newsletter</h5>
          <p>Your Email</p>
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
  );
};

export default Footer;
