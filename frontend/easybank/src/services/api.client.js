// // src/services/api.client.js
// import axios from "axios";
// import { APP_CONSTANTS } from "../constants/app.constants";

// const apiClient = axios.create({
//   baseURL: APP_CONSTANTS.API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const user = localStorage.getItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER);
//     if (user) {
//       const userData = JSON.parse(user);
//       // Add authorization header for authenticated requests
//       config.headers.Authorization = `Basic ${btoa(
//         userData.email + ":" + userData.pwd
//       )}`;
//     }

//     console.log("Making request to:", config.url);
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log("Response received:", response.status);
//     return response;
//   },
//   (error) => {
//     console.error("Response error:", error);

//     if (error.response?.status === APP_CONSTANTS.HTTP_STATUS.UNAUTHORIZED) {
//       localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER);
//       localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.TOKEN);
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default apiClient;

// src/services/api.client.js
import axios from "axios";
import { APP_CONSTANTS } from "../constants/app.constants";

const apiClient = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL,
  withCredentials: true, // Important for CSRF cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add CSRF token
apiClient.interceptors.request.use(
  (config) => {
    // Get CSRF token from cookie
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem(APP_CONSTANTS.LOCAL_STORAGE_KEYS.USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Helper function to get CSRF token from cookie
function getCsrfTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "XSRF-TOKEN") {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export default apiClient;
