import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap';
import './VisionBoards.css'; // Make sure to create a corresponding CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const VisionBoards = () => {
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

      {/* Vision Boards Content */}
      <Container fluid className="px-4 vision-boards-content">
        <h2 className="welcome-message">Welcome Nina,</h2>
        <p>This is your personal sanctuary, where you’ll find the best articles for your pregnancy journey. <br /> Curate your own collection along the way.</p>
        <Button variant="link" className="all-topics-link">All topics</Button>

        <Row className="vision-board-cards">
          {/* Using React Bootstrap Card for each section */}
          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://cdn.prod.website-files.com/5e83c94c5b5cc52b68f585a8/65563fca28256f73f6032af5_how-to-exercise-safely-when-pregnant-guidelines-tips-precautions-more-lg.webp" alt="Physical Wellness" className="fixed-size-img" />
              <Card.Body className="purple-overlay">
                <Card.Title className='title-card-format-pback'>Physical Wellness</Card.Title>
                <Card.Text className='fixed-height-text-p'>
                  Prioritizing physical wellness with exercise and proper nutrition can help reduce this risk and improve pregnancy outcomes...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Repeat similar blocks for other categories like Birth Preparation, Emotional Well-Being, etc. */}
          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://bloximages.newyork1.vip.townnews.com/princewilliamtimes.com/content/tncms/assets/v3/editorial/3/e5/3e571658-4951-11ec-9557-7fd639a33ea8/6197c990a7a13.image.png?resize=1776%2C1167" alt="Birth Preparation" className="fixed-size-img" />
              <Card.Body className="pink-overlay">
                <Card.Title className='title-card-format'>Birth Preparation</Card.Title>
                <Card.Text className='fixed-height-text'>
                  Preparing for birth with the right resources and guidance can help ensure a smoother journey and positive outcome...
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://images.squarespace-cdn.com/content/v1/5d105042633ebd0001051d3f/1634925282146-8BXVMLH0OG3FE1RZJ3LT/Copy+of+Copy+of+Images+for+Aleks+%286%29.png" alt="Birth Preparation" className="fixed-size-img" />
              <Card.Body className="green-overlay">
                <Card.Title className='title-card-format'>Emotional Well-Being</Card.Title>
                <Card.Text className='fixed-height-text'>
                Prioritizing emotional well-being provides the necessary support and tools to foster resilience and balance, ensuring a more fulfilling journey and positive outcome.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://imgix.bustle.com/uploads/image/2018/1/25/bc7bef89-f2c1-4891-b0d4-c13680d07d20-fotolia_163233358_subscription_monthly_m.jpg?w=540&q=50&dpr=2" alt="Birth Preparation" className="fixed-size-img" />
              <Card.Body className="green-overlay">
                <Card.Title className='title-card-format'>Nutritional Care</Card.Title>
                <Card.Text className='fixed-height-text'>
                Personalized nutritional care offers the essential support and guidance needed to nurture your well-being, ensuring a healthier journey and positive outcome.                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://winshipcancer.emory.edu/wellness-and-support-services/_images/young-adult-survivorship.jpg" alt="Birth Preparation" className="fixed-size-img" />
              <Card.Body className="purple-overlay">
                <Card.Title className='title-card-format-pback'>Advocacy Navigation</Card.Title>
                <Card.Text className='fixed-height-text'>
                Effective advocacy navigation empowers you to make informed decisions and access the right support, ensuring a smoother journey and positive outcome in your unique circumstances.                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="vision-board-card">
              <Card.Img variant="top" src="https://s28126.pcdn.co/blogs/ask-experian/wp-content/uploads/couple-planning-financial-goals.jpg.optimal.jpg" alt="Birth Preparation" className="fixed-size-img" />
              <Card.Body className="pink-overlay">
                <Card.Title className='title-card-format'>Financial Planning & support</Card.Title>
                <Card.Text className='fixed-height-text'>
                Proper financial planning and support can provide peace of mind and stability, helping to ensure a smoother journey and positive outcome for you and your family.                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* Continue adding cards for other sections like Emotional Well-Being, Nutritional Care, etc. */}
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

export default VisionBoards;
