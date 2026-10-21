import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardTrainer from "../components/dashboard/DashboardTrainer";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* /dashboard path add kar diya gaya hai */}
        <Route path="/dashboard" element={<DashboardTrainer />} />
        <Route path="/dashboardtrainer" element={<DashboardTrainer />} />
        <Route path="/DashboardTrainer" element={<DashboardTrainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;