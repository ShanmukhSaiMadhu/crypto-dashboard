import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ComparePage from "./pages/Compare";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/coin" element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;