import React from 'react';
import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { Market } from './pages/Market';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </>
  );
}

export default App;
