import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axiosInstance from '../services/axiosInstance';
import ActiveUserNav from '../components/ActiveUserNav';
import Footer from '../components/Footer';
import './SingleBoardDetail.css'

const SingleBoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axiosInstance.get(`/vision-boards/${boardId}`);
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    const fetchBoardContent = async () => {
      try {
        const response = await axiosInstance.get(`/vision-boards/${boardId}/content`);
        setContent(response.data);
      } catch (error) {
        console.error("Error fetching board content:", error);
      }
    };

    fetchBoardDetails();
    fetchBoardContent();
  }, [boardId]);

  if (!board) {
    return <p>Loading...</p>;
  }

  return (
    <div className="vision-board-detail-page">
      <ActiveUserNav />

      <Container fluid className="mt-4">
        <h2 className='welcome-message'>{board.name}</h2>
        <p>{board.description}</p>

        <Row>
          {content.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="vision-board-card">
              <Card.Img
                      variant="top"
                      src={
                        item.main_image_url && item.main_image_url.trim() !== ''
                          ? item.main_image_url
                          : 'https://www.aiseesoft.com/images/tutorial/jpg-to-url/jpg-to-url.jpg'
                      }
                      alt={item.title}
                      className="fixed-size-img-single"
                    />
                <Card.Body>
                  <Card.Title className='title-card-formatz'>{item.title}</Card.Title>
                  <Card.Text className='fixed-height-textz'>{item.description}</Card.Text>
                  {/* Add more fields as necessary */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/vision-boards">
            <Button variant="primary" style={{ margin: '20px' }}>Keep Exploring</Button>
          </Link>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default SingleBoardDetail;
