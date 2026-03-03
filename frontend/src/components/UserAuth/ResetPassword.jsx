import { useState, useEffect } from 'react';
import { Lock, ArrowLeft, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo from '../../assets/image.jpeg';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState('');
const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    // Get reset token from session storage
    const token = sessionStorage.getItem('resetToken');
    if (!token) {
      navigate('/forgot-password');
    } else {
      setResetToken(token);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('At least 6 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('At least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('At least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('At least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  errors.push('At least one special character');
}
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setError('Password must meet requirements: ' + passwordErrors.join(', '));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        resetToken,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });

      if (response.data.success) {
        setSuccess(true);
        
        // Clear session storage
        sessionStorage.removeItem('resetToken');
        sessionStorage.removeItem('resetEmail');
        
        // Redirect to login
        setTimeout(() => {
          navigate('/login', { 
            state: { message: 'Password reset successful! Please login with your new password.' }
          });
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.newPassword.length >= 6 },
    { text: 'At least one uppercase letter', met: /[A-Z]/.test(formData.newPassword) },
    { text: 'At least one lowercase letter', met: /[a-z]/.test(formData.newPassword) },
    { text: 'At least one number', met: /[0-9]/.test(formData.newPassword) },
    { text: 'At least one special character', met:/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) }
  ];

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8 font-sans relative overflow-hidden"
      style={{ backgroundImage: `url(${photo})` }} 
    >
      <div className="absolute inset-0 bg-blue-900/30 lg:bg-blue-900/20 pointer-events-none"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        
        {/* Left Side: Information */}
        <div className="text-white space-y-4 md:space-y-6 hidden lg:block self-center lg:self-start lg:mt-10"> 
          <h1 className="text-4xl xl:text-6xl font-bold tracking-tight drop-shadow-2xl">
            Create New Password
          </h1>
          <p className="text-xl xl:text-2xl font-medium opacity-90 drop-shadow-lg">
            Almost there! Set your new password.
          </p>
          <p className="text-base xl:text-lg opacity-80 max-w-md leading-relaxed drop-shadow-md">
            Choose a strong password that you don't use elsewhere.
          </p>
        </div>

        {/* Right Side: Reset Password Card */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-[440px] border border-white/40 relative">
            
            <Link to="/verify-otp" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Link>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-10">
              Reset Password
            </h2>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-green-600 text-sm">Password reset successful! Redirecting to login...</p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                  New Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input 
                    type={showPassword.new ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password" 
                    className="w-full pl-11 pr-12 py-3.5 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base"
                    required
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input 
                    type={showPassword.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password" 
                    className="w-full pl-11 pr-12 py-3.5 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base"
                    required
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-xs font-semibold text-gray-700">Password requirements:</p>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      req.met ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {req.met && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                type="submit"
                disabled={loading || success || !formData.newPassword || !formData.confirmPassword}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </>
                ) : success ? (
                  'Redirecting...'
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;