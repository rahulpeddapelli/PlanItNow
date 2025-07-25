import React, { useState, useEffect } from "react";
import loginUser from "../services/login";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { validateEmail, validatePassword } from "../utils/validation";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {
      email: !formData.email
        ? "Email is required"
        : !validateEmail(formData.email)
        ? "Invalid email"
        : "",
      password: !formData.password
        ? "Password is required"
        : !validatePassword(formData.password)
        ? "Minimum 6 characters"
        : "",
    };

    setErrors(newErrors);
    setIsValid(!newErrors.email && !newErrors.password);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isValid) {
  //     // Add your login logic here
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    console.log("Submitted");

    try {
      console.log(formData);
      const { success, msg, data } = await loginUser(formData);
      if (success) {
        setFormData({ email: "", password: "" });
        setErrors({});
        setTouched({});
        console.log("Succeefully logn");

        sessionStorage.setItem("auth-token", data.jwt);

        // navigate(
        //   data.role === "Applicant"
        //     ? "/dashboard/applicant/home"
        //     : "/dashboard/recruiter/home"
        // );
      } else {
        showError(res.msg);
        console.log(" login fail ");
      }
    } catch (error) {
      console.log(error.msg);
      // showError("Something went wrong while logging in. Please try again.");
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
        sx={{
          padding: 4,
          width: "100%",
          borderRadius: 2,
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" align="center" sx={{ mb: 4, color: "blue" }}>
          Admin Login
        </Typography>

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
          Login
        </Button>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body1">
            Don't have an account?
            <Link
              component={RouterLink}
              to="/admin/signup"
              color="secondary"
              underline="hover"
            >
              Signup here
            </Link>
            |
            <Link
              component={RouterLink}
              to="/admin/forgot-password"
              color="secondary"
              underline="hover"
            >
              Forgot Password{" "}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
