import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createKeywordGroupThunk, getKeywordSetsThunk, getKeywordsByGroupThunk, updateKeywordsInGroupThunk, deleteGroupThunk } from '../../../redux/thunks/keywordSpottingThunks';
import { NoEncryption } from '@mui/icons-material';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

function KeywordSet({ open: dialogOpen, onClose }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.keywordSpotting.loading);
  const [tabValue, setTabValue] = useState(0);
  const [groupName, setGroupName] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [keywordName, setKeywordName] = useState('');
  const [keywordList, setKeywordList] = useState([]);
  const [synonyms, setSynonyms] = useState(['']); // Initial synonym, can be more if desired
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [updatedKeywords, setUpdatedKeywords] = useState([]);

  const [addingNewKeyword, setAddingNewKeyword] = useState(false); // show/hide new keyword TextField
  const [newKeywordValue, setNewKeywordValue] = useState(''); // value of new keyword

  const groupList = useSelector((state) => state.keywordSpotting.groupList?.groups);
  console.log("groupList ", groupList);

  const keywordsInGroup = useSelector((state) => state.keywordSpotting.keywordsInGroup);
  console.log("***** keywords by group : *****", keywordsInGroup?.keywords);

  // Keep local updatedKeywords in sync with Redux
  useEffect(() => {
    if (keywordsInGroup?.keywords) {
      setUpdatedKeywords([...keywordsInGroup.keywords]);
    }
  }, [keywordsInGroup]);

  // Fetching groups on tab switch
  useEffect(() => {
    if (tabValue === 0) {
      dispatch(getKeywordSetsThunk());
    }
  }, [tabValue]);

  const handleGroupSelection = (event) => {
    const group = event.target.value;
    setSelectedGroup(group);
    if (group !== 'default' && group !== undefined) {
      dispatch(getKeywordsByGroupThunk(group));
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleSynonymChange = (index, event) => {
    const newSynonyms = [...synonyms];
    newSynonyms[index] = event.target.value;
    setSynonyms(newSynonyms);
  };

  const handleAddSynonym = () => {
    setSynonyms([...synonyms, '']); // Add a new empty synonym field
  };

  const handleGroupName = (event) => {
    setGroupName(event.target.value);
  }

  // const handleKeywordNameChange = (event) => {
  //   setKeywordName(event.target.value);
  // }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleKeywordChange = (event) => {
    const value = event.target.value;
    setKeywordName(value);

    // Parse into array on every change
    const list = value
      .split(/[,\s]+/)     // split by comma OR space
      .map(k => k.trim())
      .filter(k => k.length > 0);

    setKeywordList(list);
    console.log("------- keywordName --------- ", keywordName);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create the keyword group
      const data = {
        group_name: groupName,
        keywords: keywordList
      }
      dispatch(createKeywordGroupThunk(data));
    } catch (error) {
      console.error("Error creating keyword set:", error);
    }
    // Clear textFields
    setGroupName("");
    setKeywordName("");

  };

  const handleEditClick = (index, word) => {
    setEditingIndex(index);
    setUpdatedValue(word);
  };

  // Save/Set After editing keywords to state
  const handleSaveEdit = (index) => {
    console.log("Updated keyword:", updatedValue, "at index:", index);
    if (!updatedValue)
      return;
    const newKeywords = [...updatedKeywords];
    newKeywords[index] = updatedValue;
    setUpdatedKeywords(newKeywords);
    setEditingIndex(null);
  };

  const handleSaveKeywords = async (event) => {
    event.preventDefault();
    if (!selectedGroup) {
      alert("please select group");
    }

    // If new keyword TextField is still open, add it
    if (addingNewKeyword && newKeywordValue.trim() !== '') {
      setUpdatedKeywords([...updatedKeywords, newKeywordValue.trim()]);
      setAddingNewKeyword(false);
      setNewKeywordValue('');
    }

    const keywordList = { keywords: updatedKeywords }
    console.log("***** data in handleSaveKeywords ***** : ", keywordList);
    dispatch(updateKeywordsInGroupThunk({ groupName: selectedGroup, keywordList }));
  }

  const handleUpdatedKeywordReset = () => {
    setUpdatedKeywords([...keywordsInGroup.keywords]);
  }

  const handleCreatedKeywordReset = () => {

  }

  const handleAddNewKeyword = () => {
    if (!selectedGroup) {
      alert("Please Select a group");
    }
    else {
      setAddingNewKeyword(true);
      setNewKeywordValue('');
    }
  }

  const handleSaveNewKeyword = () => {
    if (newKeywordValue.trim() === '') return;
    setUpdatedKeywords([...updatedKeywords, newKeywordValue.trim()]);
    setAddingNewKeyword(false);
    setNewKeywordValue('');
  };

  const handleNewKeywordKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSaveNewKeyword();
    }
  };


  const deleteKeywordGroup = async (event) => {
    event.preventDefault();
    if (selectedGroup) {
      dispatch(deleteGroupThunk({ groupName: selectedGroup }));
    }
  }

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 5, // Rounded corners for Dialog box
            //  minHeight: '500px',
            maxHeight: '80vh',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{
          width: 'auto',
          height: 'auto',
          overflow: 'hidden',
          bgcolor: 'white',
          borderRadius: 4,
        }}>
          <Box sx={{
            bgcolor: '#ffe6e6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            justifyContent: 'space-between',
          }}>
            {/* <Typography variant="h5">Create Keyword Set</Typography> */}
            <Typography variant='h5' style={{
              color: '#000000', flex: 1,           // take full width between flex items
              textAlign: 'center',
            }}>Configure keywords</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            // textColor="primary"
            centered
            TabIndicatorProps={{
              style: {
                backgroundColor: '#AF1E22',
                color: '#1D1B20'
              },
            }}
          >
            <Tab label="Update Keyword Set" sx={{
              textTransform: 'none', color: '#525353', // default inactive color
              '&.Mui-selected': {
                color: '#1D1B20', // active color
                fontWeight: '600',
              },
            }} />
            <Tab label="Create Keyword Set" sx={{
              textTransform: 'none', color: '#525353', // default inactive color
              '&.Mui-selected': {
                color: '#1D1B20', // active color
                fontWeight: '600',
              },
            }} />

          </Tabs>


          {/* Tab Panels */}

          <Box >
            {/* Create Keyword Set */}
            {tabValue === 1 && (
              <Paper elevation={3} sx={{ overflowX: 'auto', p: 2, borderRadius: 5 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Enter keyword set name"
                    value={groupName}
                    // onChange={(e) => setGroupName(e.target.value)}
                    onChange={handleGroupName}
                    fullWidth
                    margin="normal"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4, // Rounded TextField
                      },
                    }}
                  />
                  <TextField
                    label="Add keywords"
                    // value={keywordName}
                    value={keywordName}
                    // onChange={(e) => setKeywordName(e.target.value)}
                    onChange={handleKeywordChange}
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={4}
                    maxRows={6}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4, // Rounded TextField
                      },
                    }}
                  />
                  {/* <div>
                  {synonyms.map((synonym, index) => (
                    <TextField
                      key={index}
                      label={`Synonym ${index + 1}`}
                      value={synonym}
                      onChange={(e) => handleSynonymChange(index, e)}
                      fullWidth
                      margin="normal"
                    />
                  ))}
                  <Button onClick={handleAddSynonym}>Add Synonym</Button>
                </div> */}
                  <DialogActions>
                    <button onClick={handleCreatedKeywordReset} color="secondary" style={{ border: 'none', color: '#525353', backgroundColor: 'white', textDecoration: 'underline' }}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        color: '#AF1E22',
                        borderColor: '#AF1E22',
                        padding: '7px',
                        borderRadius: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {loading ? 'Adding...' : 'Add Keyword Set'}
                    </button>
                  </DialogActions>
                </form>
              </Paper>
            )}

            {/* Update keyword set */}
            {tabValue === 0 && (
              <Paper elevation={3} sx={{ overflowX: 'auto', p: 2, borderRadius: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                  <select style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    marginTop: '5px',
                    height: '40px',
                    textAlign: 'center',
                  }}
                    onChange={handleGroupSelection}
                  >

                    <option value="" disabled selected style={{ textAlign: 'center' }}>
                      Select keyword set
                    </option>
                    {Array.isArray(groupList) && groupList.length > 0 &&
                      (groupList.map((group, index) => (
                        <option key={index} value={group}>{group}</option>
                      )))
                    }
                  </select>

                  {/* Add Keyword */}
                  {addingNewKeyword ? (
                    <TextField
                      value={newKeywordValue}
                      onChange={(e) => setNewKeywordValue(e.target.value)}
                      onBlur={handleSaveNewKeyword}      // save on blur
                      onKeyPress={handleNewKeywordKeyPress} // save on Enter
                      size="small"
                      autoFocus
                      placeholder="New keyword"
                      sx={{
                        width: '180px',
                        "& .MuiOutlinedInput-root": {
                          borderRadius: '25px',
                        },
                      }}
                    />
                  ) : (
                    <Tooltip title="Add new keyword" arrow>
                      <IconButton
                        onClick={handleAddNewKeyword}  //4CAF50
                        style={{ color: 'white', backgroundColor: "#AF1E22", borderRadius: '25px' }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>

                <ul
                  style={{

                    //  display: "flex",
                    //     flexWrap: "wrap",          // wrap to new row if needed
                    //     gap: "8px 12px",           // vertical and horizontal gap
                    //     listStyle: "none",
                    //     padding: 0,
                    //     margin: "20px 0 0 0",      // space above ul
                    //     minHeight: "120px",
                    //     maxHeight: "280px",
                    //     overflowY: "auto",


                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",  // exactly 4 columns
                    // gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
                    gap: "2px",
                    // columnCount: 4,
                    // rowGap: "4px",
                    // columnGap: "12px",
                    listStyle: "none",
                    padding: 0,
                    margin: "20px 0 0 0",
                    minHeight: "120px",
                    maxHeight: "280px",
                    overflowY: "auto",

                  }}
                >
                  {updatedKeywords.map((word, index) => (
                    <li
                      key={index}
                      style={{                  // space around text
                        borderRadius: "4px",            // rounded corners
                        fontSize: "14px",
                        fontWeight: 500,
                        textAlign: "center",
                        color: "#333",

                        // transition: "transform 0.2s ease",
                        display: "flex",   // word + icon inline
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        padding: "4px",
                        cursor: "default",
                        overflow: "visible",
                      }}
                      className="keyword-item"
                    >
                      {editingIndex === index ? (
                        <TextField
                          value={updatedValue}
                          onChange={(e) => setUpdatedValue(e.target.value)}
                          onBlur={() => handleSaveEdit(index)} // save on blur
                          size="small"
                          autoFocus
                          sx={{
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                              padding: "2px",
                              textAlign: "center"
                            },
                          }}
                        />
                      ) : (
                        <>
                          {word}

                          <Tooltip title="Edit keyword" arrow>
                            <EditIcon
                              fontSize="small"
                              onClick={() => handleEditClick(index, word)}
                              sx={{
                                // position: "absolute",                                  
                                // right: 4,
                                // top: "50%",
                                // transform: "translateY(-50%)",
                                // color: "text.secondary",
                                cursor: "pointer",
                                opacity: 0,
                                transition: "opacity 0.2s ease",
                                "&:hover": { color: "primary.main" },
                              }}
                              className="edit-icon"
                            />
                          </Tooltip>

                        </>
                      )}

                      <style>
                        {/* {`
              li:hover .edit-icon {
                opacity: 1 !important; 
              }
            `} */}

                        {`
          .keyword-item:hover .edit-icon {
            opacity: 1 !important; 
          }
        `}
                      </style>

                    </li>
                  ))}
                </ul>


                {/* <TextField
                    label="keywords are:"
                    value={keywords?.keywords?.join(", ") || ""}
                    onChange={handleKeywordNameChange}
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={4}
                    maxRows={6}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                      },
                    }}
                  /> */}

                < DialogActions sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}>

                  {/* <button style={{
                    color: '#AF1E22',
                    border: 'none',
                    borderBottom: '1px solid #AF1E22',
                    cursor: 'pointer',
                    marginRight: '10px',
                    backgroundColor: 'white',
                  }} onClick={deleteKeywordGroup}>Delete keywords set</button> */}

                  <Tooltip title="Delete keywords set" arrow>
                    <IconButton
                      onClick={deleteKeywordGroup}
                      style={{ color: '#AF1E22', borderRadius: '25px', backgroundColor: '#f3eaeaff' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>


                  <div>
                    {/* Reset */}
                    <button style={{
                      color: '#525353',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '10px',
                      backgroundColor: 'white',
                      textDecoration: 'underline'
                    }} onClick={handleUpdatedKeywordReset}>Reset</button>

                    <button style={{
                      color: '#AF1E22',
                      borderColor: '#AF1E22',
                      padding: '7px',
                      borderRadius: '14px',
                      cursor: 'pointer'
                    }} onClick={handleSaveKeywords}>Update keyword set</button>
                  </div>
                </DialogActions>
              </Paper>
            )}

          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default KeywordSet;