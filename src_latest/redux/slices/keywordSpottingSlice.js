import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groupList: [],
  keywordGroups: [],
  keywordsInGroup: [],
  spottingResults: [],
  deleteKeywordSet: (""),
  selectedGroup: "",
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
    // to set the group list
    setGroupList: (state, action) => {
      state.groupList = action.payload;
    },

    // To set Keywords in a group
    setKeywordsInGroup: (state, action) => {
      state.keywordsInGroup = action.payload;
    },

    // Clearing keywords in a group
    clearKeywordsInGroup: (state) => {
      state.keywordsInGroup = { keywords: [] }; // clear only
    },

    // To delete keywords with group
    setDeletedGroup: (state, action) => {
      state.deleteKeywordSet = action.payload;
    },

    // To set selected group
    // setSelectedGroup: (state, action) => {
    //   state.selectedGroup = action.payload;
    // },

    // Clear selected group
    // clearSelectedGroup: (state) => {
    //   state.selectedGroup = "";
    // },

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
  clearSpottingResults,
  setGroupList,
  setDeletedGroup,
  clearKeywordsInGroup,
  // clearSelectedGroup
} = keywordSpottingSlice.actions;

export default keywordSpottingSlice.reducer;