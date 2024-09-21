import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStickyNote,
  faUserCircle,
  faFolder,
  faBook,
  faSeedling,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./ActiveUserNav.css";

const ActiveUserNav = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle logout function
  const handleLogout = () => {
    // Log the token and user info before clearing
    console.log("Clearing auth token:", localStorage.getItem('authToken'));
    console.log("Clearing user first name:", localStorage.getItem('userName'));
    console.log("Clearing user last name:", localStorage.getItem('userLastName'));
  
    // Clear the token and user from local storage
    localStorage.removeItem('authToken'); // Remove auth token
    localStorage.removeItem('userName');  // Remove user's first name
    localStorage.removeItem('userLastName'); // Remove user's last name
  
    // Redirect the user to the login page
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-custom active-user-nav w-100">
      <Container fluid className="px-0">
        {/* Use Link component for client-side navigation */}
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
            <Nav.Link
              href="#notes"
              className="notes-link"
            >
              <FontAwesomeIcon
                icon={faStickyNote}
                style={{ fontSize: "28px" }}
              />
            </Nav.Link>

            <Nav.Link as={Link} to="/sanctuary" className="folder-link">
              <FontAwesomeIcon icon={faSeedling} style={{ fontSize: "28px" }} />
            </Nav.Link>

            <Nav.Link as={Link} to="/vision-boards" className="library-link">
              <FontAwesomeIcon icon={faBook} style={{ fontSize: "28px" }} />{" "}
            </Nav.Link>

            <Nav.Link href="#profile" className="profile-link">
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: "28px" }}
              />
            </Nav.Link>

            {/* Add the Logout button */}
            <Nav.Link onClick={handleLogout} className="logout-link">
              <FontAwesomeIcon
                icon={faSignOutAlt} // Logout icon
                style={{ fontSize: "28px" }}
              />
              <span className="ms-2">Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ActiveUserNav;
