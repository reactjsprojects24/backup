import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import {
    Box,

    Paper,

} from '@mui/material';

function StitchAudio({ open: dialogOpen, onOpen, onClose, onAddKeywordSet }) {
    // Remove the internal useState for open. It's now controlled by props



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
                    <Typography variant='h5'>Give File Name</Typography>
                </Box>

                <Box sx={{ padding: 2 }}>
                    {/* Table Container */}
                    <Paper elevation={3} sx={{ overflowX: 'auto' }}>

                        <TextField
                            label="Enter File Name"
                            // value={keywordSetName}
                            // onChange={(e) => setKeywordSetName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />


                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <button style={{
                                backgroundColor: "#FF5B00",
                                color: "white",
                                padding: "10px 10px",
                                border: "none",
                                borderRadius: "17px",
                                cursor: "pointer",
                                fontSize: '16px'
                            }}>
                                Save
                            </button>
                        </DialogActions>

                    </Paper>
                </Box>

            </Box>
        </Dialog>
    );
}

export default StitchAudio;