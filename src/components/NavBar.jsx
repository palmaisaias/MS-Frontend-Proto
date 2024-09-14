// src/components/NavBar.jsx
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './NavBar.css'; // Import the extracted CSS for the navbar

const NavBar = ({ handleShowSignUp }) => {
  return (
    <Navbar expand="lg" className="navbar-custom w-100 sticky-top">
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/Frame.png"
            alt="The Melanated Sanctuary Logo"
            className="d-inline-block align-top logo-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/about-us">About Us</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/vision-boards">Vision Board Test</Nav.Link>
            <Nav.Link className="nav-link-signup" onClick={handleShowSignUp}>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
