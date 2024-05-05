import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DocumentRepository.css";
import NavbarMenu from "./Navbar";

const DocumentRepository = ({ _id, email, password, role }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Load documents from the database when the component mounts
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const userId = _id;
      console.log("IN LOAD User Id: ", userId);

      const response = await axios.get(
        `http://localhost:4000/documentsRep/load/${userId}`
      );
      setDocuments(response.data);
    } catch (error) {
      console.error("Error loading documents:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    console.log("File Selected:  ", selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", _id); // Pass the user ID along with the file

    console.log("User ID; ", _id);
    console.log("File Data being Send:  ", formData);

    try {
      await axios.post("http://localhost:4000/documentsRep/upload", formData);
      setSelectedFile(null);
      loadDocuments(); // Reload documents after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/documentsRep/download/${filename}`,
        {
          responseType: "blob", // Set response type to blob for file download
        }
      );

      // Create a temporary anchor element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div className="navbarDocs">
        <NavbarMenu _id={_id} email={email} role={role} />
      </div>

      <div className="Div-DocumentRepository">
        <div className="title-DocumentRepository">
          <h1>Document Repository </h1>
        </div>
        <div className="content-DocumentRepository">
          <div className="uploadDiv-DocumentRepository">
            <input
              type="file"
              onChange={handleFileChange}
              id="Input-DocumentRepository"
            />
            <button
              className="UploadButton-DocumentRepository"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>

          <div className="documents-grid">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="card-DocumentRepository document-item"
              >
                <div id="fileName-DocumentRepository">
                  {" "}
                  <p>{doc.filename}</p>{" "}
                </div>
                <button
                  className="DownloadButton-DocumentRepository"
                  onClick={() => handleDownload(doc.filename)}
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentRepository;
