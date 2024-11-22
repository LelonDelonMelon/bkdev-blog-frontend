import { useEffect, useState } from "react";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal when the component mounts
    setIsOpen(true);

    // Automatically close the modal after 3 seconds
    const timeoutId = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(false); // Allow manual closure
  };

  return (
    isOpen && (
      <div className="welcome-modal">
        <div className="welcome-modal-content">
          <h2>Welcome back to BK Blog</h2>
          <button className="close-modal-button" onClick={handleSubmit}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default WelcomeModal;
