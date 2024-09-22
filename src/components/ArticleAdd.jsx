import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ArticleAdd.css"; // Make sure styles do not conflict

const ArticleAdd = ({
  show,
  handleClose,
  articleType,
  setArticleType,
  articleURL,
  setArticleURL,
  handleAddArticle,
}) => {
  // Handles dropdown changes
  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    console.log("Dropdown changed, selected type:", selectedType);
    setArticleType(selectedType);
  };

  // Handles input changes for the URL or string input
  const handleURLChange = (e) => {
    const urlValue = e.target.value;
    console.log("URL input changed, new value:", urlValue);
    setArticleURL(urlValue);
  };

  return (
    <Modal
      className="cool-mood-modality"
      size="md"
      show={show}
      onHide={() => {
        console.log("Modal closed");
        handleClose();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a New Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body className="new-article-bod">
        {/* Dropdown for selecting resource type */}
        <Form.Group className="mb-3">
          <Form.Label>Select Resource Type</Form.Label>
          <Form.Control
            as="select"
            value={articleType} // Correct binding to reflect current state
            onChange={handleTypeChange}
            className="form-control"
            style={{ color: articleType ? 'black' : '#6c757d' }} // Ensure correct text color
          >
            <option value="">Choose...</option>
            <option value="article">Article</option>
            <option value="video">Video</option>
            <option value="website">Website</option>
          </Form.Control>
        </Form.Group>

        {/* Input for URL or string */}
        <Form.Group className="mb-3">
          <Form.Label>Enter URL or Text</Form.Label>
          <Form.Control
            type="text" // Changed to text to match backend requirements
            placeholder="Paste or type here"
            value={articleURL} // Ensure correct binding
            onChange={handleURLChange}
            className="form-control"
            style={{ color: articleURL ? 'black' : '#6c757d' }} // Ensure text is displayed correctly
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="new-article-footer">
        <Button
          className="ms-auto haymaker-button"
          variant="primary"
          onClick={() => {
            console.log("Add Resource button clicked");
            handleAddArticle();
          }}
        >
          Add Resource
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ArticleAdd;
