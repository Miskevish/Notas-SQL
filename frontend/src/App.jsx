import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Notepad from "./pages/Notepad.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notepad" element={<Notepad />} />
    </Routes>
  );
};

export default App;
