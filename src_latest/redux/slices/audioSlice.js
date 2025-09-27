import { createSlice } from '@reduxjs/toolkit';

import { uploadAudioThunk } from "../thunks/audioThunks";

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    uploadedFile: null, //for single uploaded file
    // uploadedFile: {}, // for multiple uploaded files
    channelType: null,
    metadata: null,
    noiseRemovedAudio: null,
    audioAnalysis: null,
    audioFiles: [], //for getting list of all audio files
    filesByFolder: {},
    loading: false,
    error: null,




    language: null,
    gender: null,
    transcription: null,
    translation: null,
    sentiment: null,
    entities: null
  },
  reducers: {
    // for single uploaded file
    setUploadedFile: (state, action) => {
      state.uploadedFile = action.payload;
    },

    //For multiple uploaded files

    // setUploadedFile: (state, action) => {
    //   const fileObj = action.payload.upload_response[0];
    //   const fileId = fileObj.file_id;
    //   if (!state.uploadedFile[fileId]) state.uploadedFile[fileId] = {};
    //   state.uploadedFile[fileId] = {
    //     ...state.uploadedFile[fileId],
    //     ...fileObj, // store file info
    //   };
    // },

    // setAudioChannelType: (state, action) => {
    //   const { fileId, channelType } = action.payload;
    //   if (!state.uploadedFile[fileId]) state.uploadedFile[fileId] = {};
    //   state.uploadedFile[fileId].channelType = channelType;
    // },

    // To set channel type of uploaded file
    setAudioChannelType: (state, action) => {
      state.channelType = action.payload;
    },

    // for metadata of uploaded file
    setMetadata: (state, action) => {
      state.metadata = action.payload;
    },

    // for noise removed audio
    setNoiseRemovedAudio: (state, action) => {
      state.noiseRemovedAudio = action.payload;
    },

    // for getting list of all audio files
    setAudioFiles: (state, action) => {
      state.audioFiles = action.payload;
    },

    setFilesByFolder: (state, action) => {
      state.filesByFolder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearMetadata: (state) => { // Add an action to clear metadata
      state.metadata = null;
    },



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
    clearAnalysisState: (state) => {
      state.language = null;
      state.gender = null;
      state.transcription = null;
      state.translation = null;
      state.sentiment = null;
      state.entities = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadAudioThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAudioThunk.fulfilled, (state, action) => {
        console.log("Upload success, response:", action.payload);
        state.loading = false;
        state.uploadedFile = action.payload;
      })
      .addCase(uploadAudioThunk.rejected, (state, action) => {
        console.log("Upload failed, error:", action.payload || action.error);
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  }

});

export const { setUploadedFile, setAudioChannelType, setMetadata, setNoiseRemovedAudio, setAudioAnalysis, setAudioFiles, setFilesByFolder, setLoading, setError, clearMetadata,
  setLanguage, setGender, setTranscription, setTranslation, setSentiment, setEntities, clearAnalysisState
} = audioSlice.actions;

export default audioSlice.reducer;