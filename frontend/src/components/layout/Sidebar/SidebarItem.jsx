// import React from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useTheme } from '../../../context/ThemeContext';
// import { useSidebar } from '../../../context/SidebarContext';
// import { useMobile } from '../../../hooks/useMobile';

// const SidebarItem = ({ item }) => {
//   const { darkMode } = useTheme();
//   const { 
//     sidebarCollapsed, 
//     expandedDropdowns, 
//     activeSidebarItem,
//     activeDropdownItem,
//     toggleDropdown,
//     setActiveItem
//   } = useSidebar();
//   const { isMobile } = useMobile();

//   const isExpanded = expandedDropdowns[item.name];
//   const hasDropdown = item.hasDropdown;
//   const shouldShowFull = isMobile || !sidebarCollapsed;
//   const isActive = activeSidebarItem === item.name && !hasDropdown;

//   const handleClick = () => {
//     if (hasDropdown) {
//       toggleDropdown(item.name);
//     } else {
//       setActiveItem(item.name);
//     }
//   };

//   const handleDropdownClick = (dropdownItem) => {
//     setActiveItem(item.name, dropdownItem.name);
//   };

//   return (
//     <div>
//       <button
//         onClick={handleClick}
//         className={`
//           flex items-center w-full px-4 py-3 mb-1 mx-2 rounded-lg
//           transition-colors duration-150 relative group cursor-pointer
//           ${shouldShowFull ? 'justify-between' : 'justify-center'}
//           ${isActive
//             ? darkMode 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-blue-50 text-blue-600'
//             : darkMode
//               ? 'text-gray-300 hover:bg-gray-700'
//               : 'text-gray-600 hover:bg-gray-100'
//           }
//           ${hasDropdown ? 'font-semibold' : ''}
//           ${item.name === 'MANAGE' || item.name === 'REPORT' ? 'text-sm uppercase tracking-wider mt-4' : ''}
//         `}
//       >
//         <div className="flex items-center">
//           <item.icon className={`w-5 h-5 flex-shrink-0 ${shouldShowFull ? 'mr-3' : ''}`} />
//           {shouldShowFull && (
//             <span className="text-sm font-medium truncate">{item.name}</span>
//           )}
//         </div>
        
//         {hasDropdown && shouldShowFull && (
//           <span className="ml-2">
//             {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//           </span>
//         )}

//         {/* Tooltip */}
//         {!isMobile && sidebarCollapsed && !shouldShowFull && (
//           <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
//             {item.name}
//           </div>
//         )}
//       </button>

//       {/* Dropdown Items */}
//       {hasDropdown && isExpanded && shouldShowFull && (
//         <div className="ml-8 mt-1 mb-2 space-y-1">
//           {item.dropdownItems.map((dropdownItem, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleDropdownClick(dropdownItem)}
//               className={`
//                 flex items-center w-full px-4 py-2 rounded-lg text-sm
//                 transition-colors duration-150 group cursor-pointer
//                 ${activeDropdownItem === dropdownItem.name
//                   ? darkMode
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-blue-50 text-blue-600'
//                   : darkMode
//                     ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
//                     : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
//                 }
//               `}
//             >
//               <dropdownItem.icon className="w-4 h-4 mr-3 flex-shrink-0" />
//               <span className="truncate">{dropdownItem.name}</span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SidebarItem;


// SidebarItem.js
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useSidebar } from '../../../context/SidebarContext';
import { useMobile } from '../../../hooks/useMobile';

const SidebarItem = ({ item, onOpenSettings }) => {
  const { darkMode } = useTheme();
  const { 
    sidebarCollapsed, 
    expandedDropdowns, 
    activeSidebarItem,
    activeDropdownItem,
    toggleDropdown,
    setActiveItem
  } = useSidebar();
  const { isMobile } = useMobile();

  const isExpanded = expandedDropdowns[item.name];
  const hasDropdown = item.hasDropdown;
  const shouldShowFull = isMobile || !sidebarCollapsed;
  const isActive = activeSidebarItem === item.name && !hasDropdown;

  const handleClick = () => {
    if (item.name === 'Settings') {
      // Settings parent click - open popup with visibility tab
      onOpenSettings('visibility');
      return;
    }
    
    if (hasDropdown) {
      toggleDropdown(item.name);
    } else {
      setActiveItem(item.name);
    }
  };

  const handleDropdownClick = (dropdownItem) => {
    if (item.name === 'Settings') {
      if (dropdownItem.name === 'Component Visibility') {
        onOpenSettings('visibility');
      } else if (dropdownItem.name === 'Layout Settings') {
        onOpenSettings('layout');
      } else if (dropdownItem.name === 'Visibility Presets') {
        onOpenSettings('presets');
      }
      return;
    }
    setActiveItem(item.name, dropdownItem.name);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`
          flex items-center w-full px-4 py-3 mb-1 mx-2 rounded-lg
          transition-colors duration-150 relative group cursor-pointer
          ${shouldShowFull ? 'justify-between' : 'justify-center'}
          ${isActive
            ? darkMode 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-50 text-blue-600'
            : darkMode
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-600 hover:bg-gray-100'
          }
          ${hasDropdown ? 'font-semibold' : ''}
          ${item.name === 'MANAGE' || item.name === 'REPORT' ? 'text-sm uppercase tracking-wider mt-4' : ''}
        `}
      >
        <div className="flex items-center">
          <item.icon className={`w-5 h-5 flex-shrink-0 ${shouldShowFull ? 'mr-3' : ''}`} />
          {shouldShowFull && (
            <span className="text-sm font-medium truncate">{item.name}</span>
          )}
        </div>
        
        {hasDropdown && shouldShowFull && (
          <span className="ml-2">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        )}

        {/* Tooltip */}
        {!isMobile && sidebarCollapsed && !shouldShowFull && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
            {item.name}
          </div>
        )}
      </button>

      {/* Dropdown Items */}
      {hasDropdown && isExpanded && shouldShowFull && (
        <div className="ml-8 mt-1 mb-2 space-y-1">
          {item.dropdownItems.map((dropdownItem, idx) => (
            <button
              key={idx}
              onClick={() => handleDropdownClick(dropdownItem)}
              className={`
                flex items-center w-full px-4 py-2 rounded-lg text-sm
                transition-colors duration-150 group cursor-pointer
                ${activeDropdownItem === dropdownItem.name
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }
              `}
            >
              <dropdownItem.icon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="truncate">{dropdownItem.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;