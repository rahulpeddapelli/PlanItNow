import React, { useState, useEffect } from "react";
import { Link, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail } from "../utils/validation";
import { Link as RouterLink } from "react-router-dom";
import forgotPassword from "../services/forgotPassword"

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({ email: "", role: "admin" });

  useEffect(() => {
    setIsValid(email.trim() !== "" && validateEmail(email));
  }, [email]);

  const getHelperText = () => {
    if (!touched) return "";
    if (email.trim() === "") return "Email is required";
    if (!validateEmail(email)) return "Invalid email";
    return "";
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isValid) {
  //     console.log("Reset email sent to:", email);
  //     // Add forgot password logic here
  //   }
  // };
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const { success, msg } = await forgotPassword(email);

      if (success) {
        console.log("changed ")
        showSuccess(data.msg);
        setEmail("");
        setTimeout(() => {
          navigate("/forgot-password/reset-password");
        }, 3000);
      } else {
        showError(data.msg);
      }
    } catch (err) {
      showError("Server error occurred while requesting OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={touched && !isValid}
          helperText={getHelperText()}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isValid}
          sx={{ mt: 2 }}
        >
          Send OTP
        </Button>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body1">
            Not Signup yet?
            <Link
              component={RouterLink}
              to="/admin/signup"
              color="primary"
              underline="hover"
            >
              Signup now
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminForgotPassword;
