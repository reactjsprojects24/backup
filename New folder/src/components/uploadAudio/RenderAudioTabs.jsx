import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WaveSurfer from 'wavesurfer.js';
import Volume from '../../assets/images/Volume.png'
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, FormControl, Grid2, InputLabel, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Select } from '@mui/material';

import Noise from '../../assets/images/noise.png'
import Rewrite from '../../assets/images/rewrite.png'
import { Buttonz, Buttons } from '../ui/elements';
import { buttonLabels } from '../ui/elements/labels';
import { Close } from '@mui/icons-material';

import {sentimentAnalysisThunk,entityExtractionThunk} from '../../redux/thunks/NLPExtractionThunk'
import { noiseRemovalAudioThunk } from '../../redux/thunks/audioThunks';
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
    const dispatch = useDispatch();

    console.log(metadata, "showMetadatashowMetadata0000000000000000000000000");
    console.log(file,"audio fileeeeeeeeeeeeeeeeeee");

    const handleChannelChange = (event) => {
        setChannel(event.target.value);
    };


    // const [selectedModel, setSelectedModel] = useState('Model 1');
    const model = ['Model 1', 'Model 2', 'Model 3', 'Model 4'];

    // Get noiseRemovedAudio from Redux
    const noiseRemovedAudio = useSelector((state) => state.audio.noiseRemovedAudio);

  // Show tab when result comes
  useEffect(() => {
    if (noiseRemovedAudio) {
        console.log("*********** Noise removed audio received:", noiseRemovedAudio);
      setShowNoiseTab(true);
    }
  }, [noiseRemovedAudio]);


    //Start of Noise Change
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handelNoiseChange = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleApplyNoiseRemoval  = () => {
        const formdata = {
            audio_id: metadata.audio_id,
            model: selectedModel
        }
        // toast.info()
        toast.info("Applying noise removal to audio..." , {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored'
        });
        console.log("Apply Now777777777777",formdata);
        dispatch(noiseRemovalAudioThunk(formdata));
        console.log(formdata, "Apply Now");
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


    const handleChange = (event, newValue) => {
        console.log(newValue,"newValue-------------");
        
        setValue(newValue);
    };

    const handelExtract=()=>{
        const data = "Simulated transcription for audio a225d4c1-55bb-43cf-a1e5-188500d9ffbf in en."
        // toast.info("Analyzing Sentiment Analysis and Entity Extraction " , {
        //     position: 'top-right',
        //     autoClose: 3000,
        //     theme: 'colored'
        // });
        dispatch(sentimentAnalysisThunk(data));
        dispatch(entityExtractionThunk(data));
    }

    return (
        <>
        <ToastContainer />
            <hr style={{ marginTop: '5px', width: '100%', border: '0.3px solid #f1eaea' }} />
            <Grid2 container>
                <Grid2 item size={{ sm: 6, lg: 6 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Original File" {...a11yProps(0)} />
                            {/* After successful noise removal, show the tab */}
                            {showNoiseTab && (
                                <Tab label="Noise Removed File" {...a11yProps(1)} />
                            )}
                        </Tabs>
                    </Box>
                </Grid2>
                <Grid2 item size={{ sm: 6, lg: 6 }}>
                    <Box sx={{ justifyContent: 'flex-end', display: 'flex', }}>
                        <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                            <InputLabel id="demo-select-small-label">Select Channel</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={channel}
                                label="Channel"
                                onChange={handleChannelChange}
                                sx={{ borderRadius: "25px", backgroundColor: '#ffe6e6', borderColor: '#5f0707' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Channel1</MenuItem>
                                <MenuItem value={20}>Channel2</MenuItem>
                                <MenuItem value={30}>Channel3</MenuItem>
                            </Select>
                        </FormControl>
                        <Button id="select-noise-filter"><img src={Noise} onClick={handelNoiseChange} /></Button>
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
                                <FormControl sx={{ minWidth: 250, mt: 2 }} size="small"> {/*Added mt:2 for margin-top*/}
                                    {/* <InputLabel id="demo-select-small-label">Model</InputLabel> */}
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
                                    <Button onClick={handleApplyNoiseRemoval } sx={{ backgroundColor: '#AF1E22', color: '#fff', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px' }}>Apply Now</Button>
                                    {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                                </ListItem>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Grid2>
            </Grid2>
            <Grid2 container>
                <Grid2 item size={{ sm: 12, lg: 12 }}>
                    <Box>
                        <CustomTabPanel value={value} index={0}>
                            <div className="audio-player-popup" style={{ overflow: 'hidden', }}>
                                {/*  Close button */}
                                {/* Controls */}
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
                                    {/* <FaVolumeUp className="volume-icon" /> */}
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
                        <Buttonz onClick={handelExtract}><img src={Rewrite} />{buttonLabels.home}</Buttonz>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
}