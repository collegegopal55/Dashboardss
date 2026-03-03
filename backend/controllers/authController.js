

// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator');
// const { generateOTP, sendOTPEmail } = require('../utils/emailService');
// const mongoose = require('mongoose');

// // Generate JWT Token
// const generateToken = (userId, role) => {
//   return jwt.sign(
//     { userId, role },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRE || '7d' }
//   );
// };

// // @desc    Register user
// // @route   POST /api/auth/register
// // @access  Public
// const register = async (req, res) => {
//   try {
//     // Check validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         success: false, 
//         errors: errors.array() 
//       });
//     }

//     const { username, email, password, fullName, department, position, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ 
//       $or: [{ email }, { username }] 
//     });
    
//     if (existingUser) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'User with this email or username already exists' 
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user with hashed password
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       fullName,
//       department,
//       position,
//       role: role || 'employee'
//     });

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     // Remove password from response
//     const userResponse = user.toObject();

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       token,
//       user: userResponse
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error during registration' 
//     });
//   }
// };



// const login = async (req, res) => {
//   console.log('Login request body:', req.body);
  
//   try {
//     const { username, email, password } = req.body;

//     // Validate input
//     if ((!username && !email) || !password) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Please provide username/email and password' 
//       });
//     }

//     // Build query
//     let query = {};
    
//     if (email && email.trim() !== '') {
//       // Direct email login
//       query.email = email.toLowerCase().trim();
//     } else if (username && username.trim() !== '') {
//       const trimmedUsername = username.trim();
//       const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedUsername);
      
//       if (isEmail) {
//         // Username field contains email
//         query.email = trimmedUsername.toLowerCase();
//       } else {
//         // Search by username or email
//         query.$or = [
//           { username: trimmedUsername },
//           { email: trimmedUsername.toLowerCase() }
//         ];
//       }
//     }

//     console.log('Login query:', JSON.stringify(query));

//     // Find user
//     const user = await User.findOne(query).select('+password');

//     if (!user) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid credentials' 
//       });
//     }

//     // Check if user is active
//     if (!user.isActive) {
//       return res.status(403).json({ 
//         success: false, 
//         message: 'Your account has been deactivated. Please contact HR.' 
//       });
//     }

//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
    
//     if (!isPasswordValid) {
//       return res.status(401).json({ 
//         success: false, 
//         message: 'Invalid credentials' 
//       });
//     }

//     // Update last login
//     user.lastLogin = new Date();
//     await user.save();

//     // Generate token
//     const token = generateToken(user._id, user.role);

//     // Remove password from response
//     const userResponse = user.toObject();
//     delete userResponse.password;

//     res.json({
//       success: true,
//       message: 'Login successful',
//       token,
//       user: userResponse
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error during login' 
//     });
//   }
// };


// // @desc    Get current user
// // @route   GET /api/auth/me
// // @access  Private
// const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password -resetPasswordOTP');
    
//     if (!user) {
//       return res.status(404).json({ 
//         success: false, 
//         message: 'User not found' 
//       });
//     }

//     res.json({
//       success: true,
//       user
//     });

//   } catch (error) {
//     console.error('Get me error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Server error' 
//     });
//   }
// };

// // @desc    Logout user
// // @route   POST /api/auth/logout
// // @access  Private
// const logout = (req, res) => {
//   // Client side should remove the token
//   res.json({ 
//     success: true, 
//     message: 'Logged out successfully' 
//   });
// };

// // @desc    Forgot password - Send OTP
// // @route   POST /api/auth/forgot-password
// // @access  Public
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email address'
//       });
//     }

//     // Check database connection
//     if (mongoose.connection.readyState !== 1) {
//       console.error('Database not connected. Current state:', mongoose.connection.readyState);
//       return res.status(503).json({
//         success: false,
//         message: 'Database connection issue. Please try again.'
//       });
//     }

//     console.log('Searching for user with email:', email);
    
//     // Find user by email
//     const user = await User.findOne({ email: email.toLowerCase() }).maxTimeMS(5000);
    
//     console.log('User found:', user ? 'Yes' : 'No');

//     // For security, always return success even if user doesn't exist
//     if (!user) {
//       console.log('No user found with email:', email);
//       return res.status(200).json({
//         success: true,
//         message: 'If an account exists with this email, you will receive an OTP'
//       });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     console.log('Generated OTP for user:', user.email);
    
//     // Hash OTP before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedOTP = await bcrypt.hash(otp, salt);

//     // Save OTP and expiry to user document
//     user.resetPasswordOTP = hashedOTP;
//     user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();
//     console.log('OTP saved for user:', user.email);

//     // Send OTP via email
//     const emailResult = await sendOTPEmail(email, otp, user.fullName);

//     if (!emailResult.success) {
//       console.error('Failed to send email:', emailResult.error);
//       return res.status(200).json({
//         success: true,
//         message: 'If an account exists with this email, you will receive an OTP'
//       });
//     }

//     console.log('OTP email sent successfully to:', email);
//     res.json({
//       success: true,
//       message: 'OTP sent successfully to your email'
//     });

//   } catch (error) {
//     console.error('Forgot password error details:', {
//       name: error.name,
//       message: error.message,
//       stack: error.stack
//     });
    
//     // Check for specific MongoDB errors
//     if (error.name === 'MongoNotConnectedError' || error.message.includes('Client must be connected')) {
//       return res.status(503).json({
//         success: false,
//         message: 'Database connection issue. Please try again in a moment.'
//       });
//     }
    
//     if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
//       return res.status(503).json({
//         success: false,
//         message: 'Database operation timed out. Please try again.'
//       });
//     }
    
//     res.status(500).json({
//       success: false,
//       message: 'Server error processing your request'
//     });
//   }
// };

// // @desc    Verify OTP
// // @route   POST /api/auth/verify-otp
// // @access  Public
// const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide email and OTP'
//       });
//     }

//     // Check database connection
//     if (mongoose.connection.readyState !== 1) {
//       return res.status(503).json({
//         success: false,
//         message: 'Database connection issue. Please try again.'
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email: email.toLowerCase() });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired OTP'
//       });
//     }

//     // Check if OTP exists and is not expired
//     if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
//       return res.status(400).json({
//         success: false,
//         message: 'No OTP request found. Please request a new OTP.'
//       });
//     }

//     // Check if OTP is expired
//     if (user.resetPasswordExpires < Date.now()) {
//       // Clear expired OTP
//       user.resetPasswordOTP = null;
//       user.resetPasswordExpires = null;
//       await user.save();
      
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new one.'
//       });
//     }

//     // Verify OTP
//     const isValidOTP = await bcrypt.compare(otp, user.resetPasswordOTP);

//     if (!isValidOTP) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid OTP. Please try again.'
//       });
//     }

//     // OTP is valid - create a temporary token for password reset
//     const resetToken = jwt.sign(
//       { userId: user._id, purpose: 'password-reset' },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' }
//     );

//     // Clear OTP after successful verification
//     user.resetPasswordOTP = null;
//     user.resetPasswordExpires = null;
//     await user.save();

//     res.json({
//       success: true,
//       message: 'OTP verified successfully',
//       resetToken
//     });

//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error verifying OTP'
//     });
//   }
// };

// // @desc    Reset password
// // @route   POST /api/auth/reset-password
// // @access  Public (with reset token)
// const resetPassword = async (req, res) => {
//   try {
//     const { resetToken, newPassword, confirmPassword } = req.body;

//     console.log('=== RESET PASSWORD REQUEST ===');

//     if (!resetToken || !newPassword || !confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide all required fields'
//       });
//     }

//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Passwords do not match'
//       });
//     }

//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: 'Password must be at least 6 characters long'
//       });
//     }

//     // Verify reset token
//     let decoded;
//     try {
//       decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
//       console.log('Token verified for user ID:', decoded.userId);
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid or expired reset token. Please request a new OTP.'
//       });
//     }

//     if (decoded.purpose !== 'password-reset') {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token purpose'
//       });
//     }

//     // Find the user
//     const user = await User.findById(decoded.userId);
    
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // Update the user's password
//     user.password = hashedPassword;
//     user.resetPasswordOTP = null;
//     user.resetPasswordExpires = null;
    
//     await user.save();

//     console.log('Password reset successful for user:', user.email);

//     res.json({
//       success: true,
//       message: 'Password reset successfully. You can now login with your new password.'
//     });

//   } catch (error) {
//     console.error('Reset password error:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'Server error resetting password'
//     });
//   }
// };

// // @desc    Test password verification (for debugging only)
// // @route   POST /api/auth/test-password
// // @access  Public (remove in production)
// const testPassword = async (req, res) => {
//   try {
//     const { username, password } = req.body;
    
//     const user = await User.findOne({ 
//       $or: [
//         { username: username.toLowerCase() },
//         { email: username.toLowerCase() }
//       ]
//     }).select('+password');
    
//     if (!user) {
//       return res.json({ 
//         success: false, 
//         message: 'User not found',
//         userExists: false
//       });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
    
//     res.json({
//       success: true,
//       userExists: true,
//       username: user.username,
//       email: user.email,
//       passwordMatches: isMatch,
//       passwordHash: user.password ? 'Present' : 'Missing',
//       hashFormat: user.password ? (user.password.startsWith('$2a$') ? 'BCrypt Hash' : 'Plain text') : 'None',
//       hashLength: user.password ? user.password.length : 0
//     });
    
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// };

// module.exports = {
//   register,
//   login,
//   getMe,
//   logout,
//   forgotPassword,
//   verifyOTP,
//   resetPassword,
//   testPassword
// };



const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { 
  generateOTP, 
  sendOTPEmail,
  sendPasswordResetSuccessEmail 
} = require('../utils/emailService');
const mongoose = require('mongoose');

/**
 * Generate JWT Token
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const { username, email, password, fullName, department, position, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or username already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      fullName,
      department,
      position,
      role: role || 'employee'
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('❌ Register error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  console.log('🔐 Login request received:', req.body);
  
  try {
    const { username, email, password } = req.body;

    // Validate input
    if ((!username && !email) || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username/email and password' 
      });
    }

    // Build query
    let query = {};
    
    if (email && email.trim() !== '') {
      query.email = email.toLowerCase().trim();
    } else if (username && username.trim() !== '') {
      const trimmedUsername = username.trim();
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedUsername);
      
      if (isEmail) {
        query.email = trimmedUsername.toLowerCase();
      } else {
        query.$or = [
          { username: trimmedUsername },
          { email: trimmedUsername.toLowerCase() }
        ];
      }
    }

    console.log('🔍 Login query:', JSON.stringify(query));

    // Find user
    const user = await User.findOne(query).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ 
        success: false, 
        message: 'Your account has been deactivated. Please contact HR.' 
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
};

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password -resetPasswordOTP');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('❌ Get me error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logout = (req, res) => {
  return res.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
};

/**
 * @desc    Forgot password - Send OTP
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.error('❌ Database not connected. Current state:', mongoose.connection.readyState);
      return res.status(503).json({
        success: false,
        message: 'Database connection issue. Please try again.'
      });
    }

    console.log('🔍 Searching for user with email:', email);
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() }).maxTimeMS(5000);
    
    console.log('👤 User found:', user ? 'Yes' : 'No');

    // For security, always return success even if user doesn't exist
    if (!user) {
      console.log('⚠️ No user found with email:', email);
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, you will receive an OTP'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    console.log('🔢 Generated OTP for user:', user.email);
    
    // Hash OTP before saving
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    // Save OTP and expiry
    user.resetPasswordOTP = hashedOTP;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    console.log('💾 OTP saved for user:', user.email);

    // Send OTP via email
    const emailResult = await sendOTPEmail(email, otp, user.fullName);

    if (!emailResult.success) {
      console.error('❌ Failed to send email:', emailResult.error);
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, you will receive an OTP'
      });
    }

    console.log('✅ OTP email sent successfully to:', email);
    return res.json({
      success: true,
      message: 'OTP sent successfully to your email'
    });

  } catch (error) {
    console.error('❌ Forgot password error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Check for specific MongoDB errors
    if (error.name === 'MongoNotConnectedError' || error.message.includes('Client must be connected')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection issue. Please try again in a moment.'
      });
    }
    
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database operation timed out. Please try again.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Server error processing your request'
    });
  }
};

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and OTP'
      });
    }

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection issue. Please try again.'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP'
      });
    }

    // Check if OTP exists and is not expired
    if (!user.resetPasswordOTP || !user.resetPasswordExpires) {
      return res.status(400).json({
        success: false,
        message: 'No OTP request found. Please request a new OTP.'
      });
    }

    // Check if OTP is expired
    if (user.resetPasswordExpires < Date.now()) {
      // Clear expired OTP
      user.resetPasswordOTP = null;
      user.resetPasswordExpires = null;
      await user.save();
      
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, user.resetPasswordOTP);

    if (!isValidOTP) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // OTP is valid - create temporary token for password reset
    const resetToken = jwt.sign(
      { userId: user._id, purpose: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Clear OTP after successful verification
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.json({
      success: true,
      message: 'OTP verified successfully',
      resetToken
    });

  } catch (error) {
    console.error('❌ Verify OTP error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error verifying OTP'
    });
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/auth/reset-password
 * @access  Public (with reset token)
 */
const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    console.log('=== 🔐 RESET PASSWORD REQUEST ===');

    // Validate input
    if (!resetToken || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Verify reset token
    let decoded;
    try {
      decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
      console.log('✅ Token verified for user ID:', decoded.userId);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired reset token. Please request a new OTP.'
      });
    }

    // Validate token purpose
    if (decoded.purpose !== 'password-reset') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token purpose'
      });
    }

    // Find the user
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    
    await user.save();

    console.log('✅ Password reset successful for user:', user.email);

    // Send password reset success email
    const emailResult = await sendPasswordResetSuccessEmail(user.email, user.fullName);
    
    if (!emailResult.success) {
      console.error('⚠️ Failed to send success email:', emailResult.error);
      // Don't return error to client as password was already reset
    } else {
      console.log('✅ Password reset success email sent to:', user.email);
    }

    return res.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('❌ Reset password error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error resetting password'
    });
  }
};

/**
 * @desc    Test password verification (debugging only)
 * @route   POST /api/auth/test-password
 * @access  Public (remove in production)
 */
const testPassword = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ 
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() }
      ]
    }).select('+password');
    
    if (!user) {
      return res.json({ 
        success: false, 
        message: 'User not found',
        userExists: false
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    return res.json({
      success: true,
      userExists: true,
      username: user.username,
      email: user.email,
      passwordMatches: isMatch,
      passwordHash: user.password ? 'Present' : 'Missing',
      hashFormat: user.password ? (user.password.startsWith('$2a$') ? 'BCrypt Hash' : 'Plain text') : 'None',
      hashLength: user.password ? user.password.length : 0
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  testPassword
};