
// // import { useState, useEffect, useCallback } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import authService from '../services/authService';
// // import { ROLE_ROUTES } from '../services/config';

// // export const useAuth = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const loadUser = async () => {
// //       try {
// //         const isAuth = authService.isAuthenticated();
// //         const storedUser = authService.getCurrentUserFromStorage();
        
// //         console.log('useAuth: Loading user', { isAuth, storedUser });
        
// //         if (isAuth && storedUser) {
// //           setUser(storedUser);
          
// //           // Optional: Verify token with backend
// //           try {
// //             const userData = await authService.getCurrentUser();
// //             if (userData && userData.success) {
// //               setUser(userData.user);
// //             }
// //           } catch (err) {
// //             console.error('useAuth: Failed to verify user with backend', err);
// //             // If backend verification fails, keep using stored user
// //           }
// //         } else {
// //           setUser(null);
// //         }
// //       } catch (err) {
// //         console.error('useAuth: Failed to load user from storage:', err);
// //         setUser(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadUser();
// //   }, []);

// //   const login = useCallback(async (username, password) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       console.log('useAuth: Calling login service');
// //       const response = await authService.login(username, password);
// //       console.log('useAuth: Response received:', response);
      
// //       if (response && response.success) {
// //         setUser(response.user);
// //         const redirectUrl = ROLE_ROUTES[response.user?.role] || '/dashboard';
// //         console.log('useAuth: Login successful, redirecting to:', redirectUrl);
        
// //         return {
// //           success: true,
// //           user: response.user,
// //           redirectUrl,
// //         };
// //       } else {
// //         console.log('useAuth: Login failed:', response);
// //         return {
// //           success: false,
// //           error: response?.message || 'Login failed',
// //         };
// //       }
// //     } catch (err) {
// //       console.error('useAuth: Login error:', err);
// //       const errorMessage = err.message || err?.message || 'Login failed';
// //       setError(errorMessage);
// //       return {
// //         success: false,
// //         error: errorMessage,
// //       };
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const register = useCallback(async (userData) => {
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const response = await authService.register(userData);
// //       if (response && response.success) {
// //         setUser(response.user);
// //         return {
// //           success: true,
// //           user: response.user,
// //         };
// //       } else {
// //         return {
// //           success: false,
// //           error: response?.message || 'Registration failed',
// //         };
// //       }
// //     } catch (err) {
// //       const errorMessage = err.message || err?.message || 'Registration failed';
// //       setError(errorMessage);
// //       return {
// //         success: false,
// //         error: errorMessage,
// //       };
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const logout = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       await authService.logout();
// //       setUser(null);
// //       navigate('/login', { replace: true });
// //     } catch (err) {
// //       console.error('Logout error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [navigate]);

// //   const hasRole = useCallback((role) => {
// //     return user?.role === role;
// //   }, [user]);

// //   const hasAnyRole = useCallback((roles) => {
// //     return roles?.includes(user?.role) || false;
// //   }, [user]);

// //   return {
// //     user,
// //     loading,
// //     error,
// //     login,
// //     register,
// //     logout,
// //     hasRole,
// //     hasAnyRole,
// //     isAuthenticated: authService.isAuthenticated(),
// //   };
// // };

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

//   return {
//     user,
//     loading,
//     error,
//     login,
//     logout,
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

  // REGISTER FUNCTION - ADD THIS BACK (uncommented and fixed)
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

  return {
    user,
    loading,
    error,
    login,
    register,  // Make sure this is included
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated: authService.isAuthenticated(),
  };
};