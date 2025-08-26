import React, { useState, useEffect } from 'react';
import {
  Button, Card, CardActions, CardContent,
  Table,
  TextField,

  IconButton, Box, Typography, LinearProgress, Chip, Stack, Slider, TableBody, TableCell, Paper, TableRow, TableHead, TableContainer, Grid2
} from "@mui/material";

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';




import Divider from '@mui/material/Divider';
import { FilterList } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';


import KeywordSet from '../features/KeywordSpotting/componentFeature/KeywordSet';
import ViewKeywords from '../features/KeywordSpotting/componentFeature/ViewKeywords';
import Keywordspotting from '../features/KeywordSpotting/Keywordspotting';
// import AvailableAudio from '../../features/ComponentFeatures/AvailableAudio';
import { useSelector, useDispatch } from 'react-redux';
import { getKeywordsInGroup, spotKeywords } from '../redux/thunks/keywordSpottingThunks';
// Mock data (replace with your actual data fetching


function KeywordSpotting({ groupName }) {

  const dispatch = useDispatch(); // Get the dispatch function
  console.log(groupName, "groupName------------------------------------------------->");
  const VerticalDivider = styled(Divider)(({ theme }) => ({
    orientation: 'vertical',
    backgroundColor: '#ffe6e6',
    border: '1px solid #ffe6e6',
    margin: '0 10px'
  }));



  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };


  const [isOpenview, setIsOpenview] = useState(false);

  const handleClickOpenview = () => {
    setIsOpenview(true);
  };


  const headerCellStyle = {
    padding: '8px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const rowCellStyle = {
    '&:nth-child(even)': { backgroundColor: '#ffe6cc' }, 
  };

  const cellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd',
  };

  const actionButton = {
    backgroundColor: '#e74c3c', 
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  };

  const keywordGroups = useSelector((state) => state.keywordSpotting.keywordGroups);
  console.log("keywordGroups --------in ks", keywordGroups);

  const keywordsInGroups = useSelector((state) => state.keywordSpotting.keywordsInGroup);
  console.log("keywordsInGroups --------in ks", keywordsInGroups);



  const [keywordSets, setKeywordSets] = useState([
    { id: 'default', name: 'Select Keyword Set' } // Initial default option
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState('default'); // Store selected group ID

  // Use the Redux store to get the keyword groups
  // const keywordGroups = useSelector((state) => state.keywordSpotting.keywordGroups);



  useEffect(() => {
    // Update keywordSets when keywordGroups changes
    if (keywordGroups) {
      const extractedGroups = [];
      if (keywordGroups.KeywordGroupResponse && keywordGroups.groupName) {
        extractedGroups.push({ id: keywordGroups.KeywordGroupResponse.group_id, name: keywordGroups.groupName });
      }

      setKeywordSets([
        ...extractedGroups
      ]);
    }
  }, [keywordGroups]); // Re-run when keywordGroups changes

  const handleSelectChange = (event) => {
    const groupId = event.target.value;
    console.log("groupiddddddddddddddddddddddddddddddddd", groupId);
    setSelectedGroupId(groupId);
  
    // Only dispatch when a valid group ID is selected.
    if (groupId !== 'default' && groupId !== '') { // Ensure non-empty AND not 'default'
      dispatch(getKeywordsInGroup(groupId));
    }
  };

  const allKeywordsString = keywordsInGroups?.map((item) => item.keyword).join(', ');


  console.log("keywordsInGroups --------in ks", keywordsInGroups);


  // Extract keywords from the array of objects
  const extractedKeywords = keywordsInGroups.map(item => item.keyword);
  console.log("Extracted Keywords Array:", extractedKeywords); //Debug line

  const keywords = extractedKeywords.join(',');
  console.log("keywords string:", keywords); // Debug line


  // Split the keywords string by comma
  const keywordArray = keywords.split(',').map(keyword => keyword.trim());




  const [keyword, setKeyword] = useState(["keyword1", "keyword2", "keyword3"]); // Initial keywords, manage state
  const [caseSensitive, setCaseSensitive] = useState('false');
  const [wholeWord, setWholeWord] = useState('false');
  const [synonyms, setSynonyms] = useState('false');
  const [model, setModel] = useState('default');

  const spotKeywordsResponse = useSelector((state) => state.keywordSpotting.spottingResults);
  console.log("spotKeywordsResponse----------------->",spotKeywordsResponse);



  const tableData = spotKeywordsResponse?.results?.map((item, index) => ({
    id: index + 1, // Generate an ID based on the array index
    audioFile: item.file_name,
    keywords: item.found_keywords.join(', '), // Join keywords into a string
  })) || [];

  const handleFindKeywords = () => {
    console.log("keyword, caseSensitive, wholeWord, synonyms, model",keyword, caseSensitive, wholeWord, synonyms, model);
    dispatch(spotKeywords({keyword, caseSensitive, wholeWord, synonyms, model }));
  };

  






  return (
    <>

      <Grid2 container spacing={1}>


        <Grid2 item spacing={2} size={{ xs: 12, sm: 7, md: 7 }}
          sx={{
            width: "auto",
            height: "auto",
            overflow: "hidden",
            bgcolor: 'white',
            // marginTop: 4,
            borderRadius: 8,
           
          }}>



          <Box sx={{
            bgcolor: '#ffe6e6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,

          }}>
            <Typography variant="h5" >Spotting keywords in the audio files</Typography>


          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', m: 3 }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{
                mr: 1, 
                '& .MuiOutlinedInput-root': { borderRadius: 5 },
                width: {
                  xs: '100%', 
                  sm: '60%', 
                  md: '70%', 
                },
                 height: "30px",
                '& .MuiInputBase-root': {
                  alignItems: 'center', 
                },
            
                padding: '0px 8px',
                '& .MuiOutlinedInput-input': {
                  padding: '4px 8px', // Reduce default padding
                }
              }}
              placeholder="Search file name, keywords..."
              inputProps={{ style: { fontSize: '0.8rem' } }}
              InputProps={{
                startAdornment: <IconButton><SearchIcon /></IconButton>,
              }}
            />
            <Button
              variant="outlined"
              sx={{
                borderRadius: 4,
                color: 'gray',
                size: 'small',
                ml: 1,
                width: {
                  xs: '100%',
                  sm: '30%',
                  md: '20%'
                }
              }}
              startIcon={<FilterList />}
            >
              Filter
            </Button>
          </Box>

          <Keywordspotting/>




          <Grid2 container spacing={2}>



            <Grid2 item size={{ xs: 6, sm: 6, md: 6 }}>


              <div className="container" style={{
                fontFamily: 'sans-serif',
                margin: '20px',
                padding: '20px',
                borderRadius: '8px'
              }}>
                <div className="grid-container" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>






                  <div className="keywords-section" style={{
                    gridColumn: '1 / 3',
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '5px',

                  }}>


                    <div style={{
                      marginBottom: '15px'
                    }}>
                      <select id="keywordSet" style={{
                        width: '50%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '15px',
                        marginTop: '5px'
                      }}
                        value={selectedGroupId}
                        onClick={handleSelectChange}
                      >
                        {keywordSets.map((set) => (
                          <option key={set.id} value={set.id}>
                            {set.name}
                          </option>
                        ))}
                      </select>
                    </div>










                    {keywordArray.length > 0 && ( 
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap', 
                      }}>
                        {keywordArray.map((keyword, index) => (
                          <label key={index} style={{
                           
                          }}>
                            <input type="checkbox" />
                            <span style={{ marginLeft: '5px' }}>{keyword}</span>
                          </label>
                        ))}
                      </div>
                    )}


                  </div>

                </div>
              </div>

            </Grid2>
            <VerticalDivider />


            <Grid2 item size={{ xs: 6, sm: 3, md: 3 }} sx={{ mt: 8 }}>


              <Typography style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                fontWeight: 'normal', color: 'gray'
              }}>Select specifications:</Typography>


              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px'
              }}>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px'
                }}>
                  <input type="checkbox" />
                  <span style={{ marginLeft: '5px' }}>Case sensitive </span>
                </label>
                <label style={{
                  display: 'flex',
                  marginBottom: '5px',
                  marginLeft: '10px'
                }}>
                  <input type="checkbox" />
                  <span style={{ marginLeft: '5px' }}>Whole word </span>
                </label>

              </div>
              <label style={{
                display: 'flex',
                marginBottom: '20px'

              }}>
                <input type="checkbox" />
                <span style={{ marginLeft: '5px' }}>Synonyms </span>
              </label>






              <div className="button-section" style={{
                gridColumn: '1 / 3',
                textAlign: 'center'
              }}>



<button style={{
        backgroundColor: "#FF5B00",
        color: "white",
        padding: "20px 20px",
        border: "none",
        borderRadius: "17px",
        cursor: "pointer",
        fontSize: '16px'
      }} onClick={handleFindKeywords}>
        <label> &#x2192; </label> Find keywords
      </button>
              </div>
            </Grid2>
          </Grid2>

        </Grid2>


        <Grid2 item size={{ xs: 12, sm: 5, md: 5 }}>
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
              <Typography variant='h5'>Spotted keywords in the audio files</Typography>
            </Box>

            <Box sx={{ padding: 2 }}>
              {/* Table Container */}
              <Paper elevation={3} sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                      <th style={headerCellStyle}>Audio file</th>
                      <th style={headerCellStyle}>Keywords</th>
                  
                      <th style={headerCellStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.id} style={rowCellStyle}>
                        <td style={cellStyle}>{row.audioFile}</td>
                        <td style={cellStyle}>{row.keywords}</td>
                        
                        <td style={cellStyle}>
                          <button style={actionButton} onClick={handleClickOpenview}>View</button>

                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
                {isOpenview && <ViewKeywords open={isOpenview} onClose={() => setIsOpenview(false)} />}
              </Paper>
            </Box>

          </Box>


          <Box sx={{
            bgcolor: '#ffe6e6',
            display: 'flex',
            justifyContent: 'space-between',

            p: 2,

          }}>
            <Typography variant='h5'>Configure keywords</Typography>

            <Button
              variant="outlined" //Use MUI button component
              style={{
                backgroundColor: '#AF1E22',
                color: 'white',
                border: 'none',
                padding: '15px',
                borderRadius: '17px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={handleClickOpen}
            >
              Create new
              <span style={{ marginLeft: '10px' }}>&#x2B;</span>
            </Button>

            {isOpen && <KeywordSet open={isOpen} onClose={() => setIsOpen(false)} />}
          </Box>

          <div style={{
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>


            </div>

            <div style={{
              marginBottom: '15px'
            }}>
              <select id="keywordSet" style={{
                width: '50%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '15px',
                marginTop: '5px'
              }}
                value={selectedGroupId}
                onClick={handleSelectChange}
              >
                {keywordSets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.name}
                  </option>
                ))}
              </select>
            </div>




            <Paper elevation={0} style={{ 
              padding: '8px 12px',  
              margin: '10px',    
              backgroundColor: 'whitesmoke',
              border: '1px solid #ccc',
              borderRadius: '10px', 
              display: 'flex',    
              alignItems: 'center', 
            }}>
              {keywordsInGroups && keywordsInGroups.length > 0 ? (  
                keywordsInGroups.map((keywordObj, index) => (
                  <div key={index} style={{ margin: '4px', padding: '4px', border: '1px solid #eee', borderRadius: '4px', display: 'inline-block' }}>
                    {keywordObj.keyword}
                  </div>
                ))
              ) : (
                <p>No keywords available.</p> 
              )}

            </Paper>





            <div style={{
              display: 'flex',

              alignItems: "center",
              marginLeft: '270px'
            }}>
              <button style={{
                backgroundColor: '#ccc',
                color: 'black',
                border: '1px solid #ccc',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>Cancel</button>
              <button style={{

                color: '#AF1E22',
                borderColor: '#AF1E22',
                padding: '7px',
                borderRadius: '14px',
                cursor: 'pointer'
              }}>Update keyword set</button>
            </div>
          </div>
        </Grid2>


      </Grid2>

    </>
  );
}

export default KeywordSpotting;
