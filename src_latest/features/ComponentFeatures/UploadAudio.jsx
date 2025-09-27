import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemText, Divider, Table,} from '@mui/material';
  import {  Grid } from "@mui/system";
  import CloudUploadIcon from '@mui/icons-material/CloudUpload';
  import DeleteIcon from '@mui/icons-material/Delete';

const UploadAudio = () => {

    const [uploadingFiles, setUploadingFiles] = useState([]);

    const handleFileUpload = (files, alertMessage) => {
        const audioFiles = Array.from(files).filter(
            (file) => file.type === 'audio/mpeg' || file.type === 'audio/wav'
        );

        if (audioFiles.length > 0) {
            audioFiles.forEach((file) => {
                setUploadingFiles((prevUploadingFiles) => [...prevUploadingFiles, { file, progress: 0 }]);
            });
        } else {
            alert(alertMessage);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleFileUpload(event.dataTransfer.files, 'Please upload only WAV or MP3 audio files.');
        console.log("uploading files via drag and drop.............", uploadingFiles);
    };

    useEffect(() => {
        console.log("data in uploadingfiles after every event ===>", uploadingFiles);
    });

    const handleBrowse = (event) => {
        event.preventDefault();
        handleFileUpload(event.target.files, 'Please upload only WAV or MP3 audio files.');
        console.log("uploading files via Browse.............", uploadingFiles);
    };
    const handleDeleteFile = (index) => {
        setUploadingFiles(prevUploadingFiles =>
            prevUploadingFiles.filter((file_object, i) => i !== index)
        );
    };

    return (
        <>
            <Grid container sx={{ mb: 1, p: 1 }}>

                <Grid item size={{ xs: 6, sm: 6, md: 6, lg: 6 }} >
                    <Typography sx={{ ml: 2 }}>Upload Audio File#############:</Typography>
                    <Box
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: '8px',
                            bgcolor: '#ffe6e6',
                            p: 2,
                            ml: 2,
                            height: "15vh",
                            textAlign: 'center',
                            // margin: '20px 0',
                            cursor: 'pointer',
                            // '&:hover': {
                            //   backgroundColor: '#f9f9f9',
                            // },
                        }}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >

                        <IconButton>
                            <CloudUploadIcon color="primary" />
                        </IconButton>
                        <Typography variant="body2">
                            Drag & drop or <label htmlFor="file-input">Browse</label>
                        </Typography>
                        <Typography variant="caption">Supported formats: WAV and MP4</Typography>
                        <input
                            id="file-input"
                            type="file"
                            onChange={handleBrowse}
                            style={{ display: 'none' }}
                        />
                    </Box>
                </Grid>
                <Grid item size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                    <Typography sx={{ ml: 2 }}>Uploading Files:</Typography>
                    <Box
                        sx={{
                            pl: 1,
                            pr: 1,
                            mt: 1,
                            ml: 2,
                            br: 4,
                            overflow: 'hidden',
                            height: "15vh",
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <List
                            sx={{
                                height: '15vh', 
                                overflowY: 'auto', 
                                '&::-webkit-scrollbar': { 
                                    width: '0px',
                                    backgroundColor: 'transparent'
                                }, 
                                padding: 0, 
                            }}
                        >
                            {uploadingFiles.map((uploadFile, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        paddingX: 1,
                                        paddingY: 0,
                                        border: '1px solid #ccc', // Add border
                                        marginBottom: 0.5, // Add some space between items
                                    }}
                                >
                                    <Typography variant="body2">{uploadFile.file.name}</Typography>
                                    <Box sx={{ flex: 1 }} />
                                    <IconButton onClick={() => handleDeleteFile(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default UploadAudio;