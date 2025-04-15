import React, { useState } from 'react';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';
import LanguageSelector from './LanguageSelection';
import TimeSpaceResult from './TimeSpaceResult';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I’m BiTh AI 👋. I can help analyze code. Just let me know what you’re working on!' }
  ]);
  const [inputMode, setInputMode] = useState('text');
  const [codeInput, setCodeInput] = useState('');
  const [language, setLanguage] = useState('');
  const [complexityType, setComplexityType] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleUserMessage = async (text) => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          code: codeInput,
          language,
          complexityType,
        }),
      });

      const data = await response.json();

      if (data.language && !language) setLanguage(data.language);
      if (data.complexityType && !complexityType) setComplexityType(data.complexityType);
      if (data.inputMode) setInputMode(data.inputMode);
      if (data.code && data.inputMode === 'code') {
        setCodeInput(data.code);
        setShowLanguageSelector(true);
      }
      if (data.showResult) setShowResult(true);
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: "Hmm, I didn't get that. Could you try rephrasing?" },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Something went wrong. Please try again.' }]);
    }
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setMessages((prev) => [
      ...prev,
      { sender: 'ai', text: `Perfect! You selected ${lang}. Ready to analyze.` },
    ]);
  };

  return (
    <div className="chat-page">
      <ChatBox messages={messages} />
      <ChatInput
        onSend={handleUserMessage}
        inputMode={inputMode}
        codeInput={codeInput}
        setCodeInput={setCodeInput}
      />
      {showLanguageSelector && !language && <LanguageSelector onSelect={handleLanguageSelect} />}
      {showResult && <TimeSpaceResult type={complexityType} language={language} code={codeInput} />}
    </div>
  );
};

export default ChatPage;
