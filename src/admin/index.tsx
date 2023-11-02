import { useState } from "react";
import './admin.css'

const AdminPanel: React.FC = () => {
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<File>();
    // const [progress, setProgress] = useState<number>(0);
    // const [fileInfo, setFileInfo] = useState<Array<IFile>>([]);

    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        console.log("Current file : ", currentFile);
        //   setProgress(0);
    }



    return (
        <div className="navbar-container">
            <div className="navbar">
                <a href="/">Back to the blog</a>
            </div>

            <div className="content">
                <div className="centered-form">
                    <form action="post">
                        <div className="form-group">
                            <span className="info">Post title</span>
                            <input
                                type="text"
                                placeholder="Post title"
                                className="input-field"
                            />
                            <span className="info">Post details </span>
                            <textarea placeholder="lipsum..." className="input-field" />
                            <button className="upload-button"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    selectFile(e);
                                }} onClick={(e) => {
                                    e.preventDefault();
                                    setIsFileUploadOpen(!isFileUploadOpen)
                                }} >Or upload files: </button>

                            {isFileUploadOpen &&

                                <span className="file-upload info"> <input type="file" placeholder="Or upload files" className="input-field" />  </span>

                            }

                            <span className="info">Post date</span>
                            <input
                                type="text"
                                placeholder="01-23-4567"
                                className="input-field"
                            />
                        </div>
                        <button type="submit"> Submit </button>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default AdminPanel;
