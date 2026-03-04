

// import api from './api';
// import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_DATA_KEY ,API_BASE_URL} from './config';

// class AuthService {
//   async login(loginData) {
//     console.log('Login started', { ...loginData, password: '***' });
    
//     try {
//       const requestBody = {
//         password: loginData.password
//       };
      
//       if (loginData.email && loginData.email.trim() !== '') {
//         requestBody.email = loginData.email.trim();
//       } else if (loginData.username && loginData.username.trim() !== '') {
//         requestBody.username = loginData.username.trim();
//       } else {
//         throw new Error('Either username or email is required');
//       }
      
//       const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, requestBody);

//       if (response.data && response.data.success) {
//         this.setSession(response.data);
//       }

//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async register(userData) {
//     console.log('Register started', { ...userData, password: '***' });
    
//     try {
//       // Validate required fields
//       if (!userData.username || !userData.email || !userData.password || !userData.fullName) {
//         throw new Error('Username, email, password, and full name are required');
//       }

//       // Make sure password meets minimum requirements
//       if (userData.password.length < 6) {
//         throw new Error('Password must be at least 6 characters long');
//       }

//       // Prepare request body
//       const requestBody = {
//         username: userData.username.trim(),
//         email: userData.email.trim().toLowerCase(),
//         password: userData.password,
//         fullName: userData.fullName.trim(),
//         role: userData.role || 'employee',
//         department: userData.department?.trim() || '',
//         position: userData.position?.trim() || '',
//         avatar: userData.avatar || ''
//       };

//       // Make API call to register endpoint
//       const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, requestBody);

//       // If registration successful, set session
//       if (response.data && response.data.success) {
//         this.setSession(response.data);
//       }

//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async updateProfile(userData) {
//     try {
//       const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
      
//       if (response.data && response.data.success) {
//         // Update stored user data
//         const currentUser = this.getCurrentUserFromStorage();
//         const updatedUser = { ...currentUser, ...response.data.user };
//         localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
//       }
      
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async changePassword(passwordData) {
//     try {
//       const response = await api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async updatePreferences(preferences) {
//     try {
//       const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PREFERENCES, preferences);
      
//       if (response.data && response.data.success) {
//         // Update stored user data
//         const currentUser = this.getCurrentUserFromStorage();
//         const updatedUser = { 
//           ...currentUser, 
//           preferences: response.data.preferences 
//         };
//         localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
//       }
      
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   // async uploadAvatar(formData) {
//   //   try {
//   //     const response = await api.post(API_ENDPOINTS.AUTH.UPLOAD_AVATAR, formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data'
//   //       }
//   //     });
      
//   //     if (response.data && response.data.success) {
//   //       // Update stored user data
//   //       const currentUser = this.getCurrentUserFromStorage();
//   //       const updatedUser = { ...currentUser, ...response.data.user };
//   //       localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
//   //     }
      
//   //     return response.data;
//   //   } catch (error) {
//   //     throw this.handleError(error);
//   //   }
//   // }
// async uploadAvatar(formData) {
//   try {
//     console.log('1. Starting avatar upload...');
//     console.log('2. API Base URL:', API_BASE_URL);
//     console.log('3. Full endpoint:', `${API_BASE_URL}${API_ENDPOINTS.AUTH.UPLOAD_AVATAR}`);
    
//     const token = localStorage.getItem(AUTH_TOKEN_KEY);
//     console.log('4. Token present:', !!token);
    
//     // Log form data contents
//     for (let pair of formData.entries()) {
//       console.log('5. FormData:', pair[0], pair[1]);
//     }
    
//     const response = await api.post(API_ENDPOINTS.AUTH.UPLOAD_AVATAR, formData);
    
//     console.log('6. Upload response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('7. Upload error details:', {
//       message: error.message,
//       code: error.code,
//       response: error.response?.data,
//       status: error.response?.status,
//       config: {
//         url: error.config?.url,
//         baseURL: error.config?.baseURL,
//         method: error.config?.method
//       }
//     });
//     throw error;
//   }
// }
//   async logout() {
//     try {
//       await api.post(API_ENDPOINTS.AUTH.LOGOUT);
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       this.clearSession();
//     }
//   }

//   async getCurrentUser() {
//     try {
//       const response = await api.get(API_ENDPOINTS.AUTH.ME);
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async forgotPassword(email) {
//     try {
//       const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async resetPassword(resetToken, newPassword, confirmPassword) {
//     try {
//       const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { 
//         resetToken, 
//         newPassword,
//         confirmPassword 
//       });
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   async verifyOTP(email, otp) {
//     try {
//       const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
//       return response.data;
//     } catch (error) {
//       throw this.handleError(error);
//     }
//   }

//   setSession(data) {
//     if (data.token) {
//       localStorage.setItem(AUTH_TOKEN_KEY, data.token);
//     }
//     if (data.user) {
//       localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
//     }
//   }

//   clearSession() {
//     localStorage.removeItem(AUTH_TOKEN_KEY);
//     localStorage.removeItem(USER_DATA_KEY);
//   }

//   isAuthenticated() {
//     return !!localStorage.getItem(AUTH_TOKEN_KEY);
//   }

//   getCurrentUserFromStorage() {
//     const userData = localStorage.getItem(USER_DATA_KEY);
//     return userData ? JSON.parse(userData) : null;
//   }

//   handleError(error) {
//     if (error.response) {
//       // Server responded with error
//       const message = error.response.data?.message || 
//                      error.response.data?.error || 
//                      'An error occurred';
//       return new Error(message);
//     } else if (error.request) {
//       // Request was made but no response
//       return new Error('No response from server. Please check your connection.');
//     } else {
//       // Something else happened
//       return new Error(error.message || 'Network error occurred');
//     }
//   }
// }

// const authService = new AuthService();
// export default authService;



import api from './api';
import { API_ENDPOINTS, AUTH_TOKEN_KEY, USER_DATA_KEY, API_BASE_URL } from './config';

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

  async updateProfile(userData) {
    try {
      const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, userData);
      
      if (response.data && response.data.success) {
        // Update stored user data
        const currentUser = this.getCurrentUserFromStorage();
        const updatedUser = { ...currentUser, ...response.data.user };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await api.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updatePreferences(preferences) {
    try {
      const response = await api.put(API_ENDPOINTS.AUTH.UPDATE_PREFERENCES, preferences);
      
      if (response.data && response.data.success) {
        // Update stored user data
        const currentUser = this.getCurrentUserFromStorage();
        const updatedUser = { 
          ...currentUser, 
          preferences: response.data.preferences 
        };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // async uploadAvatar(formData) {
  //   try {
  //     console.log('🚀 Starting avatar upload...');
      
  //     const token = localStorage.getItem(AUTH_TOKEN_KEY);
  //     if (!token) {
  //       throw new Error('No authentication token found');
  //     }
      
  //     console.log('📤 Sending request to:', API_ENDPOINTS.AUTH.UPLOAD_AVATAR);
      
  //     // Log form data contents (for debugging)
  //     for (let pair of formData.entries()) {
  //       console.log('📎 FormData:', pair[0], pair[1] instanceof File ? 
  //         `File: ${pair[1].name} (${(pair[1].size / 1024).toFixed(2)} KB)` : 
  //         pair[1]);
  //     }
      
  //     const response = await api.post(API_ENDPOINTS.AUTH.UPLOAD_AVATAR, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         console.log(`📊 Upload progress: ${percentCompleted}%`);
  //       }
  //     });

  //     console.log('✅ Upload response:', response.data);

  //     if (response.data && response.data.success) {
  //       // Update stored user data with new avatar
  //       const currentUser = this.getCurrentUserFromStorage();
  //       const updatedUser = { ...currentUser, ...response.data.user };
  //       localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
        
  //       return {
  //         success: true,
  //         user: response.data.user,
  //         avatarUrl: response.data.user.avatar
  //       };
  //     }

  //     return response.data;
  //   } catch (error) {
  //     console.error('❌ Upload error details:', {
  //       message: error.message,
  //       response: error.response?.data,
  //       status: error.response?.status,
  //       config: {
  //         url: error.config?.url,
  //         baseURL: error.config?.baseURL,
  //         method: error.config?.method
  //       }
  //     });

  //     // Handle specific error cases
  //     if (error.response?.status === 413) {
  //       throw new Error('File too large. Maximum size is 5MB.');
  //     }
  //     if (error.response?.status === 415) {
  //       throw new Error('Invalid file type. Please upload an image (JPEG, PNG, GIF).');
  //     }
  //     if (error.response?.status === 401) {
  //       throw new Error('Your session has expired. Please login again.');
  //     }

  //     throw this.handleError(error);
  //   }
  // }



    async uploadAvatar(formData) {
  try {
    console.log('🚀 Starting avatar upload...');
    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    // Check file size
    const file = formData.get('avatar');
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    console.log(`📎 Uploading file: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB`);
    
    // छोटे chunks में upload करने की कोशिश करें
    const response = await api.post(API_ENDPOINTS.AUTH.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 120000, // 2 minutes timeout
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`📊 Upload progress: ${percentCompleted}%`);
        }
      }
    });

    console.log('✅ Upload response:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    
    // Agar timeout error है तो specific message दें
    if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timeout. Please try with a smaller image.');
    }
    
    // Agar network error है
    if (!error.response) {
      throw new Error('Network connection lost. Please check your internet and try again.');
    }
    
    throw error;
  }
}

  async deleteAvatar() {
    try {
      const response = await api.delete(API_ENDPOINTS.AUTH.DELETE_AVATAR);
      
      if (response.data && response.data.success) {
        // Update stored user data
        const currentUser = this.getCurrentUserFromStorage();
        const updatedUser = { ...currentUser, avatar: null };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
        
        return {
          success: true,
          user: updatedUser
        };
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

  async resetPassword(resetToken, newPassword, confirmPassword) {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { 
        resetToken, 
        newPassword,
        confirmPassword 
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
