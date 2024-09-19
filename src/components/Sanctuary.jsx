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
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken) {
        // Redirect to login if no token is found
        navigate("/login");
        return;
      }
  
      try {
        // Proceed with the API call if token exists
        const response = await axiosInstance.get("/user_details");
        console.log("User details response:", response); // Debugging log
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
    <Container fluid className="vision-board-detail-page"> {/*Inheriting from VisionBoardDetail */}
      <ActiveUserNav />

      <Container fluid className="mt-4" style={{ paddingLeft: '30px' }}>
        <h1 className='board-title-message'>Your Vision Boards</h1>
        <p className='sanct-message'>This is your personal sanctuary...</p>
        {boards.length === 0 ? (
          <p className='sanct-message'>As you craft your sanctuary, your boards will start to take shape here!</p>
        ) : (
          <Row>
            {boards.map((board) => (
              <Col key={board.id} md={4} className="mb-4" style={{ paddingLeft: '50px' }}>
                <Card className="vision-board-card" onClick={() => navigateToBoard(board.id)} style={{ cursor: 'pointer' }}>
                  <Card.Body className='pink-overlay padded-body'>
                    <Card.Title className='title-card-formatz'>{board.name}</Card.Title>
                    <Card.Text className='fixed-height-textz'>{board.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </Container>
  );
};

export default Sanctuary;
