import { Routes, Route } from "react-router-dom";
import TerminalClient from "./components/TerminalClient";  
import Login from "./pages/Login";
import Home from "./components/Home";
import Singup from "./pages/Singup";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/terminal" element={<TerminalClient />} />
        <Route path="/singup" element={<Singup/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
