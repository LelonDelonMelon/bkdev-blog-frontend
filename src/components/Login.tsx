import { useState, ChangeEvent } from "react";
import AdminPanel from "../admin";

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    console.log("Token from localStorage:", token);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer $(token)}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("jwtToken", token);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isUserLoggedIn && (
        <>
          <h1 className="welcome-back-text">Login</h1>
          <form method="POST">
            <div className="login-box">
              <div className="login-username">
                <span>Username</span>
                <input
                  type="text"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  placeholder="Username"
                />
              </div>
              <div className="login-password">
                <span>Password</span>
                <input
                  type="text"
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
      {isUserLoggedIn && <AdminPanel />}
    </>
  );
}
