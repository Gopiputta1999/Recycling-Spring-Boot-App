// src/components/Modal.js
import React from 'react';
import './Modal.css'; // Import your CSS for styling

const PopModel = ({ message, onClose }) => {
  if (!message) return null; // Do not render if there's no message

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopModel;
