import { createSlice } from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        token: null,
        loading: false,
        error: null,
        step: 1,
    },
    reducers: {
        requestResetToken: (state) => {
            state.loading = true;
            state.error = null;
        },
        requestResetTokenSuccess: (state, action) => {
            state.loading = false;
            state.token = action.payload; // Store token
            state.step = 2; // Move to next step
        },
        requestResetTokenFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPassword: (state) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state) => {
            state.loading = false;
            state.step = 3; // Password reset successful, redirect to login
        },
        resetPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetState: (state) => {
            state.token = null;
            state.loading = false;
            state.error = null;
            state.step = 1; // Reset step
        },
    },
});

export const {
    requestResetToken,
    requestResetTokenSuccess,
    requestResetTokenFailure,
    resetPassword,
    resetPasswordSuccess,
    resetPasswordFailure,
    resetState
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
