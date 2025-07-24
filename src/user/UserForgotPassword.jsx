import React, { useState, useEffect } from "react";
import {Link, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail } from "../utils/validation";
import {Link as RouterLink} from "react-router-dom"
const UserForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (isValid) {
      console.log("Reset email sent to:", email);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, width: "100%", maxWidth: 400 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" gutterBottom align="center">
          Forgot Password
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

export default UserForgotPassword;
