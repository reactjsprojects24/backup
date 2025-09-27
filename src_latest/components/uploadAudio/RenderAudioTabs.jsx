import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WaveSurfer from 'wavesurfer.js';
import Volume from '../../assets/images/Volume.png'
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { FormControlLabel } from "@mui/material"; // Import ToggleButton and ToggleButtonGroup
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, FormControl, Grid2, InputLabel, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Select } from '@mui/material';

import Noise from '../../assets/images/noise.png';
import Noise1 from '../../assets/images/noise1.png';
import Transcription_model from '../../assets/images/transcription_model.png'

import Rewrite from '../../assets/images/rewrite.png'
import { Buttonz, Buttons } from '../ui/elements';
import { buttonLabels } from '../ui/elements/labels';
import { Close } from '@mui/icons-material';

import { sentimentAnalysisThunk, entityExtractionThunk } from '../../redux/thunks/NLPExtractionThunk'
import { noiseRemovalAudioThunk } from '../../redux/thunks/audioThunks';
import { analyzeAudioThunk } from '../../redux/thunks/audioThunks';
// import { toast } from 'react-toastify';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function RenderAudioTabs({ file, metadata }) { // Receive the file prop
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00');
    const [formattedDuration, setFormattedDuration] = useState('0:00');
    const [value, setValue] = React.useState(0);  // Current active tab
    const [showNoiseTab, setShowNoiseTab] = useState(false); // control visibility
    const waveformRef = useRef(null);
    const [selectedModel, setSelectedModel] = useState(null);

    const [channel, setChannel] = React.useState('');
    const [noiseApplied, setNoiseApplied] = useState(false); // To track if noise removal is applied(by default it will be off)
    const [noiseClicked, setNoiseClicked] = useState(false); // To track if noise removal toggle is clicked
    const dispatch = useDispatch();


    //Get original FileId from redux
    const uploadedFile = useSelector((state) => state.audio.uploadedFile);
    const original_fileId = uploadedFile?.upload_response?.[0]?.file_id;

    console.log("*********** uploadedFile from redux **********", uploadedFile);
    console.log("*********** original fileId from redux **********", original_fileId);

    // const [selectedModel, setSelectedModel] = useState('Model 1');
    const model = ['model1', 'model2', 'model3', 'model4'];

    // Get noiseRemovedAudio from Redux
    const noiseRemovedAudio = useSelector((state) => state.audio.noiseRemovedAudio?.denoised_file_id);

    const handleChannelChange = (event) => {
        setChannel(event.target.value);
    };

    //Get Channel type from redux
    const channelInfo = useSelector((state) => state.audio.channelType);
    console.log("channelInfo :: ", channelInfo);
    // Extract fileId and channelType
    const fileId = channelInfo?.fileId;
    const channelType = channelInfo?.channelType;
    console.log("Channel type from redux **********", fileId + " " + channelType);

    // Show tab when result comes
    useEffect(() => {
        if (noiseRemovedAudio) {
            console.log("*********** Noise removed audio received:", noiseRemovedAudio);
            // setShowNoiseTab(true);
            // setValue(1); // Switch to the Noise Removed File tab
        }
    }, [noiseRemovedAudio]);


    //Start of Noise Change
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handelNoiseChange = (event) => {
    //     setAnchorEl(event.currentTarget);

    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const handleNoiseToggle = (event) => {
        const isChecked = event.target.checked;
        setNoiseClicked(isChecked);

        if (isChecked) {
            console.log("********* Noise removal toggled ON ***********");
        } else {
            setChannel('');  // Reset channel selection when toggled off
            setNoiseApplied(false);
            console.log("********* Noise removal toggled OFF ***********");
        }
    }


    const handleApplyNoiseRemoval = () => {
        const channel1 = channelType === "mono" ? "mono" : channel; // If mono, set channel to mono
        console.log("*********************************************************", original_fileId)
        console.log("**** Apply Noise Removal clicked", channel1);

        const payload = {
            file_id: original_fileId,
            channel: channel1
            // model: selectedModel
        }
        // toast.info()
        const infoToastId = toast.info("Applying noise removal to audio...", {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored'
        });

        try {
            const result = dispatch(noiseRemovalAudioThunk(payload));
            // if (result?.status === 'success') {
            // toast.dismiss(infoToastId);
            // Only set image(Noise1) if response is successful
            setNoiseApplied(true);
            toast.success("Noise removal applied successfully!")

            console.log(payload, "Apply Now");
            // }
            // else {
            //      toast.dismiss(infoToastId);
            //     toast.error("Noise removal failed. Please try again.");
            //     setNoiseApplied(false); // Ensure image stays as Noise
            // }

        } catch (error) {
            toast.dismiss(infoToastId);
            toast.error("Noise removal failed. Please try again.");
            setNoiseApplied(false); // Ensure image stays as Noise
        }
    }
    //End of Noise Change

    //StatusPieChart
    const data = [
        { name: 'Active', value: 75 },
        { name: 'Inactive', value: 25 },
    ];

    const RADIAN = Math.PI / 180;

    useEffect(() => {
        if (file) {

            setNoiseClicked(false); // Reset noise-removal toggle

            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // console.log(audioContext,"audioContext");

            waveformRef.current = WaveSurfer.create({
                container: document.querySelector('.waveform'),
                // waveColor: 'violet',
                // progressColor: 'purple',
                waveColor: '#d9d9d9',
                progressColor: '#6c63ff',
                audioContext: audioContext,
                // files: [file],
            });
            // console.log(waveformRef.current,"waveformRef.current");

            waveformRef.current.load(URL.createObjectURL(file))
                .then(() => {
                    // After loading, get the duration
                    const dur = waveformRef.current.getDuration();
                    setDuration(dur);
                    const minutes = Math.floor(dur / 60);
                    const seconds = Math.floor(dur % 60);
                    const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                    setFormattedDuration(formatted); // set formatted Duration
                })
                .catch((error) => {
                    // console.error("WaveSurfer load error:", error);
                });

            waveformRef.current.on('ready', () => {
                const dur = waveformRef.current.getDuration();
                setDuration(dur);
                const minutes = Math.floor(dur / 60);
                const seconds = Math.floor(dur % 60);
                const formatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                setFormattedDuration(formatted);
            });

            waveformRef.current.on('play', () => {
                setIsPlaying(true);
            });

            waveformRef.current.on('pause', () => {
                setIsPlaying(false);
            });
        }
        return () => {
            if (waveformRef.current) {
                waveformRef.current.destroy();
            }
        };
    }, [file]);

    const handlePlayPause = () => {
        if (waveformRef.current) {
            if (isPlaying) {
                waveformRef.current.pause();
                setIsPlaying(false);
            } else {
                waveformRef.current.play();
                setIsPlaying(true);
            }
        }
    };


    // const handleChange = (event, newValue) => {
    //     console.log("newValue-------------", newValue);

    //     setValue(newValue);
    //     if (newValue === 0) {
    //         setNoiseApplied(false);
    //         // Original file tab
    //         // if(waveformRef.current) {
    //         //     waveformRef.current.load(URL.createObjectURL(file));
    //         // }
    //         setChannel('');
    //         setSelectedModel(null);
    //     } else if (newValue === 1) {
    //         // Noise Removed file tab
    //         // if (noiseRemovedAudio && waveformRef.current) {
    //         //     waveformRef.current.load(noiseRemovedAudio);
    //         // }
    //     }
    // };



    const handleAudioAnalysis = () => {
        let fileIdToAnalyze = null;
        if (noiseApplied == false) {
            console.log("**** Analyze original_fileId *********", original_fileId);
            // Original file tab
            fileIdToAnalyze = original_fileId
        } else if (noiseApplied === true) {
            console.log("**** Analyze noiseRemoved fileId *********", noiseRemovedAudio);
            // Noise Removed file tab
            fileIdToAnalyze = noiseRemovedAudio;
        }
        const payload = { file_id: fileIdToAnalyze }
        dispatch(analyzeAudioThunk(payload));
        // dispatch(entityExtractionThunk(data));
    }

    // const RedSwitch = styled(Switch)(({ theme }) => ({
    //     width: 52,
    //     height: 28,
    //     padding: 0,
    //     "& .MuiSwitch-switchBase": {
    //         padding: 2,
    //         "&.Mui-checked": {
    //             transform: "translateX(24px)",
    //             color: "#fff",
    //             "& + .MuiSwitch-track": {
    //                 backgroundColor: "#AF1E22", // red track when ON
    //                 opacity: 1,
    //                 border: 0,
    //             },
    //         },
    //     },
    //     "& .MuiSwitch-thumb": {
    //         boxSizing: "border-box",
    //         width: 24,
    //         height: 24,
    //         backgroundColor: "#fff", // red thumb
    //     },
    //     "& .MuiSwitch-track": {
    //         borderRadius: 28 / 2,
    //         backgroundColor: "#ccc", // gray track when OFF
    //         opacity: 1,
    //         transition: theme.transitions.create(["background-color"], {
    //             duration: 500,
    //         }),
    //     },
    // }));

    return (
        <>
            <ToastContainer />
            <hr style={{ marginTop: '5px', width: '100%', border: '0.3px solid #f1eaea' }} />
            <Grid2 container>
                {/* <Grid2 item size={{ sm: 6, lg: 6 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Original File" {...a11yProps(0)} />
                            //After successful noise removal, show the tab 
                            {showNoiseTab && (
                                <Tab label="Noise Removed File" {...a11yProps(1)} />
                            )}
                        </Tabs>
                    </Box>
                </Grid2> */}

                {/* Toggle button */}
                {/* Noise cancellation toggle */}
                <Box
                    sx={{
                        borderRadius: "12px",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        borderColor: "divider",

                    }}
                >
                    <FormControlLabel
                        // label="Noise cancellation :"
                        // labelPlacement="start"
                        control={
                            <Checkbox
                                checked={noiseClicked}
                                onChange={handleNoiseToggle}
                            />
                        }
                        label="Noise cancellation :"
                    />
                </Box>



                {/* <Grid2 item size={{ sm: 6, lg: 6 }}>

                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', }}> */}
                <Grid2 item xs={12} sm={6} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap', // wrap on smaller screens
                            justifyContent: { xs: 'center', sm: 'flex-end' },
                            alignItems: 'center',
                            gap: 1, // only affects dropdown & button
                        }}
                    >
                        {/* Dropdown only if stereo and checkbox checked */}
                        {noiseClicked && channelType === "stereo" && (
                            <FormControl sx={{ m: 1, minWidth: 170, flex: '1 1 150px' }} size="small">
                                <InputLabel id="demo-select-small-label">Select Channel</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={channel}
                                    label="Channel"
                                    onChange={handleChannelChange}
                                    sx={{
                                        borderRadius: "25px",
                                        // Add backgroung-color and borderColor when a channel is selected
                                        ...channel && {
                                            color: '#5f0707',
                                            backgroundColor: '#ffe6e6',
                                            borderColor: '#5f0707'
                                        }
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select Channel</em>
                                    </MenuItem>
                                    <MenuItem value="left">Left</MenuItem>
                                    <MenuItem value="right">Right</MenuItem>
                                </Select>
                            </FormControl>
                        )}

                        {/* Apply Now button only if noiseApplied */}
                        {noiseClicked && (
                            <Button
                                variant="contained"
                                onClick={handleApplyNoiseRemoval}
                                // disabled={channelType === "stereo" && !channel} // disable until channel is selected
                                sx={{
                                    m: 1,
                                    minWidth: 120,             // make button smaller
                                    flex: '0 1 auto',
                                    borderRadius: "25px",
                                    backgroundColor: "#AF1E22",
                                    "&:hover": { backgroundColor: "#8C161A" },
                                    marginTop: 1
                                }}
                            >
                                Apply Now
                            </Button>
                        )}

                        {/* <Button id="select-noise-filter"><img src={Noise} onClick={handelNoiseChange} /></Button> */}

                        {/* <Button id="select-noise-filter"><img src={noiseApplied ? Noise1 : Noise} onClick={handelNoiseChange} /></Button>
                        <Button><img src={Transcription_model} /></Button> */}

                        {/* Noise Removal Model selection */}

                        {/* <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
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
                            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', fontWeight: 540, justifyContent: 'space-between' }}>
                                Noise cancellation
                                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
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
                                <FormControl sx={{ minWidth: 250, mt: 2 }} size="small"> 
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={selectedModel}
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
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose} sx={{ display: 'flex', fontSize: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
                                <ListItem
                                    button
                                    id="lock-button"
                                    aria-haspopup="listbox"
                                    aria-controls="lock-menu"
                                    aria-label="Reset"
                                    sx={{ p: '0', color: '#AF1E22', textDecoration: 'underline', width: '50%', justifyContent: 'flex-start' }}
                                >
                                    <ListItemText primary="Reset" />
                                </ListItem>
                                <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                                    <Button onClick={handleApplyNoiseRemoval} sx={{ backgroundColor: '#AF1E22', color: '#fff', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px' }}>Apply Now</Button>
                                </ListItem>
                            </MenuItem>
                        </Menu> */}
                    </Box>

                </Grid2>
            </Grid2>
            <Grid2 container>
                <Grid2 item size={{ sm: 12, lg: 12 }}>
                    <Box>
                        <CustomTabPanel value={value} index={0}>
                            <div className="audio-player-popup" style={{ overflow: 'hidden', }}>
                                <button
                                    className="audio-control-button"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <div className="waveform no-cursor" style={{ alignItems: 'center', height: 100 }}></div>
                                <div className="audio-meta">
                                    <span className="audio-duration">{formattedDuration}</span>
                                    <img src={Volume} />
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            Item Two
                        </CustomTabPanel>
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2 container>
                <Grid2 item size={{ sm: 6, lg: 6 }}></Grid2>
                <Grid2 item size={{ sm: 6, lg: 6 }}>
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', pr: 3, pb: 2 }}>
                        <Buttonz onClick={handleAudioAnalysis}><img src={Rewrite} />{buttonLabels.home}</Buttonz>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
}