import React, { useState, useRef } from "react";
import { Grid } from "@mui/system";
import { Box, Typography, Grid2 } from "@mui/material";
import AudioUploadStitching from "../components/uploadAudioStitching/AudioUploadStitching";
// import AudioUploadStitching from "../../components/uploadAudioStitching/AudioUploadStitching";
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { Delete } from "@mui/icons-material";
import {  Buttons } from './../components/ui/elements/index';
import { buttonLabels } from './../components/ui/elements/labels';
import StitchAudio from "../features/AudioStitch/StitchAudio";

const AudioStitching = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleClickOpen = () => {
      setIsOpen(true);
    };

    const VerticalDivider = styled(Divider)(({ theme }) => ({
        orientation: 'vertical',
        backgroundColor: '#ffe6e6',
        border: '1px solid #ffe6e6',
        margin: '0 10px'
    }));


    const [audioFiles, setAudioFiles] = useState([]);

    const handleFilesChange = (files) => {
        setAudioFiles(files);
    };

    const handleDeleteFile = (index) => {
        const newAudioFiles = [...audioFiles];
        newAudioFiles.splice(index, 1);
        setAudioFiles(newAudioFiles);
    };




    const [files, setFiles] = useState([]);
    const [mergedUrl, setMergedUrl] = useState(null);
    const audioContextRef = useRef(null);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
        setMergedUrl(null);
    };

    const writeString = (view, offset, str) => {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };

    const floatTo16BitPCM = (output, offset, input) => {
        for (let i = 0; i < input.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, input[i]));
            s = s < 0 ? s * 0x8000 : s * 0x7FFF;
            output.setInt16(offset, s, true);
        }
    };

    const interleave = (left, right) => {
        const length = left.length + right.length;
        const result = new Float32Array(length);

        let index = 0;
        for (let i = 0; i < left.length; i++) {
            result[index++] = left[i];
            result[index++] = right[i];
        }
        return result;
    };

    const audioBufferToWav = (buffer) => {
        const numChannels = 2;
        const sampleRate = buffer.sampleRate;
        const bitDepth = 16;

        const left = buffer.getChannelData(0);
        const right = buffer.getChannelData(1);
        const interleaved = interleave(left, right);
        const bufferLength = interleaved.length * (bitDepth / 8);
        const wavBuffer = new ArrayBuffer(44 + bufferLength);
        const view = new DataView(wavBuffer);

        writeString(view, 0, "RIFF");
        view.setUint32(4, 36 + bufferLength, true);
        writeString(view, 8, "WAVE");

        writeString(view, 12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true); // PCM
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * bitDepth / 8, true);
        view.setUint16(32, numChannels * bitDepth / 8, true);
        view.setUint16(34, bitDepth, true);

        writeString(view, 36, "data");
        view.setUint32(40, bufferLength, true);

        floatTo16BitPCM(view, 44, interleaved);

        return new Blob([view], { type: "audio/wav" });
    };

    const mergeAudioFiles = async () => {
        if (audioFiles.length === 0) {
            alert("Please select audio files first");
            return;
        }

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const audioCtx = audioContextRef.current;

        try {
            // Decode and convert to stereo
            const buffers = await Promise.all(
                audioFiles.map(async (file) => {
                    const arrayBuffer = await file.arrayBuffer();
                    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

                    if (audioBuffer.numberOfChannels === 1) {
                        // Mono to Stereo
                        const monoData = audioBuffer.getChannelData(0);
                        const stereoBuffer = audioCtx.createBuffer(
                            2,
                            audioBuffer.length,
                            audioBuffer.sampleRate
                        );
                        stereoBuffer.getChannelData(0).set(monoData);
                        stereoBuffer.getChannelData(1).set(monoData);
                        return stereoBuffer;
                    } else if (audioBuffer.numberOfChannels >= 2) {
                        // Use only the first two channels
                        const stereoBuffer = audioCtx.createBuffer(
                            2,
                            audioBuffer.length,
                            audioBuffer.sampleRate
                        );
                        stereoBuffer.getChannelData(0).set(audioBuffer.getChannelData(0));
                        stereoBuffer.getChannelData(1).set(audioBuffer.getChannelData(1));
                        return stereoBuffer;
                    }
                })
            );

            const sampleRate = buffers[0].sampleRate;

            // Ensure all sample rates match
            if (!buffers.every((b) => b.sampleRate === sampleRate)) {
                alert("Sample rates don't match across files");
                return;
            }

            const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
            const outputBuffer = audioCtx.createBuffer(2, totalLength, sampleRate);

            let offset = 0;
            buffers.forEach((buffer) => {
                outputBuffer.getChannelData(0).set(buffer.getChannelData(0), offset);
                outputBuffer.getChannelData(1).set(buffer.getChannelData(1), offset);
                offset += buffer.length;
            });

            const wavBlob = audioBufferToWav(outputBuffer);
            const url = URL.createObjectURL(wavBlob);
            setMergedUrl(url);
        } catch (err) {
            alert("Merging error: " + err.message);
        }
    };

    
    return (
        <>

            <Grid container sx={{
                mt: 3, ml: 3, mr: 3,
                height: '80%',
                bgcolor: 'white',
                overflow: 'hidden', borderRadius: 8,
            }}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                    <Box sx={{
                        bgcolor: '#ffe6e6',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 2,
                    }}>
                        <Typography variant="h5" >Stitching multiple audio files and converting it to single file</Typography>
                    </Box>
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
                    <Grid container spacing={1}>
                        <Grid item size={{ xs: 12, sm: 12, md: 3, lg: 3 }} >
                            <AudioUploadStitching
                                onFilesChange={handleFilesChange}
                            />
                        </Grid>
                        <VerticalDivider />
                        <Grid item size={{ xs: 12, sm: 12, md: 8, lg: 8 }} >
                            <Typography variant="h5" >Stitching Files List :</Typography>
                            <Grid item size={{ xs: 12, sm: 12, md: 8, lg: 8 }} >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '300px',
                                    margin: "5px"
                                }}>
                                    {audioFiles.map((file, index) => (
                                        <div key={index} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '8px 16px',
                                            border: '1px solid #eee',
                                            marginBottom: '4px',
                                            borderRadius: '4px'
                                        }}>



                                            <span style={{
                                                fontSize: '14px',
                                                color: '#333',
                                                flexGrow: 1,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{file.name}</span>
                                            <span
                                                style={{
                                                    fontSize: '20px',
                                                    color: '#ff4d4d',
                                                    cursor: 'pointer',
                                                    transition: 'color 0.2s ease'
                                                }}
                                                onMouseOver={(e) => { e.target.style.color = '#cc0000' }}
                                                onMouseOut={(e) => { e.target.style.color = '#ff4d4d' }}
                                                onClick={() => handleDeleteFile(index)}
                                            >
                                                <Delete />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Grid>

                            <Grid item size={{ xs: 12, sm: 12, md: 8, lg: 8 }} >
                                <Box sx={{ display: 'flex', alignItems: 'center' ,}}>  {/*flex container*/}
                                    {/* <a href="#">ReSet</a> */}
                                    <Buttons onClick={() => { mergeAudioFiles(); handleClickOpen() }} >{buttonLabels.stitch}</Buttons>
                                    {isOpen && <StitchAudio open={isOpen} onClose={() => setIsOpen(false)} />}

                                </Box>
                            </Grid>

                            {mergedUrl && (
                                <>
                                    <h3>Merged Audio</h3>
                                    <audio controls src={mergedUrl}></audio>
                                    <br />
                                    {/* <a href={mergedUrl} download="merged.wav">
                                        Download Merged WAV
                                    </a> */}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default AudioStitching;