
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../../../assets/logo.png';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';
import { useMobile } from '../../../hooks/useMobile';

const SidebarHeader = () => {
  const { darkMode } = useTheme();
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const { isMobile } = useMobile();

  return (
    <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex-shrink-0`}>
      <div className="flex items-center justify-between">
        {(!isMobile && sidebarCollapsed) ? (
          <div className="w-10 h-10 rounded-lg overflow-hidden mx-auto">
            <img 
              src={logo} 
              alt="Pezzi Softech"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={logo} 
                alt="Pezzi Softech Logo"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div>
              <span className={`font-semibold text-lg block truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Softech India LLP
              </span>
            </div>
          </div>
        )}
        
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`hidden lg:block p-1 rounded-lg flex-shrink-0 ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;