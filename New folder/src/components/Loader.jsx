import React from "react";
import { Typography, Box } from "@mui/material";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json"; // Path to Lottie JSON

const Loader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      {/* ✅ Lottie Animation */}
      <Lottie
        // animationData={loadingAnimation}
        style={{
          width: "50%", // Adjusts based on screen size
          maxWidth: "300px", // Prevents animation from getting too big
          height: "auto",
        }}
      />

      {/* ✅ Responsive Loading Text */}
      <Typography
        variant="h6"
        sx={{
          marginTop: 2,
          fontSize: { xs: "14px", sm: "16px", md: "18px" },
          fontWeight: "bold",
          color: "#1976d2",
          textAlign: "center",
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loader;
