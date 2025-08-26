import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedItem } from "../redux/sidebarSlice";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import bel from "../assets/images/bel.png"
import expandIcon from "../assets/images/arrow.png";
import collapseIcon from "../assets/images/arrowsvg.svg";
import frame515 from "../assets/images/Frame515.png";
import BulkAnalysis from "../assets/images/BulkAnalysis.png";
import SpeakerOptions from "../assets/images/SpeakerOptions.png";
import TextTranslate from "../assets/images/TextTranslate.png";
import AudioEditing from "../assets/images/AudioEditing.png";
import AudioStitching from "../assets/images/AudioStitching.png";
import keyworkspotting from "../assets/images/keyworkspotting.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedItem = useSelector((state) => state.sidebar.selectedItem);
    const handleItemClick = (item) => {
        console.log(item)
        dispatch(setSelectedItem(item));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <Box
            sx={{
                width: isOpen ? 250 : 80,
                transition: "width 0.3s",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                padding: 1,
            }}
        >
            {/* Header - Logo and Collapse Button */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, pb: 2 }}>
                {isOpen && (

                    <Box
                        component="img" 
                        src={frame515}
                        alt="HIMASAKTHI Logo"
                        sx={{
                            width: '150px', 
                            height: 'auto',
                           
                            background: "linear-gradient(90deg, #AF1E22, #FF5B00)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: "bold",
                            position: 'relative',
                            display: 'inline-block', 
                        }}
                    />
                )}
                <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
                    <img
                        src={isOpen ? expandIcon : collapseIcon}
                        alt="Toggle Sidebar"
                        style={{
                            width: 24,
                            height: 24,
                            cursor: "pointer",
                            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                        }}
                        onClick={toggleSidebar}
                    />
                </Box>
            </Box>

            {/* Sidebar Menu */}
            <List sx={{ flexGrow: 1 }}>
                {[
                    { text: "Home", icon: <DashboardIcon />, id: "Home" },
                    { text: "BulkAnalysis", icon: BulkAnalysis, id: "BulkAnalysis" },
                    { text: "KeywordSpotting", icon: keyworkspotting, id: "KeywordSpotting" },
                    { text: "SpeakerOperations", icon: SpeakerOptions, id: "SpeakerOperations" },
                    { text: "AudioEditing", icon: AudioEditing, id: "AudioEditing" },
                    { text: "AudioStitching", icon: AudioStitching, id: "AudioStitching" },
                    { text: "TextTranslate", icon: TextTranslate, id: "TextTranslate" },
                ].map(({ text, icon, id }) => (
                    <ListItem
                        button
                        key={id}
                        onClick={() => handleItemClick(id)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "rgba(31, 31, 31, 0.50)",
                            bgcolor: selectedItem === id ? "#AF1E22" : "transparent",
                            borderRadius: "8px",
                            "&:hover": { bgcolor: "#AF1E22", color: "white" },//FF5B00
                            mb: 1,
                            cursor: "pointer"
                        }}
                    >
                        <ListItemIcon sx={{ color: "inherit" }}>{typeof icon === 'string' ? (
                            <img src={icon} alt="Icon" style={{ width: '24px', height: '24px' }} />
                        ) : (
                            icon
                        )}</ListItemIcon>
                        {isOpen && <ListItemText
                            primary={text}
                            sx={{
                                fontWeight: selectedItem === id ? "bold" : "normal",
                                color: selectedItem === id ? "white" : "normal",

                            }} />}
                    </ListItem>
                ))}

                

            </List>

            {/* Footer - Logout Button */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2, mb: 5 }}>


                <Button
                    onClick={handleLogout}
                    variant="outlined"
                    sx={{
                        border: "2px solid #AF1E22",
                        mb: 5,
                        borderRadius: 5,
                        color: "#AF1E22",
                        fontWeight: "bold",
                        width: "100%",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#AF1E22", color: "white" },
                    }}
                >
                    Log Out
                </Button>
                <Box sx={{
                    display: 'flex', justifyContent: 'center'
                }}>
                    <img src={bel} />
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
