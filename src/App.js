import './App.css';
import Home from './pages/home'
import MyWoA from './pages/mywoas'
import Market from './pages/market'
import Journey from './pages/journey'
import Docs from './pages/docs'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
       <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />} />
        <Route
          path="/mywoa"
          element={<MyWoA />} />
        <Route
          path="/journey"
          element={<Journey />} />
        <Route
          path="/market"
          element={<Market />} />
        <Route
          path="/docs"
          element={<Docs />} />
        </Routes>
        </Router>
      
    </div>
  );
}

export default App;
