
import { createSlice } from "@reduxjs/toolkit";

const transcriptionSlice = createSlice({
    name:'transcription',
    initialState:{
        transcript:[],
        transcriptions:[],
        loading: false,
        error: null,
    },
    reducers :{
        setTranscript : (state, action) => {
            state.transcript = action.payload;
        },
        setTranscriptions : (state, action) => {
            state.transcriptions = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const {setTranscript, setTranscriptions, setLoading, setError} = transcriptionSlice.actions;
export default transcriptionSlice.reducer;