import React from 'react';
import { useTheme } from '../../../context/ThemeContext';

const VisibilityToggle = ({ label, isVisible, onToggle }) => {
  const { darkMode } = useTheme();

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </span>
      <button
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors focus:outline-none
          ${isVisible ? 'bg-blue-600' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${isVisible ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};

export default VisibilityToggle;