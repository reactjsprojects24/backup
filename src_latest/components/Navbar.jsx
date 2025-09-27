import React from "react";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
    return (
        <>
            {/* Navbar Container */}
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 0.5,
                    bgcolor: "whitesmoke",
                    overflow: "hidden",
                    zIndex: 1,  
                  }}
            >
                {/* Centered Title */}
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        textAlign: "center",
                        fontWeight: "bold", 
                        color: "transparent",
                        background: "#AF1E22", 
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Welcome to the AI-powered Audio Analyzer
                </Typography>
            </Box>
        </>
    );
};

export default Navbar;
