import React from 'react';
import './NotepadModal.css';

function NotepadModal({ show, handleClose }) {
  return (
    <>
      {/* Display the modal only when the 'show' prop is true */}
      {show && (
        <div className="modal-overlay" onClick={handleClose}>
          {/* Modal content */}
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <div className="notepad">
              <input
                type="text"
                placeholder="Title your note..."
                className="note-title"
              />
              <textarea
                placeholder="Write your notes here..."
                className="note-content"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotepadModal;
