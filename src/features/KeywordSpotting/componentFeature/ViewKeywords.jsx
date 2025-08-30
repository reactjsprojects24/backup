import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {
    Box,

    Paper,

} from '@mui/material';

const text = `Bharat Electronics Limited was founded in Bangalore, Karnataka, India in 1954.[3]
Starting with the manufacture of a few communication equipment in 1956, BEL started manufacturing receiving valves in 1961, germanium semiconductors in 1962, and radio transmitters for AIR in 1964 with help from the Soviet Union.[4]
In 1966, BEL set up a radar manufacturing facility for the army and in-house R&D. In 1967, BEL began manufacturing transmitting tubes, silicon devices and integrated circuits. The PCB manufacturing facility was established in 1968.
In 1970, BEL started manufacturing black & white TV picture tubes, X-ray tubes and microwave tubes. In 1971, BEL set up facilities for the manufacture of integrated circuits and hybrid micro circuits. 1972, BEL established manufacturing facilities for TV transmitters for Doordarshan. In 1973, BEL began manufacturing frigate radars for the navy.
Under the government's policy of decentralisation and due to strategic reasons, BEL set up up new units at different location across the country. The second unit of BEL was set up at Ghaziabad in 1974 to manufacture radars and Tropo communication equipment for the Indian Air Force. The third unit was established at Pune in 1979 to manufacture image converter and image intensifier tubes.
In 1980, the first overseas office of BEL was set up in New York for the procurement of components and materials.
In 1981, a manufacturing facility for magnesium manganese dioxide batteries was set up at Pune. The Space Electronic Division was set up at Bangalore to support the satellite programmes in 1982. That year, BEL achieved a turnover of ₹1 billion (US$21 million).`;





function ViewKeywords({ open: dialogOpen, onOpen, onClose, onAddKeywordSet }) {
    const [textArray, setTextArray] = useState([]);
    useEffect(() => {
        setTextArray(text.split(" "));
    }, []);




    const handleClose = () => {
        onClose();  // Call the onClose function passed as a prop
    };



    return (
        <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
            <Box sx={{

                width: "auto",
                height: "auto",
                overflow: "hidden",
                bgcolor: 'white',
                borderRadius: 4,

            }}>

                <Box sx={{
                    bgcolor: '#ffe6e6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    

                }}>
                    <Typography variant='h5'>View Highlighted Keywords</Typography>
                </Box>
                <a href="#" style={{ color: '#AF1E22', textDecoration: 'none', margin: '30px' }}>Your File Name Here.wav</a>

                <Box sx={{ padding: 2 }}>
                
                    <Paper elevation={3} sx={{ overflow: 'auto' }}>


                        <div style={{
                            fontFamily: 'sans-serif',
                            padding: '20px'
                        }}>

                            
                            <div style={{

                                lineHeight: '1.4'
                            }}>
                                {textArray.map((word, index) => (
                                    <span
                                        key={index}

                                    >
                                        {word} {" "}
                                    </span>
                                ))}
                            </div>


                        </div>

                       

                    </Paper>
                </Box>

            </Box>

            <DialogActions>
                            <button
                                style={{
                                    backgroundColor: '#d32f2f', // Red color from the image
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M10 6L12 12L14 6" />
                                </svg>
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#d32f2f', // Red color from the image
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                >
                                    <path d="M10 6L12 12L14 6" />
                                </svg>
                            </button>
                        </DialogActions>
        </Dialog>
    );
}

export default ViewKeywords;