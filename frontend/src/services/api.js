// services/api.js
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from './config';

console.log('API Base URL:', API_BASE_URL); // Add this to verify it's loading

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    console.log('Making request to:', `${config.baseURL}${config.url}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        window.location.href = '/login';
      }
      
      return Promise.reject({
        status,
        message: data.message || 'An error occurred',
        errors: data.errors || null,
      });
    } else if (error.request) {
      return Promise.reject({
        status: 503,
        message: 'Unable to connect to server. Please check your internet connection.',
      });
    } else {
      return Promise.reject({
        status: 500,
        message: error.message || 'An unexpected error occurred.',
      });
    }
  }
);

export default api;