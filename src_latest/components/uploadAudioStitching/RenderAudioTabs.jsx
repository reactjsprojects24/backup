import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WaveSurfer from 'wavesurfer.js';
import Volume from '../../assets/images/Volume.png'
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';

import { Button, Divider, FormControl, Grid2, InputLabel, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Select } from '@mui/material';
import Noise from '../../assets/images/noise.png'
import Rewrite from '../../assets/images/rewrite.png'
import { Buttonz } from '../ui/elements';
import { buttonLabels } from '../ui/elements/labels';
import { Close } from '@mui/icons-material';

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

export default function RenderAudioTabs({ file }) { // Receive the file prop
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('0:00');
    const [formattedDuration, setFormattedDuration] = useState('0:00');
    const [value, setValue] = React.useState(0);
    const waveformRef = useRef(null);

    const [age, setAge] = React.useState('');

    const handleChannelChange = (event) => {
        setAge(event.target.value);
    };

    //Noise Change
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handelNoiseChange = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //StatusPieChart
    const data = [
        { name: 'Active', value: 75 },
        { name: 'Inactive', value: 25 },
    ];

    const RADIAN = Math.PI / 180;

    useEffect(() => {
        if (file) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            waveformRef.current = WaveSurfer.create({
                container: document.querySelector('.waveform'),
                waveColor: 'violet',
                progressColor: 'purple',
                audioContext: audioContext,
                // files: [file],
            });
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
                    console.error("WaveSurfer load error:", error);
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
        setValue(newValue);
    };

    return (
        <>
            <hr style={{ marginTop: '5px', width: '100%', border: '0.3px solid #f1eaea' }} />
            <Grid2 container>
                <Grid2 item size={{ sm: 6, lg: 6 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Original File" {...a11yProps(0)} />
                            <Tab label="Noise Removed File" {...a11yProps(1)} />
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
                                value={age}
                                label="Age"
                                onChange={handleChannelChange}
                                sx={{ borderRadius: "25px", backgroundColor: '#ffe6e6', borderColor: '#5f0707' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Channel1</MenuItem>
                                <MenuItem value={20}>Channel2</MenuItem>
                                {/* <MenuItem value={30}>Channel3</MenuItem> */}
                                <MenuItem value={30}>Channel11111111</MenuItem>
                            </Select>
                        </FormControl>
                        <Button id="select-noise-filter"><img src={Noise} onClick={handelNoiseChange} /></Button>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
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
                            <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                Noise cancellation
                                <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                                    <Close />
                                </ListItemIcon>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose} >
                                Select Modelddd
                                <ListItem
                                    button
                                    id="lock-button"
                                    aria-haspopup="listbox"
                                    aria-controls="lock-menu"
                                    aria-label="Clear"
                                    sx={{ p: '0', color: '#AF1E22', width: 'auto', justifyContent: 'flex-end' }}
                                >
                                    <ListItemText
                                        primary="Clear"
                                    />
                                </ListItem>
                                <FormControl sx={{ m: 1, minWidth: 170 }} size="small">
                                    <InputLabel id="demo-select-small-label">Model</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        value={age}
                                        label="Age"
                                        onChange={handleChannelChange}
                                        sx={{ borderRadius: "25px", backgroundColor: '#ffe6e6', borderColor: '#5f0707' }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Model1</MenuItem>
                                        <MenuItem value={20}>Model2</MenuItem>
                                        <MenuItem value={30}>Model3</MenuItem>
                                    </Select>
                                </FormControl>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>

                                Add another account
                            </MenuItem>
                            <MenuItem onClick={handleClose}>

                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleClose}>

                                Logout
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
                                {/* 👇 Close button */}
                                {/* <button
                                    className="audio-close-button"
                                    onClick={() => {
                                        setIsPlaying(false);
                                        setDuration('0:00');
                                    }}
                                >
                                    ✕
                                </button> */}
                                {/* Controls */}
                                <button
                                    className="audio-control-button"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <FaPause /> : <FaPlay />}
                                </button>
                                <div
                                    className="waveform no-cursor" style={{ alignItems: 'center', height: 100 }}
                                ></div>
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
                        <Buttonz><img src={Rewrite} />{buttonLabels.home}</Buttonz>
                    </Box>
                </Grid2>
            </Grid2>
        </>
    );
}