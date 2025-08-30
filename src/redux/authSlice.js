import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "email", "password" , "isSuperUser"], // Persist token & email
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    email: "",
    password: "",
    isSuperUser: null,
    rememberMe: false,
    error: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.email = action.payload.remember ? action.payload.email : "";
      state.password = action.payload.remember ? action.payload.password : "";
      state.isSuperUser = action.payload.isSuperUser ? action.payload.isSuperUser : null
      state.rememberMe = action.payload.remember;
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
      state.token = null;
      state.email = "";
      state.password = "";
      state.isSuperUser = null;
      state.rememberMe = false;
      state.error = "";
    },
  },
});

export const { loginSuccess, loginFailure, updateCredentials, logout } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
