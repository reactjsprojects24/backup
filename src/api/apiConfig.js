export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


//For local/development testing purpose

export const API = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  REGISTER: `${API_BASE_URL}/api/user/register`,
  // UPLOAD_FILE: `${API_BASE_URL}/interface/upload-audio`,
  UPLOAD_FILE: `${API_BASE_URL}/interface/upload-audio`,
  AUDIO_METADATA: `${API_BASE_URL}/interface/file-metadata`,
  LIST_AUDIO_FILES: `${API_BASE_URL}/api/audio/files`,
  DELETE_AUDIO_FILE: `${API_BASE_URL}/api/audio/files/`, // Append audioId
  
  // Noise Removal
  NOISE_REMOVAL : `${API_BASE_URL}/interface/noise-removal`,

  // Audio Analyze
  AUDIO_ANALYZE : `${API_BASE_URL}/interface/analyze`,
  
  // Bulk Analysis endpoint
  UPLOAD_FOLDER: `${API_BASE_URL}/api/audio/upload-folder`,
  LIST_AUDIO_FILES_BY_FOLDER: `${API_BASE_URL}/api/audio/files/folders`,
  DELETE_FOLDER: `${API_BASE_URL}/api/audio/folders/`, // Append folderName

  // Gender Identification
  GENDER_IDENTIFICATION: `${API_BASE_URL}/api/identification/gender`,

  // Dialect Identification
  DIALECT_IDENTIFICATION: `${API_BASE_URL}/api/identification/dialect`,

  // Language Identification
  LANGUAGE_IDENTIFICATION: `${API_BASE_URL}/api/identification/language`,

  //Keyword Spotting
  CREATE_KEYWORD_GROUPS: `${API_BASE_URL}/api/keyword-groups`,

  CREATE_KEYWORD_IN_GROUP: `${API_BASE_URL}/api/keyword-groups/`, // Append groupId/keywords

  LIST_KEYWORDS_BY_GROUP: `${API_BASE_URL}/api/keyword-groups/`, // Append groupId/keywords

  KEYWORD_SPOTTING: `${API_BASE_URL}/api/keyword-spotting`,
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