import React, { useRef, useState } from "react";
import { Grid } from '@mui/system';
import {
  Alert, Box, Button, Container, MenuItem, Select, TextField, Typography, Grid2, Divider, FormControl, InputLabel, Menu,

  ListItemIcon,

  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import audioApi from "./../api/audioAPI";
import TranslatorIcon from './../assets/images/translator.png';
import { useTheme, styled } from '@mui/material';
import { ArrowCircleUpOutlined, Attachment, ContentCopy, SwapHorizOutlined, Search, FilterList, OpenInNew, Close } from "@mui/icons-material";
import { Buttonz, Buttons } from './../components/ui/elements/';
import { buttonLabels } from './../components/ui/elements/labels';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { transcribeAudioThunk } from "./../redux/thunks/transcriptionThunk";
import { identifyGenderThunk, identifyLanguageThunk } from "./../redux/thunks/IdentificationThunk";
import { translateTextThunk } from "./../redux/thunks/translationThunk";

const TextTranslate = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [selectedSourceLanguage, setSourceLanguage] = useState('en');
  const [selectedTargetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedModel, setSelectedModel] = useState('Model 1');
  const languages = ['English', 'Spanish', 'French', 'German'];
  const model = ['Model 1', 'Model 2', 'Model 3', 'Model 4'];
  const open = Boolean(anchorEl);


  const translatedTextResponse = useSelector((state) => state.translation.translatedText);
  console.log("translatedTextResponse in page---------", translatedTextResponse);


  const handelTranslatorChange = (event) => {
    setAnchorEl(event.currentTarget);
  };



  
  const handelTranslate = () => {
    console.log("filedataaain hanlde click----------", fileData);

    const data = {
      "text": fileData,
      "language_from": "en",
      // "audio_id": uploadedAudio.audio_id,
      "language_to": selectedLanguage,
      "model": selectedModel,
    }
    try {
      
      console.log("dataaa in text translate", data);
      dispatch(translateTextThunk(data));
    
      console.log(data, "data------------------------Trans");

    } catch (error) {
      // Handle any unexpected errors during thunk execution.
      console.error("Error during translation process:", error);
      toast.error("An unexpected error occurred during translation.", {
        position: 'top-right',
        autoClose: 5000, // Longer duration for general errors
        theme: 'colored'
      });
    }

  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleTranslate = async () => {
    setLoading(true);
    setError(null); //Clear previous errors
    try {
      const translation = await translateText(inputText, selectedSourceLanguage, selectedTargetLanguage);
      setTranslatedText(translation);
    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message || 'Translation failed. Check API key and input.');
    } finally {
      setLoading(false);
    }
  };

  const translateText = async (text, source, target) => {
    // REPLACE WITH YOUR ACTUAL API CALL
    const apiKey = process.env.REACT_APP_TRANSLATION_API_KEY || 'YOUR_API_KEY'; //Use env variable

    const response = await fetch('YOUR_TRANSLATION_API_ENDPOINT', { //Replace with your API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, //Or appropriate authentication
      },
      body: JSON.stringify({
        text,
        sourceLanguage: source,
        targetLanguage: target,
      }),
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText; // Adjust this based on your API's response structure
  };

  const handleCopy = () => {
    console.log("copppppppppyyyyy------------>", navigator);
    navigator.clipboard.writeText(translatedText);
  };



  const [audioFiles, setAudioFiles] = useState([]);  // State to store the audio files. Initialize to an empty array
  // const [loading, setLoading] = useState(false);

  const handleGetAudioFiles = async () => {
    setLoading(true);
    // Start loading, can show a spinner
    try {

      const files = await audioApi.getAudioFiles(); // Call the function from audioAPI
      console.log("url called data feteched--------", files)
      setAudioFiles(files); // Update the state with the retrieved files
      console.log("list of audio files-------------->", audioFiles);
    } catch (error) {
      console.error("Error in component:", error);  // log to console for debugging
    } finally {
      setLoading(false); // Stop loading
    }

  };





  const [fileData, setFileData] = useState('');
  const fileInputRef = useRef(null);

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();

        reader.onload = (e) => {
          setFileData(e.target.result);
        };

        reader.readAsText(file);
      } else {
        setFileData('Please upload a text file.');
      }
    } else {
      setFileData('');
    }
  };

  return (
    <>
      <Grid container sx={{
        mt: 3, ml: 3, mr: 3, mb: 2,
        height: '93%',
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
            <Typography variant="h5" >Translating your text to different languages</Typography>
          </Box>
          <Box sx={{
            mt: 4, ml: 3, mb: 2,
          }}>
            <Typography>Deteched Languages:</Typography>
          </Box>





          <Grid container spacing={3} sx={{ m: 3 }}>
            <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5 }} >
              <Grid2 container
                sx={{
                  border: '2px solid #AF1E22',
                  borderRadius: 4,
                  justifyContent: "space-between",
                  padding: '1px',
                }}
              >
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '53vh', overflow: 'auto', margin: '5px' }}>

                    <Typography variant="body1">
                      {fileData}
                    </Typography>

                  </Box>
                  <Divider />
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 2, justifyContent: 'space-between' }}>
                  <FormControl sx={{ minWidth: 250, mt: 2, pb: 2 }} size="small"> {/*Added mt:2 for margin-top*/}
                    <InputLabel id="demo-select-small-label">Language</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={selectedLanguage}
                      label="Language"
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                      }}
                      sx={{ borderRadius: "25px" }}
                    >
                      {languages.map((language) => (
                        <MenuItem key={language} value={language}>
                          {language}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>

                    <IconButton onClick={handleAttachClick} aria-label="Attach Audio">
                      <Attachment />
                    </IconButton>

                    <input
                      type="file"
                      accept="text/plain" // Only accept text files
                      multiple={false} // Only allow one file
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                    />



                    <Button
                      variant="outlined"
                      color="gray"
                      size="small"
                      onClick={handelTranslatorChange}
                      sx={{
                        borderRadius: 3,
                        color: "white",
                        backgroundColor: "#FF5B00",
                        flexShrink: 0, // Don't shrink the button
                        [theme.breakpoints.xs]: { // Extra small screens
                          width: '100px',
                        },
                        [theme.breakpoints.sm]: { // Small screens
                          width: '120px',
                        },
                        [theme.breakpoints.md]: { // Medium screens
                          width: '150px',
                        },
                      }}
                    >
                      <img style={{ height: '15px', marginRight: '10px' }} src={TranslatorIcon} />
                      Translate
                    </Button>
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
                      <MenuItem sx={{ display: 'flex', alignItems: 'center', fontWeight: 540, justifyContent: 'space-between' }}>
                        Translator
                        <ListItemIcon onClick={handleClose} sx={{ justifyContent: 'flex-end' }}>
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
                        <FormControl sx={{ minWidth: 250, mt: 2, mb: 2 }} size="small" fullWidth> {/*Added mt:2 for margin-top*/}
                          {/* <InputLabel id="demo-select-small-label">Language</InputLabel> */}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          Select Language
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
                        <FormControl sx={{ minWidth: 250, mt: 2 }} size="small" fullWidth> {/*Added mt:2 for margin-top*/}
                          {/* <InputLabel id="demo-select-small-label">Language</InputLabel> */}
                          <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={selectedLanguage}
                            // label="Language"
                            onChange={(e) => {
                              setSelectedLanguage(e.target.value);
                            }}
                            sx={{ borderRadius: "25px" }}
                          >
                            {languages.map((language) => (
                              <MenuItem key={language} value={language}>
                                {language}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose} sx={{ display: 'flex', fontSize: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                          <Button sx={{ backgroundColor: '#ffe6e6', borderColor: '#AF1E22', color: '#AF1E22', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px', mr: 4 }}>Auto Translate</Button>
                          {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                        </ListItem>
                        <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                          <Button onClick={handelTranslate} sx={{ backgroundColor: '#AF1E22', color: '#fff', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px', ml: 4 }}>Translate Now</Button>
                          {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                        </ListItem>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Grid>
              </Grid2>
            </Grid>
            <Button ><SwapHorizOutlined /></Button>
            <Grid item size={{ xs: 5, sm: 5, md: 5, lg: 5 }} sx={{ mr: 12 }}>

              <Grid2 container
                sx={{
                  border: '2px solid #AF1E22',
                  borderRadius: 4,
                  justifyContent: "space-between",
                  padding: '1px',
                }}
              >
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{
                }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '53vh', overflow: 'auto', margin: '5px' }}>

                    <Typography variant="body1">
                      {translatedTextResponse}
                    </Typography>

                  </Box>
                  <Divider />
                </Grid>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ display: 'flex', alignItems: 'center', pl: 2, pr: 2, justifyContent: 'space-between' }}>

                  <Button><ContentCopy />copy</Button>
                  <Button><ArrowCircleUpOutlined />export</Button>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button sx={{
                      backgroundColor: '#ffe6e6',
                      color: '#AF1E22',
                      padding: "15px",
                      height: '40px',
                      border: 'none',
                      borderRadius: '18px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      outline: 'none',
                      display: 'flex',
                      margin: "15px"
                    }}>
                      Grammar correction
                    </Button>
                  </Box>
                </Grid>
              </Grid2>
            </Grid>


          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default TextTranslate;