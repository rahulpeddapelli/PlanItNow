import React, { useState, useEffect,useContext } from "react";
import {
  Link,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Container,
} from "@mui/material";
import {
  validateEmail,
  validatePassword,
  passwordValidationMessage,
} from "../utils/validation";
import registerUser from "../services/signup";
import { Link as RouterLink } from "react-router-dom";
import { ToastContext } from "../context/ToastProvider";

const UserSignup = () => {
  const { showError, showSuccess } = useContext(ToastContext);

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
        showSuccess(res.msg);
      } else {
        console.log("Signup Failed:", res.msg);
        showError(res.msg);
      }
    } catch (error) {
      console.log("Server Error:", error.msg || error);
      showError("Server error occurred while registering, Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      px={1}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F6F4FFFF",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "100%", borderRadius: 2, maxWidth: 400 }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: "blue", textAlign: "center" }}
        >
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
          sx={{ height: "56px" }}
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
          sx={{ height: "56px" }}
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
          sx={{ height: "56px" }}
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
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body1">
            Already have an account?
            <Link
              component={RouterLink}
              to="/user/login"
              color="secondary"
              underline="hover"
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserSignup;
