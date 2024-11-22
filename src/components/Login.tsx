import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use React Router for navigation

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Check localStorage only on mount
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsUserLoggedIn(loggedIn);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected token usage
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("isLoggedIn", "true");
        setIsUserLoggedIn(true);

        // Delay the navigation to "/" for 3 seconds
        navigate("/");
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Invalid login credentials.");
        setIsUserLoggedIn(false);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {isUserLoggedIn ? (
        <>
          {/* Keep the login form hidden but mounted during modal display */}
          <div style={{ display: "none" }}>
            <h1 className="welcome-back-text">Login</h1>
          </div>
        </>
      ) : (
        <>
          <h1 className="welcome-back-text">Login</h1>
          <form method="POST">
            <div className="login-box">
              {error && <p className="error-text">{error}</p>}
              <div className="login-username">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  placeholder="Email"
                />
              </div>
              <div className="login-password">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="login-button"
                onClick={handleOnClickLogin}
              >
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
