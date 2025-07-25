import React, { useState, useEffect } from "react";
import {
  validatePassword,
  passwordValidationMessage,
} from "../utils/validation";
import resetPassword from "../services/resetPassword";
import { Link as RouterLink } from "react-router-dom";

import { Link, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail } from "../utils/validation";

const AdminResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
    role: "admin",
  });

  const [touched, setTouched] = useState({
    email: false,
    otp: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {
      email:
        touched.email && form.email.trim() === ""
          ? "Email is required"
          : touched.email && !validateEmail(form.email)
          ? "Invalid email address"
          : "",
      otp:
        touched.otp && form.otp.trim() === ""
          ? "OTP is required"
          : touched.otp && form.otp.trim().length !== 6
          ? "OTP must be 6 digits"
          : "",
      password:
        touched.password && form.password.trim() === ""
          ? "Password is required"
          : touched.password && !validatePassword(form.password)
          ? passwordValidationMessage
          : "",
    };

    setErrors(newErrors);

    const allValid =
      validateEmail(form.email) &&
      form.otp.trim().length === 6 &&
      validatePassword(form.password);

    setIsValid(allValid);
  }, [form, touched]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setTouched({
  //     email: true,
  //     otp: true,
  //     password: true,
  //   });
  // if (isValid) {
  //     console.log("Reset Data Submitted:", form);
  //     // call API here
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;
    // setLoading(true);

    try {
      const { success, msg } = await resetPassword(form);

      if (success) {
        console.log("Reset password successfuly!");
        setForm({ email: "", password: "", otp: "" });
        setErrors({});
        showSuccess(data.msg);
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      } else {
        console.log("not reset");
        showError(data.msg);
      }
    } catch (err) {
      console.log("error");
      // showError("Unable to reset password due to server error. Please try again.");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={1}
      sx={{ bgcolor: "#F6F4FFFF" }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400 }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "blue" }}
        >
          Admin Reset Password
        </Typography>
        <Typography align="center" variant="body1" sx={{ color: "gray" }}>
          Enter email, new password & OTP to reset.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ height: "56px" }}
          />

          <TextField
            label="OTP"
            fullWidth
            margin="normal"
            value={form.otp}
            onChange={(e) => handleChange("otp", e.target.value)}
            onBlur={() => handleBlur("otp")}
            error={!!errors.otp}
            helperText={errors.otp}
            sx={{ height: "56px" }}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ height: "56px" }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isValid}
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body1">
            Didn't receive OTP?{" "}
            <Link
              component={RouterLink}
              to="/admin/forgot-password"
              color="secondary"
              underline="hover"
            >
              Resend OTP
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminResetPassword;
