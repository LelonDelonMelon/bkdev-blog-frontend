import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostData from "../types/Post";
import "../styles/PostView.css";

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/slug/${slug}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError("Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="post-view-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-view-container">
        <div className="error">
          <h2>Post Not Found</h2>
          <p>{error || "The requested post could not be found."}</p>
          <Link to="/" className="back-link">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-view-container">
      <nav className="post-nav">
        <Link to="/" className="back-link">← Back to Blog</Link>
      </nav>
      
      <article className="post-content">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time className="post-date">
              {formatDate(post.created_at || post.date || "")}
            </time>
            {post.author && (
              <span className="post-author">by {post.author.username}</span>
            )}
          </div>
        </header>
        
        <div className="post-body">
          <p>{post.content || post.details}</p>
        </div>
        
        {post.excerpt && (
          <div className="post-excerpt">
            <strong>Summary:</strong> {post.excerpt}
          </div>
        )}
      </article>
    </div>
  );
};

export default PostView;
