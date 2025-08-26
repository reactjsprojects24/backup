import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid2, Typography } from "@mui/material";
import uploadIcon from '../../assets/images/Upload_icon.png'
import './AudioUpload.css';
import RenderAudioTabs from './RenderAudioTabs';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAudioThunk, deleteAudioFileThunk, uploadAudioFolderThunk } from '../../redux/thunks/audioThunks';



const AudioUpload = ({ singleFileMode = false, onFilesUploaded, showMetadata: propShowMetadata, showTabs: propShowTabs }) => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({}); // Track individual file progress
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const uploadedFileRef = useRef(null);
    const dispatch = useDispatch();
    const audiofilesresponse = useSelector((state) => state.audio.audioFiles);
    const metadataResponse = useSelector((state) => state.audio.metadata);

     console.log(metadataResponse,"metadataResponse........................");

    const handleFileUpload = (selectedFiles) => {
        // console.log("transformed here ", selectedFiles);
        uploadedFileRef.current = selectedFiles[0];
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
        if (onFilesUploaded) {
            onFilesUploaded(fileArray);
            // console.log("got into mul files", fileArray);
        }        
        // dispatch(uploadAudioThunk(fileArray));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        // console.log("got files");
        handleFileUpload(e.dataTransfer.files);
    };

    // Simulate upload progress
    useEffect(() => {
        if (files.length > 0) {
            const interval = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    const newProgress = { ...prevProgress };
                    let allComplete = true;
                    for (const file of files) {
                        if (!newProgress[file.name]) {
                            newProgress[file.name] = 0;
                        }
                        newProgress[file.name] += 10;
                        if (newProgress[file.name] > 100) {
                            newProgress[file.name] = 100;
                            allComplete = allComplete && (newProgress[file.name] === 100);
                        } else {
                            allComplete = false;
                        }
                    }
                    if (allComplete) {
                        clearInterval(interval);
                        setIsUploadComplete(true);
                        // showMetadata = true;
                    }
                    return newProgress;
                });
            }, 500); // Update progress every 500ms
            return () => clearInterval(interval); // Clean up the interval
        }
    }, [files]);

    const showMetadata = propShowMetadata;
    const showTabs = propShowTabs;
    return (
        <>
            <Grid2 container>
                <Grid2 size={{ sm: 6, md: 6, lg: 6 }}>
                    <Box sx={{ margin: '1.33em' }}>
                        <Typography variant="h8" sx={{ fontWeight: 'normal', color: '#848484' }}>Upload Audio File:</Typography>
                    </Box>
                    <Box sx={{ pl: '1.33em', pr: '1.33em' }}>
                        <Box className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
                        >
                            <img src={uploadIcon} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '24px' }}>Drag
                                & drop files or <span className="browse">Browse</span></Typography>
                            <span className="formates">Supported formates : WAV and MP4,</span>
                            <input type="file" accept=".wav,.mp4" multiple={!singleFileMode} onChange={(e) =>
                                handleFileUpload(e.target.files)}
                            /> </Box>
                    </Box>
                </Grid2>
                <Grid2 size={{ sm: 6, md: 6, lg: 6 }}>
                    <Box sx={{ margin: '1.33em' }}>
                        <Typography variant="h8" sx={{ fontWeight: 'normal', color: '#848484' }}>Uploading File:</Typography>
                    </Box>
                    <Box sx={{ pl: '1.33em', pr: '1.33em' }}>
                        <div className="file-list">
                            {files.map((file, index) => (
                                <div key={index} className="file-progress-row">
                                    <div className="file-info">
                                        <span className="file-name">{file.name}</span>
                                        <span className="file-percent">{uploadProgress[file.name] || 0}%</span>
                                    </div>
                                    <div className="file-progress-bar">
                                        <div className="file-progress" style={{ width: `${uploadProgress[file.name] || 0}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Box>
                    <Box sx={{ margin: '1.33em' }}>
                        {showMetadata && metadataResponse && (
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'normal', color: '#848484', mb: 1 }}>Audio details:</Typography>
                                <Grid2 container spacing={6}>
                                    <Grid2 item xs={6}>
                                        <Typography variant="body2">Bitrate:{metadataResponse.bitrate}</Typography>
                                        <Typography variant="body2">Channels:{metadataResponse.channels}</Typography>
                                        <Typography variant="body2">Samplerate:{metadataResponse.samplerate}</Typography>
                                    </Grid2>
                                    <Grid2 item xs={6}>
                                        <Typography variant="body2">Duration:{metadataResponse.duration}</Typography>
                                        <Typography variant="body2">File size:{metadataResponse.size}</Typography>
                                        <Typography variant="body2">Codec:{metadataResponse.codec}</Typography>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        )}
                    </Box>
                </Grid2>
                <Box sx={{ width: '100%' }}>
                    {showTabs && isUploadComplete && (
                        <RenderAudioTabs file={uploadedFileRef.current} metadata={metadataResponse}/>
                    )}
                </Box>
            </Grid2>
        </>
    );
};
export default AudioUpload;