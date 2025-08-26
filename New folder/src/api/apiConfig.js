export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  VERIFY: `${API_BASE_URL}/api/auth/verify`,
  REGISTER: `${API_BASE_URL}/api/user/register`,
  UPLOAD: `${API_BASE_URL}/interface/upload-audio`,
  AUDIO_METADATA: `${API_BASE_URL}/api/audio/metadata/`,
  NOISE_REMOVAL : `${API_BASE_URL}/api/noise-removal`,
};
