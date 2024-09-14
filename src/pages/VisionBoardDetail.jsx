import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import './VisionBoardDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar'; // Import the reusable NavBar component
import Footer from '../components/Footer'; // Import the reusable Footer component


const VisionBoardDetail = () => {
  const { id } = useParams();
  const [visionBoards, setVisionBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/vision-boards/${id}/content`)
      .then(response => {
        console.log('Fetched vision board data:', response.data);
        setVisionBoards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vision board:', error);
        setError('Failed to load vision board.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading vision board...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!visionBoards.length) {
    return <p>Vision board not found.</p>;
  }

  // Function to handle note button click
  const handleNotesClick = () => {
    console.log('Notes clicked');
    // Add navigation or logic for notes
  };

  return (
    <div className="vision-board-detail-page">
      {/* Use the reusable NavBar component */}
      <NavBar />

      <Container fluid className="mt-4">
        <Link to="/vision-boards" className="back-link">← Back to Vision Boards</Link>
        
        {/* Iterate over the array to display each vision board content */}
        <Row className="vision-board-cards">
          {visionBoards.map((visionBoard) => {
            // Determine the image source to use
            const imageUrl = visionBoard.main_image_url && visionBoard.main_image_url.trim() !== ""
              ? visionBoard.main_image_url
              : "https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg";
            
            return (
              <Col key={visionBoard.id} md={4} className="mb-4">
                <Card className="vision-board-card">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={visionBoard.title}
                    className="fixed-size-img"
                  />
                  <Card.Body>
                    <Card.Title className="title-card-format">{visionBoard.title}</Card.Title>
                    <Card.Text className="fixed-height-text">{visionBoard.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default VisionBoardDetail;
