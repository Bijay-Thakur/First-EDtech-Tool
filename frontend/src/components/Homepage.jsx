import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="HomePage">
      <header className="App-header">
        <h1>Welcome to the AI EdTech Tool</h1>
        <p>Select the task to perform:</p>
        <div className="buttons">
          <Link to="/task/time">
            <button>Compute Time Complexity</button>
          </Link>
          <Link to="/task/space">
            <button>Compute Space Complexity</button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default HomePage;
