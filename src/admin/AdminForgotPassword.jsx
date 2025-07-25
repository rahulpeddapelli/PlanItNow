import React, { useState, useEffect, useContext } from "react";
import { Link, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { validateEmail } from "../utils/validation";
import { Link as RouterLink } from "react-router-dom";
import forgotPassword from "../services/forgotPassword";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../context/ToastProvider";

const AdminForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { showError, showSuccess } = useContext(ToastContext);

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
    if (!isValid) {
      setError("Please enter a valid email");
      return;
    }

    // setLoading(true);
    try {
      const { success, msg } = await forgotPassword({ role: "admin", email });

      if (success) {
        console.log("otp send successfully ");
        showSuccess(msg);
        setEmail("");
        // alert("OTP sent successfully! Redirecting to reset password...");
        setTimeout(() => {
          console.log("reset ");
          navigate("/admin/reset-password");
        }, 2000);
      } else {
        console.log("not send otp");
        showError(msg);
      }
    } catch (err) {
      console.log("error show");
      showError(
        "Server error occurred while requesting OTP. Please try again."
      );
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
        <Typography
          variant="h5"
          align="center"
          gutterBottom
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
          error={touched && !isValid}
          helperText={getHelperText()}
          sx={{ height: "56px" }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!isValid}
          sx={{ mt: 2, cursor: "pointer" }}
        >
          Send OTP
        </Button>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography align="center" variant="body1">
            Not Signup yet?
            <Link
              component={RouterLink}
              to="/admin/signup"
              // color="primary"
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

export default AdminForgotPassword;
