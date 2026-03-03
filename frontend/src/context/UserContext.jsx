// import React, { createContext, useState, useContext, useEffect } from 'react';

// const UserContext = createContext();

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Load user data from localStorage or API on mount
//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = async () => {
//     try {
//       setLoading(true);
//       // Try to load from localStorage first
//       const savedUser = localStorage.getItem('user');
//       if (savedUser) {
//         setUser(JSON.parse(savedUser));
//       } else {
//         // Default user data
//         const defaultUser = {
//           id: '1',
//           name: 'Admin User',
//           email: 'admin@pezzi.com',
//           role: 'Administrator',
//           avatar: null,
//           initials: 'A',
//           phone: '+1 (555) 123-4567',
//           department: 'IT Administration',
//           location: 'New York, USA',
//           joinDate: '2024-01-15',
//           lastActive: new Date().toISOString(),
//           preferences: {
//             notifications: true,
//             darkMode: false,
//             language: 'en',
//             timezone: 'America/New_York'
//           },
//           security: {
//             twoFactorEnabled: false,
//             lastPasswordChange: '2024-01-15',
//             loginHistory: []
//           }
//         };
//         setUser(defaultUser);
//         localStorage.setItem('user', JSON.stringify(defaultUser));
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (userData) => {
//     try {
//       setLoading(true);
//       const updatedUser = { ...user, ...userData };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       return { success: true };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changePassword = async (currentPassword, newPassword) => {
//     try {
//       setLoading(true);
//       // Here you would typically call an API
//       // For demo, we'll just update lastPasswordChange
//       const updatedUser = {
//         ...user,
//         security: {
//           ...user.security,
//           lastPasswordChange: new Date().toISOString()
//         }
//       };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       return { success: true };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updatePreferences = async (preferences) => {
//     try {
//       setLoading(true);
//       const updatedUser = {
//         ...user,
//         preferences: { ...user.preferences, ...preferences }
//       };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       return { success: true };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadAvatar = async (file) => {
//     try {
//       setLoading(true);
//       // Here you would upload to server and get URL
//       // For demo, we'll create a local URL
//       const avatarUrl = URL.createObjectURL(file);
//       const updatedUser = { ...user, avatar: avatarUrl };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       return { success: true, url: avatarUrl };
//     } catch (err) {
//       setError(err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addLoginHistory = (entry) => {
//     const updatedUser = {
//       ...user,
//       security: {
//         ...user.security,
//         loginHistory: [entry, ...(user?.security?.loginHistory || [])].slice(0, 10)
//       }
//     };
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   return (
//     <UserContext.Provider value={{
//       user,
//       loading,
//       error,
//       updateUser,
//       changePassword,
//       updatePreferences,
//       uploadAvatar,
//       addLoginHistory
//     }}>
//       {children}
//     </UserContext.Provider>
//   );
// };


import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from localStorage or API on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (savedUser && token) {
        setUser(JSON.parse(savedUser));
      } else {
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN FUNCTION
  const login = async (username, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call - Replace with actual API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password })
      // });
      // const data = await response.json();
      
      // Simulated successful login
      if (password === 'password123') {
        const userData = {
          id: '1',
          username: username || 'admin',
          fullName: 'Admin User',
          email: email || 'admin@pezzi.com',
          role: email?.includes('admin') ? 'admin' : 'employee',
          avatar: null,
          initials: 'A',
          phone: '+1 (555) 123-4567',
          department: 'IT Administration',
          position: 'System Administrator',
          location: 'New York, USA',
          joinDate: '2024-01-15',
          lastLogin: new Date().toISOString(),
          isActive: true,
          preferences: {
            notifications: true,
            darkMode: false,
            language: 'en',
            timezone: 'America/New_York'
          },
          security: {
            twoFactorEnabled: false,
            lastPasswordChange: '2024-01-15',
            loginHistory: []
          }
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', 'dummy-token-123');
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // REGISTER FUNCTION - ADD THIS
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate required fields
      if (!userData.username || !userData.email || !userData.password || !userData.fullName) {
        return { success: false, error: 'All required fields must be filled' };
      }
      
      // Simulate API call - Replace with actual API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();
      
      // Simulated successful registration
      const newUser = {
        id: Date.now().toString(),
        username: userData.username,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role || 'employee',
        department: userData.department || '',
        position: userData.position || '',
        avatar: userData.avatar || null,
        initials: userData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
        phone: '',
        location: '',
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        security: {
          twoFactorEnabled: false,
          lastPasswordChange: new Date().toISOString(),
          loginHistory: []
        }
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'dummy-token-' + Date.now());
      
      return { success: true, user: newUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT FUNCTION
  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const updateUser = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const updatedUser = {
        ...user,
        security: {
          ...user.security,
          lastPasswordChange: new Date().toISOString()
        }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (preferences) => {
    try {
      setLoading(true);
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file) => {
    try {
      setLoading(true);
      const avatarUrl = URL.createObjectURL(file);
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true, url: avatarUrl };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const addLoginHistory = (entry) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      security: {
        ...user.security,
        loginHistory: [entry, ...(user?.security?.loginHistory || [])].slice(0, 10)
      }
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated: !!user,
      login,           // Added
      register,        // Added
      logout,          // Added
      updateUser,
      changePassword,
      updatePreferences,
      uploadAvatar,
      addLoginHistory
    }}>
      {children}
    </UserContext.Provider>
  );
};