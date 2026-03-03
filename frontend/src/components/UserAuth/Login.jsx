
// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { User, Lock, AlertCircle, Eye, EyeOff, Mail } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';
// import { validateLoginForm } from '../../utils/validation';
// import photo from '../../assets/image.jpeg';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     login: '',
//     password: ''
//   });
  
//   const [loginType, setLoginType] = useState('username');
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, loading, error: authError, isAuthenticated, user } = useAuth();
  
//   const navigate = useNavigate();

//   const detectLoginType = (value) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(value) ? 'email' : 'username';
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'login') {
//       const newLoginType = detectLoginType(value);
//       setLoginType(newLoginType);
//     }
    
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//     if (errors.general) {
//       setErrors(prev => ({
//         ...prev,
//         general: ''
//       }));
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       // let redirectUrl = '/employee/dashboard';
//       let redirectUrl = '/attendance';
//       switch(user?.role) {
//         case 'admin':
//           redirectUrl = '/admin/dashboard';
//           break;
//         case 'hr':
//           redirectUrl = '/hr/dashboard';
//           break;
//         case 'manager':
//           redirectUrl = '/manager/dashboard';
//           break;
//         default:
//           redirectUrl = '/attendance';
//       }
//       navigate(redirectUrl, { replace: true });
//     }
//   }, [isAuthenticated, user, navigate]);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     const validation = validateLoginForm({
//       login: formData.login,
//       password: formData.password
//     });
    
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }
    
//     try {
//       const isEmail = loginType === 'email';
      
//       const result = await login(
//         isEmail ? '' : formData.login,
//         isEmail ? formData.login : '',
//         formData.password
//       );
      
//       if (result.success) {
//         navigate(result.redirectUrl, { replace: true });
//       } else {
//         setErrors({ general: result.error });
//       }
//     } catch (err) {
//       setErrors({ general: err.message || 'An unexpected error occurred' });
//     }
//   };

//   if (isAuthenticated && loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8 font-sans relative overflow-hidden"
//       style={{ backgroundImage: `url(${photo})` }} 
//     >
//       <div className="absolute inset-0 bg-blue-900/30 lg:bg-blue-900/20 pointer-events-none"></div>

//       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        
//         <div className="text-white space-y-4 md:space-y-6 hidden lg:block self-center lg:self-start lg:mt-10"> 
//           <h1 className="text-4xl xl:text-6xl font-bold tracking-tight drop-shadow-2xl">
//             Welcome to Pezzi
//           </h1>
//           <p className="text-xl xl:text-2xl font-medium opacity-90 drop-shadow-lg">
//             Attendance & Payroll Management Simplified.
//           </p>
//           <p className="text-base xl:text-lg opacity-80 max-w-md leading-relaxed drop-shadow-md">
//             Securely log in to access your employee attendance and payroll dashboard.
//           </p>
//         </div>

//         <div className="flex justify-center lg:justify-end w-full">
//           <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-[440px] border border-white/40 relative">
            
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-10">
//               Log in to Pezzi
//             </h2>
            
//             {(authError || errors.general) && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
//                 <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
//                 <p className="text-red-600 text-sm">{authError || errors.general}</p>
//               </div>
//             )}
            
//             <form className="space-y-5" onSubmit={handleLogin}>
//               <div className="space-y-2">
//                 <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
//                   Username or Email <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
//                     {loginType === 'email' ? <Mail size={18} /> : <User size={18} />}
//                   </span>
//                   <input 
//                     type="text" 
//                     name="login"
//                     value={formData.login}
//                     onChange={handleInputChange}
//                     placeholder="Enter username or email" 
//                     className={`w-full pl-11 pr-4 py-3.5 md:py-4 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base ${
//                       errors.login ? 'border-red-300 bg-red-50' : 'border-gray-200'
//                     }`}
//                     disabled={loading}
//                     autoComplete="username"
//                   />
//                 </div>
//                 {errors.login && (
//                   <p className="text-red-500 text-xs mt-1 ml-1">{errors.login}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
//                     <Lock size={18} />
//                   </span>
//                   <input 
//                     type={showPassword ? "text" : "password"} 
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     placeholder="Enter password" 
//                     className={`w-full pl-11 pr-12 py-3.5 md:py-4 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base ${
//                       errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
//                     }`}
//                     disabled={loading}
//                     autoComplete="current-password"
//                   />
//                   <button
//                     type="button"
//                     onClick={togglePasswordVisibility}
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
//                     tabIndex="-1"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
//                 )}
//               </div>

//               <div className="flex justify-end">
//                 <Link 
//                   to="/forgot-password" 
//                   className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
//                 >
//                   Forgot password?
//                 </Link>
//               </div> 

//               <button 
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Logging in...
//                   </>
//                 ) : (
//                   'Log In'
//                 )}
//               </button>
//             </form>

//             <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] md:text-xs text-gray-400 font-medium">
//               <span>© 2024 Pezzi</span>
//               <Link to="/privacy-policy" className="hover:text-gray-600">Privacy Policy</Link>
//               <Link to="/terms-of-service" className="hover:text-gray-600">Terms of Service</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle, Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { validateLoginForm } from '../../utils/validation';
import photo from '../../assets/image.jpeg';

const Login = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  
  const [loginType, setLoginType] = useState('username');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error: authError, isAuthenticated, user } = useAuth();
  
  const navigate = useNavigate();

  const detectLoginType = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? 'email' : 'username';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'login') {
      const newLoginType = detectLoginType(value);
      setLoginType(newLoginType);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  };

  // Redirect to attendance dashboard when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Always redirect to attendance dashboard after login
      navigate('/attendance', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validation = validateLoginForm({
      login: formData.login,
      password: formData.password
    });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    try {
      const isEmail = loginType === 'email';
      
      const result = await login(
        isEmail ? '' : formData.login,
        isEmail ? formData.login : '',
        formData.password
      );
      
      if (result.success) {
        // Always redirect to attendance dashboard after successful login
        navigate('/attendance', { replace: true });
      } else {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: err.message || 'An unexpected error occurred' });
    }
  };

  if (isAuthenticated && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 sm:p-8 font-sans relative overflow-hidden"
      style={{ backgroundImage: `url(${photo})` }} 
    >
      <div className="absolute inset-0 bg-blue-900/30 lg:bg-blue-900/20 pointer-events-none"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10">
        
        <div className="text-white space-y-4 md:space-y-6 hidden lg:block self-center lg:self-start lg:mt-10"> 
          <h1 className="text-4xl xl:text-6xl font-bold tracking-tight drop-shadow-2xl">
            Welcome to Pezzi
          </h1>
          <p className="text-xl xl:text-2xl font-medium opacity-90 drop-shadow-lg">
            Attendance & Payroll Management Simplified.
          </p>
          <p className="text-base xl:text-lg opacity-80 max-w-md leading-relaxed drop-shadow-md">
            Securely log in to access your employee attendance and payroll dashboard.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end w-full">
          <div className="bg-white/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-10 lg:p-12 w-full max-w-[440px] border border-white/40 relative">
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-10">
              Log in to Pezzi
            </h2>
            
            {(authError || errors.general) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
                <p className="text-red-600 text-sm">{authError || errors.general}</p>
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                  Username or Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    {loginType === 'email' ? <Mail size={18} /> : <User size={18} />}
                  </span>
                  <input 
                    type="text" 
                    name="login"
                    value={formData.login}
                    onChange={handleInputChange}
                    placeholder="Enter username or email" 
                    className={`w-full pl-11 pr-4 py-3.5 md:py-4 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base ${
                      errors.login ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    disabled={loading}
                    autoComplete="username"
                  />
                </div>
                {errors.login && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.login}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password" 
                    className={`w-full pl-11 pr-12 py-3.5 md:py-4 bg-gray-50/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm md:text-base ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div> 

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 md:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </form>

            <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] md:text-xs text-gray-400 font-medium">
              <span>© 2024 Pezzi</span>
              <Link to="/privacy-policy" className="hover:text-gray-600">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-gray-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;