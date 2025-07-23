import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Container,
} from "@mui/material";
import { validateEmail, validatePassword } from "../utils/validation";

const UserResetPassword = () => {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
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
          ? "Password must be at least 6 characters"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ email: true, otp: true, password: true });
    if (isValid) {
      console.log("User reset data:", form);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={!!errors.email}
            helperText={errors.email}
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
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
          >
            Reset Password
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserResetPassword;
