import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InstallExtension from "./pages/InstallExtension"; // ⭐ NEW

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ⭐ Install Extension Page */}
        <Route path="/install" element={<InstallExtension />} />
      </Routes>
    </BrowserRouter>
  );
}