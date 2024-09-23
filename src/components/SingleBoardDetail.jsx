import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axiosInstance from "../services/axiosInstance";
import ActiveUserNav from "../components/ActiveUserNav";
import Footer from "../components/Footer";
import "./SingleBoardDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArticleAdd from "./ArticleAdd";

const SingleBoardDetail = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleType, setArticleType] = useState("");
  const [articleURL, setArticleURL] = useState("");

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        // Request for board. Uses the board id from the url using params
        const response = await axiosInstance.get(`/vision-boards/${boardId}`);

        console.log("Received board details data:", response.data); // for troubleshooting. making sure the intended data is received

        setBoard(response.data);
      } catch (error) {
        // Some of these error logs can be cleared. Will wait until we decide if we will push this project further
        console.error("Error fetching board details in Sanctuary:", error);
      }
    };

    const fetchBoardContent = async (page) => {
      try {
        // Paginated request. Works nicely
        const response = await axiosInstance.get(
          `/vision-boards/${boardId}/content?page=${page}&limit=10`
        );

        console.log(
          "Received board content data inside the SANCT:",
          response.data
        );

        setContent(response.data);

        setHasMoreContent(response.data.length === 10); // for pagination
      } catch (error) {
        console.error("Error fetching board content:", error);
      }
    };

    fetchBoardDetails();
    fetchBoardContent(currentPage);
  }, [boardId, currentPage]);

  if (!board) {
    return <p>Loading...</p>;
  }

  const handleSubmitArticle = async () => {
    try {
      const data = {
        content_type: articleType,
        content_url: articleURL,
        title: `New ${
          articleType.charAt(0).toUpperCase() + articleType.slice(1)
        }`,
      };

      console.log("Data being sent to API:", data); // troubleshooting log

      const response = await axiosInstance.post(
        `/vision-boards/${boardId}/content`,
        data
      );

      setContent([...content, response.data]);

      handleCloseModal();

      // Delay the state reset to ensure the modal closes first. This is for troubleshooting the display of the entered data.
      // I beleive the issue ended up being in the proper items being passed to the modal but will come back to this.
      setTimeout(() => {
        setArticleType("");
        setArticleURL("");
      }, 300);
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Failed to add the article. Please try again.");
    }
  };

  const handleDeleteContent = async (contentItemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this content item?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/vision-boards/content/${contentItemId}`);
      setContent((prevContent) =>
        prevContent.filter((item) => item.id !== contentItemId)
      );
    } catch (error) {
      console.error("Error deleting the content item:", error);
      alert("Failed to delete the content item. Please try again.");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleAddArticle = () => {
    setShowArticleModal(true);
  };

  const handleCloseModal = () => {
    setShowArticleModal(false);
  };

  if (!board) {
    return <p>Loading...</p>;
  }

  return (
    <div className="vision-board-detail-page">
      <ActiveUserNav />

      <Container
        fluid
        className="mt-4 custom-padding"
        style={{ paddingLeft: "80px", paddingRight: "80px" }}
      >
        <Link to="/sanctuary" className="sanctuary-return-link">
          ← Back To Your Sanctuary
        </Link>
        <h2 className="welcome-message-single">{board.name}</h2>
        <p className="board-desc-single">{board.description}</p>

        <Row>
          {content.map((item, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="vision-board-card">
                <a
                  href={item.content_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {console.log("Image URL being used:", item.main_image_url)}
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
                      e.target.onerror = null; // Prevent loop in case of broken fallback URL. IMPORTANT
                      console.log("Error loading image, fallback triggered.");
                      e.target.src =
                        "https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    }}
                  />
                </a>
                <Card.Body>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    aria-label="Delete Content"
                    title="Delete Content"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteContent(item.id);
                    }}
                  />
                  <Card.Title className="title-card-formatz">
                    {item.title}
                  </Card.Title>
                  <Card.Text className="fixed-height-textz">
                    {item.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col md={4} className="mb-4">
            <Card
              className="vision-board-card"
              style={{ cursor: "pointer" }}
              onClick={handleAddArticle}
            >
              <Card.Body className="custom-add-art">
                <Card.Title className="title-card-formatz">
                  Add Custom Resource
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button
            onClick={handlePreviousPage}
            className="keep-exploring"
            style={{ margin: "20px" }}
            disabled={currentPage === 1}
          >
            ← Previous Page
          </Button>
          {hasMoreContent && (
            <Button
              onClick={handleNextPage}
              className="keep-exploring"
              style={{ margin: "20px" }}
            >
              Next Page →
            </Button>
          )}
        </div>
      </Container>
      <ArticleAdd
        show={showArticleModal}
        handleClose={handleCloseModal}
        articleType={articleType}
        setArticleType={setArticleType}
        articleURL={articleURL}
        setArticleURL={setArticleURL}
        handleAddArticle={handleSubmitArticle}
      />
      <Footer />
    </div>
  );
};

export default SingleBoardDetail;
