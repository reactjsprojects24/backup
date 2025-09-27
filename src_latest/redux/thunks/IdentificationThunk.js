import { createAsyncThunk } from '@reduxjs/toolkit';
import IdentificationAPI from '../../api/IdentificationAPI';
import { setGender, setLanguage, setDialect, setLoading, setError } from '../slices/IdentificationSlice'
 
export const identifyGenderThunk = createAsyncThunk(
    'identification/identifyGender',
    async ({audio_id, model}, { dispatch }) => {
        console.log("audio_id, model in identification thunk ",audio_id, model);
        try {
            dispatch(setLoading(true));
            const data = await IdentificationAPI.identifyGender(audio_id, model);
            console.log(" identifyGenderThunk ",data);
            dispatch(setGender(data.gender));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const identifyLanguageThunk = createAsyncThunk(
    'identification/identifyLanguage',
    async ({audio_id,model}, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const data = await IdentificationAPI.identifyLanguage(audio_id, model);
            console.log(" identifyLanguageThunk ",data);
            dispatch(setLanguage(data.language));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const identifyDialectThunk = createAsyncThunk(
    'identification/identifyDialect',
    async ({audio_id, model}, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const data = await IdentificationAPI.identifyDialect(audio_id, model);
            console.log(" identifyDialectThunk ",data);
            dispatch(setDialect(data.dialect));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    }
);