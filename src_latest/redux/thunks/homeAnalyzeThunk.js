import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    setAudioAnalysis,
    setLoading, setLanguage, setGender, setTranscription, setTranslation, setSentiment, setEntities,
    setError,
} from '../slices/homeAnalyzeSlice';
import audioApi from '../../api/audioAPI';

//Available Audio Analysis Thunk
export const availableAnalyzeAudioThunk = createAsyncThunk(
    'audio/analyzeAudio',
    async (payload, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await audioApi.analyzeAvailableAudio(payload);

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