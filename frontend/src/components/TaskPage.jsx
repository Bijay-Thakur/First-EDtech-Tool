import React, { useState } from 'react';

function TaskPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [option, setOption] = useState("time");  // or space
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, option }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Analyze Code Complexity</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter code here"
      />
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        {/* Add other languages as needed */}
      </select>
      <select onChange={(e) => setOption(e.target.value)} value={option}>
        <option value="time">Time Complexity</option>
        <option value="space">Space Complexity</option>
      </select>
      <button onClick={handleSubmit}>Analyze</button>
      {result && <div><h2>Result</h2><p>{result}</p></div>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default TaskPage;
