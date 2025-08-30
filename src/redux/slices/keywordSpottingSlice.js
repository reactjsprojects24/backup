import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keywordGroups: [],
  keywordsInGroup: [],
  spottingResults: [],
  loading: false,
  error: null
};

const keywordSpottingSlice = createSlice({
  name: 'keywordSpotting',
  initialState,
  reducers: {
    setKeywordGroups: (state, action) => {
      state.keywordGroups = action.payload;
    },
    setKeywordsInGroup: (state, action) => {
      state.keywordsInGroup = action.payload;
    },
    setSpottingResults: (state, action) => {
      state.spottingResults = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSpottingResults: (state) => {
      state.spottingResults = null;
    }
  },
});

export const {
  setKeywordGroups,
  setKeywordsInGroup,
  setSpottingResults,
  setLoading,
  setError,
  clearSpottingResults
} = keywordSpottingSlice.actions;

export default keywordSpottingSlice.reducer;