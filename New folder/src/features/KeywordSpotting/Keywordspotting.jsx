import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Box, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useState ,useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getAudioFilesByFolderThunk } from '../../redux/thunks/audioThunks';
import { Buttons } from '../../components/ui/elements';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

// const ITEMS_PER_PAGE = 6;
export default function Keywordspotting() {

  const dispatch = useDispatch();

  const filesByFolder = useSelector((state) => state.audio.filesByFolder);
  console.log("folderssssssssss------------------>", filesByFolder);


    useEffect(() => {
      dispatch(getAudioFilesByFolderThunk());
  }, []);

//   const filteredAudioFiles = audioFiles.filter(file =>
//       file.filename.toLowerCase().includes(searchTerm.toLowerCase())
//   );

 
  //Start of folder toggle
  const [openFolders, setOpenFolders] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = (folderName) => {
      setIsOpen(!isOpen);
      setOpenFolders((prev) => ({
          ...prev,
          [folderName]: !prev[folderName],
      }));
  };
  //End of folder toggle


  return (
    <>
   <div style={{ padding: '20px' }}>
                {filesByFolder && Array.isArray(filesByFolder) && filesByFolder.length > 0 ? (
                    <div style={{ overflowY: 'auto', height: '400px','&::-webkit-scrollbar': {
                        display: 'none'
                    },
                   
                    scrollbarWidth: 'none',
                  
                    msOverflowStyle: 'none' }}> 
                    {filesByFolder.map((folderData) => (
                        <div key={folderData.folder} style={{ marginBottom: '20px' }}>
                        <Box
                            sx={{
                            backgroundColor: "#ffe6e6",
                            display: "flex",
                            alignItems: "center",
                            padding: '8px',
                            position: 'relative',
                            }}
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => toggleFolder(folderData.folder)}
                        >
                            <Checkbox
                            color="primary"
                            />
                            <Box sx={{ flexGrow: 1 }}>
                            {folderData.folder}
                            </Box>
                            <IconButton
                            onClick={toggleFolder}
                            aria-label="toggle folder"
                            sx={{
                                position: 'absolute',
                                right: 8,
                            }}
                            >
                            {openFolders[folderData.folder] ? <ArrowDropUp /> : <ArrowDropDown />}
                            </IconButton>
                        </Box>
                        {openFolders[folderData.folder] && (
                            <div style={{ 
                                overflowY: 'auto', 
                                height: '300px', 
                                marginTop: '10px',
                                // Hide scrollbar for Chrome, Safari and Opera
                                '&::-webkit-scrollbar': {
                                    display: 'none'
                                },
                                // Hide scrollbar for Firefox
                                scrollbarWidth: 'none',
                                // Hide scrollbar for IE, Edge
                                msOverflowStyle: 'none'
                            }}> {/*  Adjust the table container height as needed */}
                            <table cellPadding="8" cellSpacing="0" style={{ width: '100%' }}> {/* Add width: 100% to the table to fill its container */}
                                <thead>
                                <tr style={{ fontSize: '12px', alignItems: 'center' }}>
                                    <th><Checkbox color="primary" /></th>
                                    <th>Audio File</th>
                                    <th>Language</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                    <th>Play</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {folderData.files.map((file, idx) => (
                                    <tr style={{ fontSize: '11px' }} key={idx}>
                                    <td><Checkbox color="primary" /></td>
                                    <td>{file.file_name}</td>
                                    <td>Urdu</td>
                                    <td>DD MM YYYY</td>
                                    <td>1m 38s</td>
                                    <td>
                                        <button
                                        className="icon-button play-button"
                                        // onClick={() => handlePlayClick(row[1], rIndex)}
                                        >
                                        <FaPlay />
                                        </button>
                                    </td>
                                    <td><Buttons className="action-button"
                                    // onClick={() => handleAction(rIndex)}
                                    >Anaylze </Buttons>
                                    </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                ) : (
                    <p>No folders found.</p>
                )}
            </div>
    </>
  );
}