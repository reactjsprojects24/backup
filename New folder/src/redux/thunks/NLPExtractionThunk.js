import { createAsyncThunk } from "@reduxjs/toolkit";

import NLPExtractionAPI from "../../api/NLPExtractionAPI";

import { setGrammerCorrection,setSentimentAnalysis ,setEntityExtraction,setLoading,setError } from "../slices/NLPExtractionSlice";

export const grammerCorrectionThunk = createAsyncThunk(
    '/api/nlp/grammar-correction',
    async(text,{dispatch}) => {
        console.log("grammerCorrectionThunk text" ,text);
        try{
            dispatch(setLoading(true));
            const response =await NLPExtractionAPI.grammerCorrection(text);
            console.log("grammerCorrectionThunk",response);
            dispatch(setGrammerCorrection(response));

        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }
    }
);

export const sentimentAnalysisThunk = createAsyncThunk(
    '/api/nlp/grammar-correction',
    async(text,{dispatch}) => {
        console.log("sentimentAnalysisThunk text" ,text);
        try{
            dispatch(setLoading(true));
            const response =await NLPExtractionAPI.sentimentAnalysis(text);
            console.log("sentimentAnalysisThunk",response);
            dispatch(setSentimentAnalysis(response));

        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }
    }
);

export const entityExtractionThunk = createAsyncThunk(
    '/api/nlp/grammar-correction',
    async(text,{dispatch}) => {
        console.log("entityExtractionThunk text" ,text);
        try{
            dispatch(setLoading(true));
            const response =await NLPExtractionAPI.entityExtraction(text);
            console.log("entityExtractionThunk",response.entities);            
            dispatch(setEntityExtraction(response.entities));

        }catch(error){
            dispatch(setError(error.message));
        }finally{
            dispatch(setLoading(false));
        }
    }
);