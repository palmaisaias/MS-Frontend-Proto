import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBook,
  faSeedling,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./ActiveUserNav.css";

const ActiveUserNav = () => {
  const navigate = useNavigate(); // Initialize navigate

  //LOGOUT. Clears the stored token.
  const handleLogout = () => {

    console.log("Clearing auth token");
    console.log("Clearing user first name:", localStorage.getItem("userName"));
    console.log(
      "Clearing user last name:",
      localStorage.getItem("userLastName")
    );

    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLastName");

    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-custom active-user-nav w-100">
      <Container fluid className="px-0 drop-bar-contain">

        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
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
          <Nav className="ms-auto d-flex align-items-center justify-content-between">
            <Nav.Item className="search-bar-container">
              <form className="d-flex" action="#search">
                <input
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button type="submit" className="submit-button-search">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </Nav.Item>
            <Nav.Link as={Link} to="/sanctuary" className="folder-link">
              <FontAwesomeIcon
                className="seedling"
                icon={faSeedling}
                style={{ fontSize: "28px" }}
              />
              <h4 className="hamburger-font">Your Sanctuary</h4>
            </Nav.Link>

            <Nav.Link as={Link} to="/vision-boards" className="library-link">
              <FontAwesomeIcon
                className="bookling"
                icon={faBook}
                style={{ fontSize: "28px" }}
              />{" "}
              <h4 className="hamburger-font">Resource Library</h4>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="logout-link">
              <FontAwesomeIcon
                className="logging"
                icon={faSignOutAlt}
                style={{ fontSize: "28px" }}
              />
              <h4 className="hamburger-font">Log Out</h4>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ActiveUserNav;
