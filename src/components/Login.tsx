import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsUserLoggedIn(loggedIn);
    if (loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
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
        localStorage.setItem(
          "userData",
          JSON.stringify({ email: formData.email })
        );
        setIsUserLoggedIn(true);
        navigate("/");
      } else if (response.status === 401) {
        const errorMsg = await response.text();

        setError(errorMsg || "Invalid login credentials.");
        setIsUserLoggedIn(false);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (isUserLoggedIn) {
    return null;
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>
      <form method="POST" className="login-form">
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
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="login-button"
          onClick={handleOnClickLogin}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
