import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid2, Typography } from "@mui/material";
import uploadIcon from '../../assets/images/Upload_icon.png'
import './AudioUpload.css';
import { useDispatch, useSelector } from 'react-redux';
const AudioUpload = ({ singleFileMode = false, onFilesUploaded, onSuccess, showMetadata = false, onFilesChange }) => {

    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState({});
    const intervalsRef = useRef({});
    const uploadedFileRef = useRef(null);
    const audioUplaodeddata = useSelector((state) => state.audio.audioFiles);

    const dispatch = useDispatch();


    useEffect(() => {
        if (onFilesChange) {
            onFilesChange(files); // Send files to the parent component
        }
    }, [files, onFilesChange]); //Crucial dependency array.


    const handleFileUpload = async (selectedFiles) => {
        const fileArray = Array.from(selectedFiles);
        setFiles(fileArray);
        console.log(onFilesUploaded,"---------------onFilesUploaded");
        
      
        if (onFilesUploaded) {
          const uploadedResponses = await onFilesUploaded(fileArray); // Wait for response
          console.log(uploadedResponses,"55555555555555555555555");
          if (uploadedResponses && uploadedResponses.length > 0) {
            console.log(uploadedResponses,"22222222222");
            uploadedResponses.forEach((response, index) => {
              const file = fileArray[index];
              startUpload(file, response); // pass the response directly
            });
          }
        }
      };

    useEffect(() => {
        
        console.log("good to go");
        // Start upload when audioFiles are updated (after the thunk completes)
        if (audioUplaodeddata && audioUplaodeddata.length > 0) {
            console.log(audioUplaodeddata,"333333333333333333");
            audioUplaodeddata.forEach(file => {
                
                console.log(audioUplaodeddata,"useEfeectttttttttttttttttt");
              startUpload(file);
            });
        }
        console.log("end to go");
    }, [audioUplaodeddata]); // Dependency on audioUplaodeddata

    const startUpload = (file) => {
        console.log(file, "file_status");
        console.log(audioUplaodeddata, "AudioUpload");

        let progress = 0;
        const intervalId = setInterval(() => {
            progress += 1; // Simple increment.  Change to a more realistic calculation for real uploads.
            if (progress >= 100) {
                progress = 100;
                clearInterval(intervalId);
                console.log(audioUplaodeddata, "audioMetadata");
                console.log(showMetadata, "showMetadata");

                delete intervalsRef.current[file.name];
                // if (audioUplaodeddata && audioUplaodeddata.status === "uploaded") {
                //     fetchMetadata(audioUplaodeddata.audio_id);
                // }
                if (!audioUplaodeddata) {                    
                console.log(audioUplaodeddata, "audioMetadata");
                    // fetchMetadata(audioUplaodeddata.audio_id);
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
                [file.name]: progress, // Correctly store the progress
            }));
        }, 30); // Adjust interval for smoother progress. Lower number means faster updates.
        intervalsRef.current[file.name] = intervalId;
    };

    const fetchMetadata = async (file) => {
        try {
            console.log(file, "file");

            // const mockData = {
            //     name: file.name,
            //     samplerate: "48000Hz",
            //     size: file.size,
            //     channel: "Stereo",
            //     bitrate: "1.46mbps",
            //     duration: "00:01:45",
            // };
            await new Promise((res) => setTimeout(res, 500));
            // setMetadata(mockData);
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
        //Start Uploads after File is selected
        files.forEach(file => startUpload(file));
    }, [files]);



    // console.log(uploadProgress, "uploadProgress===========1");

    // console.log(uploadedFileRef, "uploadedFileRef===========1");

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
                            {/* <input type="file" accept=".wav,.mp4" multiple={!singleFileMode} onChange={(e) =>
                                handleFileUpload(e.target.files)}
                            /> */}
                            <input type="file" accept=".wav,.mp4" multiple={!singleFileMode} onChange={(e) =>
                                handleFileUpload(e.target.files)}
                            />
                            {/* <input type="file" accept=".wav,.mp4" multiple={!singleFileMode} onChange={handleFileUpload} /> */}
                        </Box>
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
                    {/* <Box>
                        {showMetadata && metadata && (
                            <div className="metadata">
                                <h3>File Metadata</h3>
                                <pre>{JSON.stringify(metadata, null, 2)}</pre>
                            </div>
                        )}
                    </Box> */}
                </Grid2>
                {/* <Box sx={{ width: '100%' }}>
                    {showTabs && isUploadComplete && (
                        <RenderAudioTabs file={uploadedFileRef.current} />
                    )}
                </Box> */}
            </Grid2>
        </>
    );
};
export default AudioUpload;