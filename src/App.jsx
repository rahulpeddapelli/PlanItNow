
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import PromoCarousel from './Components/PromoCarousel';
import Plays from './Components/Plays';
import StandUp from './Components/StandUp';
import Concerts from './Components/Concerts';
import Footer from './Components/Footer';
// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminSignup from "./admin/AdminSignup";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminResetPassword from "./admin/AdminResetPassword";

// User Components
import UserLogin from "./user/UserLogin";
import UserSignup from "./user/UserSignup";
import UserForgotPassword from "./user/UserForgotPassword";
import UserResetPassword from "./user/UserResetPassword";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
  <>
        <Navbar />
    <Router>
      <Routes>
        {/* <Navbar />
      <PromoCarousel />
      <Plays />
      <StandUp />
      <Concerts />
      <Footer /> */}

        {/* Public Routes */}/

        {/* Admin Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        {/* User Routes */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/forgot-password" element={<UserForgotPassword />} />
        <Route path="/user/reset-password" element={<UserResetPassword />} />
      </Routes>
    </Router>
      <Footer />
    
    </>
  );
};

export default App;
