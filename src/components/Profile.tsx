import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

interface UserData {
  id: string;
  email: string;
  password?: string;
}

export default function Profile() {
  const [formData, setFormData] = useState<UserData>({
    id: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData({
            id: userData.id,
            email: userData.email,
            password: "",
          });
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        navigate("/login");
        return;
      }

      // According to the API spec, we need the user ID for the update endpoint
      const response = await fetch(
        `http://localhost:3000/users/updateUser/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (response.ok) {
        setSuccess("Profile updated successfully!");
        // Update local storage with new user data
        localStorage.setItem(
          "userData",
          JSON.stringify({ email: formData.email })
        );
        // Clear password field after successful update
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to update profile");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="profile-form-group">
          <label>Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your email"
          />
        </div>
        <div className="profile-form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
          />
        </div>
        {error && <p className="profile-error">{error}</p>}
        {success && <p className="profile-success">{success}</p>}
        <button
          type="submit"
          className="profile-save-button"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
