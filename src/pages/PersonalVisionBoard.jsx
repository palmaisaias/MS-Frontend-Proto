import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "./PersonalVisionBoard.css";
import Footer from "../components/Footer";
import ActiveUserNav from "../components/ActiveUserNav";
import axiosInstance from "../services/axiosInstance";
import CreateBoardModal from "../components/CreateBoardModal";

const PersonalVisionBoard = () => {
  const location = useLocation();
  const visionBoard = location.state?.visionBoard; // Access the passed vision board data
  const imageUrl = visionBoard?.main_image_url;

  const [boards, setBoards] = useState([]); // State to manage existing boards
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isArticleAdded, setIsArticleAdded] = useState(false);
  const [newBoardId, setNewBoardId] = useState(null);
  const navigate = useNavigate();

  // Check if there are existing boards; if not, prompt user to create one
  // Fetch the current user ID from the /user_details endpoint
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Make an API call to get the current user's details
        const response = await axiosInstance.get("/user_details");
        console.log("USER DETAIL RESPONSE:", response); // Debugging log
        const userId = response.data.user_id; // Extract the user_id from the response
        setCurrentUserId(userId); // Set the current user ID
        console.log("Fetched User ID:", userId); // Debugging log
      } catch (error) {
        console.error("Error fetching current user details:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch and filter boards created by the current user
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        // Fetch subscribed vision boards from the backend
        const response = await axiosInstance.get(
          "/users/vision-boards/subscribed"
        );
        console.log("Fetched Vision BOARDS:", response.data);

        // Filter boards that were created by the current user
        const createdBoards = response.data.filter(
          (board) =>
            typeof board.created_by === "number" &&
            board.created_by === currentUserId
        );

        // Log only the filtered boards that belong to the current user
        // HERE. IF THE USER HAS BOARDS THAT WERE CREATED BY THEMSELVES. THE LOGIC WILL SPLIT HERE
        console.log(
          "Boards Created by Current User (Filtered):",
          createdBoards
        );

        // Set the state with filtered boards created by the current user
        setBoards(createdBoards);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    // Fetch boards only when the currentUserId is available
    if (currentUserId !== null) {
      fetchBoards();
    }
  }, [currentUserId]);

  const handleCreateBoard = async () => {
    try {
      // Log the data being passed
      console.log("Data being passed:", {
        name: newBoardName,
        description: newBoardDescription,
      });

      console.log(
        "Token being passed:",
        axiosInstance.defaults.headers.common["Authorization"]
      );
      // Step 1: Create the new board
      const response = await axiosInstance.post("/vision-boards", {
        name: newBoardName,
        description: newBoardDescription,
      });

      if (response.status === 201) {
        const newBoard = response.data;
        const newBoardId = newBoard.id;
        setNewBoardTitle(newBoard.name);
        setNewBoardId(newBoardId); // Store the newBoardId in state

        // Step 2: Add content to the newly created board
        if (visionBoard) {
          const contentResponse = await axiosInstance.post(
            `/vision-boards/${newBoardId}/content`,
            {
              content_url: visionBoard.content_url,
              content_type: visionBoard.content_type,
              main_image_url: imageUrl,
            }
          );

          if (contentResponse.status === 201) {
            console.log(
              "Content added successfully onto NEW board:",
              contentResponse.data
            );
            setShowCreateBoardModal(false);
            setIsArticleAdded(true);
          }
        }

        // Step 3: Update state with the new board
        setBoards((prevBoards) => [...prevBoards, newBoard]);
      }
    } catch (error) {
      console.error("Error creating a new board or adding content:", error);
      // Handle error cases
    }
  };

  const handleBoardSelection = async (boardId) => {
    try {
      // Log the data being sent to the backend
      console.log("Data being sent to /vision-boards/content:", {
        content_url: visionBoard.content_url,
        content_type: visionBoard.content_type,
        main_image_url: visionBoard.main_image_url,
      });
      const contentResponse = await axiosInstance.post(
        `/vision-boards/${boardId}/content`,
        {
          content_url: visionBoard.content_url,
          content_type: visionBoard.content_type,
        }
      );

      if (contentResponse.status === 201) {
        console.log(
          "Content added successfully onto EXISTING board:",
          contentResponse.data
        );
        setIsArticleAdded(true);
        setNewBoardId(boardId); // Store the selected boardId in state
        const selectedBoard = boards.find((board) => board.id === boardId);
        setNewBoardTitle(selectedBoard.name);
      }
    } catch (error) {
      console.error("Error adding content to the board:", error);
      // Handle error
    }
  };

  const navigateToBoard = (boardId, visionBoard) => {
    console.log("Navigating to board with data:", {
      boardId,
      main_image_url: imageUrl, // Log to ensure it's included
    });

    // Navigate and pass the entire visionBoard object or necessary properties
    navigate(`/vision-board/${boardId}`, {
      state: { visionBoard }, // Passing the full visionBoard with the image URL
    });
  };

  const handleShowCreateBoardModal = () => setShowCreateBoardModal(true);
  const handleCloseCreateBoardModal = () => setShowCreateBoardModal(false);

  return (
    <Container fluid className="vision-board-detail-page">
      <ActiveUserNav />

      <Container fluid className="mt-4 flex-grow-1">
        {/* {newBoardTitle && <h2>{newBoardTitle}</h2>} */}

        {isArticleAdded ? (
          // Success message after article is added
          <Row className="justify-content-center">
            <Col md={4}>
              <Card className="vision-board-carding">
                <Card.Img
                  variant="top"
                  src={
                    visionBoard.main_image_url &&
                    visionBoard.main_image_url.trim() !== ""
                      ? visionBoard.main_image_url
                      : "https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={visionBoard.title}
                  className="fixed-size-imgs"
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "25px", fontWeight: "Bold" }}>
                    Great choice!
                  </Card.Title>
                  <Card.Text>
                    Article added successfully to "{newBoardTitle}"!
                  </Card.Text>
                  <Button
                    className="explore-your-board"
                    onClick={() => navigateToBoard(newBoardId, visionBoard)}
                    // Pass both newBoardId and selectedVisionBoard
                  >
                    Explore Your Board
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : boards.length === 0 ? (
          // User has no existing boards; prompt to create one
          <Row className="justify-content-left">
            <Col md={4}>
              <Card
                className="text-center newer-board-card"
                onClick={handleShowCreateBoardModal}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <Card.Title>Start Your Creative Journey</Card.Title>
                  <Card.Text>
                    Tap here to create your very first vision board and begin
                    shaping your ideas.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          // ----------------------- User has existing boards; display them for selection ------------------------------------
          <>
            <h2 className="welcome-message">
              Choose a Board to Save This Article:
            </h2>
            <Row className="g-2">
              {boards.map((board) => (
                <Col key={board.id} md={4} className="mb-4">
                  <Card
                    className="existing-board-card"
                    onClick={() => handleBoardSelection(board.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Body>
                      <Card.Title>{board.name}</Card.Title>
                      <Card.Text>{board.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {/* Include a card to create a new board */}
              <Col md={4} className="mb-4">
                <Card
                  className="text-center newer-board-card"
                  onClick={handleShowCreateBoardModal}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title>Create a NEW Board</Card.Title>
                    <Card.Text>Click here to make a new board</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* CreateBoardModal component */}
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

export default PersonalVisionBoard;
