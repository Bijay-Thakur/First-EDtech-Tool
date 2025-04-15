import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing your components
import HomePage from './components/Homepage';
import TaskPage from './components/TaskPage';
import WelcomePage from './components/WelcomePage';
import ChatPage from './components/ChatPage';
import InputTypePrompt from './components/InputTypePrompt'; // New component
import TimeSpaceResult from './components/TimeSpaceResult'; // New component
import LanguageSelection from './components/LanguageSelection'; // New component

function App() {
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: "Hi! I’m BiTh AI 👋. I can help analyze code. Just let me know what you’re working on!" }
  ]);

  // Function to handle user input
  const handleSend = async (userInput) => {
    const newMessage = { role: 'user', content: userInput };
    const updatedChat = [...chatHistory, newMessage];
    setChatHistory(updatedChat);

    try {
      // Send entire message history to the backend
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedChat,
          code: null,
          language: null,
          complexityType: null,
        }),
      });

      const data = await response.json();
      const botReply = { role: 'assistant', content: data.reply };
      setChatHistory([...updatedChat, botReply]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorReply = { role: 'assistant', content: "Oops! Something went wrong." };
      setChatHistory([...updatedChat, errorReply]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/chat" element={<ChatPage chatHistory={chatHistory} handleSend={handleSend} />} />
          <Route path="/task/:type" element={<TaskPage />} />
          <Route path="/input-type" element={<InputTypePrompt />} />
          <Route path="/time-space-result" element={<TimeSpaceResult />} />
          <Route path="/language-selection" element={<LanguageSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
