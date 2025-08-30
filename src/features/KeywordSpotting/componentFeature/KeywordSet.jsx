import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createKeywordGroup, createKeywordInGroup } from '../../../redux/thunks/keywordSpottingThunks';

function KeywordSet({ open: dialogOpen, onClose }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.keywordSpotting.loading);
  const [groupName, setGroupName] = useState('');
  const [keywordName, setKeywordName] = useState('');
  const [synonyms, setSynonyms] = useState(['']); // Initial synonym, can be more if desired

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create the keyword group
      const groupResult = await dispatch(createKeywordGroup(groupName));
      const groupId = groupResult.payload?.group_id;

      if (groupId) {
        // Create the keyword with synonyms
        const synonymData = synonyms.filter(synonym => synonym.trim() !== '');  // Filter empty synonyms before sending
        
        await dispatch(createKeywordInGroup({ groupId, keywordName, synonyms: synonymData })); // Pass synonymData to thunk
        onClose(); // Close dialog on success
      }
    } catch (error) {
      console.error("Error creating keyword set:", error);
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="md">
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
          }}>
            <Typography variant="h5">Create Keyword Set</Typography>
          </Box>
          <Box sx={{ padding: 2 }}>
            <Paper elevation={3} sx={{ overflowX: 'auto' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Enter keyword set name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Enter keyword"
                  value={keywordName}
                  onChange={(e) => setKeywordName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <div>
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
                </div>
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                  <Button
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
                  </Button>
                </DialogActions>
              </form>
            </Paper>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default KeywordSet;