import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Navbar, Nav, Card } from 'react-bootstrap';
import './VisionBoards.css';
import axiosInstance from '../services/axiosInstance';
import Footer from '../components/Footer';
import ActiveUserNav from '../components/ActiveUserNav';

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

  const overlayClasses = ['purple-overlay', 'pink-overlay', 'green-overlay'];

  return (
    <Container fluid className="vision-boards">
      <ActiveUserNav />

      {/* Vision Boards Content */}
      <Container fluid className="px-4 vision-boards-content">
        {userData ? ( // Check if userData is loaded
          <>
            <h2 className="welcome-message">Welcome {userData.name},</h2>
            <p className='rec-info'>
              This is your resource library...
            </p>
            <Button variant="link" className="all-topics-link">
              All topics
            </Button>
          </>
        ) : (
          <p>Loading...</p> // Show loading state while fetching data
        )}

        <Row className="vision-board-cards" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
          {visionBoards.map((board, index) => (
          <Col key={board.id} md={4} className="mb-4">
                  <Link to={`/vision-boards/${board.id}/content`} className="card-link"> {/* Wrap the Card with Link */}
                    <Card className="vision-board-card">
                    <Card.Img
                      variant="top"
                      src={
                        board.pic_url && board.pic_url.trim() !== ""
                          ? board.pic_url
                          : "https://bloximages.newyork1.vip.townnews.com/princewilliamtimes.com/content/tncms/assets/v3/editorial/3/e5/3e571658-4951-11ec-9557-7fd639a33ea8/6197c990a7a13.image.png?resize=1776%2C1167"
                      }
                      alt={board.name}
                      className="fixed-size-img"
                    />
                      <Card.Body className={overlayClasses[index % overlayClasses.length]}>
                        <Card.Title className="title-card-formats">{board.name}</Card.Title>
                        <Card.Text className="fixed-height-texting">
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
