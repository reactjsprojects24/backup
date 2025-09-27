import React, { useState , useEffect } from "react";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, FormControl, InputLabel, MenuItem, Select, } from "@mui/material";
import tree from "../assets/images/knwledgetree.png"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Vectoroverlap.png";
import bellogo from "../assets/images/image1 1.png";
import LoginImage from "../assets/images/LoginImage.png"

import {
    requestResetToken,
    resetPassword,
    resetState
} from "../redux/forgotPasswordSlice";
import { requestResetTokenAsync, resetPasswordAsync } from "../api/resetPassword"; 


const ForgotPasswordPage = () => {

    
    const securityQuestions = [
        "What is your mother's maiden name?",
        "What was the name of your first pet?",
        "What was the model of your first car?",
        "What city were you born in?",
        "What is your favorite book?",
    ];


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, step, loading, error } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        dispatch(resetState()); 
    }, [dispatch]);

    useEffect(() => {
        if (step === 3) {
            const interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            setTimeout(() => {
                navigate("/");
            }, 5000); // Navigate after 5 seconds

            return () => clearInterval(interval);
        }
    }, [step, navigate]);


    const [email, setEmail] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [countdown, setCountdown] = useState(5);
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleRequestToken = () => {
        dispatch(requestResetTokenAsync({ email, question, answer }));
    };

    const handleResetPassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        dispatch(resetPasswordAsync({ token, newPassword }));
    };

    return (
        
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // Two columns on large, single column on small
                width: "100vw", // Full width
                height: "100vh", // Full viewport height
                boxSizing: "border-box", // Ensures padding doesn't add overflow
                overflow: "hidden", // Prevents scrolling issues
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    px: { xs: 3, md: 15 },
                    py: { xs: 10, md: 22.5 },
                    bgcolor: "white",
                    height: "100vh",
                }}
            >
                 {/* Logo + Header */}
                 <Box display="flex" flexDirection="column" alignItems="" gap={2}>
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
                
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        textAlign="center"
                        sx={{ width: 400, fontFamily: "'Manrope-Regular', Helvetica" }}
                    >
                        Enter your registered email to receive a password reset link.
                    </Typography>
                </Box>

                {step === 1 &&
                    <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                        <TextField
                            id="input-1"
                            placeholder="Email"
                            type="email"
                            variant="outlined"
                            fullWidth size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ width: 400 }}
                        />
                        <FormControl fullWidth size="small">
                            <InputLabel>Select your Security question</InputLabel>
                            <Select IconComponent={ArrowDropDownIcon} label="Select your Designation"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            >
                                {securityQuestions.map((question, index) => (
                                                                <MenuItem key={index} value={question}>
                                                                    {question}
                                                                </MenuItem>
                                                        ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="input-1"
                            placeholder="Answer"
                            variant="outlined"
                            fullWidth size="small"
                            sx={{ width: 400 }}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleRequestToken}
                            sx={{ width: 400, height: 50, backgroundColor: "#AF1E22", borderRadius: "8px" }}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Continue"}
                        </Button>
                    </Box>
                }
                {step === 2 &&
                    <>
                        <TextField label="New Password" type="password" variant="outlined"
                            fullWidth size="small" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        <TextField label="Confirm Password" variant="outlined"
                            fullWidth size="small"type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        {/* <Button variant="contained" onClick={handleResetPassword} disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button> */}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleResetPassword}
                            sx={{ width: 400, height: 50, backgroundColor: "#005f73", borderRadius: "8px" }}
                            disabled={loading}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </>

                }
                {step === 3 &&
                <Typography variant="h6" textAlign="center">
                    Redirecting to login in {countdown} seconds...
                </Typography>
                }

                {error && <Typography color="error">{error}</Typography>}

                <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign="center"
                    sx={{ width: 400, fontFamily: "'Manrope-Regular', Helvetica" }}
                >
                    By signing in you accept the {" "}
                    <Link href="#" underline="hover">
                        Terms & Services
                    </Link>{" "}
                    and acknowledge our {" "}
                    <Link href="#" underline="hover">
                        privacy policy
                    </Link>
                </Typography>
                {/* BEL LOGO */}
                <Box display="flex" alignItems="center" >
                       <img src={bellogo} alt="BEL logo" />
                    </Box>
            </Box>



            <Box
                sx={{
                    display: { xs: "none", md: "flex" }, // Hide on small screens
                    flexDirection: "column",
                    justifyContent: "space-between", // Ensures even spacing
                    alignItems: "center",
                    bgcolor: "#AF1E22",
                    color: "white",
                    textAlign: "center",
                    padding: { xs: 2, md: 4 }, // Responsive padding
                    width: "100%",
                    height: "100vh", // Ensures full screen height
                    overflow: "hidden", // Prevents scrollbar
                }}
            >
                {/* Text Section */}
                <Box
                    sx={{
                        flexGrow: 1, // Allows text to take available space
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center", // Centers text vertically
                        alignItems: "center",
                        paddingTop: "10vh", // Adjusts top margin for spacing
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            maxWidth: "80%",
                            lineHeight: 1.2,
                            fontSize: { xs: "1.5rem", md: "2.2rem" },
                            whiteSpace: "nowrap", // Prevents wrapping
                        }}
                    >
                        Welcome Back to the
                    </Typography>

                    <Typography
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "1.7rem", md: "2.5rem" },
                            whiteSpace: "nowrap", // Ensures it stays on one line
                        }}
                    >
                        HIMASHAKTI Audio Analyzer
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            marginTop: 1,
                            fontSize: { xs: "0.9rem", md: "1.2rem" },
                            opacity: 0.8,

                        }}
                    >
                        Reset Password
                    </Typography>


                </Box>

                {/* Image Section (Stuck to Bottom) */}
                <Box
                    component="img"
                     src={LoginImage} // Replace with actual image path
                    alt="Tree Illustration"
                    sx={{
                        // width: "60%", // Adjust size
                        // maxWidth: "50em",
                        objectFit: "contain", // Prevents stretching
                        marginBottom: 0, // No extra margin
                    }}
                />
            </Box>

        </Box>


    );
};

export default ForgotPasswordPage;
