import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";
import { API } from "./apiConfig";
import { store } from "../redux/store";

const API_BASE_URL = 'http://localhost:8000';


// Helper function to get token( Later implement axios interceptor)
const getAuthHeaders = () => {
    const token = store.getState().auth.access_token;
    console.log("token inside translate text api**************", token);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const translationApi = {
// text Translation Api
    textTranslation: async (data) => {
        console.log("**** INSIDE TRANSLATE API DATA IS**** ",data);
        try {
            const response = await axios.post(API.TEXT_TRANSLATE, data, {
                headers: getAuthHeaders(),
            });
            console.log("response data of translations api ", response.data);
            return response.data;
        } catch (error) {
            // handleApiError(error, 'failed to post uploadtextTranslate');
            console.log(error, 'failed to post uploadtextTranslate');
            return null;
        }
    },

    
     // **************************************************************************

    uploadbulkTranslate: async (folderPath, model) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/translations/bulk`, {
                folderPath,
                model
            });
            return response.data;
        } catch (error) {
            handleApiError(error, 'failed to post uploadbulkTranslate');
            return null;
        }
    },




    getTranslation: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/translations`);
            return response.data;
        } catch (error) {
            handleApiError(error, "Failed to get List of translations ");
            return [];
        }
    },
};

export default translationApi;