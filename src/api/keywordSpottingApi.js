import axios from 'axios';
import handleApiError from '../utils/apiErrorHandler';
import { API } from "./apiConfig";

const keywordSpottingApi = {
  createKeywordGroup: async (groupName) => {
    try {
      const response = await axios.post(API.CREATE_KEYWORD_GROUPS, { group_name: groupName });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword group');
      return null;
    }
  },

  createKeywordInGroup: async (groupId, keyword, synonyms) => {
    try {
      const response = await axios.post(`${API.CREATE_KEYWORD_IN_GROUP}${groupId}/keywords`, {
        keyword: keyword,
        synonyms: synonyms || []
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create keyword in group');
      return null;
    }
  },

  getKeywordsInGroup: async (groupId) => {
    try {
      console.log("group id to get keywords in ",groupId);
      const response = await axios.get(`${API.LIST_KEYWORDS_BY_GROUP}${groupId}/keywords`);
      return response.data;
    }catch (error) {
      handleApiError(error, 'Failed to get keywords in group');
      return null;
    }
  },

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