import React, { useState } from "react";
import {
    Box,
    TextField,
    IconButton,
    Button,
    Typography,
    Paper,
    Grid2,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    ListItem,
    ListItemText,
    FormControl,
    Select,
} from '@mui/material';
import { Search, FilterList, OpenInNew, Close } from '@mui/icons-material';
// import Navbar from "../../../components/Navbar";
import SearchIcon from '@mui/icons-material/Search';
// import DownloadIcon from '@mui/icons-material/Download';
import { useTheme, styled } from '@mui/material';
import DownloadIcon from './../assets/images/Content.png'
import TranslatorIcon from './../assets/images/translator.png'
import UploadAudio from '../features/Home/UploadAudio';
import AvailableAudio from '../features/Home/AvailableAudios';
import { useDispatch, useSelector } from 'react-redux';
import { identifyGenderThunk, identifyLanguageThunk } from '../redux/thunks/IdentificationThunk';
import { transcribeAudioThunk } from '../redux/thunks/transcriptionThunk';
import { grammerCorrectionThunk } from '../redux/thunks/NLPExtractionThunk';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

    const CustomDivider = styled(Divider)(({ theme }) => ({
       
        borderWidth: 0,
        borderColor: 'transparent', 
        borderStyle: 'solid', 
        backgroundColor: '#AF1E22',
        height: '2px',
        margin: '16px 0px',
        zIndex: 1,
    }));

    const [activeButton, setActiveButton] = useState('upload');
    const dispatch = useDispatch();
    const [componentToShow, setComponentToShow] = useState('uploadAudio'); // Initial component
    const transcribeResponse = useSelector((state) => state.transcription.transcript);
    const genderResponse = useSelector((state) => state.identification.gender);
    const languageResponse = useSelector((state) => state.identification.language);
    const grammerCorrectionResponse = useSelector((state) => state.NLPExtraction.grammerCorrection);
    const sentimentAnalysisResponse = useSelector((state) => state.NLPExtraction.sentimentAnalysis);
    const entityExtractionResponse = useSelector((state) => state.NLPExtraction.entityExtraction);

    const handleUploadClick = () => {
        setActiveButton('upload');
        setComponentToShow('uploadAudio');
    };

    const handleAvailableClick = () => {
        setActiveButton('available');
        setComponentToShow('availableAudio');
    };

    const [insights, setInsights] = useState("Your extracted insights text here..."); // Replace with your actual insights data

    const theme = useTheme();

    const handleDownload = () => {
        const blob = new Blob([insights], { type: 'text/plain' }); // Create a Blob from the text
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'extracted_insights.txt'; // Filename for the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
    };

    //Start of Translator Change
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [selectedModel, setSelectedModel] = useState('Model 1');
    const languages = ['English', 'Spanish', 'French', 'German'];
    const model = ['Model 1', 'Model 2', 'Model 3', 'Model 4'];
    const open = Boolean(anchorEl);
    const handelTranslatorChange = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handelTranslate = () => {
        const data = {
            "audio_id": uploadedAudio.audio_id,
            "language": selectedLanguage,
            "model": selectedModel,
        }
        try {
            if (data.audio_id === null || data.audio_id === undefined) {
                toast.error("Audio ID is missing, please upload the an audio.", {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored'
                });
                return;
            }
            if (data.language === null || data.language === undefined) {
                toast.error("Language is missing.", {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored'
                });
                return;
            }
            if (data.model === null || data.model === undefined) {
                toast.error("Model is missing.", {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'colored'
                });
                return;
            }
            dispatch(transcribeAudioThunk(data));
            dispatch(identifyGenderThunk(data));
            dispatch(identifyLanguageThunk(data));

            console.log(data, "data------------------------Trans");
        } catch (error) {
            // Handle any unexpected errors during thunk execution.
            console.error("Error during translation process:", error);
            toast.error("An unexpected error occurred during translation.", {
                position: 'top-right',
                autoClose: 5000, // Longer duration for general errors
                theme: 'colored'
            });
        }

    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    //End of Translator Change

    //Grammer Correction
    const handelCorrection = () => {
        console.log("grammerCorrection");
        const text = "transcription for audio";
        console.log(text, "data------");
        dispatch(grammerCorrectionThunk(text));
        console.log(text, "data");


    }


    console.log(grammerCorrectionResponse, "grammerCorrectionResponse");
    console.log(sentimentAnalysisResponse, "sentimentAnalysisResponse");
    console.log(entityExtractionResponse, "entityExtractionResponse");

    const people = ["John Smith", "Dr. Ayasha Khan"];
    const locations = ["Indira Nagar, Bangalore", "Connaught Place, Delhi"];
    const places = ["Function Hall", "Railway station"];
    const times = ["Yesterday at 5 PM", "Next Monday"];

    const sentimentSummary = "The audio covers a conversation around an upcoming conference in Goa involving several key individuals including John Smith and Dr. Ayasha Khan. The speaker discusses logistics, accommodations, and past events. A few statements raise concerns about security, mentioning potential threats and the need for increased safety. While the general tone is informative, certain segments express urgency and concern.";

    const [showUpload, setShowUpload] = useState(true); // Initial state: show upload button

    const handleToggle = () => {
        setShowUpload(!showUpload);
    };



    const uploadedAudio = useSelector((state) => state.audio.audioFiles);

    return (
        <> <ToastContainer />
            <Grid2 container spacing={2} mt={5} ml={2}>
                {/* Main Content Area */}
                <Grid2 item size={{ xs: 12, sm: 8, md: 8 }} sx={{ height: "600px" }}>
                    <Grid2 container>
                        <Grid2 item size={{ sm: 12, md: 12 }} sx={{ marginBottom: 3 }}>
                            <Grid2 container
                                sx={{
                                    border: '2px solid #AF1E22',
                                    borderRadius: 4,
                                    justifyContent: "space-between",
                                    padding: '1px',
                                    height: '100%'
                                }}
                            >
                                <Grid2 item size={{ sm: 12, md: 12 }}>
                                    <Grid2 container sx={{
                                        backgroundColor: '#ffe6e6',
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        paddingTop: 1,
                                        paddingBottom: 1
                                    }}>
                                        <Grid2 item size={{ xs: 6, sm: 6, md: 6 }} sx={{
                                            display: "flex",  //Crucial for aligning items horizontally
                                            alignItems: "center", // Vertically center the content
                                            position: 'relative', // Needed for absolute positioning of the icon
                                        }} >
                                            <Typography variant="h5" gutterBottom sx={{ m: 1 }}>
                                                Get Started with Audio Analysis
                                            </Typography>
                                        </Grid2>
                                        <Grid2 item size={{ xs: 6, sm: 6, md: 6 }} sx={{
                                            justifyContent: 'flex-end',
                                            display: 'flex',
                                            alignItems: 'center' // Vertically align the switch
                                        }}>
                                            <Box sx={{ border: '2px solid #AF1E22', backgroundColor: '#AF1E22', borderRadius: 5, }}>
                                                <Button
                                                    sx={{

                                                        color: activeButton === 'upload' ? '#AF1E22' : 'white',
                                                        backgroundColor: activeButton === 'upload' ? 'white' : '#AF1E22',
                                                        '& .MuiSwitch-thumb': { color: '#AF1E22' },
                                                        '& .MuiSwitch-track': { backgroundColor: '#AF1E22', opacity: 1 },
                                                        borderRadius: 5
                                                    }}
                                                    onClick={handleUploadClick}
                                                >
                                                    Upload audio
                                                </Button>

                                                <Button
                                                    sx={{

                                                        color: activeButton === 'available' ? '#AF1E22' : 'white',
                                                        backgroundColor: activeButton === 'available' ? 'white' : '#AF1E22',
                                                        '& .MuiSwitch-thumb': { color: '#AF1E22' },
                                                        '& .MuiSwitch-track': { backgroundColor: '#AF1E22', opacity: 1 },
                                                        borderRadius: 5
                                                    }}
                                                    onClick={handleAvailableClick}
                                                >
                                                    Available audio
                                                </Button>
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                                <Grid2 item size={{ sm: 12, md: 12 }}>
                                    {componentToShow === 'uploadAudio' ? <UploadAudio /> : <AvailableAudio />}
                                </Grid2>
                            </Grid2>
                        </Grid2>
                        {entityExtractionResponse && sentimentAnalysisResponse && Object.keys(sentimentAnalysisResponse).length > 0 && entityExtractionResponse.length > 0 && (
                            <Grid2 item size={{ sm: 12, md: 12 }}>{/* Extracted Insights from Audio */}
                                <Grid2 container sx={{ borderRadius: 5 }}>
                                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }}
                                        item
                                        sx={{
                                            backgroundColor: "#ffe6e6",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: '8px',
                                            position: 'relative',
                                        }}
                                    >
                                        <h2 style={{ marginBottom: '0', flexGrow: 1, fontWeight: 'normal' }}>Extracted Insights from Audio</h2>
                                        <IconButton
                                            aria-label="Download"
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                color: 'red',
                                            }}
                                            onClick={handleDownload}
                                        >
                                            <img src={DownloadIcon} />
                                            {/* <DownloadIcon /> */}
                                        </IconButton>
                                    </Grid2>
                                    <Grid2 item size={{ xs: 12, sm: 12, md: 12 }}>
                                        <Grid2 item size={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: 3 }}>
                                            <Paper sx={{ padding: 2, backgroundColor: 'white' }}>
                                                <Grid2 container spacing={2}>
                                                    <Grid2 item size={{ xs: 5, sm: 5, md: 5 }} sx={{ borderRight: '1px solid gray' }}>
                                                        <div style={{ marginBottom: '20px' }}><h4 style={{ fontWeight: 'normal', color: 'gray', }}>Extracted Entities</h4>
                                                            <div style={{ marginBottom: '20px', display: 'flex' }}>
                                                                <div style={{ width: '50%', marginRight: '10px' }}>
                                                                    <Typography style={{ fontSize: 12, color: '#AF1E22' }}>People</Typography>
                                                                    <ul style={{ fontWeight: 'bold', fontSize: 11, margin: 0, paddingLeft: 30 }}>
                                                                        {people.map((person, index) => (
                                                                            <li key={index}>{person}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div style={{ width: '50%' }}>
                                                                    <Typography style={{ fontSize: 12, color: '#AF1E22' }}>Locations</Typography>
                                                                    <ul style={{ fontWeight: 'bold', fontSize: 11, margin: 0, paddingLeft: 30 }}>
                                                                        {locations.map((location, index) => (
                                                                            <li key={index}>{location}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: 'flex' }}>
                                                                <div style={{ width: '50%', marginRight: '10px' }}>
                                                                    <Typography style={{ fontSize: 12, color: '#AF1E22' }}>Places</Typography>
                                                                    <ul style={{ fontWeight: 'bold', fontSize: 11, margin: 0, paddingLeft: 30 }}>
                                                                        {places.map((place, index) => (
                                                                            <li key={index}>{place}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div style={{ width: '50%' }}>
                                                                    <Typography style={{ fontSize: 12, color: '#AF1E22' }}>Time</Typography>
                                                                    <ul style={{ fontWeight: 'bold', fontSize: 11, margin: 0, paddingLeft: 30 }}>
                                                                        {times.map((time, index) => (
                                                                            <li key={index}>{time}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Grid2>
                                                    <Grid2 item size={{ xs: 5, sm: 5, md: 5 }} sx={{ borderRight: '1px solid gray' }}>
                                                        <div style={{ marginBottom: '20px' }}>
                                                            <div style={{ display: "flex", position: 'relative', alignItems: 'center', marginRight: 15 }}>
                                                                <h4 style={{ fontWeight: 'normal', color: 'gray' }}>Sentiment Summary</h4>
                                                                <Button sx={{
                                                                    ml: 'auto',
                                                                    fontSize: 13,
                                                                    // Dynamically change color and text based on sentiment
                                                                    color: sentimentAnalysisResponse.sentiment === 'positive' ? '#228B22' : sentimentAnalysisResponse.sentiment === 'negative' ? '#AF1E22' : '#808080' ,
                                                                    backgroundColor: sentimentAnalysisResponse.sentiment === 'positive' ? 'rgb(210 255 210)' : sentimentAnalysisResponse.sentiment === 'negative' ? 'rgb(253 197 199)' : '#D3D3D3',
                                                                    borderRadius: 5,
                                                                    paddingTop: 1,
                                                                    height: '20px', // Reduced height
                                                                    '& span': { //Target the text inside the button
                                                                        textTransform: 'lowercase', // Make the text lowercase
                                                                    },
                                                                    display: 'flex',
                                                                    alignItems: 'center' // Center align the content
                                                                }}>
                                                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', 
                                                                    backgroundColor: sentimentAnalysisResponse.sentiment === 'positive' ? '#228B22' : sentimentAnalysisResponse.sentiment === 'negative' ? '#AF1E22' : '#808080', 
                                                                    marginRight: '5px' }}></span>
                                                                    {sentimentAnalysisResponse.sentiment.charAt(0).toUpperCase() + sentimentAnalysisResponse.sentiment.slice(1)}
                                                                </Button>
                                                            </div>
                                                            <Typography sx={{ fontSize: 12 }}>{sentimentSummary}</Typography>
                                                        </div>
                                                    </Grid2>
                                                    <Grid2 item size={{ xs: 2, sm: 2, md: 2 }}>
                                                        <div style={{ marginBottom: '10px' }}>
                                                            <h4 style={{ marginBottom: '5px', fontWeight: 'normal', color: 'gray', fontSize: 12 }}>Dangerous Words</h4>
                                                            <Typography style={{ fontSize: 12 }}>Attack <span style={{ color: '#AF1E22' }}>(1:15)</span>, Explosion <span style={{ color: '#AF1E22' }}>(02:45)</span>, Threat <span style={{ color: '#AF1E22' }}>(03:20)</span>, Panic <span style={{ color: '#AF1E22' }}>(04:45)</span></Typography>
                                                            {/* {dangerousWords.map((word, index) => (
                                                            <Typography key={index} style={{ fontWeight: 'bold', fontSize: 11, margin: 0}}>{word}</Typography>
                                                        ))} */}
                                                        </div>
                                                    </Grid2>
                                                </Grid2>
                                            </Paper>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>
                            </Grid2>)}
                    </Grid2>
                </Grid2>

                {/* Audio Transcript */}
                <Grid2 item size={{ xs: 12, sm: 4, md: 4 }}>
                    <Grid2 container size={12}>
                        <Grid2 item size={12} md={12} sx={{ backgroundColor: '#ffe6e6', borderRadius: 3 }} >
                            <Typography variant="h6" sx={{ m: 2, textAlign: 'center' }}>
                                Audio Transcript
                            </Typography>
                        </Grid2>
                        <Grid2 item size={12} md={12} style={{ paddingRight: 15 }} >
                            <Box style={{ display: "flex", position: 'relative', alignItems: 'center', marginTop: 15, marginBottom: 20, justifyContent: 'center' }}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    width="50px"
                                    sx={{
                                        mr: 2,
                                        '& .MuiOutlinedInput-root': { borderRadius: 5 },
                                        width: "300px",
                                        // Reduce height
                                        height: "30px",
                                        // Correct placeholder vertical alignment
                                        '& .MuiInputBase-root': {
                                            alignItems: 'center', // Vertically center content
                                        },
                                        // Adjust padding for better visual balance
                                        padding: '0px 8px',
                                        '& .MuiOutlinedInput-input': {
                                            padding: '4px 8px', // Reduce default padding
                                        }
                                    }}
                                    placeholder="Search file name, keywords..." // Add placeholder text
                                    inputProps={{ style: { fontSize: '0.8rem' } }} // Very small placeholder font size
                                    InputProps={{
                                        startAdornment: <IconButton><SearchIcon /></IconButton>,
                                    }}
                                />
                                <Button
                                    variant="outlined"
                                    color="gray"
                                    size="small"
                                    onClick={handelTranslatorChange}
                                    sx={{
                                        borderRadius: 3,
                                        // marginLeft: 'auto', // Removed auto margin for even spacing
                                        flexShrink: 0, // Don't shrink the button
                                        [theme.breakpoints.xs]: { // Extra small screens
                                            width: '100px',
                                        },
                                        [theme.breakpoints.sm]: { // Small screens
                                            width: '120px',
                                        },
                                        [theme.breakpoints.md]: { // Medium screens
                                            width: '150px',
                                        },
                                    }}
                                >
                                    <img style={{ height: '15px', marginRight: '10px' }} src={TranslatorIcon} />
                                    Translator
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    // onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem sx={{ display: 'flex', alignItems: 'center', fontWeight: 540, justifyContent: 'space-between' }}>
                                        Translator
                                        <ListItemIcon onClick={handleClose} sx={{ justifyContent: 'flex-end' }}>
                                            <Close />
                                        </ListItemIcon>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem sx={{ display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#848484', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            Select Model
                                            <ListItem
                                                button
                                                id="lock-button"
                                                aria-haspopup="listbox"
                                                aria-controls="lock-menu"
                                                aria-label="Clear"
                                                sx={{ p: '0', color: '#AF1E22', fontSize: '14px', width: 'auto', justifyContent: 'flex-end' }}
                                            >
                                                <ListItemText
                                                    primary="Clear"
                                                />
                                            </ListItem>
                                        </div>
                                        <FormControl sx={{ minWidth: 250, mt: 2, mb: 2 }} size="small" fullWidth> {/*Added mt:2 for margin-top*/}
                                            {/* <InputLabel id="demo-select-small-label">Language</InputLabel> */}
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={selectedModel}
                                                // label="Language"
                                                onChange={(e) => {
                                                    setSelectedModel(e.target.value);
                                                }}
                                                sx={{ borderRadius: "25px" }}
                                            >
                                                {model.map((model) => (
                                                    <MenuItem key={model} value={model}>
                                                        {model}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            Select Language
                                            <ListItem
                                                button
                                                id="lock-button"
                                                aria-haspopup="listbox"
                                                aria-controls="lock-menu"
                                                aria-label="Clear"
                                                sx={{ p: '0', color: '#AF1E22', fontSize: '14px', width: 'auto', justifyContent: 'flex-end' }}
                                            >
                                                <ListItemText
                                                    primary="Clear"
                                                />
                                            </ListItem>
                                        </div>
                                        <FormControl sx={{ minWidth: 250, mt: 2 }} size="small" fullWidth> {/*Added mt:2 for margin-top*/}
                                            {/* <InputLabel id="demo-select-small-label">Language</InputLabel> */}
                                            <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={selectedLanguage}
                                                // label="Language"
                                                onChange={(e) => {
                                                    setSelectedLanguage(e.target.value);
                                                }}
                                                sx={{ borderRadius: "25px" }}
                                            >
                                                {languages.map((language) => (
                                                    <MenuItem key={language} value={language}>
                                                        {language}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} sx={{ display: 'flex', fontSize: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                                            <Button sx={{ backgroundColor: '#ffe6e6', borderColor: '#AF1E22', color: '#AF1E22', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px', mr: 4 }}>Auto Translate</Button>
                                            {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                                        </ListItem>
                                        <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                                            <Button onClick={handelTranslate} sx={{ backgroundColor: '#AF1E22', color: '#fff', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px', ml: 4 }}>Translate Now</Button>
                                            {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                                        </ListItem>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Grid2>
                          <Grid2 item size={{ xs: 12, sm: 12, md: 12 }} sx={{ backgroundColor: 'white' }}>
                        {/* {transcribeResponse && Object.keys(transcribeResponse).length > 0 && (<Grid2 item size={{ xs: 12, sm: 12, md: 12 }} sx={{ backgroundColor: 'white' }}> */}
                            <Grid2 container>
                                <Grid2 item size={12} md={12}>
                                    <Box style={{ display: "flex", position: 'relative', alignItems: 'center', marginBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                                        <Typography style={{ fontSize: 13 }}>
                                            Identified language: <span style={{ fontWeight: 'bold' }}>{languageResponse}</span>
                                        </Typography>
                                        <Typography style={{ fontSize: 13, marginLeft: 'auto' }}> {/* Add marginLeft: 'auto' */}
                                            Gender:{genderResponse}
                                        </Typography>
                                    </Box>
                                </Grid2>
                                <Grid2 item size={12} md={12} style={{ paddingLeft: 20, paddingRight: 20 }}>
                                    <Typography style={{ fontSize: 15 }}>
                                        {/* {transcribeResponse.transcript || "Transcription data not available."} */}
                                        {transcribeResponse.transcript}
                                    </Typography>
                                </Grid2>
                                <CustomDivider />
                                <Grid2 item size={12} md={12}>
                                    <Box style={{ display: "flex", position: 'relative', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography style={{ flex: 1, textAlign: 'left' }}> {/* Add flex: 1 and textAlign: 'left' */}
                                            <a href="#" style={{ color: '#AF1E22', fontSize: 13, fontFamily: 'sans-serif' }}>
                                                <IconButton><OpenInNew sx={{ color: '#AF1E22' }} /></IconButton>Highlight Key Moment
                                            </a>
                                        </Typography>
                                        <Button sx={{
                                            backgroundColor: '#ffe6e6',
                                            color: '#AF1E22',
                                            padding: "10px",
                                            height: '40px',
                                            border: 'none',
                                            borderRadius: '18px',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            outline: 'none',
                                            display: 'flex',
                                            marginLeft: 'auto' // Push the button to the right
                                        }}
                                            onClick={handelCorrection}
                                        >
                                            Grammar correction
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
};

export default Home;