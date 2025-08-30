import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";

const API_BASE_URL = 'http://localhost:8000';

const transcriptionApi = {

    transcribeAudio : async(data) => {

        try{
            console.log(" transcribe audio api -------",data);
            const response = await axios.post(`${API_BASE_URL}/api/transcriptions` ,data);
            return response.data;
        }catch(error){
            handleApiError(error,"failed to post transcribe audio");
            return null;
        }
    },

    getTranscriptions : async() => {
        try{

            const response = await axios.get(`${API_BASE_URL}/api/transcriptions`);
            return response.data;
        }catch(error){
            handleApiError(error,"failed to get transcriptions ");
            return null;
        }
    },

}

export default transcriptionApi;