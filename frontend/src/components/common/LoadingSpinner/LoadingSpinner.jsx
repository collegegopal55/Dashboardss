import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const LoadingSpinner = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;