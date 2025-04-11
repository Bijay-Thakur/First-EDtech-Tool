import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/Homepage';
import TaskPage from './components/TaskPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:type" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
