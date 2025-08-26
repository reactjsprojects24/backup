import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";

const API_BASE_URL = 'http://localhost:8000';

const translationApi ={

    uploadtextTranslate: async(text_file,text,audio_id,language_from,language_to,model) => {

        const formData = new FormData();

        if(text_file){
            formData.append('text_file',text_file);
        }
        if(text){
            formData.append('text',text);
        }
        if(audio_id){
            formData.append('audio_id',audio_id);
        }
        formData.append('language_from',language_from);
        formData.append('language_to',language_to);
        formData.append('model',model);

        try{

            const response = await axios.post(`${API_BASE_URL}/api/translations`,formData ,{
                headers: {
                    'Content-Type' : 'multipart/form-data',
                },
            });
            console.log("response data of translations api ",response.data);
            return response.data;
        }catch(error){
            handleApiError(error , 'failed to post uploadtextTranslate');
            return null;
        }

    },

    uploadbulkTranslate: async(folderPath,model) => {
        try{
            const response = await axios.post(`${API_BASE_URL}/api/translations/bulk`,{
                folderPath,
                model
            });
            return response.data;
        }catch(error){
            handleApiError(error , 'failed to post uploadbulkTranslate');
            return null;
        }
    },

    getTranslation: async() => {
        try{
            const response = await axios.get(`${API_BASE_URL}/api/translations`);
            return response.data;
        }catch(error){
            handleApiError(error,"Failed to get List of translations ");
            return [];
        }
    },
};

export default translationApi;