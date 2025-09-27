import AvailableAudio from "../features/Home/AvailableAudios";

// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_BASE_URL = 'http://192.168.1.45:8000'

//For local/development testing purpose

export const API = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh`,
  REGISTER: `${API_BASE_URL}/api/user/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,

  // UPLOAD_FILE: `${API_BASE_URL}/interface/upload-audio`,
  UPLOAD_FILE: `${API_BASE_URL}/interface/upload-audio`,
  AUDIO_METADATA: `${API_BASE_URL}/interface/file-metadata`,
  // LIST_AUDIO_FILES: `${API_BASE_URL}/interface/uploaded-files`, 
  LIST_AUDIO_FILES: `http://192.168.1.45:8011/api/files/files`,

  // text translation
  TEXT_TRANSLATE: `${API_BASE_URL}/interface/translate-text`,

  // Grammar Correction
  GRAMMAR_CORRECTION: `${API_BASE_URL}/interface/grammar-correction`,


  DELETE_AUDIO_FILE: `${API_BASE_URL}/api/audio/files/`, // Append audioId

  // Noise Removal
  NOISE_REMOVAL: `${API_BASE_URL}/interface/noise-removal`,

  // Audio Analyze
  AUDIO_ANALYZE: `${API_BASE_URL}/interface/analyze`,

  // Multiple Audio Analyze AvailableAudio_ANALYZE
  AVAILABLEAUDIO_ANALYZE: `${API_BASE_URL}/interface/analyze_logs`,

  // Bulk Analysis endpoint
  UPLOAD_FOLDER: `${API_BASE_URL}/interface/upload-folder`,

  LIST_AUDIO_FILES_BY_FOLDER: `${API_BASE_URL}/api/audio/files/folders`,
  DELETE_FOLDER: `${API_BASE_URL}/api/audio/folders/`, // Append folderName

  // Gender Identification
  GENDER_IDENTIFICATION: `${API_BASE_URL}/api/identification/gender`,

  // Dialect Identification
  DIALECT_IDENTIFICATION: `${API_BASE_URL}/api/identification/dialect`,

  // Language Identification
  LANGUAGE_IDENTIFICATION: `${API_BASE_URL}/api/identification/language`,

  //Create Groups with keywords
  CREATE_KEYWORD_GROUPS: `${API_BASE_URL}/api/ai/keyword/create-keyword-group`,

  // Get list of Keyword Groups
  LIST_KEYWORD_SETS: `${API_BASE_URL}/api/ai/keyword/list-keyword-groups`,

  // Get Keywords by Group
  LIST_KEYWORDS_BY_GROUP: `${API_BASE_URL}/api/ai/keyword/fetch-keyword-group/`, // Append groupName

  // Delete keywords set
  DELETE_KEYWORD_SET: `${API_BASE_URL}/api/ai/keyword/delete-keyword-group/`, // Append groupName

  // To save keywords for specific set
  SAVE_KEYWORDs: `${API_BASE_URL}/api/ai/keyword/update-keyword-group/`, // Append groupName

  // keyword spotting
  KEYWORD_SPOTTING: `${API_BASE_URL}/api/ai/keyword/keyword_spotting`,
};

// **************************************************************************************************************
//For production build

// export const API = {
//   LOGIN: `/api/auth/login`,
//   VERIFY: `/api/auth/verify`,
//   REGISTER: `/api/user/register`,
//   UPLOAD_FILE: `/interface/upload-audio`,
//   AUDIO_METADATA: `/api/audio/metadata/`,
//   LIST_AUDIO_FILES: `/api/audio/files`,
//   DELETE_AUDIO_FILE: `/api/audio/files/`, // Append audioId
// };