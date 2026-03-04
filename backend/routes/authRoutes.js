
// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const { 
//   register, 
//   login, 
//   getMe, 
//   logout,
 
//   forgotPassword,
//   verifyOTP,
//   resetPassword,
//   testPassword
// } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// // Validation rules
// const registerValidation = [
//   body('username')
//     .isLength({ min: 3 })
//     .withMessage('Username must be at least 3 characters long')
//     .trim()
//     .escape(),
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail(),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   body('fullName')
//     .notEmpty()
//     .withMessage('Full name is required')
//     .trim()
//     .escape()
// ];

// const loginValidation = [
//   body('username')
//     .notEmpty()
//     .withMessage('Username is required')
//     .trim()
//     .escape(),
//   body('password')
//     .notEmpty()
//     .withMessage('Password is required')
// ];

// // Password reset validation
// const forgotPasswordValidation = [
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail()
// ];

// const verifyOTPValidation = [
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail(),
//   body('otp')
//     .isLength({ min: 6, max: 6 })
//     .withMessage('OTP must be 6 digits')
//     .isNumeric()
//     .withMessage('OTP must contain only numbers')
// ];

// const resetPasswordValidation = [
//   body('resetToken')
//     .notEmpty()
//     .withMessage('Reset token is required'),
//   body('newPassword')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   body('confirmPassword')
//     .notEmpty()
//     .withMessage('Please confirm your password')
// ];

// // Routes
// router.post('/register', registerValidation, register);
// router.post('/login', loginValidation, login);
// router.get('/me', protect, getMe);
// router.post('/logout', protect, logout);


// // Password reset routes
// router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
// router.post('/verify-otp', verifyOTPValidation, verifyOTP);
// router.post('/reset-password', resetPasswordValidation, resetPassword);

// // Debug route - remove in production
// router.post('/test-password', testPassword);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const { 
//   register, 
//   login, 
//   getMe, 
//   logout,
//   forgotPassword,
//   verifyOTP,
//   resetPassword,
//   testPassword,
//   updateProfile,        // Add these new controllers
//   changePassword,
//   updatePreferences,
//   uploadAvatar
// } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware'); // You'll need to create this

// // Validation rules
// const registerValidation = [
//   body('username')
//     .isLength({ min: 3 })
//     .withMessage('Username must be at least 3 characters long')
//     .trim()
//     .escape(),
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail(),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   body('fullName')
//     .notEmpty()
//     .withMessage('Full name is required')
//     .trim()
//     .escape()
// ];

// const loginValidation = [
//   body('username')
//     .notEmpty()
//     .withMessage('Username is required')
//     .trim()
//     .escape(),
//   body('password')
//     .notEmpty()
//     .withMessage('Password is required')
// ];

// // Password reset validation
// const forgotPasswordValidation = [
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail()
// ];

// const verifyOTPValidation = [
//   body('email')
//     .isEmail()
//     .withMessage('Please provide a valid email')
//     .normalizeEmail(),
//   body('otp')
//     .isLength({ min: 6, max: 6 })
//     .withMessage('OTP must be 6 digits')
//     .isNumeric()
//     .withMessage('OTP must contain only numbers')
// ];

// const resetPasswordValidation = [
//   body('resetToken')
//     .notEmpty()
//     .withMessage('Reset token is required'),
//   body('newPassword')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   body('confirmPassword')
//     .notEmpty()
//     .withMessage('Please confirm your password')
// ];

// // Profile update validation
// const updateProfileValidation = [
//   body('fullName')
//     .optional()
//     .trim()
//     .escape(),
//   body('department')
//     .optional()
//     .trim()
//     .escape(),
//   body('position')
//     .optional()
//     .trim()
//     .escape(),
//   body('phone')
//     .optional()
//     .trim()
//     .escape(),
//   body('address')
//     .optional()
//     .trim()
//     .escape()
// ];

// const changePasswordValidation = [
//   body('currentPassword')
//     .notEmpty()
//     .withMessage('Current password is required'),
//   body('newPassword')
//     .isLength({ min: 6 })
//     .withMessage('New password must be at least 6 characters long')
// ];

// const updatePreferencesValidation = [
//   body('notifications')
//     .optional()
//     .isObject(),
//   body('theme')
//     .optional()
//     .isString(),
//   body('language')
//     .optional()
//     .isString()
// ];

// // Routes
// router.post('/register', registerValidation, register);
// router.post('/login', loginValidation, login);
// router.get('/me', protect, getMe);
// router.post('/logout', protect, logout);

// // Profile management routes
// router.put('/profile', protect, updateProfileValidation, updateProfile);
// router.put('/change-password', protect, changePasswordValidation, changePassword);
// router.put('/preferences', protect, updatePreferencesValidation, updatePreferences);
// router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

// // Password reset routes
// router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
// router.post('/verify-otp', verifyOTPValidation, verifyOTP);
// router.post('/reset-password', resetPasswordValidation, resetPassword);

// // Debug route - remove in production
// router.post('/test-password', testPassword);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { uploadAvatar } = require('../config/cloudinary'); // Import from cloudinary config
require("dotenv").config();
// Validation rules
const registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('fullName').notEmpty().withMessage('Full name is required')
];

const loginValidation = [
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOTP);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);
router.put('/preferences', protect, authController.updatePreferences);

// Avatar routes with Cloudinary
router.post('/avatar', protect, uploadAvatar.single('avatar'), authController.uploadAvatar);
router.delete('/avatar', protect, authController.deleteAvatar);

// Debug route (remove in production)
if (process.env.NODE_ENV !== 'production') {
  router.post('/test-password', authController.testPassword);
}

module.exports = router;
