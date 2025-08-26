import { createAsyncThunk } from '@reduxjs/toolkit';
import audioApi from '../../api/audioAPI';
import {
  setAudioFiles,
  setFilesByFolder,
  setMetadata,
  setLoading,
  setNoiseRemovedAudio,
  setError,
} from '../slices/audioSlice';
import { identifyDialectThunk, identifyGenderThunk, identifyLanguageThunk } from './IdentificationThunk';



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

export const getAudioMetadataThunk = createAsyncThunk(
  'audio/getAudioMetadata',
  async (audioId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const metadata = await audioApi.getAudioMetadata(audioId);
      dispatch(setMetadata(metadata));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);



export const uploadAudioThunk = createAsyncThunk(
  'audio/uploadAudio',
  async (file, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const uploadedFile = await audioApi.uploadAudio(file); 
       dispatch(setAudioFiles(uploadedFile)); 
      
      const metadataudioId=uploadedFile.audio_id;
      dispatch(getAudioMetadataThunk(metadataudioId));

      // dispatch(getAudioFilesThunk());

      return uploadedFile;
      
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

export const noiseRemovalAudioThunk = createAsyncThunk(
  '/api/noise-removal',
  async (data, {dispatch}) => {
    try{
      console.log("noiseRemovalAudioThunk -------",data)
      dispatch(setLoading(true));
      const response = await audioApi.getNoiseRemoval(data);
      dispatch(setNoiseRemovedAudio(response));

      console.log("noiseRemovalAudioThunk",response);
      return response;


    }catch(error){
      dispatch(setError(error.message));
    }finally{
      dispatch(setLoading(false))
    }
  }
);
