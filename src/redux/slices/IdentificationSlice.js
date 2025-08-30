
import { createSlice } from '@reduxjs/toolkit';

const IdentificationSlice = createSlice({
    name: 'identification',
    initialState :{
        gender: null,
        language: null,
        dialect: null,
        loading: false,
        error: null,
    },
    reducers: {
        setGender: (state, action) => {
            state.gender = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setDialect: (state, action) => {
            state.dialect = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearIdentification: (state) => { // Added action to reset values
            state.gender = null;
            state.language = null;
            state.dialect = null;
            state.error = null;
        }
    },
});

export const { setGender, setLanguage, setDialect, setLoading, setError, clearIdentification } = IdentificationSlice.actions;
export default IdentificationSlice.reducer;