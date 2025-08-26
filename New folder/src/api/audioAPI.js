import axios from 'axios';

import handleApiError from '../utils/apiErrorHandler';
import { API } from "./apiConfig";

const API_BASE_URL = 'http://localhost:8000';



const audioApi = {

  uploadAudio: async (file) => {

    const formData = new FormData();
    const fileToSend = Array.isArray(file) ? file[0] : file[0];

    if (!fileToSend) {
        handleApiError(new Error("No audio file provided"), "Failed to enroll speaker: No audio file");
        return null; // Or throw an error
    }

    // formData.append('x-user-id',"68a993f8f627dfcc06342966")
    formData.append('file', fileToSend); // Corrected key
    try {

      console.log("formmmmmmmmmmmmmmmmmmmmmmmmmmm",formData);
      const response = await axios.post(API.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Explicitly set content type
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to upload audio');
      return null;
    }
  },

  uploadAudioFolder: async (folder) => {
    const formData = new FormData();
    if (!folder || !Array.isArray(folder)) {
      throw new Error("Invalid folder format. Folder must be an array.");
    }
    // Iterate through the files in the folder
    folder.forEach((file, index) => {
      if (file instanceof File) { // Check if it's a File object
        formData.append("files", file); // Append each file individually
        
      } else {
        console.warn(`Skipping non-file item at index ${index}:`, file);
        // Potentially handle non-file items (e.g., log an error)
      }
    });

    try {
      console.log("bulk API call");
      console.log(folder,"api folder");
      console.log("formdataaaaaaaaaa",formData);
      // Remove Content-Type header -- let axios handle it
      const response = await axios.post(`${API_BASE_URL}/api/audio/upload-folder`, formData);

      console.log( "response----------------------",response);
      console.log("before return bulk API call");
      
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to upload audio folder');
      return null;
    }
  },

  getAudioFiles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/audio/files`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio files');
      return [];
    }
  },

  getAudioFilesByFolder: async () => { // Renamed for clarity
    try {
      const response = await axios.get(`${API_BASE_URL}/api/audio/files/folders`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio files by folder');
      return [];
    }
  },

  deleteAudioFile: async (audioId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/audio/files/${audioId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to delete audio file');
      return null;
    }
  },

  deleteFolder: async (folderName) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/audio/folders/${folderName}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to delete folder');
      return null;
    }
  },

  getAudioMetadata: async (audioId) => {
    try {
      const response = await axios.get(API.AUDIO_METADATA`${audioId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio metadata');
      return null;
    }
  },
  
   getNoiseRemoval: async (data) => {
    try{
      console.log("got noise removal api ",data);
      const response = await axios.post(API.NOISE_REMOVAL, data);
      console.log(response,"response========");
      
      return response.data;
    }catch(error){
      handleApiError(error, 'failed to post noise removal');
      return null;
    }
  },


};

export default audioApi;