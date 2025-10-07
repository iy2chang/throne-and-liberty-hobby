import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/profile";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
