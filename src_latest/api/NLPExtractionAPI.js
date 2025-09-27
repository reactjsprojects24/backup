import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";
import { API } from "./apiConfig";
import { store } from '../redux/store';

// Helper function to get token( Later implement axios interceptor)
const getAuthHeaders = () => {
    const token = store.getState().auth.access_token;
    console.log("token**************", token);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const NLPExtractionAPI = {
    grammerCorrection: async (data) => {
        try {
            const response = await axios.post(API.GRAMMAR_CORRECTION, data, {
                headers: getAuthHeaders(),
            });
            return response.data;
        } catch (error) {
            // handleApiError(error ,"failed to post grammer correction");
            console.log("failed to post grammer correction");
            return null;
        }

    }

    // sentimentAnalysis : async(text) => {
    //     console.log("text in sentiment api",text);
    //     try{
    //         const response =await axios.post(`${API_BASE_URL}/api/nlp/sentiment-analysis`,{
    //             text
    //         });
    //         return response.data;
    //     }catch(error){
    //         // handleApiError(error,"failed to post sentiment analysis");
    //         return null;
    //     }
    // },

    // entityExtraction : async(text) => {
    //     console.log("text in entity extraction",text);
    //     try{
    //         const response =await axios.post(`${API_BASE_URL}/api/nlp/entity-extraction`,{
    //             text
    //         });
    //         return response.data;
    //     }catch(error){
    //         // handleApiError(error ,"failed to post entity extraction");
    //         return null;
    //     }
    // },
};

export default NLPExtractionAPI;