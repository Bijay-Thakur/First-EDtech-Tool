import React, { useState } from 'react';

const CodeAnalyzer = () => {
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [language, setLanguage] = useState('Java'); // Default language is Java
  const [option, setOption] = useState('time'); // Default option is time complexity

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };

  const analyzeCode = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          option,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.result);
      } else {
        console.error("Failed to analyze code:", response.status);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <div>
      <h2>Code Complexity Analyzer</h2>
      <textarea
        value={code}
        onChange={handleCodeChange}
        rows="10"
        cols="50"
        placeholder="Enter your code here..."
      ></textarea>
      <div>
        <label>
          Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            {/* Add more languages as needed */}
          </select>
        </label>
      </div>
      <div>
        <label>
          Option:
          <select value={option} onChange={handleOptionChange}>
            <option value="time">Time Complexity</option>
            <option value="space">Space Complexity</option>
          </select>
        </label>
      </div>
      <button onClick={analyzeCode}>Analyze Code</button>

      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default CodeAnalyzer;
