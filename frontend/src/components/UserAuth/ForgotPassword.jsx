import { useState } from 'react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import photo from '../../assets/image.jpeg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      if (response.data.success) {
        setSuccess(true);
        setMessage(response.data.message);
        // Store email for OTP verification page
        sessionStorage.setItem('resetEmail', email);
        
        // Redirect to OTP verification after 2 seconds
        setTimeout(() => {
          window.location.href = '/verify-otp';
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            Forgot Password?
          </h1>
          <p className="text-xl xl:text-2xl font-medium opacity-90 drop-shadow-lg">
            Don't worry, we'll help you reset it.
          </p>
          <p className="text-base xl:text-lg opacity-80 max-w-md leading-relaxed drop-shadow-md">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>
        </div>

        {/* Right Side: Forgot Password Card */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-[440px] border border-white/40 relative">
            
            <Link to="/login" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to Login
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
                <p className="text-green-600 text-sm">{message}</p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="w-full pl-11 pr-4 py-3.5 md:py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base"
                    required
                    disabled={loading || success}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  We'll send a 6-digit OTP to this email
                </p>
              </div>

              <button 
                type="submit"
                disabled={loading || success}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending OTP...
                  </>
                ) : success ? (
                  'Redirecting...'
                ) : (
                  'Send OTP'
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

export default ForgotPassword;