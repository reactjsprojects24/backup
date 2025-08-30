import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputAdornment,
    InputLabel,
    Link,
    MenuItem,
    Select,
    IconButton,
    Slide
} from "@mui/material";
import { Link as routerLink } from "react-router-dom"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import tree from "../assets/images/knwledgetree.png";
import { useDispatch, useSelector } from "react-redux";
import { registerStart, registerSuccess, registerFailure } from "../redux/registrationSlice";
import { handleRegistration } from "../api/authentication";
import RegistrationDialog from "../features/dialogBoxes/registrationDialog"
import VisibilityIcon from "@mui/icons-material/Visibility";
import logo from "../assets/images/Vectoroverlap.png";
import bellogo from "../assets/images/image1 1.png";
import LoginImage from "../assets/images/LoginImage.png"



const RegistrationPage = () => {

    const dispatch = useDispatch();
    const { userDetails, loading, error, success } = useSelector((state) => state.registration);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        "fullname": "",
        "email": "",
        "organization": "",
        "designation": "",
        "password": "",
        "confirm_password": "",
        "security_question": "",
        "security_answer": "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        console.log("formData", formData)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleRegistration(formData)); // Dispatching the entire formData object
    };

    const securityQuestions = [
        "What is your mother's maiden name?",
        "What was the name of your first pet?",
        "What was the model of your first car?",
        "What city were you born in?",
        "What is your favorite book?",
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                width: "100vw",
                height: "100vh",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            {/* Left Section (Form) */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    minHeight: "100vh",
                    mb: 4,
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
                </Box>

                {/* Form Container */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        width: "90%",
                        maxWidth: "400px",
                        bgcolor: "white",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <TextField label="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} fullWidth size="small" required />
                    <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth size="small" type="email" required />
                    <TextField label="Organisation Name" name="organization" value={formData.organization} onChange={handleChange} fullWidth size="small" required />

                    {/* Designation Dropdown */}
                    <FormControl fullWidth size="small">
                        <InputLabel>Select your Designation</InputLabel>
                        <Select name="designation" value={formData.designation} onChange={handleChange} IconComponent={ArrowDropDownIcon} required>
                            <MenuItem value="Engineer">Engineer</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Administrator">Administrator</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Password Field */}
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Confirm Password Field */}
                    <TextField
                        label="Confirm Password"
                        name="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirm_password}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Security Question Dropdown */}
                    <FormControl fullWidth size="small">
                        <InputLabel>Select your Security Question</InputLabel>
                        <Select name="security_question" value={formData.security_question} onChange={handleChange} IconComponent={ArrowDropDownIcon} required>
                            {securityQuestions.map((question, index) => (
                                <MenuItem key={index} value={question}>
                                    {question}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Security Answer" name="security_answer" value={formData.security_answer} onChange={handleChange} fullWidth size="small" required />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            px: 3,
                            py: 1.2,
                            color: "white",
                            bgcolor: "#AF1E22",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#AF1E22" },
                        }}
                    >
                        {loading ? "Registering..." : "Request Access"}
                    </Button>

                    {/* Login Link */}
                    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                        Already have an account? <Link component={routerLink}
                            to="/" underline="hover" color="primary">Login Here</Link>
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

            {/* Right Section (Image & Info) */}
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
                        Create your new
                    </Typography>
                    <Typography fontWeight="bold" sx={{ fontSize: "2.5rem" }}>
                    HIMASHAKTI account to analyze audios
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                        Get Access to AI-Powered Document Insights & Search
                    </Typography>
                </Box>

                {/* Image Section */}
                <Box
                    component="img"
                    src={LoginImage}
                    alt="Element"
                    sx={{
                        
                        objectFit: "contain",
                        marginBottom: 0,
                    }}
                />
            </Box>
            {/* <Slide in={dialogOpen} direction="down" mountOnEnter unmountOnExit>
                <RegistrationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
            </Slide> */}
        </Box>
    );
};

export default RegistrationPage;
