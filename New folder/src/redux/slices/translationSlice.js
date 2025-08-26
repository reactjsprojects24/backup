import { createSlice } from "@reduxjs/toolkit";


const translationSlice = createSlice({
    name:'translation',
    initialState : {
        translations: null,
        translatedText: null,
        bulkTranslations: [],
        loading:false,
        error:null,
    },
    reducers : {
        setTranslations : (state, action) => {
            state.translations = action.payload;
            state.translatedText = action.payload ? action.payload.translated_text : null;
        },
        setBulkTranslations : (state, action) => {
            state.bulkTranslations = action.payload;
        },
        setLoading : (state,action) => {
            state.loading = action.payload;
        },
        setError : (state, action) =>{
            state.error = action.payload;
        }
    }
});

export const {setTranslations, setBulkTranslations,setLoading,setError} = translationSlice.actions;
export default translationSlice.reducer;