


// import { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';
// import { ROLE_ROUTES } from '../services/config';

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const isAuth = authService.isAuthenticated();
//         const storedUser = authService.getCurrentUserFromStorage();
        
//         if (isAuth && storedUser) {
//           setUser(storedUser);
//           try {
//             const userData = await authService.getCurrentUser();
//             if (userData && userData.success) {
//               setUser(userData.user);
//             }
//           } catch (err) {
//             console.error('Failed to verify user with backend', err);
//           }
//         } else {
//           setUser(null);
//         }
//       } catch (err) {
//         console.error('Failed to load user from storage:', err);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, []);

//   const login = useCallback(async (username, email, password) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const loginData = {};
      
//       if (username && username.trim() !== '') {
//         loginData.username = username.trim();
//       }
      
//       if (email && email.trim() !== '') {
//         loginData.email = email.trim();
//       }
      
//       loginData.password = password;
      
//       const response = await authService.login(loginData);
      
//       if (response && response.success) {
//         setUser(response.user);
//         const redirectUrl = ROLE_ROUTES[response.user?.role] || '/dashboard';
        
//         return {
//           success: true,
//           user: response.user,
//           redirectUrl,
//         };
//       } else {
//         return {
//           success: false,
//           error: response?.message || 'Login failed',
//         };
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       const errorMessage = err.message || 'Login failed';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const register = useCallback(async (userData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       console.log('useAuth: Calling register service with data:', userData);
      
//       // Validate required fields
//       if (!userData.username || !userData.email || !userData.password || !userData.fullName) {
//         return {
//           success: false,
//           error: 'All required fields must be filled',
//         };
//       }
      
//       const response = await authService.register(userData);
//       console.log('useAuth: Register response:', response);
      
//       if (response && response.success) {
//         setUser(response.user);
        
//         // Determine redirect URL based on role
//         const redirectUrl = ROLE_ROUTES[response.user?.role] || '/attendance';
        
//         return {
//           success: true,
//           user: response.user,
//           redirectUrl,
//         };
//       } else {
//         return {
//           success: false,
//           error: response?.message || response?.error || 'Registration failed',
//         };
//       }
//     } catch (err) {
//       console.error('useAuth: Register error:', err);
//       const errorMessage = err.message || 'Registration failed';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const logout = useCallback(async () => {
//     setLoading(true);
//     try {
//       await authService.logout();
//       setUser(null);
//       navigate('/login', { replace: true });
//     } catch (err) {
//       console.error('Logout error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [navigate]);

//   const hasRole = useCallback((role) => {
//     return user?.role === role;
//   }, [user]);

//   const hasAnyRole = useCallback((roles) => {
//     return roles?.includes(user?.role) || false;
//   }, [user]);

//   const updateUser = useCallback(async (userData) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await authService.updateProfile(userData);
      
//       if (response && response.success) {
//         setUser(response.user);
//         return {
//           success: true,
//           user: response.user,
//         };
//       } else {
//         return {
//           success: false,
//           error: response?.message || 'Failed to update profile',
//         };
//       }
//     } catch (err) {
//       console.error('Update user error:', err);
//       const errorMessage = err.message || 'Failed to update profile';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const changePassword = useCallback(async (currentPassword, newPassword) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await authService.changePassword({
//         currentPassword,
//         newPassword
//       });
      
//       return response;
//     } catch (err) {
//       console.error('Change password error:', err);
//       const errorMessage = err.message || 'Failed to change password';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const updatePreferences = useCallback(async (preferences) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await authService.updatePreferences(preferences);
      
//       if (response && response.success) {
//         setUser(response.user);
//         return {
//           success: true,
//           user: response.user,
//         };
//       } else {
//         return {
//           success: false,
//           error: response?.message || 'Failed to update preferences',
//         };
//       }
//     } catch (err) {
//       console.error('Update preferences error:', err);
//       const errorMessage = err.message || 'Failed to update preferences';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const uploadAvatar = useCallback(async (file) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const formData = new FormData();
//       formData.append('avatar', file);
      
//       const response = await authService.uploadAvatar(formData);
      
//       if (response && response.success) {
//         setUser(response.user);
//         return {
//           success: true,
//           user: response.user,
//           avatarUrl: response.user.avatar,
//         };
//       } else {
//         return {
//           success: false,
//           error: response?.message || 'Failed to upload avatar',
//         };
//       }
//     } catch (err) {
//       console.error('Upload avatar error:', err);
//       const errorMessage = err.message || 'Failed to upload avatar';
//       setError(errorMessage);
//       return {
//         success: false,
//         error: errorMessage,
//       };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//     hasRole,
//     hasAnyRole,
//     updateUser,
//     changePassword,
//     updatePreferences,
//     uploadAvatar,
//     isAuthenticated: authService.isAuthenticated(),
//   };
// };



import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { ROLE_ROUTES } from '../services/config';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = authService.isAuthenticated();
        const storedUser = authService.getCurrentUserFromStorage();
        
        if (isAuth && storedUser) {
          setUser(storedUser);
          try {
            const userData = await authService.getCurrentUser();
            if (userData && userData.success) {
              setUser(userData.user);
            }
          } catch (err) {
            console.error('Failed to verify user with backend', err);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to load user from storage:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback(async (username, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const loginData = {};
      
      if (username && username.trim() !== '') {
        loginData.username = username.trim();
      }
      
      if (email && email.trim() !== '') {
        loginData.email = email.trim();
      }
      
      loginData.password = password;
      
      const response = await authService.login(loginData);
      
      if (response && response.success) {
        setUser(response.user);
        const redirectUrl = ROLE_ROUTES[response.user?.role] || '/dashboard';
        
        return {
          success: true,
          user: response.user,
          redirectUrl,
        };
      } else {
        return {
          success: false,
          error: response?.message || 'Login failed',
        };
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('useAuth: Calling register service with data:', userData);
      
      // Validate required fields
      if (!userData.username || !userData.email || !userData.password || !userData.fullName) {
        return {
          success: false,
          error: 'All required fields must be filled',
        };
      }
      
      const response = await authService.register(userData);
      console.log('useAuth: Register response:', response);
      
      if (response && response.success) {
        setUser(response.user);
        
        // Determine redirect URL based on role
        const redirectUrl = ROLE_ROUTES[response.user?.role] || '/attendance';
        
        return {
          success: true,
          user: response.user,
          redirectUrl,
        };
      } else {
        return {
          success: false,
          error: response?.message || response?.error || 'Registration failed',
        };
      }
    } catch (err) {
      console.error('useAuth: Register error:', err);
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const hasRole = useCallback((role) => {
    return user?.role === role;
  }, [user]);

  const hasAnyRole = useCallback((roles) => {
    return roles?.includes(user?.role) || false;
  }, [user]);

  const updateUser = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(userData);
      
      if (response && response.success) {
        setUser(response.user);
        return {
          success: true,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response?.message || 'Failed to update profile',
        };
      }
    } catch (err) {
      console.error('Update user error:', err);
      const errorMessage = err.message || 'Failed to update profile';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.changePassword({
        currentPassword,
        newPassword
      });
      
      return response;
    } catch (err) {
      console.error('Change password error:', err);
      const errorMessage = err.message || 'Failed to change password';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePreferences = useCallback(async (preferences) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updatePreferences(preferences);
      
      if (response && response.success) {
        setUser(response.user);
        return {
          success: true,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response?.message || 'Failed to update preferences',
        };
      }
    } catch (err) {
      console.error('Update preferences error:', err);
      const errorMessage = err.message || 'Failed to update preferences';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadAvatar = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.uploadAvatar(formData);
      
      if (response && response.success) {
        setUser(response.user);
        return {
          success: true,
          user: response.user,
          avatarUrl: response.user.avatar,
        };
      } else {
        return {
          success: false,
          error: response?.message || 'Failed to upload avatar',
        };
      }
    } catch (err) {
      console.error('Upload avatar error:', err);
      const errorMessage = err.message || 'Failed to upload avatar';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAvatar = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.deleteAvatar();
      
      if (response && response.success) {
        setUser(response.user);
        return {
          success: true,
          user: response.user,
        };
      } else {
        return {
          success: false,
          error: response?.message || 'Failed to delete avatar',
        };
      }
    } catch (err) {
      console.error('Delete avatar error:', err);
      const errorMessage = err.message || 'Failed to delete avatar';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    hasRole,
    hasAnyRole,
    updateUser,
    changePassword,
    updatePreferences,
    uploadAvatar,
    deleteAvatar,
    isAuthenticated: authService.isAuthenticated(),
  };
};
