import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("isLoggedIn", "true");

        // Fetch user data immediately after signup
        const userResponse = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem("userData", JSON.stringify(userData));
        }

        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create account");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Account</h1>
      <form method="POST" className="signup-form">
        {error && <p className="error-text">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            placeholder="Choose a password"
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="signup-button" onClick={handleSignup}>
          Create Account
        </button>
      </form>
      <p className="login-prompt">
        Already have an account?
        <Link to="/login" className="login-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
