// // services/api.js
// import axios from 'axios';
// import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from './config';

// console.log('API Base URL:', API_BASE_URL); // Add this to verify it's loading

// // Create axios instance with default config
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: API_TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(AUTH_TOKEN_KEY);
//     console.log('Making request to:', `${config.baseURL}${config.url}`);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;
      
//       if (status === 401) {
//         localStorage.removeItem(AUTH_TOKEN_KEY);
//         window.location.href = '/login';
//       }
      
//       return Promise.reject({
//         status,
//         message: data.message || 'An error occurred',
//         errors: data.errors || null,
//       });
//     } else if (error.request) {
//       return Promise.reject({
//         status: 503,
//         message: 'Unable to connect to server. Please check your internet connection.',
//       });
//     } else {
//       return Promise.reject({
//         status: 500,
//         message: error.message || 'An unexpected error occurred.',
//       });
//     }
//   }
// );

// export default api;



import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_TOKEN_KEY } from './config';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
       maxContentLength: 50 * 1024 * 1024, 
  maxBodyLength: 50 * 1024 * 1024,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and handle FormData
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    // Don't log FormData requests to avoid console spam
    if (config.data instanceof FormData) {
      console.log('📤 Multipart/form-data request to:', config.url);
      // Let the browser set the Content-Type with the correct boundary
      delete config.headers['Content-Type'];
    } else {
      console.log('📤 JSON request to:', config.url);
    }
    
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
        response: error.response
      });
    } else if (error.request) {
      return Promise.reject({
        status: 503,
        message: 'Unable to connect to server. Please check your internet connection.',
        request: error.request
      });
    } else {
      return Promise.reject({
        status: 500,
        message: error.message || 'An unexpected error occurred.',
        error: error
      });
    }
  }
);

export default api;
