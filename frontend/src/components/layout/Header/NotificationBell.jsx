// import React from 'react';
// import { Bell } from 'lucide-react';
// import { useTheme } from '../../../context/ThemeContext';

// const NotificationBell = () => {
//   const { darkMode } = useTheme();

//   return (
//     <button className={`relative p-2 rounded-lg transition-colors duration-150 ${
//       darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
//     }`}>
//       <Bell className="w-5 h-5" />
//       <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
//         3
//       </span>
//     </button>
//   );
// };

// export default NotificationBell;


// import React, { useState } from 'react';
// import { Bell, Clock, CheckCircle, Info, AlertTriangle } from 'lucide-react';
// import { useTheme } from '../../../context/ThemeContext';

// const NotificationBell = () => {
//   const { darkMode } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);

//   // Sample notification data
//   const notifications = [
//     {
//       id: 1,
//       title: 'New message from John',
//       description: 'Hey, can we schedule a meeting?',
//       time: '2024-03-15T10:30:00',
//       type: 'info',
//       read: false
//     },
//     {
//       id: 2,
//       title: 'Task completed',
//       description: 'Project report has been finalized',
//       time: '2024-03-15T09:15:00',
//       type: 'success',
//       read: false
//     },
//     {
//       id: 3,
//       title: 'Server alert',
//       description: 'CPU usage is above 80%',
//       time: '2024-03-14T23:45:00',
//       type: 'warning',
//       read: false
//     },
//      {
//       id: 4,
//       title: 'Server alert',
//       description: 'CPU usage is above 80%',
//       time: '2024-03-14T23:45:00',
//       type: 'warning',
//       read: false
//     }
//   ];

//   const getIcon = (type) => {
//     switch(type) {
//       case 'success':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'warning':
//         return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
//       default:
//         return <Info className="w-4 h-4 text-blue-500" />;
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.notification-bell-container')) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="notification-bell-container relative">
//       <button 
//         onClick={toggleDropdown}
//         className={`relative p-2 rounded-lg transition-colors duration-150 ${
//           darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
//         }`}
//       >
//         <Bell className="w-5 h-5" />
//         <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
//           {notifications.filter(n => !n.read).length}
//         </span>
//       </button>

//       {/* Dropdown Box */}
//       {isOpen && (
//         <>
//           {/* Backdrop for mobile */}
//           <div 
//             className="fixed inset-0 z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
          
//           <div className={`
//             absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-lg z-50
//             ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
//           `}>
//             {/* Header */}
//             <div className={`
//               px-4 py-3 border-b 
//               ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//             `}>
//               <div className="flex items-center justify-between">
//                 <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Notifications
//                 </h3>
//                 <button className={`text-sm ${
//                   darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
//                 }`}>
//                   Mark all as read
//                 </button>
//               </div>
//             </div>

//             {/* Notifications List */}
//             <div className="max-h-96 overflow-y-auto">
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`
//                       px-4 py-3 border-b last:border-b-0 cursor-pointer
//                       ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}
//                       ${!notification.read && (darkMode ? 'bg-gray-700/30' : 'bg-blue-50/50')}
//                     `}
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex-shrink-0 mt-1">
//                         {getIcon(notification.type)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className={`text-sm font-medium ${
//                           darkMode ? 'text-white' : 'text-gray-900'
//                         }`}>
//                           {notification.title}
//                         </p>
//                         <p className={`text-sm mt-0.5 ${
//                           darkMode ? 'text-gray-400' : 'text-gray-600'
//                         }`}>
//                           {notification.description}
//                         </p>
//                         <div className="flex items-center gap-1 mt-2">
//                           <Clock className={`w-3 h-3 ${
//                             darkMode ? 'text-gray-500' : 'text-gray-400'
//                           }`} />
//                           <span className={`text-xs ${
//                             darkMode ? 'text-gray-500' : 'text-gray-400'
//                           }`}>
//                             {formatTime(notification.time)}
//                           </span>
//                         </div>
//                       </div>
//                       {!notification.read && (
//                         <div className="flex-shrink-0">
//                           <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className={`px-4 py-8 text-center ${
//                   darkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}>
//                   <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                   <p>No notifications</p>
//                 </div>
//               )}
//             </div>

          
           
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;



// import React, { useState } from 'react';
// import { Bell, Clock, CheckCircle, Info, AlertTriangle } from 'lucide-react';
// import { useTheme } from '../../../context/ThemeContext';

// const NotificationBell = () => {
//   const { darkMode } = useTheme();
//   const [isOpen, setIsOpen] = useState(false);

//   // Sample notification data
//   const notifications = [
//     {
//       id: 1,
//       title: 'New message from John',
//       description: 'Hey, can we schedule a meeting?',
//       time: '2024-03-15T10:30:00',
//       type: 'info',
//       read: false
//     },
//     {
//       id: 2,
//       title: 'Task completed',
//       description: 'Project report has been finalized',
//       time: '2024-03-15T09:15:00',
//       type: 'success',
//       read: false
//     },
//     {
//       id: 3,
//       title: 'Server alert',
//       description: 'CPU usage is above 80%',
//       time: '2024-03-14T23:45:00',
//       type: 'warning',
//       read: false
//     },
//     {
//       id: 4,
//       title: 'New comment on post',
//       description: 'Sarah liked your comment',
//       time: '2024-03-14T20:30:00',
//       type: 'info',
//       read: true
//     },
//     {
//       id: 5,
//       title: 'Payment received',
//       description: '$500 has been credited to your account',
//       time: '2024-03-14T15:20:00',
//       type: 'success',
//       read: true
//     },
//     {
//       id: 6,
//       title: 'System update',
//       description: 'Maintenance scheduled for tonight',
//       time: '2024-03-13T11:00:00',
//       type: 'warning',
//       read: true
//     },
//     {
//       id: 7,
//       title: 'New feature available',
//       description: 'Check out the new dashboard',
//       time: '2024-03-12T09:45:00',
//       type: 'info',
//       read: true
//     }
//   ];

//   const getIcon = (type) => {
//     switch(type) {
//       case 'success':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'warning':
//         return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
//       default:
//         return <Info className="w-4 h-4 text-blue-500" />;
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffMs = now - date;
//     const diffMins = Math.floor(diffMs / 60000);
//     const diffHours = Math.floor(diffMs / 3600000);
//     const diffDays = Math.floor(diffMs / 86400000);

//     if (diffMins < 1) return 'Just now';
//     if (diffMins < 60) return `${diffMins} min ago`;
//     if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
//     if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // Close dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest('.notification-bell-container')) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="notification-bell-container relative">
//       <button 
//         onClick={toggleDropdown}
//         className={`relative p-2 rounded-lg transition-colors duration-150 ${
//           darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
//         }`}
//       >
//         <Bell className="w-5 h-5" />
//         <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
//           {notifications.filter(n => !n.read).length}
//         </span>
//       </button>

//       {/* Dropdown Box */}
//       {isOpen && (
//         <>
//           {/* Backdrop for mobile */}
//           <div 
//             className="fixed inset-0 z-40 lg:hidden"
//             onClick={() => setIsOpen(false)}
//           />
          
//           <div className={`
//             absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-lg z-50
//             ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
//           `}>
//             {/* Header */}
//             <div className={`
//               px-4 py-3 border-b 
//               ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//             `}>
//               <div className="flex items-center justify-between">
//                 <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   Notifications
//                 </h3>
//                 <button className={`text-sm ${
//                   darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
//                 }`}>
//                   Mark all as read
//                 </button>
//               </div>
//             </div>

//             {/* Notifications List - Exactly 3 visible, then scroll */}
//             <div className="max-h-[300px] overflow-y-auto"> {/* Fixed height for exactly 3 items */}
//               {notifications.length > 0 ? (
//                 notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`
//                       px-4 py-3 border-b last:border-b-0 cursor-pointer
//                       ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}
//                       ${!notification.read && (darkMode ? 'bg-gray-700/30' : 'bg-blue-50/50')}
//                     `}
//                   >
//                     <div className="flex gap-3">
//                       <div className="flex-shrink-0 mt-1">
//                         {getIcon(notification.type)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className={`text-sm font-medium ${
//                           darkMode ? 'text-white' : 'text-gray-900'
//                         }`}>
//                           {notification.title}
//                         </p>
//                         <p className={`text-sm mt-0.5 ${
//                           darkMode ? 'text-gray-400' : 'text-gray-600'
//                         }`}>
//                           {notification.description}
//                         </p>
//                         <div className="flex items-center gap-1 mt-2">
//                           <Clock className={`w-3 h-3 ${
//                             darkMode ? 'text-gray-500' : 'text-gray-400'
//                           }`} />
//                           <span className={`text-xs ${
//                             darkMode ? 'text-gray-500' : 'text-gray-400'
//                           }`}>
//                             {formatTime(notification.time)}
//                           </span>
//                         </div>
//                       </div>
//                       {!notification.read && (
//                         <div className="flex-shrink-0">
//                           <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className={`px-4 py-8 text-center ${
//                   darkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}>
//                   <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
//                   <p>No notifications</p>
//                 </div>
//               )}
//             </div>

//             {/* View All Link - Only show if more than 3 notifications */}
//             {notifications.length > 3 && (
//               <div className={`
//                 px-4 py-3 border-t 
//                 ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//               `}>
//                 <button className={`w-full text-sm text-center font-medium ${
//                   darkMode 
//                     ? 'text-blue-400 hover:text-blue-300' 
//                     : 'text-blue-600 hover:text-blue-700'
//                 }`}>
//                   View all {notifications.length} notifications
//                 </button>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default NotificationBell;


import React, { useState } from 'react';
import { Bell, Clock, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const NotificationBell = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  // Sample notification data with state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New message from John',
      description: 'Hey, can we schedule a meeting?',
      time: '2024-03-15T10:30:00',
      type: 'info',
      read: false
    },
    {
      id: 2,
      title: 'Task completed',
      description: 'Project report has been finalized',
      time: '2024-03-15T09:15:00',
      type: 'success',
      read: false
    },
    {
      id: 3,
      title: 'Server alert',
      description: 'CPU usage is above 80%',
      time: '2024-03-14T23:45:00',
      type: 'warning',
      read: false
    },
    {
      id: 4,
      title: 'New comment on post',
      description: 'Sarah liked your comment',
      time: '2024-03-14T20:30:00',
      type: 'info',
      read: true
    },
    {
      id: 5,
      title: 'Payment received',
      description: '$500 has been credited to your account',
      time: '2024-03-14T15:20:00',
      type: 'success',
      read: true
    },
    {
      id: 6,
      title: 'System update',
      description: 'Maintenance scheduled for tonight',
      time: '2024-03-13T11:00:00',
      type: 'warning',
      read: true
    },
    {
      id: 7,
      title: 'New feature available',
      description: 'Check out the new dashboard',
      time: '2024-03-12T09:45:00',
      type: 'info',
      read: true
    }
  ]);

  const getIcon = (type) => {
    switch(type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Mark notification as read when clicked
  const handleNotificationClick = (clickedNotification) => {
    // Only update if notification is currently unread
    if (!clickedNotification.read) {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === clickedNotification.id
            ? { ...notification, read: true }
            : notification
        )
      );
    }
    
    // Optional: Perform any action related to the notification
    console.log('Notification clicked:', clickedNotification);
    
    // Optional: Close dropdown after clicking (remove if you want to keep it open)
    // setIsOpen(false);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-bell-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-bell-container relative">
      <button 
        onClick={toggleDropdown}
        className={`relative p-2 rounded-lg transition-colors duration-150 ${
          darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Box */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className={`
            absolute right-0 mt-2 w-80 sm:w-96 rounded-lg shadow-lg z-50
            ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
          `}>
            {/* Header */}
            <div className={`
              px-4 py-3 border-b 
              ${darkMode ? 'border-gray-700' : 'border-gray-200'}
            `}>
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className={`text-sm ${
                      darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List - Exactly 3 visible, then scroll */}
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`
                      px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors duration-150
                      ${darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}
                      ${!notification.read 
                        ? darkMode 
                          ? 'bg-gray-700/30' 
                          : 'bg-blue-50/50'
                        : ''
                      }
                    `}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          !notification.read 
                            ? darkMode ? 'text-white' : 'text-gray-900'
                            : darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 text-xs text-blue-500 font-normal">
                              (New)
                            </span>
                          )}
                        </p>
                        <p className={`text-sm mt-0.5 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {notification.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className={`w-3 h-3 ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`} />
                          <span className={`text-xs ${
                            darkMode ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {formatTime(notification.time)}
                          </span>
                        </div>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className={`px-4 py-8 text-center ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              )}
            </div>

            {/* View All Link - Only show if more than 3 notifications */}
            {notifications.length > 3 && (
              <div className={`
                px-4 py-3 border-t 
                ${darkMode ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <button className={`w-full text-sm text-center font-medium ${
                  darkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}>
                  View all {notifications.length} notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;