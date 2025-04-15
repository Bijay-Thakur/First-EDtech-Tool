import React from 'react';
import './result.css';

const TimeSpaceResult = ({ type, language, code }) => {
  return (
    <div className="result-container">
      <h3>
        {type === 'time' ? 'Time' : 'Space'} Complexity Analysis for {language} Code
      </h3>
      <pre className="code-display">{code}</pre>
      <p>Analysis results will be shown here in the next version.</p>
    </div>
  );
};

export default TimeSpaceResult;