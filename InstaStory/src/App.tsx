import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import StoryComponent from './components/StoryComponent';
import React from 'react';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:categoryItems" element={<StoryComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
