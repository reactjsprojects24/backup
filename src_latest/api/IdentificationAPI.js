import axios from 'axios';

import handleApiError from '../utils/apiErrorHandler';
import { API } from "./apiConfig";

const IdentificationAPI = {

    identifyGender: async (audio_id, model) => {
        console.log("audio_id, model in api identification  ",audio_id, model);
        try {
            const response = await axios.post(API.GENDER_IDENTIFICATION, {
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
            const response = await axios.post(API.LANGUAGE_IDENTIFICATION, {
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
            const response = await axios.post(API.DIALECT_IDENTIFICATION, {
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