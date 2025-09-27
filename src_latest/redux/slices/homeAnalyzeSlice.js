import { createSlice } from '@reduxjs/toolkit';

const homeAnalyzeSlice = createSlice({
    name: 'analyze',
    initialState: {
        language: null,
        gender: null,
        transcription: null,
        translation: null,
        sentiment: null,
        entities: null
    },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setTranscription: (state, action) => {
            state.transcription = action.payload;
        },
        setTranslation: (state, action) => {
            state.translation = action.payload;
        },
        setSentiment: (state, action) => {
            state.sentiment = action.payload;
        },
        setEntities: (state, action) => {
            state.entities = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        // for audio analysis
        setAudioAnalysis: (state, action) => {
            state.audioAnalysis = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },

});

export const { setLanguage, setGender, setTranscription, setTranslation, setSentiment, setEntities, setLoading, setAudioAnalysis, setError } = homeAnalyzeSlice.actions;

export default homeAnalyzeSlice.reducer;