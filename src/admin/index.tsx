import { FormEvent, useState } from "react";
import "./admin.css";

const AdminPanel: React.FC = () => {
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File>();
  const [postDetails, setPostDetails] = useState<{
    title: string;
    content: string;
    published: boolean;
  }>({ title: "", content: "", published: true });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const setPostOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
  };

  const setTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostDetails({
      ...postDetails,
      [name]: value,
    });
  };

  const submitOnClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (localStorage.getItem("isLoggedIn") === "true") {
      try {
        const response = await fetch("http://localhost:8080/api/posts", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postDetails),
        });

        if (response.ok) {
          window.location.href = "/";
        } else {
          console.error("Failed to create post:", await response.text());
        }
      } catch (err) {
        console.error("Error creating post:", err);
      }
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <a href="/">← Back to Blog</a>
      </div>

      <div className="content">
        <div className="centered-form">
          <form>
            <div className="form-group">
              <div>
                <span className="info">Post Title</span>
                <input
                  type="text"
                  placeholder="Enter post title..."
                  className="input-field"
                  name="title"
                  onChange={setPostOnChange}
                  value={postDetails.title}
                />
              </div>

              <div>
                <span className="info">Post Content</span>
                <textarea
                  onChange={setTextArea}
                  name="content"
                  placeholder="Write your post content here..."
                  className="input-field"
                  value={postDetails.content}
                />
              </div>

              <div>
                <span className="info">Publish Status</span>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="published"
                    checked={postDetails.published}
                    onChange={(e) => setPostDetails({...postDetails, published: e.target.checked})}
                  />
                  Publish immediately
                </label>
              </div>

              {isFileUploadOpen && (
                <div className="file-upload-section">
                  <span className="info">Upload Images</span>
                  <div className="file-input">
                    <label>
                      Choose File
                      <input
                        type="file"
                        onChange={selectFile}
                        accept="image/*"
                      />
                    </label>
                    {currentFile && (
                      <div className="selected-file">
                        Selected: {currentFile.name}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                className="upload-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFileUploadOpen(!isFileUploadOpen);
                }}
              >
                {isFileUploadOpen ? "Hide File Upload" : "Show File Upload"}
              </button>

              <button className="submit-button" onClick={submitOnClick}>
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
