import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper, Container } from "@mui/material";
import { validateEmail, validatePassword, passwordValidationMessage } from "../utils/validation";
import registerUser from "../services/signup";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrors({
      name: !formData.name
        ? "Name is required"
        : formData.name.length < 2
        ? "Name must be at least 2 characters"
        : "",

      email: !formData.email
        ? "Email is required"
        : !validateEmail(formData.email)
        ? "Invalid email format"
        : "",

      password: !formData.password
        ? "Password is required"
        : !validatePassword(formData.password)
        ? passwordValidationMessage
        : "",
    });
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const allTouched = touched.name && touched.email && touched.password;
  const noErrors = !errors.name && !errors.email && !errors.password;
  const isValid = allTouched && noErrors;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      const res = await registerUser(formData);
      if (res.success) {
        console.log("Signup Success:", res.msg);
        setFormData({ name: "", email: "", password: "", role: "user" });
        setTouched({ name: false, email: false, password: false });
        setErrors({ name: "", email: "", password: "" });
      } else {
        console.log("Signup Failed:", res.msg);
      }
    } catch (error) {
      console.log("Server Error:", error.msg || error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%", borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            User Signup
          </Typography>

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            error={touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={!isValid}
          >
            Signup
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserSignup;
