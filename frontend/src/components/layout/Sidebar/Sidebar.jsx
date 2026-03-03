
// import React from 'react';
// import SidebarHeader from './SidebarHeader';
// import SidebarItem from './SidebarItem';
// import LogoutButton from './LogoutButton';
// import { SIDEBAR_ITEMS } from '../../../constants/sidebarConstants';
// import { useTheme } from '../../../context/ThemeContext';
// import { useSidebar } from '../../../context/SidebarContext';

// const Sidebar = () => {
//   const { darkMode } = useTheme();
//   const { 
//     sidebarCollapsed,  // This was missing
//     mobileSidebarOpen, 
//     handleMouseEnter, 
//     handleMouseLeave,
//     closeMobileSidebar
//   } = useSidebar();

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {mobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden will-change-transform"
//           onClick={closeMobileSidebar}
//         />
//       )}

//       <aside 
//         className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           transform transition-transform duration-200 ease-out will-change-transform
//           ${sidebarCollapsed ? 'w-20' : 'w-64'}
//           ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//           ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
//           border-r shadow-lg flex flex-col
//           overflow-y-auto
//         `}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{ height: '100vh' }}
//       >
//         <SidebarHeader />
        
//         <nav className="flex-1 py-4">
//           {SIDEBAR_ITEMS.map((item) => (
//             <SidebarItem key={item.name} item={item} />
//           ))}
//         </nav>

//         <LogoutButton />
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

// Sidebar.js
import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import { SIDEBAR_ITEMS } from '../../../constants/sidebarConstants';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';

const Sidebar = ({ onOpenSettings }) => {
  const { darkMode } = useTheme();
  const { 
    sidebarCollapsed,
    mobileSidebarOpen, 
    handleMouseEnter, 
    handleMouseLeave,
    closeMobileSidebar
  } = useSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden will-change-transform"
          onClick={closeMobileSidebar}
        />
      )}

      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          transform transition-transform duration-200 ease-out will-change-transform
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border-r shadow-lg flex flex-col
          overflow-y-auto
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ height: '100vh' }}
      >
        <SidebarHeader />
        
        <nav className="flex-1 py-4">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem 
              key={item.name} 
              item={item} 
              onOpenSettings={onOpenSettings}
            />
          ))}
        </nav>

        <LogoutButton />
      </aside>
    </>
  );
};

export default Sidebar;