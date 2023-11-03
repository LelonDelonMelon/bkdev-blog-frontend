import "./App.css";
import Post from "./components/post";
import fetchPosts from "./util/fetchPosts";
import { useEffect, useState } from "react";
import PostData from "./types/Post";

function App() {
  const [posts, setPosts] = useState<PostData[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <a className="login-link" href="/login">
        Log in
      </a>
      <a className="signup-link" href="/signup">
        {" "}
        Sign Up{" "}
      </a>
      <div className="hero">
        <a
          className="hero-social-link"
          href="https://www.burakkati.dev/"
          target="_blank"
        >
          {" "}
          <h1 className="hero-title bk">Burak Katı</h1>
        </a>

        <div className="hero-social-links">
          <a
            className="hero-social-link"
            href="https://burakkati.dev"
            target="_blank"
          >
            My Website
          </a>
          <a
            className="hero-social-link"
            href="https://github.com/LelonDelonMelon"
            target="_blank"
          >
            Github
          </a>
          <a
            className="hero-social-link"
            href="https://www.linkedin.com/in/burakkati/"
            target="_blank"
          >
            Linkedin
          </a>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post, id) => (
          <Post
            key={id}
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
