// src/api/axiosInstance.js
import { store } from "../redux/store";
import axiosInstance  from "./axiosInstance";
import { API } from "./apiConfig";
import { logout , loginSuccess} from "../redux/authSlice";
import axios from "axios";                  

// Request Interceptor → Attach Token
axiosInstance.interceptors.request.use(
  (config) => {
        console.log("Request Interceptor running...");
    const accessToken = store.getState().auth.access_token;
    const accessTokenExpiry = store.getState().auth.access_token_time;
    const refreshToken = store.getState().auth.refresh_token;
    const refreshTokenExpiry = store.getState().auth.refresh_token_time;

  console.log("*** token in axiosInterceptor**************", accessToken);

    // Don't force Content-Type for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    console.log("accessTokenExpiry ", accessTokenExpiry + " " + "refreshTokenExpiry ", refreshTokenExpiry);

    console.log("*** token in axiosInterceptor**************", accessToken);

    // check token expiry here and refresh if needed
    if (accessToken && accessTokenExpiry && Date.now() > accessTokenExpiry) {
      if (refreshToken && Date.now() < refreshTokenExpiry) {
        try {
             console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REFRESH TOKEN RESPONSE ");
          // Call refresh token Api
          const response = axios.post(API.REFRESH_TOKEN, { refresh_token: refreshToken });
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! REFRESH TOKEN RESPONSE ", response);
          const newAccessToken = response.data.access_token;
          // Update store with new token
          store.dispatch(loginSuccess({ access_token: newAccessToken }));
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        catch (error) {
             console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CATCH REFRESH TOKEN RESPONSE ");
          store.dispatch(logout());
          return Promise.reject(error);
        }

      } else {
        //Refresh token expired-> logout user
        store.dispatch(logout());
        return Promise.reject("Session expired");
      }
    } else if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle refresh token or logout here
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    console.error("API Error:", error);
    return Promise.reject(error);
  } 
);

export default axiosInstance;

