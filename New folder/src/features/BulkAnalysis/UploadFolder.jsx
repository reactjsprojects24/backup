import React, { useState } from 'react';
import {
  Box, Typography, IconButton, Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
} from '@mui/material';

import AudioUpload from '../../components/uploadAudio/AudioUpload';
import { uploadAudioFolderThunk } from '../../redux/thunks/audioThunks';
import { useDispatch } from 'react-redux';
import { FaPlay, FaEllipsis } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadFolder = () => {

  // static data for upload audio table
  const dispatch = useDispatch();

  // const [searchTerm, setSearchTerm] = useState('');
  const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);
  const [dataarray, setDataArray] = useState([]);

  const [audioFile, setAudioFile] = useState([]); // Files for enrollment


  const handleFilesUploaded = async (fileArray) => {

    setDataArray(fileArray);
    console.log(" audioFile before dispatch:", fileArray);
    dispatch(uploadAudioFolderThunk(fileArray)) // use speakerName
      .then(() => {
        // setEnrolling(false);
        // setSpeakerName('');
        setAudioFile([]);
      })
      .catch(error => {
        console.error("Error enrolling speaker:", error);
        // setEnrolling(false);
      });



  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);



  
  const totalRows = dataarray.length;

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const handleSelectAll = (event) => {
    setSelected(dataarray.map((_, index) => index));
  };

  const handleCheckboxChange = (index) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const displayedFiles = dataarray.slice(startIndex, endIndex);

  
  return (
    <>
      <ToastContainer />
      <AudioUpload onFilesUploaded={handleFilesUploaded} />
      {/* <UploadAudio /> */}
      <Divider />

      <Box sx={{ pl: 1, pr: 1, mt: 1, br: 4, overflow: 'hidden' }}>
        {/* <Table headers={headers} data={dataarray} /> */}

        <Paper sx={{ width: '100%', mb: 2, overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === dataarray.length}
                    onChange={handleSelectAll}
                    color="primary"
                  />
                </TableCell>
                <TableCell>Audio File</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Play</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedFiles.map((file, index) => (
                <TableRow key={index}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>Urdu</TableCell>
                  <TableCell>DD MM YYYY</TableCell>
                  <TableCell>1m 38s</TableCell>
                  <TableCell>
                    <IconButton aria-label="Play" onClick={() => { }}>
                      <FaPlay  color="#AF1E22"/>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Button sx={{bgcolor:"#FF5B00" ,color:'white' ,borderRadius:4}}>
                      Analyze
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={Math.ceil(totalRows / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Paper>

      </Box>


      <Box sx={{
        p: 1, overflow: 'hidden', display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="body2">
          {selectedAudioFiles.length} Audio files are Selected
        </Typography>
        <Typography variant="body2">
          Status 
        </Typography>
        <Button sx={{bgcolor:"#FF5B00" ,size:"Medium" ,color:'white' ,borderRadius:4}} onClick={() => toast.error("Analyze Audio Functionality")} >Analyze audio file</Button>
      </Box>


    </>
  );
};

export default UploadFolder;