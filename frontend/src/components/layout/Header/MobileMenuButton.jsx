import React from 'react';
import { Menu } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';

const MobileMenuButton = () => {
  const { darkMode } = useTheme();
  const { toggleMobileSidebar } = useSidebar();

  return (
    <button
      onClick={toggleMobileSidebar}
      className="lg:hidden p-2 rounded-lg active:bg-gray-100 dark:active:bg-gray-700"
    >
      <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
    </button>
  );
};

export default MobileMenuButton;