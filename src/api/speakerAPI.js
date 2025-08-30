import { RepeatOneSharp } from "@mui/icons-material";
import axios from "axios";

import handleApiError from "../utils/apiErrorHandler";

const API_BASE_URL = 'http://localhost:8000';

const speakerApi = {

    enrollSpeaker: async (audioFile, speakerName, model) => {
        // console.log(" came into api call with values",audioFile , "speaker name ",speakerName , " modelllll" ,model);
        console.log("came into api call with values", audioFile, "speaker name ", speakerName, " modelllll", model);

        const formData = new FormData();


        if (!audioFile || audioFile.length === 0) {
            handleApiError(new Error("No audio files provided"), "Failed to enroll speaker: No audio files");
            return null;
        }

        // Iterate through the audioFiles array and append each one to the FormData
        audioFile.forEach(file => {
            formData.append('audio_file', file); // Append each file individually
        });

        formData.append('speaker_name', speakerName);
        formData.append('model', model);

        console.log("in api call form data", formData); // Log to inspect the FormData


        try {
            const response = await axios.post(`${API_BASE_URL}/api/speakers`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Important!
                }
            });
            return response.data;
        } catch (error) {
            handleApiError(error, "failed to enroll a speaker");
            return null;
        }
    },

    listSpeakers: async () => {
        try {
            console.log("got a call for data");
            const response = await axios.get(`${API_BASE_URL}/api/speakers`);
            return response.data;

        } catch (error) {
            handleApiError(error, 'failed to get list of speakers');
            return [];
        }
    },

    deleteSpeakerById: async (speakerId) => {
        try {
            console.log("check two in api", speakerId);
            const response = await axios.delete(`${API_BASE_URL}/api/speakers/${speakerId}`);
            return response.data;
        } catch (error) {
            handleApiError(error, 'failed to delete speaker ');
            return null;
        }

    },
    identifySpeaker: async (audioFile, model) => {
        console.log("into api ", audioFile, model);

        const formData = new FormData();

        if (!audioFile || audioFile.length === 0) {
            handleApiError(new Error("No audio files provided"), "Failed to enroll speaker: No audio files");
            return null;
        }

        // Iterate through the audioFiles array and append each one to the FormData
        audioFile.forEach(file => {
            formData.append('audio_file', file); // Append each file individually
        });
        formData.append('model', model);
        console.log("formdataa out try", formData);
        try {
            console.log("formdataa", formData);
            const response = await axios.post(`${API_BASE_URL}/api/speakers/identify`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("done with api", response.data);
            return response.data;
        } catch (error) {
            handleApiError(error, " failed to identify the speaker");
            return null;
        }

    },

    diarizeSpeaker: async (audioFile, model) => {
        const formData = new FormData();

        if (!audioFile && audioFile.length === 0) {
            handleApiError(new Error("No audio files provided"), "Failed to enroll speaker: No audio files");
            return null;
        }
        audioFile.forEach(file => {
            formData.append('audio_file', file);

        });
        formData.append('model',model)

        try {
            const response = await axios.post(`${API_BASE_URL}/api/speakers/diarize`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response;
        } catch (error) {
            handleApiError(error, "Failed to Diarize Speaker");
            return null;
        }

    },



}

export default speakerApi;