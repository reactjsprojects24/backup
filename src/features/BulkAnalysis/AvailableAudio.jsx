import React, { useState, useEffect } from 'react';
import {
    TextField,
    Checkbox,
    IconButton,
    Typography, FormControl,
    Box,
    Select,
    MenuItem,
    Divider,
    Paper,
    Button, ListItem, ListItemIcon, ListItemText, Menu, Pagination
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp, PlayArrow } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Table } from "../../components/ui/table";
import FilterIcon from '../../assets/images/filter.png'
import { Close } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { getAudioFilesByFolderThunk } from '../../redux/thunks/audioThunks';
import { Buttons } from '../../components/ui/elements';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ITEMS_PER_PAGE = 6;

const AvailableAudio = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAudioFiles, setSelectedAudioFiles] = useState([]);
    const [audioFiles, setAudioFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const dispatch = useDispatch();

    const filesByFolder = useSelector((state) => state.audio.filesByFolder);
    console.log("folderssssssssss------------------>", filesByFolder);
    const [openFolder, setOpenFolder] = React.useState(null);
    const [selectedFolderFiles, setSelectedFolderFiles] = React.useState([]);
    const languages = ['English', 'Spanish', 'French', 'German'];
    const [dataarray, setDataArray] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalRows = dataarray.length;


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handelFilterChange = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        if (openFolder) {
            setSelectedFolderFiles(filesByFolder[openFolder] || []);
        } else {
            setSelectedFolderFiles([]);
        }
    }, [openFolder, filesByFolder]);

    const handleFolderClick = (folder) => {
        setOpenFolder(folder);
    };




    const handleChangePage = (event, value) => {
        setPage(value - 1);
    };

    useEffect(() => {
        dispatch(getAudioFilesByFolderThunk());
    }, []);

    const filteredAudioFiles = audioFiles.filter(file =>
        file.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredAudioFiles.slice(startIndex, endIndex);

    const handleCheckboxChange = (event, fileId) => {
        const checked = event.target.checked;
        if (checked) {
            setSelectedAudioFiles([...selectedAudioFiles, fileId]);
        } else {
            setSelectedAudioFiles(selectedAudioFiles.filter(id => id !== fileId));
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(filteredAudioFiles.length / ITEMS_PER_PAGE);


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

    console.log("folzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzderssssssssss------------------>", !filesByFolder);




    return (
        <>
            <ToastContainer />
            <Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2, ml: 1, mr: 1 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        sx={{
                            mr: 1,
                            '& .MuiOutlinedInput-root': { borderRadius: 5 },
                            width: {
                                xs: '100%',
                                sm: '30%',
                                md: '50%',
                            },
                            height: "30px",
                            '& .MuiInputBase-root': {
                                alignItems: 'center',
                            },
                            padding: '0px 8px',
                            '& .MuiOutlinedInput-input': {
                                padding: '4px 8px',
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
                                md: '15%'
                            }
                        }}
                        onClick={handelFilterChange}
                    // startIcon={FilterIcon}
                    >
                        <img style={{ height: '15px', marginRight: '10px' }} src={FilterIcon} />
                        Filter
                    </Button>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
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
                        <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', fontWeight: 540, justifyContent: 'space-between' }}>
                            Filter
                            <ListItemIcon sx={{ justifyContent: 'flex-end' }}>
                                <Close />
                            </ListItemIcon>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose} sx={{ display: 'flex', flexDirection: 'column', fontSize: '14px', color: '#848484', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                Select Date
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <form noValidate>
                                    <TextField padding="10px"
                                        id="date"
                                        // label="Start-date"
                                        type="date"
                                        name="startDate"
                                        defaultValue="00-00-0000"
                                        sx={{ padding: '10px', borderRadius: '20px' }}
                                    />
                                    <TextField
                                        id="date"
                                        // label="end-date"
                                        type="date"
                                        name="endDate"
                                        defaultValue="00-00-0000"
                                        sx={{
                                            padding: '10px',
                                            borderRadius: '20px',
                                            '& .MuiOutlinedInput-root': { //Target root of the TextField
                                                borderRadius: '20px',
                                            }
                                        }}
                                    />
                                </form>
                            </div>
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
                            <ListItem
                                button
                                id="lock-button"
                                aria-haspopup="listbox"
                                aria-controls="lock-menu"
                                aria-label="Reset"
                                sx={{ p: '0', color: '#AF1E22', textDecoration: 'underline', width: '50%', justifyContent: 'flex-start' }}
                            >
                                <ListItemText primary="Reset" />
                            </ListItem>
                            <ListItem sx={{ p: '0', width: 'auto', justifyContent: 'flex-end' }}>
                                <Button sx={{ backgroundColor: '#AF1E22', color: '#fff', borderRadius: '20px', pl: 2, pr: 2, fontSize: '14px' }}>Apply Filter</Button>
                                {/* <Buttons sx={{ backgroundColor: '#AF1E22' }}>{buttonLabels.apply}</Buttons> */}
                            </ListItem>
                        </MenuItem>
                    </Menu>
                </Box>

                <Divider />
                <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
                    {filteredAudioFiles.length} Audio files listed
                </Typography>


                <div style={{ padding: '20px' }}>
                    {filesByFolder && Array.isArray(filesByFolder) && filesByFolder.length > 0 ? (
                        <div style={{
                            overflowY: 'auto', height: '600px', '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            // Hide scrollbar for Firefox
                            scrollbarWidth: 'none',
                            // Hide scrollbar for IE, Edge
                            msOverflowStyle: 'none'
                        }}> {/*  Adjust height as needed.  This makes the entire content scrollable */}
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
                                            // height: '300px',
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
                                            <table cellPadding="8" cellSpacing="0" style={{ width: '100%', height: '250px' }}> {/* Add width: 100% to the table to fill its container */}
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
                                            <Pagination
                                                count={Math.ceil(totalRows / rowsPerPage)}
                                                page={page + 1}
                                                onChange={handleChangePage}
                                                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No folders found.</p>
                    )}
                </div>

                {/* <Table headers={headers} data={data} /> */}

                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            sx={{
                                margin: '0 5px',
                                fontWeight: currentPage === index ? 'bold' : 'normal',
                                color: currentPage === index ? '#AF1E22' : 'inherit',
                            }}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ p: 1, overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">{selectedAudioFiles.length} Audio files are Selected</Typography>
                    <Typography variant="body2">Status </Typography>
                    <Button sx={{ bgcolor: "#FF5B00", size: "Medium", color: 'white', borderRadius: 4 }} onClick={() => toast.error("Analyze Audio Functionality")} >Analyze audio file</Button>
                </Box>
            </Box>
        </>
    );
};

export default AvailableAudio;