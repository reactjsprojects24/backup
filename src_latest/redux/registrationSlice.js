import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence

const persistConfig = {
  key: "registration",
  storage,
  whitelist: ["userDetails"], // Persist user details
};

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    userDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userDetails = action.payload;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetRegistration: (state) => {
      state.userDetails = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure, resetRegistration } =
  registrationSlice.actions;

export default persistReducer(persistConfig, registrationSlice.reducer);
