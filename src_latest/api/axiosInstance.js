import axios from "axios";
import { API } from "./apiConfig";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API.BASE_URL, // if you have a base URL
});

export default axiosInstance;