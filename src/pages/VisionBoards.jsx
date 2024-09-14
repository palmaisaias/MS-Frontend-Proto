import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './VisionBoards.css';
import axiosInstance from '../services/axiosInstance';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const VisionBoards = () => {
  const [userData, setUserData] = useState(null);
  const [visionBoards, setVisionBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve user data from localStorage
  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const userLastName = localStorage.getItem('userLastName');
    const dueDate = localStorage.getItem('dueDate');

    if (userName) {
      setUserData({
        name: `${userName} ${userLastName || ''}`.trim(),
        dueDate: dueDate || '',
      });
    }
  }, []);

  // Fetch vision boards data
  useEffect(() => {
    axiosInstance.get('/users/vision-boards/all')
      .then(response => {
        setVisionBoards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vision boards:', error);
        setError('Failed to load vision boards.');
        setLoading(false);
      });
  }, []);

  // Function to handle note button click
  const handleNotesClick = () => {
    console.log('Notes clicked');
    // Add navigation or logic for notes
  };

  return (
    <Container fluid className="vision-boards">
      <NavBar />

      {/* Vision Boards Content */}
      <Container fluid className="px-4 vision-boards-content">
        {userData ? ( // Check if userData is loaded
          <>
            <h2 className="welcome-message">Welcome {userData.name},</h2>
            <p>
              This is your personal sanctuary, where you’ll find the best articles for your pregnancy journey.
              <br /> Curate your own collection along the way.
            </p>
            <p>
              Your due date is: <strong>{userData.dueDate}</strong>
            </p>
            <Button variant="link" className="all-topics-link">
              All topics
            </Button>
          </>
        ) : (
          <p>Loading...</p> // Show loading state while fetching data
        )}

        <Row className="vision-board-cards">
          {visionBoards.map(board => (
          <Col key={board.id} md={4} className="mb-4">
                  <Link to={`/vision-boards/${board.id}/content`} className="card-link"> {/* Wrap the Card with Link */}
                    <Card className="vision-board-card">
                      <Card.Img
                        variant="top"
                        src="https://bloximages.newyork1.vip.townnews.com/princewilliamtimes.com/content/tncms/assets/v3/editorial/3/e5/3e571658-4951-11ec-9557-7fd639a33ea8/6197c990a7a13.image.png?resize=1776%2C1167" // Placeholder image
                        alt={board.name}
                        className="fixed-size-img"
                      />
                      <Card.Body className="pink-overlay">
                        <Card.Title className="title-card-format">{board.name}</Card.Title>
                        <Card.Text className="fixed-height-text">
                          {board.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </Container>
  );
};

export default VisionBoards;
