import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axiosInstance from "../services/axiosInstance";
import ActiveUserNav from "../components/ActiveUserNav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./Sanctuary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CreateBoardModal from "./CreateBoardModal";

const Sanctuary = () => {
  const [boards, setBoards] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

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
        const response = await axiosInstance.get(
          "/users/vision-boards/subscribed"
        );
        const userBoards = response.data.filter(
          (board) => board.created_by === currentUserId
        );
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

  const handleDelete = async (boardId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this board?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/users/vision-boards/${boardId}`);
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId)
      );
    } catch (error) {
      console.error("Error deleting the board:", error);
      alert("Failed to delete the board. Please try again.");
    }
  };

  const handleCreateBoard = async () => {
    try {
      // Log the data being passed
      console.log("Data being passed:", {
        name: newBoardName,
        description: newBoardDescription,
      });

      console.log('Token being passed:', axiosInstance.defaults.headers.common['Authorization']);
      // Step 1: Create the new board
      const response = await axiosInstance.post("/vision-boards", {
        name: newBoardName,
        description: newBoardDescription,
      });

      if (response.status === 201) {
        const newBoard = response.data;

        // Step 2: Update state with the new board
        setBoards((prevBoards) => [...prevBoards, newBoard]);
        handleCloseCreateBoardModal();
      }
    } catch (error) {
      console.error("Error creating a new board or adding content:", error);
      // Handle error cases
    }
  };

  const handleShowCreateBoardModal = () => setShowCreateBoardModal(true);
  const handleCloseCreateBoardModal = () => setShowCreateBoardModal(false);

  return (
    <Container fluid className="vision-board-detail-page">
      {" "}
      {/*Inheriting from VisionBoardDetail */}
      <ActiveUserNav />
      <Container fluid className="mt-4" style={{ paddingLeft: "30px" }}>
        <h1 className="board-title-message">Your Vision Boards</h1>
        <p className="sanct-message">This is your personal sanctuary...</p>
        {boards.length === 0 ? (
          <p className="sanct-message">
            As you craft your sanctuary, your boards will start to take shape
            here!
          </p>
        ) : (
          <Row>
            {boards.map((board) => (
              <Col
                key={board.id}
                md={4}
                className="mb-4"
                style={{ paddingLeft: "50px", paddingRight: "50px" }}
              >
                <Card
                  className="vision-board-card"
                  onClick={() => navigateToBoard(board.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="pink-overlay padded-body">
                    <Card.Title className="title-card-formatz">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="delete-icon"
                        aria-label="Delete Board"
                        title="Delete Board"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering navigateToBoard
                          handleDelete(board.id);
                        }}
                      />
                      {board.name}
                    </Card.Title>
                    <Card.Text className="fixed-height-textz">
                      {board.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col
              md={4}
              className="mb-4"
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              <Card
                className="vision-board-card"
                onClick={handleShowCreateBoardModal}
                style={{ cursor: "pointer" }}
              >
                <Card.Body className="newbie-board-card">
                  <Card.Title>
                    Create NEW Board
                  </Card.Title>
                  <Card.Text>
                    Click Here to Make a New Board
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <CreateBoardModal
        show={showCreateBoardModal}
        handleClose={handleCloseCreateBoardModal}
        newBoardName={newBoardName}
        setNewBoardName={setNewBoardName}
        newBoardDescription={newBoardDescription}
        setNewBoardDescription={setNewBoardDescription}
        handleCreateBoard={handleCreateBoard}
      />
      <Footer />
    </Container>
  );
};

export default Sanctuary;
