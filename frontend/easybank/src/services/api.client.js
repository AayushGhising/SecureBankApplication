// src/services/api.client.js
import axios from "axios";
import { APP_CONSTANTS } from "../constants/app.constants";

const apiClient = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER);
    if (user) {
      const userData = JSON.parse(user);
      // Add authorization header for authenticated requests
      config.headers.Authorization = `Basic ${btoa(
        userData.email + ":" + userData.pwd
      )}`;
    }

    console.log("Making request to:", config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", error);

    if (error.response?.status === APP_CONSTANTS.HTTP_STATUS.UNAUTHORIZED) {
      localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER);
      localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN);
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
