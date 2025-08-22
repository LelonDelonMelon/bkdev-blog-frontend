import React, { useState } from "react";
import "../styles/UserDropdown.css";

interface UserDropdownProps {
  email: string;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ email, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get user data to check admin role
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const isAdmin = userData.role === "admin";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  return (
    <div className="user-dropdown-container">
      <button className="user-dropdown-trigger" onClick={toggleDropdown}>
        {(() => {
          try {
            return email || "User";
          } catch {
            return "User";
          }
        })()}
        {isAdmin && <span className="admin-indicator">👑</span>}
        <span className={`arrow ${isOpen ? "up" : "down"}`}>▼</span>
      </button>

      {isOpen && (
        <div className="user-dropdown-menu">
          {isAdmin && (
            <a href="/admin" className="dropdown-item admin-item">
              <i className="fas fa-cog"></i>
              Admin Panel
              <span className="admin-badge">ADMIN</span>
            </a>
          )}
          <a href="/edit-profile" className="dropdown-item">
            <i className="fas fa-user-edit"></i>
            Edit Profile
          </a>
          <button onClick={handleLogout} className="dropdown-item">
            <i className="fas fa-sign-out-alt"></i>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
