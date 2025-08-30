import axios from 'axios';
import { store } from '../redux/store';
import handleApiError from '../utils/apiErrorHandler';
import { API } from "./apiConfig";

// Helper function to get token( Later implement axios interceptor)
const getAuthHeaders = () => {
  const token = store.getState().auth.token;
  console.log("token**************", token);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const audioApi = {

  // Upload Audio File Api
  uploadAudio: async (file) => {
    // const token = store.getState().auth.token;
    // console.log("file to send**************",token);

    const formData = new FormData();
    const fileToSend = Array.isArray(file) ? file[0] : file;
    console.log("=================", fileToSend instanceof File);
    if (!fileToSend) {
      handleApiError(new Error("No audio file provided"), "Failed to enroll speaker: No audio file");
      return null; // Or throw an error
    }

    formData.append('file', fileToSend); // Corrected key
    try {
      const response = await axios.post(API.UPLOAD_FILE, formData, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to upload audio');
      return null;
    }
  },

  // Audio Metadata Api
  getAudioMetadata: async (fileId) => {
    try {
      const response = await axios.get(`${API.AUDIO_METADATA}`, {
        headers: getAuthHeaders(),
        params: {
          file_id: fileId,
        },
      },
      );
      console.log("response of metadata ", response)
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio metadata');
      return null;
    }
  },

  // Noise Removal Api

  getNoiseRemoval: async (data) => {
    try {
      console.log("got noise removal api ", data);
      const response = await axios.post(API.NOISE_REMOVAL, data, {
        headers: getAuthHeaders(),
      });
      console.log(response, "response NOISE REMOVAL========", response);

      return response.data;
    } catch (error) {
      handleApiError(error, 'failed to post noise removal');
      return null;
    }
  },

  // Audio Analyze Api
  analyzeAudio: async (data) => {
    console.log("**** data in api analyze ****", data);
    try {
      console.log("got Analyze api ", data);
      const response = await axios.post(API.AUDIO_ANALYZE, data, {
        headers: getAuthHeaders(),
      });
      console.log(response, "response Analyze========", response.data);

      return response.data;
    } catch (error) {
      handleApiError(error, 'failed to post audio analyze');
      return null;
    }
  },


  // 
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
      console.log(folder, "api folder");
      console.log("formdataaaaaaaaaa", formData);
      // Remove Content-Type header -- let axios handle it
      const response = await axios.post(API.UPLOAD_FOLDER, formData);

      console.log("response----------------------", response);
      console.log("before return bulk API call");

      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to upload audio folder');
      return null;
    }
  },

  getAudioFiles: async () => {
    try {
      const response = await axios.get(API.LIST_AUDIO_FILES);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio files');
      return [];
    }
  },

  getAudioFilesByFolder: async () => { // Renamed for clarity
    try {
      const response = await axios.get(API.LIST_AUDIO_FILES_BY_FOLDER);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to get audio files by folder');
      return [];
    }
  },

  deleteAudioFile: async (audioId) => {
    try {
      const response = await axios.delete(`${API.DELETE_AUDIO_FILE}${audioId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to delete audio file');
      return null;
    }
  },

  deleteFolder: async (folderName) => {
    try {
      const response = await axios.delete(`${API.DELETE_FOLDER}${folderName}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to delete folder');
      return null;
    }
  },


};

export default audioApi;