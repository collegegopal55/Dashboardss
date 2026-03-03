import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const WelcomeSection = ({ activeMenuItem }) => {
  const { darkMode } = useTheme();

  return (
    <div className="mb-6">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {activeMenuItem} Dashboard
      </h1>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
        Welcome back, Admin! Here's what's happening today.
      </p>
    </div>
  );
};

export default WelcomeSection;