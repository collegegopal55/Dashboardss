import React from 'react';
import VisibilityToggle from './VisibilityToggle';
import { COMPONENT_VISIBILITY } from '../../../constants/dashboardConstants';
import { useTheme } from '../../../context/ThemeContext';

const SettingsPanel = ({ componentVisibility, onToggleVisibility }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`mb-6 p-4 rounded-xl border ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Component Visibility Settings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(COMPONENT_VISIBILITY).map(([key, { name }]) => (
          <VisibilityToggle
            key={key}
            label={name}
            isVisible={componentVisibility[key]}
            onToggle={() => onToggleVisibility(key)}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsPanel;