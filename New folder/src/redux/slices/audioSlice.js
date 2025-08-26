import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    audioFiles: [],
    filesByFolder: {}, 
    noiseRemovedAudio: null,
    loading: false,
    error: null,
    metadata: null, 
  },
  reducers: {
    setAudioFiles: (state, action) => {
      state.audioFiles = action.payload;
    },
    setFilesByFolder: (state, action) => {
      state.filesByFolder = action.payload;
    },
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    setNoiseRemovedAudio: (state, action) => {
      state.noiseRemovedAudio = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearMetadata: (state) => { // Add an action to clear metadata
      state.metadata = null;
    }
  },
});

export const { setAudioFiles, setFilesByFolder, setMetadata, setNoiseRemovedAudio, setLoading, setError, clearMetadata } = audioSlice.actions;

export default audioSlice.reducer;