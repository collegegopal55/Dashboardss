import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Key } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import photo from '../../assets/image.jpeg';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Get email from session storage
    const storedEmail = sessionStorage.getItem('resetEmail');
    if (!storedEmail) {
      navigate('/forgot-password');
    } else {
      setEmail(storedEmail);
    }

    // Start timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('');
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 6) newOtp[index] = digit;
      });
      setOtp(newOtp);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp: otpString
      });

      if (response.data.success) {
        setSuccess(true);
        setMessage('OTP verified successfully!');
        
        // Store reset token
        sessionStorage.setItem('resetToken', response.data.resetToken);
        
        // Redirect to reset password page
        setTimeout(() => {
          navigate('/reset-password');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      if (response.data.success) {
        setMessage('New OTP sent successfully!');
        setTimer(300);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        
        // Focus first input
        document.getElementById('otp-0')?.focus();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
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
            Verify OTP
          </h1>
          <p className="text-xl xl:text-2xl font-medium opacity-90 drop-shadow-lg">
            Check your email for the code.
          </p>
          <p className="text-base xl:text-lg opacity-80 max-w-md leading-relaxed drop-shadow-md">
            Enter the 6-digit code we sent to your email address.
          </p>
        </div>

        {/* Right Side: Verify OTP Card */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-[440px] border border-white/40 relative">
            
            <Link to="/forgot-password" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Link>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">
              Verify OTP
            </h2>
            
            <p className="text-center text-gray-600 text-sm mb-8">
              Code sent to <span className="font-semibold">{email}</span>
            </p>
            
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
            
            <form className="space-y-6" onSubmit={handleVerify}>
              {/* OTP Input */}
              <div className="space-y-3">
                <label className="text-xs md:text-sm font-semibold text-gray-700 block text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center gap-2 md:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      disabled={loading || success}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600">
                    OTP expires in <span className="font-bold text-blue-600">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <p className="text-sm text-red-600">OTP expired. Please request a new one.</p>
                )}
              </div>

              <button 
                type="submit"
                disabled={loading || success || otp.join('').length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResendOTP}
                  disabled={!canResend || loading}
                  className={`font-semibold ${
                    canResend && !loading
                      ? 'text-blue-600 hover:text-blue-700 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;