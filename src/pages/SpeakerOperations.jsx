import { Box, Button, TextField, Typography, TableBody, TableCell, Paper, Table, TableRow, TableHead, TableContainer, CircularProgress, Divider, Container, Dialog, Slider, DialogActions, IconButton } from '@mui/material';
import { Grid } from '@mui/system';
import axios from 'axios';
import { getListSpeakersThunk, enrollSpeakerThunk, getIdentifiedSpeakerThunk, deleteSpeakerByIdThunk } from '../redux/thunks/speakerThunk';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';

import React, { useState, useEffect } from 'react';
// import UploadAudio from '../../features/ComponentFeatures/UploadAudio';
import AudioUpload from '../components/uploadAudio/AudioUpload';
import { Close, Delete, Edit } from '@mui/icons-material';
// import { GridDeleteIcon } from '@mui/x-data-grid';

const SpeakerOperations = () => {

  const [speakerName, setSpeakerName] = useState('');
  const [files, setFiles] = useState([]);
  const [model, setModel] = useState('basemodel'); 
  const [audioFile, setAudioFile] = useState([]); 
  const [identifyLoading, setIdentifyLoading] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const dispatch = useDispatch();
  const listofidentifiedSpeakers = useSelector((state) => state.speaker.identifiedSpeaker);
  const listOfSpeakers = useSelector((state) => state.speaker.speakers);
  console.log("list of Enrolled speakers from store when ui rendered ", listOfSpeakers);
  console.log("list of identified speakers from store when ui rendered ", listofidentifiedSpeakers);


  useEffect(() => {
    dispatch(getListSpeakersThunk());

  }, []);

  const handleFilesUploaded = (files) => {
    setAudioFile(files);
  };

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  const handleDelete = (speakerId) => {
    console.log("Delete bitton clicked", speakerId);
    dispatch(deleteSpeakerByIdThunk(speakerId));
  }


  const handleEnrollSpeaker = () => {
    setEnrolling(true);
    console.log("got into handle enroll speaker with ", audioFile, "speaker name ", speakerName, " modelllll", model);
    console.log(" audioFile before dispatch:", audioFile);
    dispatch(enrollSpeakerThunk({ audioFile, speakerName, model })) 
      .then(() => {
        setEnrolling(false);
        setSpeakerName('');
        setAudioFile([]);
      })
      .catch(error => {
        console.error("Error enrolling speaker:", error);
        setEnrolling(false);
      });
  };

  const handleIdentifySpeakers = () => {
    setIdentifyLoading(true);
    console.log(" came into identify speakers ");
    console.log(" came into identify speakers with data ", audioFile, model);
    dispatch(getIdentifiedSpeakerThunk({ audioFile, model }))
      .then(() => {
        setIdentifyLoading(false);
        // Optionally, reset the files after successful identification.
        // setAudioFile([]);
      })
      .catch(error => {
        console.error("Error identifying speakers:", error);
        setIdentifyLoading(false);
      });



  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = ({audioFile}) => {
    console.log("audio file in side the open" ,audioFile);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("handleClose called");
    setOpen(false);
  };



  const [threshold, setThreshold] = useState(0.9);
  const [fileName, setFileName] = useState('your-filename-here.wav');
  const [diarizationData, setDiarizationData] = useState([
    { speaker: 'john doe', timeSpan: '0 - 10' },
    { speaker: 'jane smith', timeSpan: '10 - 20' },
  ]);
  const [totalTimeSpan, setTotalTimeSpan] = useState("5m 25s");

  const handleThresholdChange = (event, newValue) => {
    setThreshold(newValue);
  };
  console.log("audioFile,model in handleAnalyzeAudio-------",audioFile,model)
  const handleAnalyzeAudio = ({audioFile,model}) => {

    console.log("audioFile,model in handleAnalyzeAudio-------",audioFile,model)

    console.log("Analyze audio button clicked. Threshold:", threshold, "Filename:", fileName);


  };

  return (
    <>
      <Grid container sx={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '0px',
          backgroundColor: 'transparent'
        }
      }}>
        <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
          <Grid container sx={{
            width: "auto",
            height: "auto",
            overflow: "hidden",
            margin: 2,
            bgcolor: 'white',
            // marginTop: 4,
            borderRadius: 8,
            // border: '2px solid red',
          }}
          >
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <Box sx={{
                bgcolor: '#ffe6e6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,

              }}>
                <Typography variant="h5" >Speaker operations using audio files</Typography>
              </Box>
              <AudioUpload onFilesUploaded={handleFilesUploaded} />
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                m: 2,
              }}>
                <CircularProgress variant="determinate" value={100} size={50} sx={{
                  marginRight: 1,
                  position: 'relative',
                  color: '#AF1E22',
                }}>        <Typography variant="body2" color="inherit" sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>Status: 25%</Typography></CircularProgress>

                <Button size='large' sx={{ borderRadius: 4, bgcolor: '#ff6600', m: 2 }} onClick={handleIdentifySpeakers}>identify speakers</Button>


              </Box>
              <Divider sx={{
                m: 2, borderColor: '#ffb380',
                borderWidth: '1px',
              }} />
              <Container>
                <Table sx={{ borderRadius: 8, height: '45%' }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#F0F0F0" }}>

                      {/* <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>ID</TableCell> */}
                      <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>Audio file</TableCell>
                      <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>Speaker</TableCell>
                      <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>Language</TableCell>
                      <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>Duration</TableCell>
                      <TableCell style={{ fontWeight: 'bold', padding: '12px' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                     {/* {listofidentifiedSpeakers && Array.isArray(listofidentifiedSpeakers) && listofidentifiedSpeakers.map((file) => ( */}
                    <TableRow >
                      {/* <TableCell style={{ padding: '12px' }}>1</TableCell> */}
                      <TableCell style={{ padding: '12px', color: '#AF1E22' }}>test.wav</TableCell>
                      <TableCell style={{ padding: '12px' }}>john doe (0.98)</TableCell>
                      <TableCell style={{ padding: '12px' }}>urdu</TableCell>
                      <TableCell style={{ padding: '12px' }}>1m 24s</TableCell>
                      <TableCell style={{ padding: '12px' }}>
                        <Button
                          variant="contained"
                          // onClick={() => handleAnalyze(file.id)}
                          size="small"
                          sx={{
                            color: "white",
                            borderRadius: 3,
                            textTransform: 'none',
                            backgroundColor: '#AF1E22',

                          }}
                          onClick={handleClickOpen}
                        >
                          Speaker diarization
                        </Button>
                      </TableCell>
                    </TableRow>
                     {/* ))}   */}
                  </TableBody>
                </Table>
              </Container>
              {/* start of Dialog when i click speaker diarization button */}
              {open && (
                <Dialog open={open} onClose={handleClose} maxWidth="md" sx={{ borderRadius: 4 }}>
                  <Box sx={{
                    width: "auto",
                    height: "auto",
                    overflow: "hidden",
                    bgcolor: 'white',
                    // borderRadius: 4,
                  }}>

                    <Box sx={{
                      bgcolor: '#ffe6e6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',

                      // p: 2,
                      // borderRadius: 4,
                    }}>
                      <Typography variant='h5' sx={{ ml: 2 }}>Speaker Diarization</Typography>
                      <DialogActions>
                        <IconButton onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
                          <Close />
                        </IconButton>

                      </DialogActions>

                    </Box>

                    <Box sx={{ padding: 2 }}>
                      <Typography variant="body1">Audio file: {audioFile.name}</Typography>
                      <Typography variant="body2">Set threshold:</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 1 }}>
                        <Slider sx={{ color: '#AF1E22' }}
                          value={threshold}
                          onChange={handleThresholdChange}
                          aria-label="Threshold"
                          min={0.0}
                          max={1.0}
                          step={0.01}

                        />
                        <Box sx={{ bgcolor: '#ffe6e6', ml: 1, p: 1 }}><Typography variant="body2">{threshold}</Typography></Box>

                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" sx={{ bgcolor: '#ff6600', borderRadius: 4 }} onClick={() =>handleAnalyzeAudio(audioFile,model)}>
                          Analyze audio
                        </Button>
                      </Box>

                      <Divider sx={{
                        m: 2, borderColor: '#ffb380',
                        borderWidth: '1px',
                      }} />

                      <Typography variant="body1">
                        Diarization data table <span style={{ marginLeft: '235px' }}>Total time span: {totalTimeSpan}</span>
                      </Typography>
                      <TableContainer >
                        <Table >
                          <TableHead>
                            <TableRow sx={{ bgcolor: '#ffe6e6' }}>
                              <TableCell>Speaker</TableCell>
                              <TableCell>Time span</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {diarizationData.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.speaker}</TableCell>
                                <TableCell>{item.timeSpan}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>

                  </Box>
                </Dialog>
              )}

            </Grid>

          </Grid>
        </Grid>

        <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }} >
          <Grid container sx={{
            width: "auto",
            height: "auto",
            overflow: "hidden",
            margin: 2,
            bgcolor: 'white',
            // marginTop: 4,
            borderRadius: 8,
            // border: '2px solid red',
          }}
          >
            <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} >
              <Box sx={{
                bgcolor: '#ffe6e6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,

              }}>
                <Typography variant="h5" >Enroll Speakers using Audio files</Typography>
              </Box>

             

              <AudioUpload onFilesUploaded={handleFilesUploaded} />
              <Box sx={{
                bgcolor: '#ffe6e6',
                border: "1px solid #AF1E22",
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                m: 1, p: 1,
                borderRadius: 2,

              }}>
                <Typography sx={{ p: 0.5 }} >Add Speaker Details:</Typography>
                <Box >

                  <TextField size='small'
                    sx={{ width: '80%', ml: 2, backgroundColor: 'white' }}
                    label="Enter Speaker Name"
                    value={speakerName}
                    onChange={(e) => setSpeakerName(e.target.value)}
                  />

                  <Button size='small' sx={{ borderRadius: 4, bgcolor: '#ff6600', m: 2 }} onClick={handleEnrollSpeaker}>Save</Button>
                </Box>

              </Box>
            </Grid>

          </Grid>
          <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mt: 1 }}>
            <Grid container sx={{
              width: "auto",
              height: "auto",
              overflow: "hidden",
              margin: 2,

              bgcolor: 'white',
              // marginTop: 4,
              borderRadius: 8,
              // border: '2px solid red',
            }}
            >
              <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ height: '42vh' }}>
                <Box sx={{
                  bgcolor: '#ffe6e6',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2,
                }}>
                  <Typography variant="h5" >Enrolled Speakers list</Typography>
                </Box>
                <TextField size='small' placeholder='Search By Speaker Name' sx={{ width: '60%', m: 1, borderRadius: 8 }} />
                {/* <Container > */}
                <Box sx={{
                  overflowY: 'auto',
                  height: '25vh', // Adjust as needed, leave some space for the header
                  width: '100%',

                  '&::-webkit-scrollbar': {
                    display: 'none'
                  },
                  // Hide scrollbar for Firefox
                  scrollbarWidth: 'none',
                  // Hide scrollbar for IE, Edge
                  msOverflowStyle: 'none'
                }}>
                  <Table sx={{
                    borderRadius: 8,
                    width: '100%' // Ensure the table takes the width of the container
                  }} >
                    <TableHead sx={{ backgroundColor: '#ffcccc' }}>
                      <TableRow>
                        <TableCell align="center">Speaker Name</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Audio Files</TableCell>
                        <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfSpeakers && listOfSpeakers.map((speaker) => (
                        <TableRow
                          key={speaker.speaker_name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '20px' }}
                        >
                          <TableCell align="center" component="th" scope="row" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                            {speaker.speaker_name}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                            <ul>
                              {speaker.audio_files.map((audios, index) => (
                                <li key={index}>{audios}</li>
                              ))}
                            </ul>
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                            <Edit onClick={handleEdit} />
                            <Delete onClick={() => handleDelete(speaker.speaker_id)} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
                {/* </Container> */}
              </Grid>
            </Grid>

          </Grid>

        </Grid>
      </Grid>
    </>
  );
};

export default SpeakerOperations;