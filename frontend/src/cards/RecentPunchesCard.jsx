// // components/cards/RecentPunchesCard.jsx
// import React from 'react';
// import { Clock, MoreVertical } from 'lucide-react';
// import { ATTENDANCE_TYPES } from '../../constants/index';

// const RecentPunchesCard = ({ punches }) => {
//   const getPunchTypeColor = (type) => {
//     switch(type) {
//       case ATTENDANCE_TYPES.BIOMETRIC:
//         return 'bg-blue-500';
//       case ATTENDANCE_TYPES.MOBILE:
//         return 'bg-green-500';
//       case ATTENDANCE_TYPES.MANUAL:
//         return 'bg-yellow-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Punches</h2>
//         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Live Updates</span>
//       </div>
//       <div className="space-y-3 max-h-[400px] overflow-y-auto">
//         {punches.map((punch, index) => (
//           <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
//               <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPunchTypeColor(punch.type)}`} />
//               <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               <span className="text-xs sm:text-sm font-medium text-gray-900 flex-shrink-0">{punch.time}</span>
//               <div className="ml-2 min-w-0">
//                 <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{punch.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{punch.empCode} • {punch.type}</p>
//               </div>
//             </div>
//             <MoreVertical className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
//           </div>
//         ))}
//       </div>
//       <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium py-2">
//         View All Punches →
//       </button>
//     </div>
//   );
// };

// export default RecentPunchesCard;

// components/cards/RecentPunchesCard.jsx


// import React from 'react';
// import { Clock, MoreVertical, Fingerprint, Smartphone, UserCheck } from 'lucide-react';
// import { ATTENDANCE_TYPES } from '../constants/index';

// const RecentPunchesCard = ({ punches, darkMode = false }) => {
//   const getPunchTypeColor = (type) => {
//     switch(type) {
//       case ATTENDANCE_TYPES.BIOMETRIC:
//         return darkMode ? 'bg-blue-400' : 'bg-blue-500';
//       case ATTENDANCE_TYPES.MOBILE:
//         return darkMode ? 'bg-green-400' : 'bg-green-500';
//       case ATTENDANCE_TYPES.MANUAL:
//         return darkMode ? 'bg-yellow-400' : 'bg-yellow-500';
//       default:
//         return darkMode ? 'bg-gray-400' : 'bg-gray-500';
//     }
//   };

//   const getPunchTypeIcon = (type) => {
//     switch(type) {
//       case ATTENDANCE_TYPES.BIOMETRIC:
//         return <Fingerprint className="w-3 h-3" />;
//       case ATTENDANCE_TYPES.MOBILE:
//         return <Smartphone className="w-3 h-3" />;
//       case ATTENDANCE_TYPES.MANUAL:
//         return <UserCheck className="w-3 h-3" />;
//       default:
//         return <Clock className="w-3 h-3" />;
//     }
//   };

//   return (
//     <div className={`p-4 sm:p-6 rounded-xl shadow-sm border ${
//       darkMode 
//         ? 'bg-gray-800 border-gray-700' 
//         : 'bg-white border-gray-100'
//     }`}>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className={`text-base sm:text-lg font-semibold ${
//           darkMode ? 'text-white' : 'text-gray-900'
//         }`}>
//           Recent Punches
//         </h2>
//         <span className={`text-xs px-2 py-1 rounded ${
//           darkMode 
//             ? 'text-gray-300 bg-gray-700' 
//             : 'text-gray-500 bg-gray-100'
//         }`}>
//           Live Updates
//         </span>
//       </div>
      
//       <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
//         {punches.map((punch, index) => (
//           <div 
//             key={index} 
//             className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
//               darkMode 
//                 ? 'bg-gray-700/50 hover:bg-gray-700' 
//                 : 'bg-gray-50 hover:bg-gray-100'
//             }`}
//           >
//             <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
//               <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPunchTypeColor(punch.type)}`} />
              
//               <div className={`p-1 rounded-full flex-shrink-0 ${
//                 darkMode ? 'bg-gray-600' : 'bg-white'
//               }`}>
//                 <Clock className={`w-4 h-4 ${
//                   darkMode ? 'text-gray-300' : 'text-gray-500'
//                 }`} />
//               </div>
              
//               <span className={`text-xs sm:text-sm font-medium flex-shrink-0 ${
//                 darkMode ? 'text-gray-200' : 'text-gray-900'
//               }`}>
//                 {punch.time}
//               </span>
              
//               <div className="ml-2 min-w-0">
//                 <p className={`text-xs sm:text-sm font-medium truncate ${
//                   darkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {punch.name}
//                 </p>
//                 <div className="flex items-center space-x-1 text-xs">
//                   <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
//                     {punch.empCode}
//                   </span>
//                   <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
//                   <div className={`flex items-center space-x-1 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-500'
//                   }`}>
//                     {getPunchTypeIcon(punch.type)}
//                     <span>{punch.type}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <button className={`p-1 rounded-lg transition-colors flex-shrink-0 ml-2 ${
//               darkMode 
//                 ? 'hover:bg-gray-600 text-gray-400' 
//                 : 'hover:bg-gray-200 text-gray-400'
//             }`}>
//               <MoreVertical className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>
      
//       <button className={`w-full mt-4 text-sm font-medium py-2 rounded-lg transition-colors ${
//         darkMode 
//           ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' 
//           : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
//       }`}>
//         View All Punches →
//       </button>
//     </div>
//   );
// };

// export default RecentPunchesCard;



import React, { useState, useEffect } from 'react';
import { Clock, MoreVertical, Fingerprint, Smartphone, UserCheck, LogIn, LogOut } from 'lucide-react';

const RecentPunchesCard = ({ punches = [], darkMode = false }) => {
  const [blinkingDevices, setBlinkingDevices] = useState({});

  // Effect to handle blinking for new punches
  useEffect(() => {
    // Jab bhi naye punches aate hain, unke devices ko blink karna shuru karo
    const newBlinkingState = {};
    const now = Date.now();
    
    punches.forEach(punch => {
      // Agar punch last 30 seconds mein hua hai toh blink karo
      if (punch.timestamp && (now - punch.timestamp < 30000)) {
        newBlinkingState[punch.device] = true;
      }
    });
    
    setBlinkingDevices(newBlinkingState);

    // 30 seconds ke baad blink band kar do
    const timer = setTimeout(() => {
      setBlinkingDevices({});
    }, 30000);

    return () => clearTimeout(timer);
  }, [punches]);

  const getPunchTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'biometric':
        return <Fingerprint className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'manual':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPunchStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'in':
        return <LogIn className="w-3.5 h-3.5 text-green-500" />;
      case 'out':
        return <LogOut className="w-3.5 h-3.5 text-red-500" />;
      default:
        return null;
    }
  };

  const getDeviceColor = (device) => {
    switch(device) {
      case 'Main Gate':
        return 'bg-purple-500';
      case 'Side Gate':
        return 'bg-orange-500';
      case 'Office Entry':
        return 'bg-indigo-500';
      case 'Mobile App':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTime = (time) => {
    if (!time) return '--:--';
    return time;
  };

  // Check if device should blink
  const shouldBlink = (device) => {
    return blinkingDevices[device] ? 'animate-pulse' : '';
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-sm border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-base sm:text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Punches
        </h2>
        <div className="flex items-center space-x-2">
          {/* Live indicator with blinking dot */}
          <span className="flex items-center space-x-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className={`text-xs ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Live
            </span>
          </span>
          <span className={`text-xs px-2 py-1 rounded ${
            darkMode 
              ? 'text-gray-300 bg-gray-700' 
              : 'text-gray-500 bg-gray-100'
          }`}>
            {punches.length} updates
          </span>
        </div>
      </div>
      
      {/* Punches List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {punches.length > 0 ? (
          punches.map((punch, index) => (
            <div 
              key={punch.id || index} 
              className={`flex items-start justify-between p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {/* Main Content - Left Side */}
              <div className="flex-1 min-w-0">
                {/* Employee Name and ID */}
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className={`text-sm font-medium truncate ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {punch.employeeName || punch.name || 'Unknown'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {punch.employeeId || punch.empCode || 'N/A'}
                  </span>
                </div>

                {/* Device and Punch Type */}
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1">
                  {/* Device Badge with Blink Effect */}
                  <div className={`flex items-center space-x-1 ${shouldBlink(punch.device)}`}>
                    <div className={`w-2 h-2 rounded-full ${getDeviceColor(punch.device)}`} />
                    <span className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {punch.device || 'Unknown Device'}
                    </span>
                  </div>

                  {/* Punch Type */}
                  <div className={`flex items-center space-x-1 text-xs px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getPunchTypeIcon(punch.type)}
                    <span className="capitalize">{punch.type || 'unknown'}</span>
                  </div>

                  {/* In/Out Status */}
                  {punch.status && (
                    <div className={`flex items-center space-x-1 text-xs ${
                      punch.status.toLowerCase() === 'in' 
                        ? 'text-green-500' 
                        : punch.status.toLowerCase() === 'out' 
                        ? 'text-red-500' 
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {getPunchStatusIcon(punch.status)}
                      <span className="capitalize">{punch.status}</span>
                    </div>
                  )}
                </div>

                {/* Department */}
                {punch.department && (
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {punch.department}
                  </div>
                )}
              </div>

              {/* Time and Action - Right Side */}
              <div className="flex items-center space-x-3 ml-4">
                {/* Time */}
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatTime(punch.time)}
                  </div>
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {punch.date || ''}
                  </div>
                </div>

                {/* More Options Button */}
                <button className={`p-1 rounded-lg transition-colors flex-shrink-0 ${
                  darkMode 
                    ? 'hover:bg-gray-600 text-gray-400' 
                    : 'hover:bg-gray-200 text-gray-400'
                }`}>
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No recent punches available
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPunchesCard;