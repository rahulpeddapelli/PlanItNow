import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import ToastProvider from "./context/ToastProvider";

import AccountProvider from "./context/AccountProvider";


const App = () => {
  return (
    <AccountProvider>
      <PrimeReactProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignup />} />
              <Route
                path="/admin/forgot-password"
                element={<AdminForgotPassword />}
              />
              <Route
                path="/admin/reset-password"
                element={<AdminResetPassword />}
              />

              {/* User Routes */}
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/signup" element={<UserSignup />} />
              <Route
                path="/user/forgot-password"
                element={<UserForgotPassword />}
              />
              <Route
                path="/user/reset-password"
                element={<UserResetPassword />}
              />
            </Routes>
          </Router>
        </ToastProvider>
      </PrimeReactProvider>
    </AccountProvider>
  );
};

export default App;
