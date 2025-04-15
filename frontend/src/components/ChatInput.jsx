import React, { useState } from 'react';
import './input.css';

const ChatInput = ({ onSend, inputMode, codeInput, setCodeInput }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    const input = inputMode === 'code' ? codeInput : text;
    if (input.trim()) {
      onSend(input);
      setText('');
      if (inputMode === 'code') setCodeInput('');
    }
  };

  return (
    <div className="chat-input">
      {inputMode === 'code' ? (
        <textarea
          className="code-textarea"
          placeholder="Paste your code here..."
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
        />
      ) : (
        <input
          className="text-input"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      )}
      <button className="send-button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;