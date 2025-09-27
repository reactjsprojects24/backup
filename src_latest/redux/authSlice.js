import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["access_token", "refresh_token", "access_token_time", "refresh_token_time", "email", "remember", "isSuperUser"], // Persist token & email
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access_token: null,
    refresh_token: null,
    access_token_time: null, // Expiry time in ms
    refresh_token_time: null, // Expiry time in ms
    email: "",
    // password: "",
    isSuperUser: null,
    rememberMe: false,
    error: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { access_token, refresh_token, access_token_time, refresh_token_time, email, remember, isSuperUser, password } = action.payload;

      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.access_token_time = Date.now() + access_token_time * 1000; // store expiry in ms
      state.refresh_token_time = Date.now() + refresh_token_time * 1000;

      state.email = remember ? email : "";
      // state.password = remember ? password : "";
      state.isSuperUser = isSuperUser ? isSuperUser : null
      state.rememberMe = remember;
      state.error = "";
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    updateCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.rememberMe = action.payload.rememberMe;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.access_token_time = null;
      state.refresh_token_time = null;
      state.email = "";
      // state.password = "";
      state.isSuperUser = null;
      state.rememberMe = false;
      state.error = "";
    },
  },
});

export const { loginSuccess, loginFailure, updateCredentials, logout } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
