import { createAsyncThunk } from '@reduxjs/toolkit';
import audioApi from '../../api/audioAPI';
import {
  setAudioFiles,
  setMetadata,
  setAudioAnalysis,
  setFilesByFolder,
  setLoading,
  setNoiseRemovedAudio,
  setError,
} from '../slices/audioSlice';
import { identifyDialectThunk, identifyGenderThunk, identifyLanguageThunk } from './IdentificationThunk';


// Audio Upload Thunk
export const uploadAudioThunk = createAsyncThunk(
  'audio/uploadAudio',
  async (file, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const uploadedFile = await audioApi.uploadAudio(file);
      console.log("uploadedFile in thunk==================", uploadedFile.upload_response);

      const fileObj = uploadedFile.upload_response[0];
       console.log("============ fileObj ==================", fileObj);
      const fileId = fileObj?.file_id;
      console.log("========== fileId ==================", fileId);

      dispatch(setAudioFiles(uploadedFile));

      const metadataudioId = fileId;
      console.log("metadataudioId in thunk==================", metadataudioId);
      dispatch(getAudioMetadataThunk(metadataudioId));
      console.log("after dispatching to metadata######## ")
      return uploadedFile;

    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Get Audio Metadata Thunk
export const getAudioMetadataThunk = createAsyncThunk(
  'audio/getAudioMetadata',
  async (fileId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const metadata = await audioApi.getAudioMetadata(fileId);
      dispatch(setMetadata(metadata));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Noise Removal Thunk
export const noiseRemovalAudioThunk = createAsyncThunk(
  '/api/noise-removal',
  async (data, { dispatch }) => {
    try {
      console.log("noiseRemovalAudioThunk -------", data)
      dispatch(setLoading(true));
      const response = await audioApi.getNoiseRemoval(data);
      dispatch(setNoiseRemovedAudio(response));

      console.log("noiseRemovalAudioThunk", response);
      return response;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false))
    }
  }
);

// Audio Analysis Thunk
export const analyzeAudioThunk = createAsyncThunk(
  'audio/analyzeAudio',
  async (payload, { dispatch }) => {
    try {
      dispatch(setLoading(true));
     const response = await audioApi.analyzeAudio(payload);
     dispatch(setAudioAnalysis(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

//  Get Audio Files Thunk
export const getAudioFilesThunk = createAsyncThunk(
  'audio/getAudioFiles',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const audioFiles = await audioApi.getAudioFiles();
      dispatch(setAudioFiles(audioFiles));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getAudioFilesByFolderThunk = createAsyncThunk(
  'audio/getAudioFilesByFolder',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const filesByFolder = await audioApi.getAudioFilesByFolder();
      dispatch(setFilesByFolder(filesByFolder));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const uploadAudioFolderThunk = createAsyncThunk(
  'audio/uploadAudioFolder',
  async (folderData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const uploadedFolder = await audioApi.uploadAudioFolder(folderData);
      //refresh file List
      // await dispatch(getAudioFilesThunk());
      return uploadedFolder;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteAudioFileThunk = createAsyncThunk(
  'audio/deleteAudioFile',
  async (audioId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await audioApi.deleteAudioFile(audioId);
      //refresh file List
      await dispatch(getAudioFilesThunk());
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const deleteFolderThunk = createAsyncThunk(
  'audio/deleteFolder',
  async (folderId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await audioApi.deleteFolder(folderId);
      //refresh file List
      await dispatch(getAudioFilesThunk());
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);


