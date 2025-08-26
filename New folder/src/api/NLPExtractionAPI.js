import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";

const API_BASE_URL = 'http://localhost:8000';

const NLPExtractionAPI ={

    grammerCorrection : async(text) => {
        console.log( "Text in grammer api",text);
        try{
            
            const response = await axios.post(`${API_BASE_URL}/api/nlp/grammar-correction`,{
                text
            });
            return response.data;
        }catch(error){
            handleApiError(error ,"failed to post grammer correction");
            return null;
        }

    },

    sentimentAnalysis : async(text) => {
        console.log("text in sentiment api",text);
        try{
            const response =await axios.post(`${API_BASE_URL}/api/nlp/sentiment-analysis`,{
                text
            });
            return response.data;
        }catch(error){
            handleApiError(error,"failed to post sentiment analysis");
            return null;
        }
    },

    entityExtraction : async(text) => {
        console.log("text in entity extraction",text);
        try{
            const response =await axios.post(`${API_BASE_URL}/api/nlp/entity-extraction`,{
                text
            });
            return response.data;
        }catch(error){
            handleApiError(error ,"failed to post entity extraction");
            return null;
        }
    },
};

export default NLPExtractionAPI;