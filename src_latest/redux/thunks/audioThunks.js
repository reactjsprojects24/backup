import { createAsyncThunk } from '@reduxjs/toolkit';
import audioApi from '../../api/audioAPI';
import {
  setUploadedFile,
  setAudioChannelType,
  setMetadata,
  setAudioAnalysis,
  setAudioFiles,
  setFilesByFolder,
  setLoading,
  setNoiseRemovedAudio,
  setError,
} from '../slices/audioSlice';
import { identifyDialectThunk, identifyGenderThunk, identifyLanguageThunk } from './IdentificationThunk';
import { setLanguage, setGender, setTranscription, setTranslation, setSentiment, setEntities } from '../slices/audioSlice'


// Audio Upload Thunk
export const uploadAudioThunk = createAsyncThunk(
  'audio/uploadAudio',
  async (file, { dispatch, rejectWithValue }) => {
    try {
      // dispatch(setLoading(true));
      // Detect mono/stereo using Web Audio API

      const audioContext = new AudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = await audioContext.decodeAudioData(arrayBuffer);
      const channelType = buffer.numberOfChannels === 2 ? "stereo" : "mono";
      console.log("Channel Type:", channelType);

      // Upload audio file
      const uploadedFile = await audioApi.uploadAudio(file);
      console.log("uploadedFile in thunk==================", uploadedFile.upload_response);

      if (!uploadedFile?.upload_response?.length) {
        return rejectWithValue({ message: 'Audio upload failed', status: 400 });
      }

      const fileObj = uploadedFile.upload_response[0];
      console.log("============ fileObj ==================", fileObj);
      const fileId = fileObj?.file_id;
      console.log("========== fileId ==================", fileId);

      // This line is not required becuase extraReducers in slice is handling it.
      // Dispatch uploaded file to Redux store
      // dispatch(setUploadedFile(uploadedFile)); 

      // Save channel type in redux
      dispatch(setAudioChannelType({ fileId, channelType }));

      const metadataudioId = fileId;
      console.log("metadataudioId in thunk==================", metadataudioId);
      dispatch(getAudioMetadataThunk(metadataudioId));
      console.log("after dispatching to metadata######## ")
      return uploadedFile;

    } catch (error) {
      // dispatch(setError(error.message));
      const errorMsg = error.response?.data || { message: error.message }
      console.log("error in uploadAudioThunk", errorMsg);
      return rejectWithValue(errorMsg);
    } finally {
      // dispatch(setLoading(false));
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
      console.log("response of noise removal thunk ", response);
      const parsedResults = JSON.parse(response.worker_response.result);
      dispatch(setNoiseRemovedAudio(parsedResults));

      console.log("noiseRemovalAudioThunk", parsedResults.denoised_file_id);
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

      // const parsedResults = response.results.map(item => {
      //   let resultObj;
      //   try {
      //     resultObj = JSON.parse(item.worker_response.result);
      //   } catch (e) {
      //     resultObj = { status: "error", message: "Invalid JSON in response" };
      //   }

      //   return {
      //     task: item.task,
      //     jobId: item.worker_response.job_id,
      //     ...resultObj
      //   };
      // });

      response.results.forEach(res => {
        const parsedResults = JSON.parse(res.worker_response.result);
        console.log("****************** res in analyze thunk *****************", parsedResults);

        switch (res.task) {

          case "language_identification":
            dispatch(setLanguage(parsedResults));
            break;
          case "Gender_identification":
            dispatch(setGender(parsedResults));
            break;
          case "Transcribe_audio":
            dispatch(setTranscription(parsedResults));
            break;
          case "Translate_text":
            dispatch(setTranslation(parsedResults));
            // dispatch(setTranslation)
            break;
          case "Sentiment_analysis":
            dispatch(setSentiment(parsedResults.result));
            break;
          case "Entity_Extraction":
            dispatch(setEntities(parsedResults.result));
            break;
          default:
            break;
        }
      });

      dispatch(setAudioAnalysis(response));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Get Audio Files Thunk
export const getAudioFilesThunk = createAsyncThunk(
  'audio/getAudioFiles',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const audioFiles = await audioApi.getAudioFiles();
      console.log("====== Getting audioFiles in thunk==================", audioFiles);
      dispatch(setAudioFiles(audioFiles));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }
);


// Analyze for Available Audio

// export const availableAnalyzeAudioThunk = createAsyncThunk(
//   'audio/analyzeAudio',
//   async (payload, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await audioApi.analyzeAvailableAudio(payload);

//       response.results.forEach(res => {
//         const parsedResults = JSON.parse(res.worker_response.result);
//         console.log("****************** res in analyze thunk *****************", parsedResults);
//       });

//       dispatch(setAudioAnalysis(response));
//     } catch (error) {
//       dispatch(setError(error.message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   }
// );


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


