import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
// import AdminSidebarReducer from "./adminSidebarSlice";
import authReducer from "./authSlice"; // Import auth slice
import { persistStore } from "redux-persist";
import registrationReducer from "./registrationSlice";
import forgotPasswordReducer from "./forgotPasswordSlice";
import audioSlice from "./slices/audioSlice";
import  speakerSlice from "./slices/speakerSlice";
import IdentificationSlice from "./slices/IdentificationSlice";
import transcriptionSlice from "./slices/transcriptionSlice";
import NLPExtractionSlice from "./slices/NLPExtractionSlice";
import keywordSpottingSlice from "./slices/keywordSpottingSlice";
import translationSlice from "./slices/translationSlice";


const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer, // Add auth to store
    // adminSidebar : AdminSidebarReducer,
    registration: registrationReducer,
    forgotPassword: forgotPasswordReducer,
    audio:audioSlice,
    speaker:speakerSlice,
    identification:IdentificationSlice,
    transcription:transcriptionSlice,
    NLPExtraction:NLPExtractionSlice,
    keywordSpotting:keywordSpottingSlice,
    translation:translationSlice,



  

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
