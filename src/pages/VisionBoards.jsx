import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import "./VisionBoards.css";
import axiosInstance from "../services/axiosInstance";
import Footer from "../components/Footer";
import ActiveUserNav from "../components/ActiveUserNav";

const VisionBoards = () => {
  const [userData, setUserData] = useState(null);
  const [visionBoards, setVisionBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // retrieves user data from localStorage
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userLastName = localStorage.getItem("userLastName");
    const dueDate = localStorage.getItem("dueDate");

    if (userName) {
      setUserData({
        fullName: `${userName} ${userLastName || ""}`.trim(),  // Full name with first and last name
        firstName: userName,  // Only the first name
        dueDate: dueDate || "",
      });
    }
  }, []);

  // fetch vision boards data
  useEffect(() => {
    axiosInstance
      .get("/users/vision-boards/all")
      .then((response) => {
        // filter boards with created_by value of null since this is the value of all the admin created boards
        const filteredBoards = response.data.filter(
          (board) => board.created_by === null
        );
        setVisionBoards(filteredBoards);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vision boards:", error);
        setError("Failed to load vision boards.");
        setLoading(false);
      });
  }, []);

  // function to handle note button click. NOT IN USE..
  const handleNotesClick = () => {
    console.log("Notes clicked");
  };

  const overlayClasses = ["purple-overlay", "pink-overlay", "green-overlay"];

  return (
    <Container fluid className="vision-boards">
      <ActiveUserNav />

      {/* Vision Boards Content */}
      <Container fluid className="px-4 vision-boards-content">
        {userData ? (
          <>
            <h2 className="welcome-message">Welcome {userData.firstName},</h2>
            <p className="rec-info">This is your resource library, where you'll find the best articles for your pregnancy journey.<br /> Curate your own collection along the way. </p>
            <Button variant="link" className="all-topics-link">
              All topics
            </Button>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <Row
          className="vision-board-cards"
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        >
          {visionBoards.map((board, index) => (
            <Col key={board.id} md={4} className="mb-4">
              <Link
                to={`/vision-boards/${board.id}/content`}
                className="card-link"
              >
                {" "}
                {/* Wrap the Card with Link */}
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
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop if fallback fails
                      e.target.src =
                        "https://bloximages.newyork1.vip.townnews.com/princewilliamtimes.com/content/tncms/assets/v3/editorial/3/e5/3e571658-4951-11ec-9557-7fd639a33ea8/6197c990a7a13.image.png?resize=1776%2C1167"; // Alternate image URL
                    }}
                  />
                  <Card.Body
                    className={overlayClasses[index % overlayClasses.length]}
                  >
                    <Card.Title className="title-card-formats">
                      {board.name}
                    </Card.Title>
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
