import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Home from "./Home";
import BulkAnalysis from "./BulkAnalysis";
import AudioEditing from "./AudioEditing";
import AudioStitching from "./AudioStitching";
import TextTranslate from "./TextTranslate";
import KeywordSpotting from "./KeywordSpotting";
import SpeakerOperations from "./SpeakerOperations";

const UserDashboard = () => {
  const selectedItem = useSelector(
    (state) => state.sidebar.selectedItem
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Controls sidebar collapse

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <Home />;
      case "BulkAnalysis":
        return <BulkAnalysis />;
        case "KeywordSpotting":
          return <KeywordSpotting />;
        case "SpeakerOperations":
          return <SpeakerOperations />;
      case "AudioEditing":
        return <AudioEditing />;
      case "AudioStitching":
        return <AudioStitching />;
      case "TextTranslate":
        return <TextTranslate />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0px',
          backgroundColor: 'transparent'
        },
        boxSizing: "border-box"
      }}
    >
      {/* Mobile Menu Button */}
      <IconButton
        onClick={toggleMobileSidebar}
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggleMobileSidebar}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Sidebar isOpen={true} toggleSidebar={toggleSidebar} />
      </Drawer>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: sidebarOpen ? 300 : 80,
          transition: "width 0.3s",
          height: "100%", // Full height
        }}
      >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
          boxShadow: "0px 4px 10px rgba(10, 147, 150, 0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* <Navbar/> */}
        {/* <Box sx={{mb :2}}><Navbar/></Box> */}
        <Box ><Navbar /></Box>

        {/* Scrollable Inner Content */}
        <Box
          sx={{
            flexGrow: 1,
            height: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            bgcolor:"whitesmoke",
          }}
        >
          {renderContent()}
        </Box>

      </Box>
    </Box>
  );
};

export default UserDashboard;
