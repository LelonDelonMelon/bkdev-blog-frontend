import { useEffect, useState } from "react";
import UserDropdown from "./components/UserDropdown";
import "./styles/shared.css";
import "./styles/Blog.css";
import "./styles/Modal.css";
import "./styles/Navigation.css";
import Post from "./components/post";
import fetchPosts from "./util/fetchPosts";
import PostData from "./types/Post";
import { handleSignOut } from "../src/util/auth";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [posts, setPosts] = useState<PostData[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogout = () => {
    handleSignOut();
    setIsUserLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsUserLoggedIn(true);
      fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((data) => {
              localStorage.setItem("userData", JSON.stringify(data));
            });
          } else {
            // If the token is invalid, log the user out
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    } else {
      setIsUserLoggedIn(false);
    }

    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isUserLoggedIn]);

  return (
    <div className="container">
      {!isUserLoggedIn ? (
        <a className="login-link" href="/login">
          Log in
        </a>
      ) : (
        <div>
          <WelcomeModal />
          <UserDropdown
            email={JSON.parse(localStorage.getItem("userData") || "{}").email}
            onLogout={handleLogout}
          />
        </div>
      )}
      {localStorage.getItem("isLoggedIn") === "false" && (
        <a className="signup-link" href="/signup">
          Sign Up
        </a>
      )}
      <div className="hero">
        <h1 className="hero-title">bk</h1>
        <div className="hero-social-links">
          <a
            href="https://github.com/burakkaraceylan"
            className="hero-social-link"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/burak-karaceylan/"
            className="hero-social-link"
          >
            linkedin
          </a>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            postTitle={post.title}
            postDetail={post.details}
            postDate={post.date}
          />
        ))
      )}
    </div>
  );
}

export default App;
