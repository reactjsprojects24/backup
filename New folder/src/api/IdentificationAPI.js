import axios from 'axios';

import handleApiError from '../utils/apiErrorHandler';

const API_BASE_URL = 'http://localhost:8000';



const IdentificationAPI = {

    identifyGender: async (audio_id, model) => {
        console.log("audio_id, model in api identification  ",audio_id, model);
        try {
            const response = await axios.post(`${API_BASE_URL}/api/identification/gender`, {
                audio_id,
                model
            });
            return response.data;
        } catch (error) {
            handleApiError(error, 'Failed to identify gender');
            return null;
        }
    },

    // Language Identification
    identifyLanguage: async (audio_id, model) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/identification/language`, {
                audio_id,
                model
            });
            return response.data;
        } catch (error) {
            handleApiError(error, 'Failed to identify language');
            return null;
        }
    },

    // Dialect Identification
    identifyDialect: async (audio_id, model) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/identification/dialect`, {
                audio_id,
                model
            });
            return response.data;
        } catch (error) {
            handleApiError(error, 'Failed to identify dialect');
            return null;
        }
    },



};
export default IdentificationAPI;