import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate();

  const startChat = () => {
    navigate('/chat');
  };

  return (
    <div className="welcome-container">
      <h1>Hey! I am BiTh AI.</h1>
      <p>I am created by Bijay. I am here to help you with your confusion.</p>
      <p>Please press start if you want to chat with me.</p>
      <button onClick={startChat}>Start Chat</button>
    </div>
  );
}

export default WelcomePage;
