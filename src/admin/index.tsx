import { FormEvent, useState } from "react";
import "./admin.css";
import { handleSignOut } from "../util/auth";

const AdminPanel: React.FC = () => {
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File>();
  // const [progress, setProgress] = useState<number>(0);
  // const [fileInfo, setFileInfo] = useState<Array<IFile>>([]);

  const [postDetails, setPostDetails] = useState<{
    title: string;
    details: string;
    date: string;
  }>({ title: "", details: "", date: "" });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    console.log("Current file : ", currentFile);
    //   setProgress(0);
  };

  const setPostOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPostDetails({ ...postDetails, [e.target.name]: e.target.value });
    // console.log(postDetails);
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
    const token = localStorage.getItem("jwtToken");
    console.log("Token from localStorage:", token);

    if (localStorage.getItem("isLoggedIn") === "true") {
      try {
        const response = await fetch("http://localhost:3000/post/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer $(token)}`,
          },
          body: JSON.stringify(postDetails),
        });

        if (response.ok) {
          console.log("Successfully created post");
          window.location.href = "/";
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <a href="/">Back to the blog</a>
        <a href="/login">
          <button onClick={handleSignOut}> Sign out</button>
        </a>
      </div>

      <div className="content">
        <div className="centered-form">
          <form>
            <div className="form-group">
              <span className="info">Post title</span>
              <input
                type="text"
                placeholder="Post title"
                className="input-field"
                name="title"
                onChange={setPostOnChange}
                value={postDetails.title}
              />
              <span className="info">Post details </span>
              <textarea
                onChange={setTextArea}
                name="details"
                placeholder="lipsum..."
                className="input-field"
                value={postDetails.details}
              />
              <button
                className="upload-button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsFileUploadOpen(!isFileUploadOpen);
                }}
              >
                Or upload files:{" "}
              </button>

              {isFileUploadOpen && (
                <span className="file-upload info">
                  {" "}
                  <input
                    type="file"
                    placeholder="Or upload files"
                    className="input-field"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      selectFile(e);
                    }}
                  />{" "}
                </span>
              )}

              <span className="info">Post date</span>
              <input
                type="text"
                placeholder="01-23-4567"
                className="input-field"
                name="date"
                onChange={setPostOnChange}
                value={postDetails.date}
              />
            </div>
            <button type="submit" onClick={submitOnClick}>
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
