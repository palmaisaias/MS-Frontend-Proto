import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ handleShowSignUp, handleShowLogin }) => {
  return (
    <Navbar expand="lg" className="navbar-custom w-100 sticky-top">
      <Container fluid className="px-0">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/Frame.png"
            alt="The Melanated Sanctuary Logo"
            className="d-inline-block align-top logo-image-home"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto home-links">
            <Nav.Link
              className="nav-link-aboutus disabled-link"
              as={Link}
              to="/about-us"
              style={{ pointerEvents: "none", color: "gray", opacity: 0.5 }}
            >
              About Us
            </Nav.Link>
            <Nav.Link className="nav-link-login" onClick={handleShowLogin}>
              Login
            </Nav.Link>
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
