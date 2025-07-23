import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail, validatePassword } from "../utils/validation";
import loginUser from "../services/login";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors = {
      email:
        touched.email && formData.email.trim() === ""
          ? "Email is required"
          : touched.email && !validateEmail(formData.email)
          ? "Invalid email"
          : "",
      password:
        touched.password && formData.password.trim() === ""
          ? "Password is required"
          : touched.password && !validatePassword(formData.password)
          ? "Password must be at least 6 characters"
          : "",
    };

    setErrors(newErrors);

    const allValid =
      validateEmail(formData.email) && validatePassword(formData.password);

    setIsValid(allValid);
  }, [formData, touched]);

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
  //   setTouched({ email: true, password: true });
  //   if (isValid) {
  //     console.log("User Login Success:", formData);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    console.log("Submitted");

    try {
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
      console.log(error.message);
      // showError("Something went wrong while logging in. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Login
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UserLogin;
