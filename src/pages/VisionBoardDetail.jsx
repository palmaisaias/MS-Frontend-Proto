import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { Container, Row, Col, Card, Button, Nav, Modal, Breadcrumb } from 'react-bootstrap';
import './VisionBoardDetail.css';
import Footer from '../components/Footer'; // Import the reusable Footer component
import ActiveUserNav from '../components/ActiveUserNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderPlus, faSearch, faStickyNote, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShareSquare, faBookmark} from '@fortawesome/free-regular-svg-icons';

const VisionBoardDetail = () => {
  const { id } = useParams();
  const [visionBoards, setVisionBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVisionBoard, setSelectedVisionBoard] = useState(null);
  const [boardName, setBoardName] = useState(''); // Initialize state for board name
  const [boardDescription, setBoardDescription] = useState(''); // Initialize state for board description
  const navigate = useNavigate();

  // Consolidated useEffect to handle fetching both content and board details
  useEffect(() => {
    const fetchVisionBoardData = async () => {
      try {
        // Fetch vision board content
        const contentResponse = await axiosInstance.get(`/vision-boards/${id}/content`);
        console.log('Fetched vision board content data:', contentResponse.data);
        setVisionBoards(contentResponse.data);

        // Fetch vision board details (name and description)
        const boardResponse = await axiosInstance.get(`/vision-boards/${id}`);
        const { name, description } = boardResponse.data;
        setBoardName(name);
        setBoardDescription(description);
        console.log('Fetched Vision Board Details:', { name, description });

        setLoading(false); // Set loading to false after fetching all data
      } catch (error) {
        console.error('Error fetching vision board data:', error);
        setError('Failed to load vision board.');
        setLoading(false);
      }
    };

    fetchVisionBoardData(); // Call the function to fetch data
  }, [id]);

  const handleCloseModal = () => setShowModal(false);

  const handleAddToBoard = () => {
    setShowModal(false); // Close the modal
    navigate('/personal-vision-board', { state: { visionBoard: selectedVisionBoard } }); // Navigate with data
  };

  const handleShowModal = (visionBoard) => {
    setSelectedVisionBoard(visionBoard);
    setShowModal(true);
  };

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
    <Container fluid className="vision-board-detail-page">
      {/* Use the reusable NavBar component */}
      <ActiveUserNav />
      <Container fluid className="mt-4">

      <h1 className='board-title-message'>{boardName}</h1> {/* Display the name */}
      <p className='board-desc-message'>{boardDescription}</p> {/* Display the description */}

      <Breadcrumb>
        {/* Link to the "All topics" page */}
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/vision-boards" }} className="all-topics-link">
          All topics
        </Breadcrumb.Item>

        {/* Current page (example: 'Current Page') */}
        <Breadcrumb.Item active>{boardName}</Breadcrumb.Item>
    </Breadcrumb>

        {/* Iterate over the array to display each vision board content */}
        <Row className="vision-board-cards" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
          {visionBoards.map((visionBoard) => {
            // Determine the image source to use
            const imageUrl =
              visionBoard.main_image_url && visionBoard.main_image_url.trim() !== ''
                ? visionBoard.main_image_url
                : 'https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

            return (
              <Col key={visionBoard.id} md={4} className="mb-4">
                <Card className="vision-board-card" onClick={() => handleShowModal(visionBoard)}>
                  <Card.Img variant="top" src={imageUrl} alt={visionBoard.title} className="fixed-size-img" />
                  <Card.Body className='pink-overlay'>
                    <Card.Title className="title-card-formatz">{visionBoard.title}</Card.Title>
                    <Card.Text className="fixed-height-textz">{visionBoard.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Modal to display expanded content */}
      {selectedVisionBoard && (
        <Modal className='cool-mood-modal' show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Body className='p-0'>
            <img
              src={
                selectedVisionBoard.main_image_url && selectedVisionBoard.main_image_url.trim() !== ''
                  ? selectedVisionBoard.main_image_url
                  : 'https://images.unsplash.com/photo-1635358276648-eb4dad62513f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt={selectedVisionBoard.title}
              className="fixed-size-img-mod mb-3"
            />
            <Modal.Title className='p-2 colorific'>{selectedVisionBoard.title}</Modal.Title>
            <p className='p-2 colorific'>{selectedVisionBoard.description}</p>
            {/* Add any additional content you wish to display */}
          </Modal.Body>
          <Modal.Footer className='justify-content-start'>
            <FontAwesomeIcon icon={faShareSquare} className="me-3" size="lg" title="Share" />
            <FontAwesomeIcon icon={faBookmark} className="me-3" size="lg" title="Bookmark" />
            <FontAwesomeIcon icon={faStickyNote} className="me-3" size="lg" title="Notes" />
            <div className="icon-button-wrapper">
              {/* Button element with the FontAwesome icon */}
              <button onClick={handleAddToBoard} className="icon-button">
                <FontAwesomeIcon icon={faPlus} size="lg" title="Add" />
              </button>
              {/* Tooltip that appears on hover */}
              <span className="tooltip-text">Add to Board</span>
            </div>

          </Modal.Footer>
        </Modal>
      )}

      <Footer />
    </Container>
  );
};

export default VisionBoardDetail;
