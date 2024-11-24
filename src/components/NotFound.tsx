import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Page Not Found</h2>
      <p className="not-found-text">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="not-found-link">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
