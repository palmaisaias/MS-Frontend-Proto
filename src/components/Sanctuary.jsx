import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';
import ActiveUserNav from '../components/ActiveUserNav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './Sanctuary.css'


const Sanctuary = () => {
  const [boards, setBoards] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  // Pull user id from the user_details endpoint
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get('/user_details');
        const userId = response.data.user_id;
        setCurrentUserId(userId);
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Pull all of the boards and filter them
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axiosInstance.get('/users/vision-boards/subscribed');
        const userBoards = response.data.filter(board => board.created_by === currentUserId);
        setBoards(userBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    if (currentUserId !== null) {
      fetchBoards();
    }
  }, [currentUserId]);

  const navigateToBoard = (boardId) => {
    navigate(`/vision-board/${boardId}`, { state: { boardId } });
  };

  return (
    <div className="sanctuary-page">
      <ActiveUserNav />

      <Container fluid className="mt-4">
        <h2>Your Vision Boards</h2>
        {boards.length === 0 ? (
          <p>You don't have any boards yet. Start by creating one!</p>
        ) : (
          <Row>
            {boards.map((board) => (
              <Col key={board.id} md={4} className="mb-4">
                <Card className="vision-board-card" onClick={() => navigateToBoard(board.id)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>{board.name}</Card.Title>
                    <Card.Text>{board.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default Sanctuary;
