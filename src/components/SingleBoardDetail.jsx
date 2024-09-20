import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axiosInstance from "../services/axiosInstance";
import ActiveUserNav from "../components/ActiveUserNav";
import Footer from "../components/Footer";
import "./SingleBoardDetail.css";

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
        const response = await axiosInstance.get(
          `/vision-boards/${boardId}/content`
        );
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

      <Container fluid className="mt-4" style={{ paddingLeft: "80px" }}>
        <h2 className="welcome-message-single">{board.name}</h2>
        <p className="board-desc-single">{board.description}</p>

        <Row>
          {content.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <a
                href={item.content_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Card className="vision-board-card">
                  <Card.Img
                    variant="top"
                    src={
                      item.main_image_url && item.main_image_url.trim() !== ""
                        ? item.main_image_url
                        : "https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={item.title}
                    className="fixed-size-img-single"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback fails
                      e.target.src =
                        "https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Alternate image URL
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="title-card-formatz">
                      {item.title}
                    </Card.Title>
                    <Card.Text className="fixed-height-textz">
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/vision-boards">
            <Button className="keep-exploring" style={{ margin: "20px" }}>
              Keep Exploring
            </Button>
          </Link>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default SingleBoardDetail;
