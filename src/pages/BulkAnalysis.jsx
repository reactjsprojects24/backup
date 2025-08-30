import { Button, Card, CardActions, CardContent, Typography, LinearProgress, Chip, Stack, Slider, TableBody, TableCell, Paper, TableRow, TableHead, TableContainer } from "@mui/material";
import { Box, Grid } from "@mui/system";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import Table from '@mui/material/Table';
import UploadFolder from "./../features/BulkAnalysis/UploadFolder";
import AvailableAudio from "./../features/BulkAnalysis/AvailableAudio";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const BulkAnalysis = () => {

    const TotalAudioFiles = '000';
    const TotalSpeakers = '00';
    const TotalLanguages = '00';

    // thi is used to assign the extracted sentiment analysis text
    const sentisumData = 'Simulated transcription for audio a225d4c1-55bb-43cf-a1e5-188500d9ffbf in en.';

    const data = [
        { name: 'Chinese', value: 40 },
        { name: 'Hindi', value: 30 },
        { name: 'English', value: 15 },
        { name: 'Urdu', value: 10 },
        { name: 'Thai', value: 3 },
        { name: 'Arabic', value: 2 },
    ];

 
    // const totalLanguages = data.reduce((sum, entry) => sum + entry.value, 0);


    const getColor = (name) => {

        const colors = ['#FF7F50', '#87CEEB', '#98FB98', '#F08080', '#DA70D6'];
        return colors[data.indexOf(data.find(item => item.name === name)) % colors.length];
    };

    const legendItemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
    };

    const legendDotStyle = {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        marginRight: '5px',
    };



    //Right Grid

    const [value, setValue] = useState(90);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Right grid -table data 
    const sentimentAnalysisResponse = useSelector((state) => state.NLPExtraction.sentimentAnalysis);
    const rows =[];
    // sentiment summary 

    const [selectedFile, setSelectedFile] = useState('Your-audio-file-01.wav');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.value);
    };

    const [activeButton, setActiveButton] = useState('upload')

    console.log('active button----------->>>>>',activeButton);

    // Extracted entities that comes from extracted entity api
    const Datarows = [];

    return (
        <>
        <ToastContainer />
            <Grid container
                sx={{
                    width: "100%", 
                    height: "100%", 
                    boxSizing: "border-box", 
                    overflow: 'auto',  
                    '&::-webkit-scrollbar': {
                        width: '0px',     
                        backgroundColor: 'transparent' 
                    } 
                }}
            >
                {/* left part */}
                <Grid item  size={{xs: 12, sm: 12, md: 12, lg:6}} > {/* Left side whole component */}
                    <Grid container
                        sx={{
                            width: "auto",
                            height: "auto",
                            overflow: "hidden",
                            margin: 2,
                            marginTop: 4,
                            borderRadius: 8,
                            border: '2px solid #AF1E22',
                        }}
                    >
                        <Grid item size={{xs: 12, sm: 12, md: 12, lg:12}}  sx={{ height: '100%', width: '100%' }}>

                            <Box sx={{
                                bgcolor: '#ffe6e6',
                                display :'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            
                                p: 1,

                            }}>
                                <Typography variant="h5" sx={{ mr: 2 }}>Audio Files List</Typography>
                                <Box
                                    sx={{
                                    display: 'flex',
                                    border: '2px solid #AF1E22',
                                    backgroundColor: '#AF1E22',
                                    borderRadius: 5,
                                }}
                                >
                                    <Button
                                        sx={{
                                            color: activeButton === 'upload' ? '#AF1E22' : 'white',
                                            backgroundColor: activeButton === 'upload' ? 'white' : '#AF1E22',
                                            '& .MuiSwitch-thumb': { color: '#AF1E22' },
                                            '& .MuiSwitch-track': { backgroundColor: '#AF1E22', opacity: 1 },
                                            borderRadius: 5
                                        }}
                                        onClick={() => setActiveButton('upload')}
                                    >
                                        Upload audio
                                    </Button>
                                    <Button
                                        sx={{
                                            color: activeButton === 'available' ? '#AF1E22' : 'white',
                                            backgroundColor: activeButton === 'available' ? 'white' : '#AF1E22',
                                            '& .MuiSwitch-thumb': { color: '#AF1E22' },
                                            '& .MuiSwitch-track': { backgroundColor: '#AF1E22', opacity: 1 },
                                            borderRadius: 5
                                        }}
                                        onClick={() => setActiveButton('available')}
                                    >
                                        Available audio
                                    </Button>
                                </Box>
                            </Box>
                                        {/* container for table */}
                            <Grid container spacing={2} >
                                {/* {/* <Grid item xs={6} md={6} sx={{p:1}}><UploadFolder /></Grid> */}
                                <Grid item size={{xs: 12, sm: 12, md: 12, lg:12}}  gridColumn="12" flexGrow={1} >{activeButton=='upload' ?<UploadFolder />:<AvailableAudio />}
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
            </Grid>


                {/* Right part */}
                <Grid item  size={{xs: 12, sm: 12, md: 12, lg:6}}> {/*Right side whole component   */}
                
                    {/* Parent grid for 3 cards total audio files,speakers,languages */}
                    <Grid container spacing={1} sx={{
                        //  flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: { xs: 2, md: 4 },
                    }}>
                        {/* total audio files grid */}
                        <Grid item size={{xs: 12,  md: 12, lg:4}} >
                            <Card sx={{
                                bgcolor: "#009999",
                                borderRadius: '8px'
                            }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="white" gutterBottom>
                                        Total Audio Files
                                    </Typography>

                                    <Typography sx={{ fontSize: 30 }} color="white" gutterBottom>
                                        {TotalAudioFiles}
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Grid>
                        {/* Total speakers grid */}
                        <Grid item size={{xs: 12,  md: 12, lg:4}} >
                            <Card sx={{
                                bgcolor: "#e6ac00",
                                borderRadius: '8px'
                            }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="white" gutterBottom>
                                        Total Speakers
                                    </Typography>

                                    <Typography sx={{ fontSize: 30 }} color="white" gutterBottom>
                                        {TotalSpeakers}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                        {/* total languages grid */}
                        <Grid item size={{xs: 12,  md: 12, lg:4}} >
                            <Card sx={{
                                bgcolor: "#b33c00",
                                borderRadius: '8px'
                            }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 20 }} color="white" gutterBottom>
                                        Total Languages
                                    </Typography>

                                    <Typography sx={{ fontSize: 30 }} color="white" gutterBottom>
                                        {TotalLanguages}
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* parent grid of Detected languages and keyword analysis */}
                    <Grid container spacing={1} sx={{
                        justifyContent: "space-between",
                        textAlign: "center",
                        mt: 2,
                    }}>
                        {/* Lef side Detected Languages grid */}
                        <Grid item size={{xs: 12, sm:6, md: 6, lg:6}} sx={{ bgcolor: '#ffe6e6', height: 'auto', width: 'auto', borderRadius: 6 }}>
                            <Typography variant="h6" sx={{ alignItems: 'center', mt: 2 }}>Detected Languages</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={9}>
                                    <PieChart width={200} height={200}>
                                        <Pie
                                            data={data}
                                            cx={100}
                                            cy={100}
                                            innerRadius={50} // Creates the donut hole!
                                            outerRadius={80}
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getColor(entry.name)} /> // Helper function for colors
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </Grid>
                                <Grid item xs={6} md={3} sx={{ mt: 4 }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}>
                                        {data.map((item, index) => (
                                            <div key={`legend-item-${index}`} style={legendItemStyle}>
                                                <span style={{
                                                    ...legendDotStyle,
                                                    backgroundColor: getColor(item.name)
                                                }}></span>
                                                <span style={{ color: 'black' }}>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>

                                </Grid>
                            </Grid>



                            <Typography sx={{ fontSize: 13, mt: 1 }}>
                                <span style={{ color: 'red' }}>Insight</span> : Most files are in Chinese, followed by Hindi
                            </Typography>
                        </Grid>
                        {/* Right side keyword analysis grid */}
                        <Grid item size={{xs: 12, sm:6, md: 6, lg:6}} sx={{ bgcolor: '#ffe6e6', height: 'auto', width: 'auto', borderRadius: 6 }}>

                            <Typography variant="h6" sx={{ alignItems: 'center', mt: 1 }}>
                                Keyword Analysis
                            </Typography>

                            <Box sx={{
                                pl: 1, pr: 1,
                                bgcolor: 'whitesmoke',
                                borderRadius: 4,
                            }}><Typography variant="caption" component="div" justifyContent='space-between'>
                                    <span style={{ color: 'gray' }}>Neutral</span>&nbsp;&nbsp;
                                    <span>Positive</span>&nbsp;&nbsp;
                                    <span style={{ color: 'red' }}>Danger</span>
                                </Typography>
                                <Slider
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="sentiment"
                                    defaultValue={100}
                                    min={0}
                                    max={100}
                                    valueLabelDisplay="off"
                                    color={
                                        value <= 33 ? 'primary' : (value <= 66 ? 'success' : 'error')
                                    }
                                />
                            </Box>

                            {/* Table inside the keyword analysis */}

                            <Box sx={{
                                pl: 1, pr: 1, mt: 1,
                                //bgcolor: 'whitesmoke',
                                borderRadius: 4,
                            }}>

                                <TableContainer component={Paper} sx={{ height: '19vh' }}>
                                    <Table aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: '#ffcccc' }}>
                                            <TableRow>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Frequency</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Keyword</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Sentiment</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    // key={row.keyword}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '20px' }}
                                                >
                                                    <TableCell align="center" component="th" scope="row" sx={{ fontSize: '0.7rem', padding: '4px' }} >
                                                        {row.frequency}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.keyword}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.sentiment}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>


                            <Typography sx={{ fontSize: 13, mt: 1 }}>
                                <span style={{ color: 'red' }}>Insight</span> :The word <span style={{ color: 'Black' }}>'SECURITY'</span> appeared
                                most frequently across all audio
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* parent grid for sentiment summary */}
                    <Grid container sx={{
                        mt: 1,
                    }}>
                        <Grid item xs={12} md={12} sx={{ bgcolor: '#ffe6e6', height: '100%', width: '100%', borderRadius: 6 }}>
                            <Box sx={{
                                p: 1,
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                            }}>
                                <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Sentiment Summary</span>
                                <select
                                    value={selectedFile}
                                    onChange={handleFileChange}
                                    style={{
                                        border: '1px solid #f00',
                                        borderRadius: '6px',
                                        backgroundColor: '#ffe0e6',
                                        marginLeft: '30%',
                                        color: '#f00',
                                        fontFamily: 'sans-serif',
                                    }}
                                >
                                    <option>Your-audio-file-01.wav</option>
                                    <option>Another-audio-file.wav</option>
                                    <option>Yet-another-file.wav</option>
                                </select>

                            </Box>
                            <Typography>{sentisumData}</Typography>
                        </Grid>
                    </Grid>


                    {/* parent grid for sentiment summary */}
                    <Grid container sx={{
                        mt: 1,
                    }}>
                        <Grid item xs={12} md={12} sx={{ bgcolor: '#ffe6e6', height: '100%', width: '100%', borderRadius: 6 }}>
                            <Box sx={{
                                p: 1,
                                mb: 1,
                            }}>
                                <span style={{  fontWeight: 'bold' }}>Extracted Entities </span>       

                                <Box sx={{
                                pl: 1, pr: 1, mt: 1,
                                //bgcolor: 'whitesmoke',
                                borderRadius: 4,
                            }}>
                                    {/* File name Person name Place names Locations Keywords */}
                                <TableContainer component={Paper} sx={{ height: '15vh' }}>
                                    <Table aria-label="simple table">
                                        <TableHead sx={{ backgroundColor: '#ffcccc' }}>
                                            <TableRow>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>File name</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Person name</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Place names</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Locations</TableCell>
                                                <TableCell align="center" sx={{ fontSize: '0.8rem', padding: '4px' }}>Keywords</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Datarows.map((row) => (
                                                <TableRow
                                                    key={row.keyword}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '20px' }}
                                                >
                                                    <TableCell align="center" component="th" scope="row" sx={{ fontSize: '0.7rem', padding: '4px' }} >
                                                        {row.FileName}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.PersonName}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.PlaceNames}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.Locations}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '0.7rem', padding: '4px' }}>
                                                        {row.Keywords}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>                        
                            </Box>
                            
                        </Grid>
                    </Grid>

                
                </Grid>
            </Grid>
        </>
    )
}
export default BulkAnalysis;