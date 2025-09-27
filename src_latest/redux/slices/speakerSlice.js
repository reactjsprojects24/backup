import { createSlice } from "@reduxjs/toolkit";

const speakerSlice = createSlice({
    name: 'speaker',
    initialState: {
        speakers: [],
        identifiedSpeaker: [],
        diarizedResults: null,
        noiseRemovedAudio: null,
        loading: false,
        error: null,

    },
    reducers: {
        setspeakers: (state, action) => {
            state.speakers = action.payload;
        },
        setidentifiedSpeaker : (state , action) => {
            state.identifiedSpeaker = action.payload;
        },
        setdiarizedResults :(state, action) => {
            state.diarizedResults=action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state , action ) => {
            state.error = action.payload;
        }
    },
});
export const { setspeakers, setidentifiedSpeaker,setLoading, setError } =speakerSlice.actions;

export default speakerSlice.reducer;