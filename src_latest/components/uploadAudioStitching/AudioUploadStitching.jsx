import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid2, Typography } from "@mui/material";
import uploadIcon from '../../assets/images/Upload_icon.png'
import './AudioUpload.css';
import RenderAudioTabs from './RenderAudioTabs';

const AudioUpload = ({ onFilesChange, singleFileMode = false, showMetadata = false, showTabs = false, onError, onSuccess }) => {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const [metadata, setMetadata] = useState(null);
    const [activeTab, setActiveTab] = useState('original');
    const intervalsRef = useRef({});
    const [isUploadComplete, setIsUploadComplete] = useState(false);
    const uploadedFileRef = useRef(null);

    useEffect(() => {
        if (onFilesChange) {
            onFilesChange(files); // Send files to the parent component
        }
    }, [files, onFilesChange]); //Crucial dependency array.

    const handleFileUpload = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles);
        if (singleFileMode && fileArray.length > 1) {
            if (onError) {
                onError("Upload only single audio file.");
            }
            return;
        }
        const filesToUpload = singleFileMode ? [fileArray[0]] : fileArray;
        setFiles(filesToUpload); // Update the files state.
    };

    const startUpload = (file) => {
        let progress = 0;
        const intervalId = setInterval(() => {
            progress += 1; // Simple increment.  Change to a more realistic calculation for real uploads.
            if (progress >= 100) {
                progress = 100;
                clearInterval(intervalId);
                delete intervalsRef.current[file.name];
                if (showMetadata) {
                    fetchMetadata(file);
                }
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess("Audio file uploaded successfully!");
                    }
                    setIsUploadComplete(true);
                    uploadedFileRef.current = file;
                }, 500);
            }
            setUploadProgress((prev) => ({
                ...prev,
                [file.name]: progress, 
            }));
        }, 30); 
        intervalsRef.current[file.name] = intervalId;
    };

    const fetchMetadata = async (file) => {
        try {
            const mockData = {
                name: file.name,
                samplerate: "48000Hz",
                size: file.size,
                channel: "Stereo",
                bitrate: "1.46mbps",
                duration: "00:01:45",
            };
            await new Promise((res) => setTimeout(res, 500));
            setMetadata(mockData);
        } catch (err) {
            console.error('Metadata fetch failed:', err);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFileUpload(e.dataTransfer.files);
    };

    useEffect(() => {
        return () => {
            Object.values(intervalsRef.current).forEach(clearInterval);
        };
    }, []);

    useEffect(() => {
        files.forEach(file => startUpload(file));
    }, [files]);

    return (
        <>
            <Grid2 container>
                <Grid2 size={{ sm: 12, md: 12, lg: 12 }}>
                    <Box sx={{ margin: '1.33em' }}>
                        <Typography variant="h8" sx={{ fontWeight: 'normal', color: '#848484' }}>Upload Audio File:</Typography>
                    </Box>
                    <Box sx={{ pl: '1.33em', pr: '1.33em' }}>
                        <Box className="drop-zone" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                            <img src={uploadIcon} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '16px', lineHeight: '20px' }}>Drag
                                & drop files or <span className="browse">Browse</span></Typography>
                            <span className="formates">Supported formates : WAV and MP4,</span>
                            <input type="file" accept=".wav,.mp4" multiple={!singleFileMode} onChange={(e) =>
                                handleFileUpload(e.target.files)}
                            />
                        </Box>
                    </Box>

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

                    <Box sx={{ pl: '1.33em', pr: '1.33em' }}>
                        {showMetadata && metadata && (
                            <div className="metadata">
                                <Box sx={{ marginTop: '1.33em' }}>
                                    <Typography variant="h8" sx={{ fontWeight: 'normal', color: '#848484' }}>Audio details:</Typography>
                                </Box>

                                <div style={{ display: 'flex', fontSize: 12, width: '60%' }}>
                                    <div style={{ flexBasis: '40%', marginRight: '50px' }}> {/* First Column */}
                                        <dl style={{ listStyleType: 'none', padding: 0 }}>
                                            <dt>Bitrate:{metadata.bitrate}</dt>
                                            <dt>Channels:{metadata.channel}</dt>
                                            <dt>Samplerate:{metadata.samplerate}</dt>
                                        </dl>
                                    </div>
                                    <div style={{ flexBasis: '60%' }}> {/* Second Column */}
                                        <dl style={{ listStyleType: 'none', padding: 0 }}>
                                            <dt>Duration:{metadata.duration}</dt>
                                            <dt>File size:{metadata.size}</dt>
                                            <dt>CodeC:{metadata.name}</dt>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Box>
                </Grid2>
                <Box sx={{ width: '100%' }}>
                    {showTabs && isUploadComplete && (
                        <RenderAudioTabs file={uploadedFileRef.current} />
                    )}
                </Box>
            </Grid2>
        </>
    );
};
export default AudioUpload;