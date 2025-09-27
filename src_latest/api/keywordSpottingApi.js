import axios from 'axios';
import handleApiError from '../utils/apiErrorHandler';
import { API } from "./apiConfig";
import { getAuthHeaders } from './audioAPI';

const keywordSpottingApi = {

  // Create group with keywords
  createKeywordGroup: async (data) => {
    try {
      const response = await axios.post(API.CREATE_KEYWORD_GROUPS, data, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword group');
      return null;
    }
  },

  // Get list of groups
  getGroupList: async () => {
    try {
      const response = await axios.get(API.LIST_KEYWORD_SETS, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword group');
      return null;
    }
  },

  // Get Keywords by Group
  getKeywordsByGroup: async (groupId) => {
    try {
      const response = await axios.get(`${API.LIST_KEYWORDS_BY_GROUP}${groupId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get keywords in group');
      return null;
    }
  },

  // Update keywords in group
  updateKeywords: async (groupName, keywordList) => {
    console.log("*********************************** in the updatekeyword apisss Thunk ******************* ", groupName, "data ", keywordList);
    try {
      const response = await axios.put(`${API.SAVE_KEYWORDs}${groupName}`, keywordList, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword in group');
      return null;
    }
  },


  // Delete Keyword Group/Set
  deleteKeywordGroup: async (groupName) => {
    console.log("*********************************** in the delete group  apisss Thunk ******************* ", groupName);
    try {
      const response = await axios.delete(`${API.DELETE_KEYWORD_SET}${groupName}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword in group');
      return null;
    }
  },

  // Keyword Spotting
  keywordSpotting: async (data) => {
    try {
      const response = await axios.post(API.KEYWORD_SPOTTING, data, {
        headers: getAuthHeaders(),
      })
      console.log("Response in the spotting ");
      return response;
    } catch (error) {
      console.log("error inside spotting ");
    }
  },


  // ********************************************************************************************


  spotKeywords: async (keywords, caseSensitive, wholeWord, synonyms, model) => {
    console.log("keywords (strings), caseSensitive, wholeWord, synonyms, model =------------", keywords, caseSensitive, wholeWord, synonyms, model);

    const requestBody = {
      keywords: keywords,
      case_sensitive: caseSensitive,
      whole_word: wholeWord,
      synonyms: synonyms,
      model: model,
    };

    console.log("Request Body:", requestBody); // Log the JSON payload
    console.log("Request Body (after stringify):", JSON.stringify(requestBody)); // Log the JSON string

    try {
      const response = await axios.post(API.KEYWORD_SPOTTING, JSON.stringify(requestBody), {
        headers: {
          'Content-Type': 'application/json', // Explicitly set Content-Type to JSON
        },
      });

      return response.data;

    } catch (error) {
      console.error("API error:", error);
      handleApiError(error, 'Failed to spot keywords');
      return null;
    }
  },

};

export default keywordSpottingApi;