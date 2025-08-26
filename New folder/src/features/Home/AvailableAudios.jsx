import React, { useState ,useEffect} from "react";
import {
    Box,
    TextField,
    IconButton,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogActions,
    Checkbox
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { Table } from "../../components/ui/table";
import FilterIcon from '../../assets/images/filter.png'
import { CustomTextField } from "../../components/ui/elements/styles";
import { DatePicker } from "@mui/lab";
import { Close } from '@mui/icons-material';
import { Divider, Grid2, ListItem, ListItemIcon, ListItemText, Menu } from '@mui/material';
import { getAudioFilesThunk } from "../../redux/thunks/audioThunks";
import { useSelector ,useDispatch} from "react-redux";
import { Buttons } from "../../components/ui/elements";
import { FaPlay } from "react-icons/fa";

const AvailableAudio = () => {
    const headers = ['', 'Audio', 'Language', 'Date', 'Duration', 'Play', 'Action'];
    const data = [
        ['1', 'audio1.wav', 'xxxxx, yyyyy', '12 Jul 2025', '01M 20S', 'Play'],
        ['2', 'test1.wav', 'aaaaa, bbbbb', '11 Jul 2025', '00M 45S', 'Play'],
        ['3', 'test2.wav', 'ccccc, ddddd', '10 Jul 2025', '02M 15S', 'Play'],
        ['4', 'test3.wav', 'ccccc, ddddd', '10 Jul 2025', '02M 15S', 'Play'],
    ];

    const dispatch =useDispatch();
    const getFiles = useSelector((state) => state.audio.audioFiles);
    console.log("getFiles----------------------",getFiles);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // const handleAnalyze = (id) => {
    //     console.log(`Analyze audio file with ID: ${id}`);
    //     // Implement your analysis logic here
    // };

    // const handlefilter = () => {
    //     console.log("Filter");

    // }

    useEffect(() => {
        dispatch(getAudioFilesThunk());
    },[])

    const totalItems = data.length;
    console.log(totalItems, "totalItems");

    // const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    // const currentItems = data.slice(startIndex, endIndex);


    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const languages = ['English', 'Spanish', 'French', 'German'];


    //Start of Noise Change
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handelFilterChange = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
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
        <Box sx={{ padding: 2 }}>
            {/* Table Container */}
            <Paper elevation={3} sx={{ overflowX: 'auto',width: '100%', height: '25%'  }}>
            <div style={{
                            overflowY: 'auto', height: '600px', '&::-webkit-scrollbar': {
                                display: 'none'
                            },
                            // Hide scrollbar for Firefox
                            scrollbarWidth: 'none',
                            // Hide scrollbar for IE, Edge
                            msOverflowStyle: 'none'
                        }}> 
                {/* <Table headers={headers} data={data} /> */}
                <table cellPadding="8" cellSpacing="0" style={{ width: '100%', height: '25%' }}> {/* Add width: 100% to the table to fill its container */}
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
                                                    {getFiles.map((file, idx) => (
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
            </Paper>
        </Box>

    </>);
};

export default AvailableAudio;