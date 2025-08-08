// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/api.client";
import { APP_CONSTANTS } from "../constants/app.constants";
import { createUser } from "../models/user.model";
// import { getCookie } from "../utils/cookie.utils";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pwd: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.pwd) {
      errors.pwd = "Password is required";
    } else if (formData.pwd.length < 6) {
      errors.pwd = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!validateForm()) {
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await apiClient.post(
  //       APP_CONSTANTS.ENDPOINTS.LOGIN,
  //       formData
  //     );

  //     if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
  //       const user = createUser(response.data);
  //       login(user);

  //       // Redirect to intended page or dashboard
  //       const from = location.state?.from?.pathname || "/dashboard";
  //       navigate(from, { replace: true });
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setError(
  //       error.response?.data?.message ||
  //         "Login failed. Please check your credentials."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // src/components/Login.jsx - Updated handleSubmit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // First, get CSRF token by making a request to any endpoint
      await apiClient.get("/notices");

      // Create base64 encoded credentials for Basic Auth
      const credentials = btoa(`${formData.email}:${formData.pwd}`);

      const response = await apiClient.post(
        APP_CONSTANTS.ENDPOINTS.LOGIN,
        {},
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );
      console.log("Login response:", response.data);

      if (response.status === APP_CONSTANTS.HTTP_STATUS.OK) {
        const user = createUser(response.data);
        login(user);

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.status === 401
          ? "Invalid email or password. Please try again."
          : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-auto flex justify-center">
            <img
              className="h-12 w-auto"
              src="/src/assets/images/logo.jpg"
              alt="EazyBank"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back to EazyBank
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  validationErrors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="pwd" className="sr-only">
                Password
              </label>
              <input
                id="pwd"
                name="pwd"
                type="password"
                autoComplete="current-password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  validationErrors.pwd ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.pwd}
                onChange={handleInputChange}
              />
              {validationErrors.pwd && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.pwd}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: admin@example.com / password
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
