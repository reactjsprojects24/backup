import { createAsyncThunk } from '@reduxjs/toolkit';
import authenticationApi from '../../authenticationApi'; 
import {
    loginSuccess,
    loginFailure,
    registerSuccess,
    registerFailure,
    logoutSuccess,
    logoutFailure,
    getCurrentUserSuccess,
    getCurrentUserFailure,
    passwordResetInitiated,
    passwordResetSuccess,
    passwordResetFailure
} from './authSlice'; 

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials, { dispatch }) => {
        try {
            const response = await authenticationApi.login(credentials.username, credentials.password);
            dispatch(loginSuccess(response));
            return response;
        } catch (error) {
            dispatch(loginFailure(error.message || 'Login Failed'));
            return rejectWithValue(error.message || 'Login Failed');
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (formData, { dispatch }) => {
        try {
            const response = await authenticationApi.register(formData);
            dispatch(registerSuccess(response));
            return response;
        } catch (error) {
            dispatch(registerFailure(error.message || 'Registration Failed'));
            return rejectWithValue(error.message || 'Registration Failed');
        }
    }
);

export const forgetPasswordThunk = createAsyncThunk(
    'auth/forgetPassword',
    async (data, { dispatch }) => {
        try {
            const response = await authenticationApi.forget(data.email, data.security_question, data.security_answer);
            dispatch(passwordResetInitiated()); 
            return response;
        } catch (error) {
            dispatch(loginFailure(error.message || 'Failed to initiate password reset'));
            return rejectWithValue(error.message || 'Failed to initiate password reset');
            }
    }
);

export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (resetData, { dispatch }) => {
        try {
            const response = await authenticationApi.resetPassword(resetData.token, resetData.password);
            dispatch(passwordResetSuccess()); 
            return response;
        } catch (error) {
            dispatch(passwordResetFailure(error.message || 'Failed to reset password'));
            return rejectWithValue(error.message || 'Failed to reset password');
        }
    }
);

export const getCurrentUserThunk = createAsyncThunk(
    'auth/getCurrentUser',
    async (accessToken, { dispatch }) => {
        try {
            const response = await authenticationApi.currentUser(accessToken);
            dispatch(getCurrentUserSuccess(response));
            return response;
        } catch (error) {
            dispatch(getCurrentUserFailure(error.message || 'Failed to fetch current user'));
            return rejectWithValue(error.message || 'Failed to fetch current user');
        }
    }
);

export const deleteUserThunk = createAsyncThunk(
    'auth/logout',
    async (refreshToken, { dispatch }) => {
        try {
            const response = await authenticationApi.deleteUser(refreshToken); 
            dispatch(logoutSuccess());
            return response;
        } catch (error) {
            dispatch(logoutFailure(error.message || 'Logout Failed'));
            return rejectWithValue(error.message || 'Logout Failed');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (accessToken, { dispatch }) => {
        try {
            const response = await authenticationApi.logout(accessToken); 
            dispatch(logoutSuccess());
            return response;
        } catch (error) {
            dispatch(logoutFailure(error.message || 'Logout Failed'));
            return rejectWithValue(error.message || 'Logout Failed');
        }
    }
);