import React, { useState, useEffect } from 'react';
import './TaskPage.css';
import { useParams } from 'react-router-dom';

function TaskPage() {
  const { type } = useParams(); // Get 'time' or 'space' from the URL
  const [selectedTab, setSelectedTab] = useState("java"); // Default tab is Java
  const [code, setCode] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Handle code input change
  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  // Change the selected language tab
  const handleTabChange = (language) => {
    setSelectedTab(language);
    setCode(""); // Optionally reset the code when changing the tab.
  };

  return (
    <div className="task-page">
      <header className="task-header">
        <h1>{type === "time" ? "Compute Time Complexity" : "Compute Space Complexity"}</h1>
        
        <div className="upload-option">
          <label htmlFor="file-upload" className="upload-label">
            <span>Upload File from Device</span>
          </label>
          <input
            type="file"
            id="file-upload"
            accept=".java,.js,.py,.cpp"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="code-entry-option">
          <h2>Enter Your Code</h2>
          
          <div className="tabs">
            <button
              className={`tab ${selectedTab === "java" ? "active" : ""}`}
              onClick={() => handleTabChange("java")}
            >
              Java
            </button>
            <button
              className={`tab ${selectedTab === "javascript" ? "active" : ""}`}
              onClick={() => handleTabChange("javascript")}
            >
              JavaScript
            </button>
            <button
              className={`tab ${selectedTab === "python" ? "active" : ""}`}
              onClick={() => handleTabChange("python")}
            >
              Python
            </button>
            <button
              className={`tab ${selectedTab === "cpp" ? "active" : ""}`}
              onClick={() => handleTabChange("cpp")}
            >
              C++
            </button>
          </div>

          <textarea
            value={code}
            onChange={handleCodeChange}
            placeholder={`Enter your ${selectedTab} code here...`}
            className="code-input"
            rows="10"
            cols="50"
          />

          <div className="submit-btn">
            <button>{type === "time" ? "Analyze Time Complexity" : "Analyze Space Complexity"}</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default TaskPage;
