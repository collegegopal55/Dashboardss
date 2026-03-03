/**
 * Form validation utilities
 */

// Username validation
export const validateUsername = (username) => {
  if (!username || !username.trim()) {
    return 'Username is required';
  }
  if (username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (username.length > 30) {
    return 'Username must be less than 30 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return '';
};

// Email validation
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email is required';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (password.length > 50) {
    return 'Password must be less than 50 characters';
  }
  
  // Optional: Add strength validation
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  
  return {
    isValid: true,
    strength, // 1-4
    message: '',
  };
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

// Full name validation
export const validateFullName = (name) => {
  if (!name || !name.trim()) {
    return 'Full name is required';
  }
  if (name.length < 2) {
    return 'Full name must be at least 2 characters';
  }
  if (name.length > 100) {
    return 'Full name must be less than 100 characters';
  }
  return '';
};

// Login form validation
// export const validateLoginForm = (formData) => {
//   const errors = {};
  
//   const usernameError = validateUsername(formData.username);
//   if (usernameError) errors.username = usernameError;
  
//   const passwordError = validatePassword(formData.password);
//   if (typeof passwordError === 'string') {
//     errors.password = passwordError;
//   }
  
//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//   };
// };

// Registration form validation
export const validateRegisterForm = (formData) => {
  const errors = {};
  
  // Username validation
  const usernameError = validateUsername(formData.username);
  if (usernameError) errors.username = usernameError;
  
  // Email validation
  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;
  
  // Full name validation
  const nameError = validateFullName(formData.fullName);
  if (nameError) errors.fullName = nameError;
  
  // Password validation
  const passwordValidation = validatePassword(formData.password);
  if (typeof passwordValidation === 'string') {
    errors.password = passwordValidation;
  }
  
  // Confirm password validation
  if (formData.password && formData.confirmPassword) {
    const confirmError = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmError) errors.confirmPassword = confirmError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    passwordStrength: typeof passwordValidation === 'object' ? passwordValidation.strength : 0,
  };
};

// Format validation error for API
export const formatApiErrors = (errors) => {
  if (!errors) return {};
  
  const formatted = {};
  if (Array.isArray(errors)) {
    errors.forEach(error => {
      if (error.param) {
        formatted[error.param] = error.msg;
      }
    });
  }
  return formatted;
};

export const validateLoginForm = (data) => {
  const errors = {};
  
  if (!data.login?.trim()) {
    errors.login = 'Username or email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(data.login)) {
      if (!emailRegex.test(data.login)) {
        errors.login = 'Please enter a valid email address';
      }
    } else {
      if (data.login.length < 3) {
        errors.login = 'Username must be at least 3 characters';
      }
    }
  }
  
  if (!data.password) {
    errors.password = 'Password is required';
  } else if (data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};