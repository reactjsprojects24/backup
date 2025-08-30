import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // or an initial user object if applicable
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;  // Assuming the API returns user data
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token; //adjust if API return access token during registration
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    logoutSuccess: (state,action) =>{
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure:(state,action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { 
  loginSuccess, 
  loginFailure, 
  registerSuccess, 
  registerFailure, 
  logout, 
  logoutSuccess,
  logoutFailure
} = authSlice.actions;

export default authSlice.reducer;