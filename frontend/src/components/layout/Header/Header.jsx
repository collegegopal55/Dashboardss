
import React from 'react';
import MobileMenuButton from './MobileMenuButton';
import MainNav from './MainNav';
import DarkModeToggle from './DarkModeToggle';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import { useTheme } from '../../../context/ThemeContext';
import logo from '../../../assets/logo.png';
import { useMobile } from '../../../hooks/useMobile';

const Header = ({ activeMenuItem, setActiveMenuItem, children }) => {
  const { darkMode } = useTheme();
  const { isMobile } = useMobile();

  return (
    <header className={`
      sticky top-0 z-40 shadow-sm flex-shrink-0
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border-b
    `}>
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <MobileMenuButton />
            
            {isMobile && (
              <>
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 lg:hidden">
                  <img 
                    src={logo} 
                    alt="Pezzi Softech Logo"
                    className="w-full h-full object-contain"
                    loading="eager"
                  />
                </div>
                <div className="lg:hidden">
                  <span className={`font-semibold text-base block truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Softech 
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Center Section */}
          <MainNav 
            activeMenuItem={activeMenuItem} 
            setActiveMenuItem={setActiveMenuItem} 
          />

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {children}
            <DarkModeToggle />
            <NotificationBell />
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;