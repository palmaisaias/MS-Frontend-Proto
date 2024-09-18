import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStickyNote,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const ActiveUserNav = ({ handleNotesClick }) => {
  return (
    <Navbar expand="lg" className="navbar-custom w-100">
      <Container fluid className="px-0">
        {/* Use Link component for client-side navigation*/}
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
          <Nav className="ms-auto d-flex align-items-center">
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
              onClick={handleNotesClick}
              className="notes-link"
            >
              <FontAwesomeIcon icon={faStickyNote} />
            </Nav.Link>
            <Nav.Link href="#profile" className="profile-link">
              <FontAwesomeIcon icon={faUserCircle} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ActiveUserNav;
