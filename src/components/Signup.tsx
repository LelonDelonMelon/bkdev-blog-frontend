import { useState, ChangeEvent } from "react";
import ErrorModal from "./Error";

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  const handleOpenErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

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

  const handleOnClickSignup = async (e: MouseEvent) => {
    e.preventDefault();

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
        console.log(token, "token success");
        localStorage.setItem("jwtToken", token);
        setError(null);

        setIsUserLoggedIn(true);
      } else {
        const errorText = await response.json();
        console.log(errorText.message, "failed");
        setIsUserLoggedIn(false);
        setError(errorText.message);
        handleOpenErrorModal();
      }
    } catch (err: any) {
      console.log(err);
      setError(err.message || "An error occurred");
      handleOpenErrorModal();
    }
  };

  return (
    <>
      {!isUserLoggedIn && (
        <>
          <h1 className="welcome-back-text">Sign up</h1>
          <form method="post">
            <div className="login-box">
              <div className="login-username">
                <span>Email</span>
                <input
                  type="text"
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
                onClick={handleOnClickSignup}
              >
                SignUp
              </button>
              <a href="/login"> Already have an account? Login here </a>
            </div>
          </form>
        </>
      )}

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        error={error || "An error occured"}
      />
    </>
  );
}
