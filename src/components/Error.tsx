import React from "react";
import Modal from "react-modal";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, error }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Error Modal">
      <div>
        <h2 className="error-header">Error</h2>
        <p className="error-p">{error}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
