import { createAsyncThunk } from '@reduxjs/toolkit';
import keywordSpottingApi from '../../api/keywordSpottingApi';
import  {
  setKeywordGroups,
  setKeywordsInGroup,
  setSpottingResults,
  setLoading,
  setError,
  clearSpottingResults
} from '../slices/keywordSpottingSlice';


export const createKeywordGroup = createAsyncThunk(
  'keywordSpotting/createKeywordGroup',
  async (groupName, { dispatch }) => {
    try {
      console.log("groupName--------------",groupName);
      const KeywordGroupResponse= await keywordSpottingApi.createKeywordGroup(groupName);
      console.log("KeywordGroupResponse------------",KeywordGroupResponse);
       const response = await dispatch(setKeywordGroups({KeywordGroupResponse,groupName}));
      return KeywordGroupResponse;
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to create keyword group'));
    }
  }
);

export const createKeywordInGroup = createAsyncThunk(
  'keywordSpotting/createKeywordInGroup',
  async ({ groupId, keywordName ,synonyms}, { dispatch }) => {
    try {
      console.log("groupId, keywordName ,synonyms ---------------- ",groupId, keywordName ,synonyms);
      const response =await keywordSpottingApi.createKeywordInGroup(groupId, keywordName ,synonyms);
      console.log("response of keyword in group ------------",response);
      return response;
    } catch (error) {
      return dispatch(setError(error.message || 'Failed to create keyword in group'));
    }
  }
);

export const getKeywordsInGroup = createAsyncThunk(
    'keywordSpotting/getKeywordsInGroup',
    async (groupId, {dispatch}) => {
        try{
          console.log("groupIdgroupIdgroupIdgroupId",groupId);
            const response = await keywordSpottingApi.getKeywordsInGroup(groupId);
            console.log("responseeeeeeeeeeee in getKeywordsInGroup thunk -------",response);
            dispatch( setKeywordsInGroup(response));
            
            return response;
        }
        catch(error) {
            return dispatch(setError(error.message || "Failed to get keywords in group"));
        }
    }
)

// Spot Keywords
export const spotKeywords = createAsyncThunk(
  'keywordSpotting/spotKeywords',
  async ({ keyword, caseSensitive, wholeWord, synonyms, model }, { dispatch }) => {
    try {
      console.log("keyword, caseSensitive, wholeWord, synonyms, model in thunk ",keyword, caseSensitive, wholeWord, synonyms, model)
      const response = await keywordSpottingApi.spotKeywords(keyword, caseSensitive, wholeWord, synonyms, model);
      dispatch(setSpottingResults(response));
      console.log("spotKeywordsthunk response",response);
      return response;
    } catch (error) {
      dispatch(setError(error.message || 'Failed to spot keywords'));
      return Promise.reject(error);
    }
  }
);


// No actions needed in this file currently