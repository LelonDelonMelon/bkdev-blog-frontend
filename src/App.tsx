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
import { fetchWithTokenRefresh } from "./util/authUtils";

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
      console.log("jwtToken", localStorage.getItem("jwtToken"));
      setIsUserLoggedIn(true);

      fetchWithTokenRefresh("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const err = await response.json();
            if (err.code === "TOKEN_EXPIRED") {
              handleLogout();
              window.location.href = "/login";
            }
            throw err;
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("userData", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.code === "TOKEN_EXPIRED") {
            handleLogout();
            window.location.href = "/login";
          }
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
    <div className="container" key={Date.now() + Math.random()}>
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

      <div className="hero">
        <h1 className="hero-title">bk</h1>
        <div className="hero-social-links">
          <a
            href="https://github.com/LelonDelonMelon"
            className="hero-social-link"
            target="_blank"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/burakkati/"
            className="hero-social-link"
            target="_blank"
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
          <div key={post.id}>
            <Post
              key={post.id}
              postId={post.id}
              postTitle={post.title}
              postDetail={post.details}
              postDate={post.date}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
