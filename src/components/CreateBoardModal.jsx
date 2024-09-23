import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CreateBoardModal.css";

// User entry is converted to title case. Makes the boards look better
const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CreateBoardModal = ({
  show,
  handleClose,
  newBoardName,
  setNewBoardName,
  newBoardDescription,
  setNewBoardDescription,
  handleCreateBoard,
}) => {
  return (
    <Modal
      className="cool-mood-modality"
      size="md"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a New Board</Modal.Title>
      </Modal.Header>
      <Modal.Body className="new-boarder-bod">
        <input
          type="text"
          placeholder="Give your board a meaningful title"
          value={newBoardName}
          onChange={(e) => setNewBoardName(toTitleCase(e.target.value))}
          className="form-control mb-3"
        />
        <textarea
          placeholder="Describe the purpose or vision of this board"
          value={newBoardDescription}
          onChange={(e) => setNewBoardDescription(e.target.value)}
          className="form-control mb-3"
          rows={4}
        />
      </Modal.Body>
      <Modal.Footer className="new-boarder-footer">
        <Button
          className="ms-auto haymaker-button"
          variant="primary"
          onClick={handleCreateBoard}
        >
          Create Board
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBoardModal;
