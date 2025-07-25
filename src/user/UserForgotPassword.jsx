import React, { useState, useEffect, useContext } from "react";
import { Link, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail } from "../utils/validation";
import { Link as RouterLink } from "react-router-dom";
import forgotPassword from "../services/forgotPassword";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastProvider";

const UserForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const { showError, showSuccess } = useContext(ToastContext);

  useEffect(() => {
    if (touched) {
      if (email.trim() === "") {
        setError("Email is required");
        setIsValid(false);
      } else if (!validateEmail(email)) {
        setError("Invalid email");
        setIsValid(false);
      } else {
        setError("");
        setIsValid(true);
      }
    }
  }, [email, touched]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setTouched(true);
  //   if (isValid) {
  //     console.log("Reset email sent to:", email);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setError("Please enter a valid email");
      return;
    }

    // setLoading(true);
    try {
      const { success, msg } = await forgotPassword({ role: "user", email });

      if (success) {
        console.log("otp send successfully ");
        showSuccess(msg);
        setEmail("");
        // alert("OTP sent successfully! Redirecting to reset password...");
        setTimeout(() => {
          console.log("reset ");
          navigate("/user/reset-password");
        }, 2000);
      } else {
        console.log("not send otp");
        showError(msg);
      }
    } catch (err) {
      console.log("error show");
      showError("Server error occurred while requesting OTP. Please try again.");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F6F4FFFF",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ color: "blue" }}
        >
          Forgot Password
        </Typography>
        <Typography align="center" variant="body1" sx={{ color: "gray" }}>
          Enter your email to get OTP.
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={touched && !!error}
          helperText={touched && error}
          sx={{ height: "56px" }}
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
              to="/user/signup"
              color="secondary"
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

export default UserForgotPassword;
