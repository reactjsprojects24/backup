import { createAsyncThunk } from "@reduxjs/toolkit";

import translationApi from "../../api/translationAPI";

import { setTranslations, setBulkTranslations, setLoading, setError } from "../slices/translationSlice";

export const translateTextThunk = createAsyncThunk(
    '/api/translations',
    async ({ text_file, text, audio_id, language_from, language_to, model }, { dispatch }) => {

        try {
            console.log("  text_file, text, audio_id, language_from, language_to, model ", text_file, text, audio_id, language_from, language_to, model);
            dispatch(setLoading(true));
            const response = await translationApi.uploadtextTranslate(text_file, text, audio_id, language_from, language_to, model);
            dispatch(setTranslations(response));
            console.log("translateTextThunk", response);
            return response;
        } catch (error) {
            dispatch(setError(error.message));
            return null;
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const bulkTranslateThunk = createAsyncThunk(
    '/api/translations/bulk',
    async ({ folderPath, model }, { dispatch }) => {
        try {
            console.log("bulkTranslateThunk folderPath,model", folderPath, model);
            dispatch(setLoading(true));
            const response = await translationApi.uploadbulkTranslate(folderPath, model);
            console.log("bulkTranslateThunk", response);
            return response;
        } catch (error) {
            dispatch(setError(error.message));
            return null;
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const getTranslationThunk = createAsyncThunk(
    '/api/translations',
    async (_, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await translationApi.getTranslation();
            console.log("getTranslationThunk", response);
            return response;
        } catch (error) {
            dispatch(setError(error.message));
            return null;
        } finally {
            dispatch(setLoading(false));
        }
    }

);