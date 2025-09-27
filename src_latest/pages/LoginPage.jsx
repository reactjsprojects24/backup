import React, { useState } from "react";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import tree from "../assets/images/knwledgetree.png"
// import Himashakti from "../assets/images/Himashaktilogin.png"
import LoginImage from "../assets/images/LoginImage.png"
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateCredentials } from "../redux/authSlice";
import logo from "../assets/images/Vectoroverlap.png";
import aivaslogo from "../assets/images/Group 5.png";
import bellogo from "../assets/images/image1 1.png";
import { handleLogin } from "../api/authentication";
import VisibilityIcon from "@mui/icons-material/Visibility";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const storedEmail = useSelector((state) => state.auth.email); // Get stored email



    const { email, password, rememberMe, error } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = React.useState(false);

  

    return (
        <Box
            sx={{
                display: "grid", //arrange elements in rows and columns.
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // Two columns on large, single column on small
                width: "100vw", // Full width
                height: "100vh", // Full viewport height
                boxSizing: "border-box", // Ensures padding doesn't add overflow
                overflow: "hidden", // Prevents scrolling issues
            }}
        >
            <Box
                display="flex" // arrange elements in a single dimension (either rows or columns)
                flexDirection="column" // the flex items (the direct children of this container) will be arranged in a column
                alignItems="center"
                gap={3}
                px={{ xs: 3, md: 15 }}
                py={{ xs: 10, md: 22.5 }}
                bgcolor="white"
                height="100vh"
            >
                {/* Logo + Header */}
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{
                            background: "linear-gradient(91deg, #AF1E22 0.09%, #AF1E22 99.42%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textAlign: "center",

                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="Hima Shakti Logo" />
                            <span style={{ color: "AF1E22", fontFamily: "Manrope-Regular, Helvetica", marginLeft: '10px', display: 'block' }}>
                                HIMA
                            </span>
                            <span style={{ color: "AF1E22", fontFamily: "Manrope-Regular, Helvetica", display: 'block' }}>
                                SHAKTI
                            </span>
                        </div>
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        textAlign="center"
                        width={{ xs: "90%", md: 400 }}
                    >
                        Enter your registered email and password to access your Himashakti account
                    </Typography>
                </Box>

                {/* Input Fields */}
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Email"
                        value={storedEmail ? storedEmail : email}
                        onChange={(e) => dispatch(updateCredentials({ email: e.target.value, password, rememberMe }))}
                        type="email"
                        sx={{ width: { xs: "90%", md: 400 }  }}
                    />
                    <Box display="flex" alignItems="center" width={{ xs: "90%", md: 400 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => dispatch(updateCredentials({ email, password: e.target.value, rememberMe }))}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>

                    {/* Remember Me & Forgot Password */}
                    <Box display="flex" justifyContent="space-between" width={{ xs: "90%", md: 400 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon sx={{ color: "#AF1E22" }} />}
                                    checkedIcon={<CheckBoxIcon sx={{ color: "#AF1E22" }} />}
                                    name="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => dispatch(updateCredentials({ email, password, rememberMe: e.target.checked }))}
                                />
                            }
                            label={
                                <Typography sx={{ color: "#AF1E22" }}>
                                    Remember me
                                </Typography>
                            }
                        />
                        <Link component={Link} to="/ForgotPasswordPage" sx={{
                            color: "#AF1E22",
                            textDecoration: "none"
                        }}>
                            Forgot Password?
                        </Link>
                    </Box>

                </Box>

                {/* Login Button */}
                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <Button
                        onClick={() => handleLogin(dispatch, email, password, rememberMe, navigate)}
                        variant="contained"
                        sx={{
                            width: { xs: "90%", md: 400 },
                            height: 50,
                            bgcolor: "#AF1E22",
                            borderRadius: "8px",
                            "&:hover": { bgcolor: "#AF1E22" } // Slightly lighter color on hover
                        }}
                    >
                        Log in
                    </Button>
                    <Typography variant="body2">
                        New here?{" "}
                        <Link sx={{ color: "#AF1E22", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                            component={Link}
                            to="/RegistrationPage">
                            Register Now!
                        </Link>
                    </Typography>
                </Box>


                {/* Terms & Privacy */}
                <Box width={{ xs: "90%", md: 400 }} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        By signing in, you accept the{" "}
                        <Link href="#" underline="hover">
                            Terms & Services
                        </Link>{" "}
                        and acknowledge our{" "}
                        <Link href="#" underline="hover">
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>


                {/* BEL LOGO */}
                <Box display="flex" alignItems="center" >
                       <img src={bellogo} alt="BEL logo" />
                    </Box>
            </Box>


            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "#AF1E22",
                    color: "white",
                    textAlign: "center",
                    padding: { xs: 2, md: 4 },
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                {/* Text Section */}

                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "10vh",
                    }}
                >
                    <Typography variant="h4" sx={{ whiteSpace: "nowrap" }}>
                        Welcome Back to the
                    </Typography>
                    <Typography fontWeight="bold" sx={{ fontSize: "2.5rem" }}>
                        HIMASHAKTI Audio Analyzer
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                        Secure Access to Intelligent Document Search & Management
                    </Typography>
                </Box>

                {/* Image Section */}
                <Box
                    component="img"
                     src={LoginImage} // Replace with actual image path
                    alt="Illustration"
                    sx={{
                        //width: { xs: "100%", md: "100%" },
                        // maxWidth: "50em",
                        objectFit: "contain",
                        marginBottom: 0,
                    }}
                />
            </Box>

        </Box>


    );
};

export default LoginPage;
