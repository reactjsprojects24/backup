import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Grid } from "@mui/system";

const AudioEditing = () =>{

    return(
        <>
        <Grid container sx={{
                mt: 3, ml: 3, mr: 3,
                height: '80%',
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
                        <Typography variant="h5" >Audio Editing page</Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default AudioEditing;
