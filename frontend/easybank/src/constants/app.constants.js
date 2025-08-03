// src/constants/app.constants.js
export const APP_CONSTANTS = {
  API_BASE_URL: "http://localhost:8080/",
  ENDPOINTS: {
    LOGIN: "/user",
    DASHBOARD: "/dashboard",
    ACCOUNT: "/myAccount",
    BALANCE: "/myBalance",
    LOANS: "/myLoans",
    CARDS: "/myCards",
    CONTACT: "/contact",
    NOTICES: "/notices",
  },
  LOCAL_STORAGE_KEYS: {
    USER: "user",
    TOKEN: "token",
  },
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
};
