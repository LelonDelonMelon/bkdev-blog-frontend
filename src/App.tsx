import { useEffect, useState } from "react";
import UserDropdown from "./components/UserDropdown";
import "./styles/shared.css";
import "./styles/Blog.css";
import "./styles/Modal.css";
import "./styles/Navigation.css";
import Post from "./components/post";
import fetchPosts from "./util/fetchPosts";
import PostData from "./types/Post";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const [posts, setPosts] = useState<PostData[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsUserLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    // Check if user is logged in by trying to fetch profile
    fetch("http://localhost:8080/api/auth/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const userData = await response.json();
          console.log("userData", userData);
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("isLoggedIn", "true");
          setIsUserLoggedIn(true);
        } else {
          localStorage.setItem("isLoggedIn", "false");
          localStorage.removeItem("userData");
          setIsUserLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userData");
        setIsUserLoggedIn(false);
      });
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
      ) : !posts || posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <Post
              key={post.id}
              postId={post.id}
              postTitle={post.title}
              postDetail={post.content || post.details || ""}
              postDate={post.created_at || post.date || ""}
              postSlug={post.slug}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
