import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap';
import './BirthPreparation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const BirthPreparation = () => {
  // Function to handle note button click
  const handleNotesClick = () => {
    console.log("Notes clicked");
    // Add navigation or logic for notes
  };

  return (
    <Container fluid className="vision-boards">
      {/* Navigation Bar */}
      <Navbar expand="lg" className="navbar-custom w-100">
        <Container fluid className="px-0">
          {/* Use Link component for client-side navigation. Standard. */}
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
                  <button type="submit" className='submit-button-search'>
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </form>
              </Nav.Item>
              <Nav.Link href="#notes" onClick={handleNotesClick} className="notes-link">
                <FontAwesomeIcon icon={faStickyNote} />
              </Nav.Link>
              <Nav.Link href="#profile" className="profile-link">
                <FontAwesomeIcon icon={faUserCircle} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Breadcrumbs */}
        <Container className="breadcrumb-container">
          <Link to="/vision-boards">
            <Button variant="link" className="all-topics-link">All topics</Button>
          </Link>
            <span className="breadcrumb-separator">{'>'}</span>
            <Button variant="link" className="current-topic-link">Birth Preparation</Button>
        </Container>

      {/* Birth Preparation Content */}
      <Container fluid className="px-4 vision-boards-content">
        <h2 className="welcome-message">Birth Preparation</h2>
        <p>Explore different aspects of birth preparation to ensure a smoother journey and a positive experience.</p>

        <Row className="vision-board-cards">
          {/* Card 1: Choosing a Provider */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/choosing-provider" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://images.theconversation.com/files/328372/original/file-20200416-192689-1aiush6.jpg?ixlib=rb-4.1.0&q=45&auto=format&w=926&fit=clip"
                  alt="Choosing a Provider"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Choosing a Provider</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Learn how to choose the right healthcare provider for your pregnancy and birth.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 2: Creating a Birth Plan */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/birth-plan" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://www.adoptionchoices.org/wp-content/uploads/2021/04/birth-mother-rights-colorado-1080x675.jpg"
                  alt="Creating a Birth Plan"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Creating a Birth Plan</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Develop a birth plan that reflects your preferences and expectations for delivery.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 3: Pain Management Options */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/pain-management" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/P7EYKXVPZYI6TFARUYEPTUGC2M.jpg&w=1200"
                  alt="Pain Management"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Pain Management Options</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Explore various pain management options available for labor and delivery.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 4: Preparing for the Hospital */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/hospital-preparation" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://static01.nyt.com/images/2021/03/14/nyregion/14NJBIRTHCENTER-07/00NJBIRTHCENTER-07-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1200"
                  alt="Hospital Preparation"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Preparing for the Hospital</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Know what to pack and how to prepare for your hospital stay.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 5: Postpartum Care */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/postpartum-care" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://www.cannondesign.com/img/2695c1f6-ccb0-4480-897b-c82f40a6fcce/607620_00_N6_cdwebsite.jpg?fm=webp&q=80&fit=max&crop=3000%2C1688%2C0%2C0&w=1250"
                  alt="Postpartum Care"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Postpartum Care</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Understand the essentials of postpartum care for a smooth recovery.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          {/* Card 6: Building a Support Network */}
          <Col md={4} className="mb-4">
            <Link to="/birth-preparation/support-network" className="card-link">
              <Card className="vision-board-card">
                <Card.Img
                  variant="top"
                  src="https://images.squarespace-cdn.com/content/v1/5f46cc0d0868b26526cc1fa0/1612224374566-TY4ZHXKJORIBZWLFWSHL/Megan+Homebirth-105.jpg?format=1500w"
                  alt="Building a Support Network"
                  className="fixed-size-img"
                />
                <Card.Body className="pink-overlay">
                  <Card.Title className="title-card-format">Building a Support Network</Card.Title>
                  <Card.Text className="fixed-height-text">
                    Learn how to build a support network for you and your baby after birth.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
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
    </Container>
  );
};

export default BirthPreparation;
