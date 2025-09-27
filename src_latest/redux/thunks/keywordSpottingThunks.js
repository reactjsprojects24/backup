import { createAsyncThunk } from '@reduxjs/toolkit';
import keywordSpottingApi from '../../api/keywordSpottingApi';
import {
  setKeywordGroups,
  setKeywordsInGroup,
  setSpottingResults,
  setLoading,
  setError,
  clearSpottingResults,
  setGroupList,
  clearKeywordsInGroup,
  // clearSelectedGroup,
  setDeletedGroup
} from '../slices/keywordSpottingSlice';

// Create Group with Keywords
export const createKeywordGroupThunk = createAsyncThunk(
  'keywordSpotting/createKeywordGroup',
  async (data, { dispatch }) => {
    try {
      console.log("groupName--------------", data);
      const KeywordGroupResponse = await keywordSpottingApi.createKeywordGroup(data);
      console.log("KeywordGroupResponse------------", KeywordGroupResponse);
      const parsedResults = JSON.parse(KeywordGroupResponse?.data);
      dispatch(setKeywordGroups(parsedResults));
      return parsedResults;
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to create keyword group'));
    }
  }
);

// Get List of Groups
export const getKeywordSetsThunk = createAsyncThunk(
  'keywordSpotting/getKeywordGroups',
  async (_, { dispatch }) => {
    try {
      const response = await keywordSpottingApi.getGroupList();
      console.log("------------- response of getKeywordGroupsThunk ---------", response);
      dispatch(setGroupList(response));
      return response;
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to get keyword groups'));
    }
  }
);

// Get Keywords by Group
export const getKeywordsByGroupThunk = createAsyncThunk(
  'keywordSpotting/getKeywordsByGroup',
  async (groupName, { dispatch }) => {
    try {
      console.log("groupIdgroupIdgroupIdgroupId", groupName);
      const response = await keywordSpottingApi.getKeywordsByGroup(groupName);
      console.log("******** Get keywords by group ******** ", response);
      dispatch(setKeywordsInGroup(response));
      return response;
    }
    catch (error) {
      return dispatch(setError(error.message || "Failed to get keywords in group"));
    }
  }
)

// update keywords in the specific group
export const updateKeywordsInGroupThunk = createAsyncThunk(
  'keywordSpotting/updateKeywordsInGroup',
  async ({ groupName, keywordList }, { dispatch }) => {
    console.log("*********************************** in the updatedKeyword Thunk ******************* ", groupName, "data ", keywordList);
    try {
      const response = await keywordSpottingApi.updateKeywords(groupName, keywordList);
      return response;
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to create keyword in group'));
    }
  }
);

// Delete Keyword Group

export const deleteGroupThunk = createAsyncThunk(
  'keywordSpotting/deleteKeywordGroup',
  async ({ groupName }, { dispatch }) => {
    try {
      const response = await keywordSpottingApi.deleteKeywordGroup(groupName);
      // dispatch(setDeletedGroup(response));
      if (response.status === "success") {
        dispatch(getKeywordSetsThunk()); // get group list
        // dispatch(clearSelectedGroup()) // to clear selected group
        dispatch(clearKeywordsInGroup()); // clearing keywords in the group
      }
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to delete group'));
    }
  }
)


// Keyword Spotting

export const keywordSpottingThunk = createAsyncThunk(
  'keywordspotting/spotting',
  async ({ data, dispatch }) => {
    try {
      const response = await keywordSpottingApi.keywordSpotting(data);
      console.log("response in the keywordSpotting thunk : ", response);
    }
    catch (error) {
      console.log("Inside spotting thunk ", error);
    }
  }
)


// *************************************************************************************

// Spot Keywords
export const spotKeywordsThunk = createAsyncThunk(
  'keywordSpotting/spotKeywords',
  async ({ keyword, caseSensitive, wholeWord, synonyms, model }, { dispatch }) => {
    try {
      console.log("keyword, caseSensitive, wholeWord, synonyms, model in thunk ", keyword, caseSensitive, wholeWord, synonyms, model)
      const response = await keywordSpottingApi.spotKeywords(keyword, caseSensitive, wholeWord, synonyms, model);
      dispatch(setSpottingResults(response));
      console.log("spotKeywordsthunk response", response);
      return response;
    } catch (error) {
      dispatch(setError(error.message || 'Failed to spot keywords'));
      return Promise.reject(error);
    }
  }
);
