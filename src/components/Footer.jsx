import React from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <Container fluid className="footer-section footer-linking">
      <Row className="py-4 position-relative">
        {/* Column 1: Newsletter Section. This will not be active but I want to leave it as a future innitiative */}
        <Col md={4} className="text-center text-md-start">
          <h5>Receive our monthly newsletter</h5>
          <form className="d-flex align-items-center bottom-form-pad">
            <input
              type="email"
              className="me-2 form-control-news"
              placeholder="Enter your email"
            />
            <Button variant="light" className="second-sign-bottom">
              Sign Up
            </Button>
          </form>
        </Col>

        {/* Column 3: Disclaimer */}
        <Col md={4} className="text-center text-md-start">
          <p className="mb-0"></p>
        </Col>

        {/* Column 2 custom-link: Navigation Links. We may have to add some dummy data to these. */}
        <Col
          md={4}
          className="text-center text-md-start section-links limitless-position"
        >
          <Nav className="flex-column link-pos-slider">
            <Nav.Link href="#publishers" className="footer-linking">
              Our Story
            </Nav.Link>
            <Nav.Link href="#story" className="footer-linking">
              Help
            </Nav.Link>
            <Nav.Link href="#privacy" className="footer-linking">
              Contact Us
            </Nav.Link>
            <Nav.Link href="#help" className="footer-linking">
              Privacy Policy
            </Nav.Link>
            <Nav.Link href="#TandC" className="footer-linking">
              Terms and Conditions
            </Nav.Link>
          </Nav>
          <img
            src="/footer.png"
            alt="Background"
            className="limitless-position"
            style={{
              position: "absolute",
              bottom: "-20px",
              right: 0,
              zIndex: 1,
              opacity: 0.5,
              maxWidth: "100%",
              maxHeight: "115%",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
