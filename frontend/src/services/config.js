// // services/config.js
// // export const API_BASE_URL = 'http://localhost:5000/api';
// export const API_BASE_URL='https://dashboardss-e7ez.onrender.com/api'
// export const API_TIMEOUT = 30000; // 30 seconds

// // Storage Keys
// export const AUTH_TOKEN_KEY = 'authToken';
// export const USER_DATA_KEY = 'userData';
// export const REFRESH_TOKEN_KEY = 'refreshToken';

// // API Endpoints
// export const API_ENDPOINTS = {
//   AUTH: {
//     LOGIN: '/auth/login',
//     REGISTER: '/auth/register',
//     LOGOUT: '/auth/logout',
//     ME: '/auth/me',
//     REFRESH_TOKEN: '/auth/refresh-token',
//     FORGOT_PASSWORD: '/auth/forgot-password',
//     VERIFY_OTP: '/auth/verify-otp',
//     RESET_PASSWORD: '/auth/reset-password',
//      UPDATE_PROFILE: '/auth/profile',
//     CHANGE_PASSWORD: '/auth/change-password',
//     UPDATE_PREFERENCES: '/auth/preferences',
//     UPLOAD_AVATAR: '/auth/avatar',
//   },
//   USER: {
//     PROFILE: '/user/profile',
//     UPDATE: '/user/update',
//   },
//   ATTENDANCE: {
//     CHECK_IN: '/attendance/check-in',
//     CHECK_OUT: '/attendance/check-out',
//     HISTORY: '/attendance/history',
//   },
//   PAYROLL: {
//     SUMMARY: '/payroll/summary',
//     DETAILS: '/payroll/details',
//   },
// };

// // User Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   HR: 'hr',
//   MANAGER: 'manager',
//   EMPLOYEE: 'employee',
// };

// // Role-based route mappings
// export const ROLE_ROUTES = {
//   [USER_ROLES.ADMIN]: '/admin/dashboard',
//   [USER_ROLES.HR]: '/hr/dashboard',
//   [USER_ROLES.MANAGER]: '/manager/dashboard',
//   [USER_ROLES.EMPLOYEE]: '/employee/dashboard',
// };

// // Default redirect after login
// export const DEFAULT_REDIRECT = '/dashboard';

// // Password validation rules
// export const PASSWORD_RULES = {
//   MIN_LENGTH: 6,
//   MAX_LENGTH: 50,
//   REQUIRE_UPPERCASE: false,
//   REQUIRE_LOWERCASE: false,
//   REQUIRE_NUMBER: false,
//   REQUIRE_SPECIAL: false,
// };


// API Configuration
export const API_BASE_URL ='https://dashboardse.onrender.com/api';
export const API_TIMEOUT = 120000; // 30 seconds

// Storage Keys
export const AUTH_TOKEN_KEY = 'authToken';
export const USER_DATA_KEY = 'userData';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// Avatar upload configuration
export const AVATAR_CONFIG = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  MAX_WIDTH: 1024,
  MAX_HEIGHT: 1024
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_OTP: '/auth/verify-otp',
    RESET_PASSWORD: '/auth/reset-password',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    UPDATE_PREFERENCES: '/auth/preferences',
    UPLOAD_AVATAR: '/auth/avatar',
    DELETE_AVATAR: '/auth/avatar',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
  ATTENDANCE: {
    CHECK_IN: '/attendance/check-in',
    CHECK_OUT: '/attendance/check-out',
    HISTORY: '/attendance/history',
  },
  PAYROLL: {
    SUMMARY: '/payroll/summary',
    DETAILS: '/payroll/details',
  },
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  HR: 'hr',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
};

// Role-based route mappings
export const ROLE_ROUTES = {
  [USER_ROLES.ADMIN]: '/admin/dashboard',
  [USER_ROLES.HR]: '/hr/dashboard',
  [USER_ROLES.MANAGER]: '/manager/dashboard',
  [USER_ROLES.EMPLOYEE]: '/employee/dashboard',
};

// Default redirect after login
export const DEFAULT_REDIRECT = '/dashboard';

// Password validation rules
export const PASSWORD_RULES = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 50,
  REQUIRE_UPPERCASE: false,
  REQUIRE_LOWERCASE: false,
  REQUIRE_NUMBER: false,
  REQUIRE_SPECIAL: false,
};
