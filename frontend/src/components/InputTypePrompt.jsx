import React from 'react';
import './input.css';

const InputTypePrompt = ({ onSelect }) => {
  return (
    <div className="input-prompt">
      <p><strong>How would you like to input your problem?</strong></p>
      <div className="input-options">
        <button onClick={() => onSelect('Enter Code')}>Enter Code</button>
        <button onClick={() => onSelect('Upload Screenshot')}>Upload Screenshot</button>
        <button onClick={() => onSelect('Ask a Question')}>Ask a Question</button>
      </div>
    </div>
  );
};

export default InputTypePrompt;