import { ChangeEvent, FormEventHandler, useState } from "react";
import './admin.css'

function adminPanel() {
    const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
    //const [uploadedFile, setUploadedFile] = useState();

    const handleFileOnChange = (e: any) => {
        const selectedFile = e.target.files?.[0]; // Check for null
        console.log("Selected File: ", selectedFile?.name);

        if (selectedFile) {

            console.log("File exists");
        }
        setIsFileUploadOpen(!isFileUploadOpen);
    };


    return (
        <div className="navbar-container">
            <div className="navbar">
                <a href="/">Back to the blog</a>
            </div>

            <div className="content">
                <div className="centered-form">
                    <form action="">
                        <div className="form-group">
                            <span className="info">Post title</span>
                            <input
                                type="text"
                                placeholder="Post title"
                                className="input-field"
                            />
                            <span className="info">Post details </span>
                            <textarea placeholder="lipsum..." className="input-field" />
                            <button className="upload-button" onClick={(e) => {
                                e.preventDefault();
                                setIsFileUploadOpen(!isFileUploadOpen)
                            }} onChange={handleFileOnChange}>Or upload files: </button>

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
            </div>
        </div>
    );
}

export default adminPanel;
