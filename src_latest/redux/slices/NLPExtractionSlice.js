import { createSlice } from "@reduxjs/toolkit";

const NLPExtractionSlice = createSlice({
    name:'NLPExtraction',
    initialState:{
        grammerCorrection:{},
        sentimentAnalysis:{},
        entityExtraction:{},
        loading:false,
        error:null
    },
    reducers:{
        setGrammerCorrection : (state,action) => {
            state.grammerCorrection =action.payload;
        },
        setSentimentAnalysis : (state,action) => {
            state.sentimentAnalysis =action.payload;
        },
        setEntityExtraction: (state,action) => {
            state.entityExtraction =action.payload;
        },
        setLoading : (state,action) => {
            state.loading =action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const {setGrammerCorrection ,setSentimentAnalysis ,setEntityExtraction,setLoading,setError} = NLPExtractionSlice.actions;

export default NLPExtractionSlice.reducer;