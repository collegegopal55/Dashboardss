


import api from './api';
import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_DATA_KEY } from './config';

class AuthService {
  async login(loginData) {
    console.log('Login started', { ...loginData, password: '***' });
    
    try {
      const requestBody = {
        password: loginData.password
      };
      
      if (loginData.email && loginData.email.trim() !== '') {
        requestBody.email = loginData.email.trim();
      } else if (loginData.username && loginData.username.trim() !== '') {
        requestBody.username = loginData.username.trim();
      } else {
        throw new Error('Either username or email is required');
      }
      
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, requestBody);

      if (response.data && response.data.success) {
        this.setSession(response.data);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ADD REGISTER METHOD HERE
  async register(userData) {
    console.log('Register started', { ...userData, password: '***' });
    
    try {
      // Validate required fields
      if (!userData.username || !userData.email || !userData.password || !userData.fullName) {
        throw new Error('Username, email, password, and full name are required');
      }

      // Make sure password meets minimum requirements
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Prepare request body
      const requestBody = {
        username: userData.username.trim(),
        email: userData.email.trim().toLowerCase(),
        password: userData.password,
        fullName: userData.fullName.trim(),
        role: userData.role || 'employee',
        department: userData.department?.trim() || '',
        position: userData.position?.trim() || '',
        avatar: userData.avatar || ''
      };

      // Make API call to register endpoint
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, requestBody);

      // If registration successful, set session
      if (response.data && response.data.success) {
        this.setSession(response.data);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearSession();
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(email) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(otp, newPassword) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { 
        otp, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verifyOTP(email, otp) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  setSession(data) {
    if (data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    }
    if (data.user) {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    }
  }

  clearSession() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  }

  isAuthenticated() {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  getCurrentUserFromStorage() {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Request was made but no response
      return new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(error.message || 'Network error occurred');
    }
  }
}

const authService = new AuthService();
export default authService;
