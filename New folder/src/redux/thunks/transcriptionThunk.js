import { createAsyncThunk } from "@reduxjs/toolkit";

import transcriptionApi from "../../api/transcriptionAPI";

import {setTranscript, setTranscriptions, setLoading, setError} from '../slices/transcriptionSlice';
import { getAudioFilesThunk } from "./audioThunks";


export const transcribeAudioThunk = createAsyncThunk(
    '/api/transcriptions',
    async (data,{dispatch}) => {
        
        console.log("transcribeAudioThunk audio_id,language,model ",data);

        try{
            dispatch(setLoading(true));
            const response = await transcriptionApi.transcribeAudio(data);
            dispatch(setTranscript(response));
            dispatch(getAudioFilesThunk());
            console.log("transcribeAudioThunk",response);
            return response;
        }catch(error){
            dispatch(setError(error.message));
            return null;
        }finally{
            dispatch(setLoading(false));
        }
    }
);

export const getTranscriptionsThunk = createAsyncThunk(
    '/api/gettranscriptions',
    async (_,{dispatch}) => {

        try{
            dispatch(setLoading(true));
            const response = await transcriptionApi.getTranscriptions();
            console.log("get Transcriptions ",response);
            return response;
        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }

    }
);