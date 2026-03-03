import React from 'react';
import { MAIN_NAV_ITEMS } from '../../../constants/dashboardConstants';
import { useTheme } from '../../../context/ThemeContext';

const MainNav = ({ activeMenuItem, setActiveMenuItem }) => {
  const { darkMode } = useTheme();

  return (
    <nav className="hidden lg:flex items-center space-x-1">
      {MAIN_NAV_ITEMS.map((item) => (
        <button
          key={item.name}
          onClick={() => setActiveMenuItem(item.name)}
          className={`
            flex items-center px-4 py-2 rounded-lg text-sm font-medium
            transition-colors duration-150
            ${activeMenuItem === item.name
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-600'
              : darkMode
                ? 'text-gray-300 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          <item.icon className="w-4 h-4 mr-2" />
          {item.name}
        </button>
      ))}
    </nav>
  );
};

export default MainNav;