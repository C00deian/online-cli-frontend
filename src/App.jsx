import {  Routes, Route } from "react-router-dom";

import TerminalClient from "./components/TerminalClient"; // ✅ Make sure path is correct
import Home from "./components/Home";
function App() {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terminal" element={<TerminalClient />} />
      </Routes>
  
  );
}

export default App;
