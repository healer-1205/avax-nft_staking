import React from 'react';
import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home';
import { Market } from './pages/Market';
import { MyWoA } from './pages/MyWoA';
import { Journey } from './pages/Journey';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/mywoa" element={<MyWoA />} />
        <Route path="/journey" element={<Journey />} />
      </Routes>
    </>
  );
}

export default App;
