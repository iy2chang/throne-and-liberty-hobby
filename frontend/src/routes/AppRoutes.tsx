import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/profile";
import Register from "../pages/Register";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
