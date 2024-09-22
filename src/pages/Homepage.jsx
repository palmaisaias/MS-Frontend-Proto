import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Homepage.css";
import VisionBoards from "./VisionBoards";
import SignUpModal from "../components/SignUpModal";
import LoginModal from "../components/LoginModal"; // Import the login modal component
import UserDetails from "../components/UserDetails";
import AccountCreated from "../components/AccountCreated";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Homepage = () => {
  // State management for all modals
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // State for login modal
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAccountCreated, setShowAccountCreated] = useState(false);

  // Handle closing of all modals
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseLogin = () => setShowLogin(false); // Close login modal
  const handleCloseUserDetails = () => setShowUserDetails(false);
  const handleCloseAccountCreated = () => setShowAccountCreated(false);

  // Handle showing of SignUp and Login modals
  const handleShowSignUp = () => setShowSignUp(true);
  const handleShowLogin = () => setShowLogin(true); // Show login modal

  // Handle sign-up form submission and show the user details modal
  const handleSignUpSubmit = () => {
    setShowSignUp(false);
    setShowUserDetails(true);
  };

  // Handle login form submission
  const handleLoginSubmit = () => {
    // Perform any actions after login, e.g., fetch user data, redirect, etc.
    setShowLogin(false);
  };

  // Handle user details submission and show the account created modal
  const handleUserDetailsSubmit = () => {
    setShowUserDetails(false);
    setShowAccountCreated(true);
  };

  return (
    <Container fluid className="homepage">
      {/* Use the reusable NavBar component */}
      <NavBar
        handleShowSignUp={handleShowSignUp}
        handleShowLogin={handleShowLogin}
      />

      {/* Header Section */}
      <Container fluid className="px-0">
        <Row
          className="header-section mx-0 d-flex align-items-center"
          style={{ minHeight: "550px" }}
        >
          <Col
            md={4}
            className="text-left header-text d-flex align-items-center"
          >
            <div className="with-style" style={{ paddingLeft: "50px" }}>
              <h1 className="un-link">
                Black women are 3x more likely to experience childbirth
                complications, yet up to 85% are preventable!
              </h1>
              <p className="un-link">
                Our mission is to equip you to advocate for your maternal
                health, one resource at a time.
              </p>
              <Button variant="outline-light" className="show-me-btn">
                Show me
              </Button>
            </div>
          </Col>
          <Col
            md={8}
            className="px-0 d-flex justify-content-center align-items-center"
          >
            <div className="vid-box"
              style={{
                border: "5px solid #ccc",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <iframe className="youtube-vid"
                width="730"
                height="480"
                src="https://www.youtube.com/embed/eGCs9b90IaQ?si=FJxl7UeK3C-fbZnG&amp;controls=1&autoplay=1&controls=1&mute=1&rel=0&cc_load_policy=1"
                title="YouTube video player"
                style={{ border: "none", display: "block" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Main Content Sections */}
      <Container fluid className="px-0">
        <Row className="content-section section-1 mx-0">
          <Col md={5} className="section-image">
            <img src="/first.png" alt="Help" className="img-fluid" />
          </Col>
          <Col
            md={5}
            className="text-center section-text d-flex flex-column justify-content-center"
          >
            <h3 style={{ fontFamily: "'Lato', serif" }}>
              Enter "The Melanated Sanctuary"
            </h3>
            <p>
              A personalized, culturally relevant guide, designed by and for
              melanated mamas, to navigate this journey with confidence and joy.
            </p>
          </Col>
        </Row>

        <Row className="content-section section-2 mx-0">
          <Col md={6} className="section-image-middle order-md-last">
            <img src="/second.png" alt="Explore" className="img-fluid" />
          </Col>
          <Col md={6} className="text-center section-text">
            <h3 style={{ fontFamily: "'Lato', serif" }}>Explore & Curate</h3>
            <p>
              Think of it as your own personal curated vision board for your
              pregnancy, birth, and postpartum journey—equipping you to
              prioritize your holistic well-being throughout.
            </p>
          </Col>
        </Row>

        <Row className="content-section section-3 mx-0">
          <Col md={5} className="section-image">
            <img src="/third.png" alt="Help" className="img-fluid" />
          </Col>
          <Col md={5} className="text-center section-text">
            <h3 style={{ fontFamily: "'Lato', serif" }}>
              Help Spread the Word
            </h3>
            <p>
              We bridge the gap until healthcare and society offer the
              culturally competent care all mothers deserve. Together, let's
              rewrite the narrative and empower you and your community to own
              your maternal health.
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />

      {/* Sign-Up Modal */}
      <SignUpModal
        show={showSignUp}
        handleClose={handleCloseSignUp}
        onSubmit={handleSignUpSubmit}
      />

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        onSubmit={handleLoginSubmit}
      />

      {/* User Details Modal */}
      <UserDetails
        show={showUserDetails}
        handleClose={handleCloseUserDetails}
        onSubmit={handleUserDetailsSubmit}
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
