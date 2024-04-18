import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllCard from './Components/AllCard';
import ViewCard from './Components/ViewCard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App animated-gradient">
        <Routes>
          <Route path="/" element={<AllCard />} />
          <Route path="/view/:id" element={<ViewCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
