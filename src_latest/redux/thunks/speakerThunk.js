import { createAsyncThunk } from "@reduxjs/toolkit";
import speakerApi from "../../api/speakerAPI";
import { setspeakers,setidentifiedSpeaker,setLoading,setError } from "../slices/speakerSlice";


export const enrollSpeakerThunk = createAsyncThunk(
    '/api/enrollspeakers',
    async(payload, {dispatch}) => {
        
        try{
            
            dispatch(setLoading(true));
            console.log("got into enroll speaker thunk with :",payload.audioFile , "speaker name ",payload.speakerName , " modelllll" ,payload.model);
            const enrolledSpeakers = await  speakerApi.enrollSpeaker( payload.audioFile, payload.speakerName, payload.model );

            console.log("response from api into thunk ",enrolledSpeakers);
            //  dispatch(setspeakers(enrolledSpeakers));
            dispatch(getListSpeakersThunk());
            return enrolledSpeakers;
           
        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }
    }
);

export const getIdentifiedSpeakerThunk = createAsyncThunk(
    'api/speakers/identify',
    async({audioFile,model}, {dispatch}) =>{
        
        console.log("into thunk ", audioFile , " modelllll" ,model);

        try {
           
            dispatch(setLoading(true));
            // console.log("into thunk ", payload );
            const identifiedSpeakers = await speakerApi.identifySpeaker(audioFile,model);
            dispatch(setidentifiedSpeaker(identifiedSpeakers));
            console.log("in thunk with response ", identifiedSpeakers);
            return identifiedSpeakers;
        }catch(error){
            dispatch(setError(error.message));

        }finally{
            dispatch(setLoading(false));
        }
    }
);


export const getListSpeakersThunk = createAsyncThunk(
    '/api/getspeakers',
    async(_,{dispatch}) => {    
        try{     
            dispatch(setLoading(true));
            const listSpeakers = await speakerApi.listSpeakers();
            dispatch(setspeakers(listSpeakers))
        }catch(error){
            dispatch(setError(error.message));

        }finally{
            dispatch(setLoading(false));
        }
    }
);

export const deleteSpeakerByIdThunk = createAsyncThunk(
    '/api/deleteSpeakerById',
    async(speakerId,{dispatch}) => {
        try{
            console.log("check one in Thunk",speakerId);
            dispatch(setLoading(true));
            const deletedSpeakers=await speakerApi.deleteSpeakerById(speakerId);
            dispatch(getListSpeakersThunk());
        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }
    }
);