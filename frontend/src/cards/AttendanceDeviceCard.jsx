// import React, { useState, useEffect } from 'react';
// import { 
//   Clock, MoreVertical, Fingerprint, Smartphone, UserCheck,
//   Monitor, Wifi, WifiOff, Battery, BatteryCharging
// } from 'lucide-react';
// import { ATTENDANCE_TYPES, EMPLOYEE_STATUS } from '../constants/index';

// const AttendanceDeviceCard = ({ 
//   employees = [], 
//   darkMode = false,
//   onViewAllClick = () => {},
//   onDeviceChange = () => {},
//   refreshInterval = 30000 // 30 seconds
// }) => {
//   const [selectedDevice, setSelectedDevice] = useState('all');
//   const [showDeviceStats, setShowDeviceStats] = useState(true);
//   const [punches, setPunches] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Device configuration - पहले define करो
//   const devices = [
//     {
//       id: 'all',
//       name: 'All Devices',
//       icon: Monitor,
//       color: darkMode ? '#60A5FA' : '#3B82F6',
//       bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
//       textColor: darkMode ? 'text-blue-400' : 'text-blue-600'
//     },
//     {
//       id: ATTENDANCE_TYPES.BIOMETRIC,
//       name: 'Biometric Device',
//       icon: Fingerprint,
//       color: darkMode ? '#60A5FA' : '#3B82F6',
//       bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
//       textColor: darkMode ? 'text-blue-400' : 'text-blue-600',
//       location: 'Main Entrance',
//       status: 'online',
//       batteryLevel: 85,
//       lastSync: 'Just now'
//     },
//     {
//       id: ATTENDANCE_TYPES.MOBILE,
//       name: 'Mobile Device',
//       icon: Smartphone,
//       color: darkMode ? '#4ADE80' : '#22C55E',
//       bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-50',
//       textColor: darkMode ? 'text-green-400' : 'text-green-600',
//       location: 'Mobile App',
//       status: 'online',
//       batteryLevel: 92,
//       lastSync: '2 min ago'
//     },
//     {
//       id: ATTENDANCE_TYPES.MANUAL,
//       name: 'Manual Entry',
//       icon: UserCheck,
//       color: darkMode ? '#FBBF24' : '#EAB308',
//       bgColor: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
//       textColor: darkMode ? 'text-yellow-400' : 'text-yellow-600',
//       location: 'Admin Panel',
//       status: 'online',
//       lastSync: '5 min ago'
//     }
//   ];

//   // Generate recent punches from employees data
//   const generateRecentPunches = (employees, count = 20) => {
//     if (!employees || employees.length === 0) return [];
    
//     const activeEmployees = employees.filter(e => e?.status === EMPLOYEE_STATUS.ACTIVE);
//     if (activeEmployees.length === 0) return [];
    
//     const punchTypes = [ATTENDANCE_TYPES.BIOMETRIC, ATTENDANCE_TYPES.MOBILE, ATTENDANCE_TYPES.MANUAL];
//     const devices_list = ['Main Gate', 'Side Gate', 'Office Entry', 'Mobile App'];
//     const now = Date.now();
    
//     return activeEmployees
//       .sort(() => 0.5 - Math.random())
//       .slice(0, Math.min(count, activeEmployees.length))
//       .map((e, index) => {
//         const randomType = punchTypes[Math.floor(Math.random() * punchTypes.length)];
//         const hours = Math.floor(Math.random() * 8) + 8; // 8 AM to 4 PM
//         const minutes = Math.floor(Math.random() * 60);
//         const timeAgo = Math.floor(Math.random() * 3600000); // Random time in last hour
        
//         // Type name mapping
//         let typeName = 'Unknown';
//         if (randomType === ATTENDANCE_TYPES.BIOMETRIC) typeName = 'Biometric';
//         else if (randomType === ATTENDANCE_TYPES.MOBILE) typeName = 'Mobile';
//         else if (randomType === ATTENDANCE_TYPES.MANUAL) typeName = 'Manual';
        
//         return {
//           id: `punch-${e.id || index}-${Date.now()}-${Math.random()}`,
//           time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
//           empCode: e.employeeId || e.empCode || `EMP${String(index + 1).padStart(3, '0')}`,
//           name: e.name || `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'Unknown',
//           type: randomType,
//           typeName: typeName,
//           department: e.department || 'General',
//           device: devices_list[Math.floor(Math.random() * devices_list.length)],
//           status: Math.random() > 0.5 ? 'in' : 'out',
//           timestamp: now - timeAgo,
//           date: new Date(now - timeAgo).toISOString().split('T')[0]
//         };
//       })
//       .sort((a, b) => b.timestamp - a.timestamp);
//   };

//   // Get device statistics
//   const getDeviceStats = () => {
//     if (!employees || !punches) return {};
    
//     const stats = {};
//     const activeEmployees = employees.filter(e => e?.status === EMPLOYEE_STATUS.ACTIVE);
    
//     devices.filter(d => d.id !== 'all').forEach(device => {
//       const devicePunches = punches.filter(p => p?.type === device.id);
//       const deviceEmployees = activeEmployees.filter(e => e?.attendanceType === device.id);
      
//       // Calculate active now (last 10 minutes)
//       const tenMinutesAgo = Date.now() - 600000;
//       const activeNow = devicePunches.filter(p => p?.timestamp > tenMinutesAgo).length;
      
//       stats[device.id] = {
//         total: devicePunches.length,
//         lastPunch: devicePunches[0]?.time || '--:--',
//         uniqueEmployees: [...new Set(devicePunches.map(p => p?.empCode))].length,
//         totalRegistered: deviceEmployees.length,
//         activeNow: activeNow,
//         utilization: deviceEmployees.length > 0 
//           ? ((devicePunches.length / deviceEmployees.length) * 100).toFixed(1)
//           : '0'
//       };
//     });
    
//     return stats;
//   };

//   // Initialize and refresh data
//   useEffect(() => {
//     if (employees && employees.length > 0) {
//       setPunches(generateRecentPunches(employees));
//     }
//   }, [employees]);

//   // Auto-refresh functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       refreshData();
//     }, refreshInterval);

//     return () => clearInterval(interval);
//   }, [employees, refreshInterval]);

//   const refreshData = () => {
//     setIsRefreshing(true);
//     if (employees && employees.length > 0) {
//       setPunches(generateRecentPunches(employees));
//     }
//     setLastUpdated(new Date());
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

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

//   const getStatusIcon = (status) => {
//     return status === 'online' 
//       ? <Wifi className="w-3 h-3 text-green-500" />
//       : <WifiOff className="w-3 h-3 text-red-500" />;
//   };

//   const getBatteryIcon = (level) => {
//     if (level >= 70) return <BatteryCharging className="w-3 h-3 text-green-500" />;
//     if (level >= 30) return <Battery className="w-3 h-3 text-yellow-500" />;
//     return <Battery className="w-3 h-3 text-red-500" />;
//   };

//   const handleDeviceChange = (deviceId) => {
//     // Ensure deviceId is defined
//     if (!deviceId) {
//       console.warn('Device ID is undefined, using default');
//       deviceId = 'all';
//     }
    
//     setSelectedDevice(deviceId);
    
//     // Call the callback with the device ID
//     try {
//       onDeviceChange(deviceId);
//       console.log('Device changed to:', deviceId); // Debug log
//     } catch (error) {
//       console.error('Error in onDeviceChange callback:', error);
//     }
//   };

//   // Filter punches based on selected device
//   const filteredPunches = selectedDevice === 'all' 
//     ? (punches || []) 
//     : (punches || []).filter(punch => punch?.type === selectedDevice);

//   const deviceStats = getDeviceStats();

//   return (
//     <div className={`p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-300 ${
//       darkMode 
//         ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
//         : 'bg-white border-gray-100 hover:border-gray-200'
//     }`}>
//       {/* Header with Refresh */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-2">
//           <div className={`p-2 rounded-lg ${
//             darkMode ? 'bg-gray-700' : 'bg-blue-50'
//           }`}>
//             <Monitor className={`w-4 h-4 ${
//               darkMode ? 'text-blue-400' : 'text-blue-600'
//             }`} />
//           </div>
//           <h2 className={`text-base sm:text-lg font-semibold ${
//             darkMode ? 'text-white' : 'text-gray-900'
//           }`}>
//             Device Attendance
//           </h2>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={refreshData}
//             disabled={isRefreshing}
//             className={`text-xs px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
//               darkMode 
//                 ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             <Clock className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
//             <span>Refresh</span>
//           </button>
//           <button
//             onClick={() => setShowDeviceStats(!showDeviceStats)}
//             className={`text-xs px-2 py-1 rounded transition-colors ${
//               darkMode 
//                 ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }`}
//           >
//             {showDeviceStats ? 'Show Punches' : 'Show Stats'}
//           </button>
//         </div>
//       </div>

//       {/* Last Updated Info */}
//       <div className={`text-xs mb-3 flex justify-between items-center ${
//         darkMode ? 'text-gray-400' : 'text-gray-500'
//       }`}>
//         <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
//         <span className="flex items-center space-x-1">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//           </span>
//           <span>Live</span>
//         </span>
//       </div>

//       {/* Device Filter Chips */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {devices.map((device) => {
//           const Icon = device.icon;
//           const isSelected = selectedDevice === device.id;
//           const deviceCount = device.id === 'all' 
//             ? (punches || []).length 
//             : (punches || []).filter(p => p?.type === device.id).length;

//           return (
//             <button
//               key={device.id}
//               onClick={() => handleDeviceChange(device.id)}
//               className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
//                 isSelected
//                   ? `${device.bgColor} ${device.textColor} ring-2 ring-offset-2 ${
//                       darkMode ? 'ring-offset-gray-800 ring-blue-500' : 'ring-offset-white ring-blue-400'
//                     }` 
//                   : darkMode
//                     ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               <Icon className="w-3.5 h-3.5" />
//               <span>{device.name}</span>
//               <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
//                 isSelected
//                   ? 'bg-white/20'
//                   : darkMode ? 'bg-gray-600' : 'bg-gray-200'
//               }`}>
//                 {deviceCount}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       {/* Device Statistics Section */}
//       {showDeviceStats ? (
//         <div className="space-y-3 mb-4">
//           {devices.filter(d => d.id !== 'all').map((device) => {
//             const Icon = device.icon;
//             const stats = deviceStats[device.id] || { 
//               total: 0, 
//               lastPunch: '--:--', 
//               uniqueEmployees: 0,
//               totalRegistered: 0,
//               activeNow: 0,
//               utilization: '0'
//             };

//             return (
//               <div
//                 key={device.id}
//                 className={`p-3 rounded-lg ${
//                   darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center space-x-2">
//                     <div className={`p-1.5 rounded-lg ${device.bgColor}`}>
//                       <Icon className={`w-4 h-4 ${device.textColor}`} />
//                     </div>
//                     <div>
//                       <p className={`text-sm font-medium ${
//                         darkMode ? 'text-white' : 'text-gray-900'
//                       }`}>
//                         {device.name}
//                       </p>
//                       <p className={`text-xs ${
//                         darkMode ? 'text-gray-400' : 'text-gray-500'
//                       }`}>
//                         {device.location}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {device.batteryLevel && (
//                       <div className="flex items-center space-x-1">
//                         {getBatteryIcon(device.batteryLevel)}
//                         <span className={`text-xs ${
//                           darkMode ? 'text-gray-400' : 'text-gray-500'
//                         }`}>
//                           {device.batteryLevel}%
//                         </span>
//                       </div>
//                     )}
//                     {getStatusIcon(device.status)}
//                   </div>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-4 gap-2 mt-2">
//                   <div className="text-center">
//                     <p className={`text-lg font-semibold ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {stats.total}
//                     </p>
//                     <p className={`text-xs ${
//                       darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       Today
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className={`text-lg font-semibold ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {stats.activeNow}
//                     </p>
//                     <p className={`text-xs ${
//                       darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       Active Now
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className={`text-lg font-semibold ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {stats.totalRegistered}
//                     </p>
//                     <p className={`text-xs ${
//                       darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       Registered
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <p className={`text-sm font-medium ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {stats.lastPunch}
//                     </p>
//                     <p className={`text-xs ${
//                       darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       Last Punch
//                     </p>
//                   </div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mt-3">
//                   <div className={`h-1.5 rounded-full overflow-hidden ${
//                     darkMode ? 'bg-gray-600' : 'bg-gray-200'
//                   }`}>
//                     <div 
//                       className="h-full rounded-full transition-all duration-500"
//                       style={{ 
//                         width: `${Math.min(parseFloat(stats.utilization) || 0, 100)}%`,
//                         backgroundColor: device.color
//                       }}
//                     />
//                   </div>
//                   <div className={`flex justify-between text-xs mt-1 ${
//                     darkMode ? 'text-gray-400' : 'text-gray-500'
//                   }`}>
//                     <span>Utilization</span>
//                     <span>{stats.utilization}%</span>
//                   </div>
//                 </div>

//                 <div className={`mt-2 text-xs flex justify-between ${
//                   darkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}>
//                   <span>Last Sync: {device.lastSync}</span>
//                   <span>Status: <span className="text-green-500 capitalize">{device.status}</span></span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         /* Recent Punches Section */
//         <>
//           <div className="flex justify-between items-center mb-3">
//             <span className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${
//               darkMode 
//                 ? 'text-gray-300 bg-gray-700' 
//                 : 'text-gray-500 bg-gray-100'
//             }`}>
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//               </span>
//               <span>Live Updates • {filteredPunches.length} today</span>
//             </span>
//             {selectedDevice !== 'all' && (
//               <span className={`text-xs ${
//                 darkMode ? 'text-gray-400' : 'text-gray-500'
//               }`}>
//                 Filtered by {devices.find(d => d.id === selectedDevice)?.name}
//               </span>
//             )}
//           </div>

//           <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
//             {filteredPunches.length > 0 ? (
//               filteredPunches.slice(0, 10).map((punch) => (
//                 <div 
//                   key={punch.id}
//                   className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
//                     darkMode 
//                       ? 'bg-gray-700/50 hover:bg-gray-700' 
//                       : 'bg-gray-50 hover:bg-gray-100'
//                   }`}
//                 >
//                   <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
//                     <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPunchTypeColor(punch.type)}`} />
                    
//                     <div className={`p-1 rounded-full flex-shrink-0 ${
//                       darkMode ? 'bg-gray-600' : 'bg-white'
//                     }`}>
//                       <Clock className={`w-4 h-4 ${
//                         darkMode ? 'text-gray-300' : 'text-gray-500'
//                       }`} />
//                     </div>
                    
//                     <span className={`text-xs sm:text-sm font-medium flex-shrink-0 ${
//                       darkMode ? 'text-gray-200' : 'text-gray-900'
//                     }`}>
//                       {punch.time}
//                     </span>
                    
//                     <div className="ml-2 min-w-0">
//                       <p className={`text-xs sm:text-sm font-medium truncate ${
//                         darkMode ? 'text-white' : 'text-gray-900'
//                       }`}>
//                         {punch.name}
//                       </p>
//                       <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs">
//                         <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
//                           {punch.empCode}
//                         </span>
//                         <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
//                         <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
//                           {punch.department}
//                         </span>
//                         <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
//                         <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
//                           {punch.device}
//                         </span>
//                         <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
//                         <div className={`flex items-center space-x-1 ${
//                           punch.status === 'in' ? 'text-green-500' : 'text-red-500'
//                         }`}>
//                           <span className="capitalize">{punch.status}</span>
//                         </div>
//                         <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
//                         <div className={`flex items-center space-x-1 ${
//                           darkMode ? 'text-gray-400' : 'text-gray-500'
//                         }`}>
//                           {getPunchTypeIcon(punch.type)}
//                           <span>{punch.typeName}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <button className={`p-1 rounded-lg transition-colors flex-shrink-0 ml-2 ${
//                     darkMode 
//                       ? 'hover:bg-gray-600 text-gray-400' 
//                       : 'hover:bg-gray-200 text-gray-400'
//                   }`}>
//                     <MoreVertical className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <div className={`text-center py-8 ${
//                 darkMode ? 'text-gray-400' : 'text-gray-500'
//               }`}>
//                 No punches found for this device
//               </div>
//             )}
//           </div>

//           {filteredPunches.length > 0 && (
//             <button 
//               onClick={onViewAllClick}
//               className={`w-full mt-4 text-sm font-medium py-2 rounded-lg transition-colors ${
//                 darkMode 
//                   ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' 
//                   : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
//               }`}
//             >
//               View All {filteredPunches.length} Punches →
//             </button>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AttendanceDeviceCard;


import React, { useState, useEffect } from 'react';
import { 
  Clock, MoreVertical, Fingerprint, Smartphone, UserCheck,
  Monitor, Wifi, WifiOff, Battery, BatteryCharging
} from 'lucide-react';
import { ATTENDANCE_TYPES, EMPLOYEE_STATUS } from '../constants/index';

const AttendanceDeviceCard = ({ 
  employees = [], 
  darkMode = false,
  onViewAllClick = () => {},
  onDeviceChange = () => {},
  refreshInterval = 30000 // 30 seconds
}) => {
  const [selectedDevice, setSelectedDevice] = useState('all');
  const [showDeviceStats, setShowDeviceStats] = useState(true);
  const [punches, setPunches] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Device configuration
  const devices = [
    {
      id: 'all',
      name: 'All Devices',
      icon: Monitor,
      color: darkMode ? '#60A5FA' : '#3B82F6',
      bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      textColor: darkMode ? 'text-blue-400' : 'text-blue-600'
    },
    {
      id: ATTENDANCE_TYPES.BIOMETRIC,
      name: 'Biometric Device',
      icon: Fingerprint,
      color: darkMode ? '#60A5FA' : '#3B82F6',
      bgColor: darkMode ? 'bg-blue-900/20' : 'bg-blue-50',
      textColor: darkMode ? 'text-blue-400' : 'text-blue-600',
      location: 'Main Entrance',
      status: 'online',
      batteryLevel: 85,
      lastSync: 'Just now'
    },
    {
      id: ATTENDANCE_TYPES.MOBILE,
      name: 'Mobile Device',
      icon: Smartphone,
      color: darkMode ? '#4ADE80' : '#22C55E',
      bgColor: darkMode ? 'bg-green-900/20' : 'bg-green-50',
      textColor: darkMode ? 'text-green-400' : 'text-green-600',
      location: 'Mobile App',
      status: 'online',
      batteryLevel: 92,
      lastSync: '2 min ago'
    },
    {
      id: ATTENDANCE_TYPES.MANUAL,
      name: 'Manual Entry',
      icon: UserCheck,
      color: darkMode ? '#FBBF24' : '#EAB308',
      bgColor: darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50',
      textColor: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      location: 'Admin Panel',
      status: 'online',
      lastSync: '5 min ago'
    }
  ];


  console.log('Device IDs:', devices.map(d => d.id));
  console.log('Device IDs with types:', devices.map(d => ({ id: d.id, name: d.name })));
// Browser console mein yeh type karein:
console.log('ATTENDANCE_TYPES:', ATTENDANCE_TYPES);
  // Generate recent punches from employees data
  const generateRecentPunches = (employees, count = 20) => {
    if (!employees || employees.length === 0) return [];
    
    const activeEmployees = employees.filter(e => e?.status === EMPLOYEE_STATUS.ACTIVE);
    if (activeEmployees.length === 0) return [];
    
    const punchTypes = [ATTENDANCE_TYPES.BIOMETRIC, ATTENDANCE_TYPES.MOBILE, ATTENDANCE_TYPES.MANUAL];
    const devices_list = ['Main Gate', 'Side Gate', 'Office Entry', 'Mobile App'];
    const now = Date.now();
    
    return activeEmployees
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(count, activeEmployees.length))
      .map((e, index) => {
        const randomType = punchTypes[Math.floor(Math.random() * punchTypes.length)];
        const hours = Math.floor(Math.random() * 8) + 8; // 8 AM to 4 PM
        const minutes = Math.floor(Math.random() * 60);
        const timeAgo = Math.floor(Math.random() * 3600000); // Random time in last hour
        
        // Type name mapping
        let typeName = 'Unknown';
        if (randomType === ATTENDANCE_TYPES.BIOMETRIC) typeName = 'Biometric';
        else if (randomType === ATTENDANCE_TYPES.MOBILE) typeName = 'Mobile';
        else if (randomType === ATTENDANCE_TYPES.MANUAL) typeName = 'Manual';
        
        return {
          id: `punch-${e.id || index}-${Date.now()}-${Math.random()}`,
          time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
          empCode: e.employeeId || e.empCode || `EMP${String(index + 1).padStart(3, '0')}`,
          name: e.name || `${e.firstName || ''} ${e.lastName || ''}`.trim() || 'Unknown',
          type: randomType,
          typeName: typeName,
          department: e.department || 'General',
          device: devices_list[Math.floor(Math.random() * devices_list.length)],
          status: Math.random() > 0.5 ? 'in' : 'out',
          timestamp: now - timeAgo,
          date: new Date(now - timeAgo).toISOString().split('T')[0]
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  // Get device statistics
  const getDeviceStats = () => {
    if (!employees || !punches) return {};
    
    const stats = {};
    const activeEmployees = employees.filter(e => e?.status === EMPLOYEE_STATUS.ACTIVE);
    
    devices.filter(d => d.id !== 'all').forEach(device => {
      const devicePunches = punches.filter(p => p?.type === device.id);
      const deviceEmployees = activeEmployees.filter(e => e?.attendanceType === device.id);
      
      // Calculate active now (last 10 minutes)
      const tenMinutesAgo = Date.now() - 600000;
      const activeNow = devicePunches.filter(p => p?.timestamp > tenMinutesAgo).length;
      
      stats[device.id] = {
        total: devicePunches.length,
        lastPunch: devicePunches[0]?.time || '--:--',
        uniqueEmployees: [...new Set(devicePunches.map(p => p?.empCode))].length,
        totalRegistered: deviceEmployees.length,
        activeNow: activeNow,
        utilization: deviceEmployees.length > 0 
          ? ((devicePunches.length / deviceEmployees.length) * 100).toFixed(1)
          : '0'
      };
    });
    
    return stats;
  };

  // Initialize and refresh data
  useEffect(() => {
    if (employees && employees.length > 0) {
      setPunches(generateRecentPunches(employees));
    }
  }, [employees]);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [employees, refreshInterval]);

  const refreshData = () => {
    setIsRefreshing(true);
    if (employees && employees.length > 0) {
      setPunches(generateRecentPunches(employees));
    }
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const getPunchTypeColor = (type) => {
    switch(type) {
      case ATTENDANCE_TYPES.BIOMETRIC:
        return darkMode ? 'bg-blue-400' : 'bg-blue-500';
      case ATTENDANCE_TYPES.MOBILE:
        return darkMode ? 'bg-green-400' : 'bg-green-500';
      case ATTENDANCE_TYPES.MANUAL:
        return darkMode ? 'bg-yellow-400' : 'bg-yellow-500';
      default:
        return darkMode ? 'bg-gray-400' : 'bg-gray-500';
    }
  };

  const getPunchTypeIcon = (type) => {
    switch(type) {
      case ATTENDANCE_TYPES.BIOMETRIC:
        return <Fingerprint className="w-3 h-3" />;
      case ATTENDANCE_TYPES.MOBILE:
        return <Smartphone className="w-3 h-3" />;
      case ATTENDANCE_TYPES.MANUAL:
        return <UserCheck className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusIcon = (status) => {
    return status === 'online' 
      ? <Wifi className="w-3 h-3 text-green-500" />
      : <WifiOff className="w-3 h-3 text-red-500" />;
  };

  const getBatteryIcon = (level) => {
    if (level >= 70) return <BatteryCharging className="w-3 h-3 text-green-500" />;
    if (level >= 30) return <Battery className="w-3 h-3 text-yellow-500" />;
    return <Battery className="w-3 h-3 text-red-500" />;
  };

  const handleDeviceChange = (deviceId) => {
    // Ensure deviceId is defined
    const safeDeviceId = deviceId || 'all';
    
    if (!deviceId) {
      console.log('Using default device: all');
    }
    
    setSelectedDevice(safeDeviceId);
    
    // Call the callback with the device ID
    try {
      onDeviceChange(safeDeviceId);
      console.log('Device changed to:', safeDeviceId);
    } catch (error) {
      console.error('Error in onDeviceChange callback:', error);
    }
  };

  // Filter punches based on selected device
  const filteredPunches = selectedDevice === 'all' 
    ? (punches || []) 
    : (punches || []).filter(punch => punch?.type === selectedDevice);

  const deviceStats = getDeviceStats();

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-100 hover:border-gray-200'
    }`}>
      {/* Header with Refresh */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <Monitor className={`w-4 h-4 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <h2 className={`text-base sm:text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Device Attendance
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className={`text-xs px-2 py-1 rounded transition-colors flex items-center space-x-1 ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Clock className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setShowDeviceStats(!showDeviceStats)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showDeviceStats ? 'Show Punches' : 'Show Stats'}
          </button>
        </div>
      </div>

      {/* Last Updated Info */}
      <div className={`text-xs mb-3 flex justify-between items-center ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        <span className="flex items-center space-x-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Live</span>
        </span>
      </div>

      {/* Device Filter Chips - FIXED: Added unique key prop */}
      <div className="flex flex-wrap gap-2 mb-4">
        {devices.map((device) => {
          const Icon = device.icon;
          
          const isSelected = selectedDevice === device.id;
          const deviceCount = device.id === 'all' 
            ? (punches || []).length 
            : (punches || []).filter(p => p?.type === device.id).length;

          return (
            <button
              key={device.id} // ✅ FIXED: Added unique key prop
              onClick={() => handleDeviceChange(device.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isSelected
                  ? `${device.bgColor} ${device.textColor} ring-2 ring-offset-2 ${
                      darkMode ? 'ring-offset-gray-800 ring-blue-500' : 'ring-offset-white ring-blue-400'
                    }` 
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{device.name}</span>
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                isSelected
                  ? 'bg-white/20'
                  : darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                {deviceCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Device Statistics Section */}
      {showDeviceStats ? (
        <div className="space-y-3 mb-4">
          {devices.filter(d => d.id !== 'all').map((device) => {
            const Icon = device.icon;
            const stats = deviceStats[device.id] || { 
              total: 0, 
              lastPunch: '--:--', 
              uniqueEmployees: 0,
              totalRegistered: 0,
              activeNow: 0,
              utilization: '0'
            };

            return (
              <div
                key={device.id} // ✅ FIXED: Added unique key prop for stats cards
                className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${device.bgColor}`}>
                      <Icon className={`w-4 h-4 ${device.textColor}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {device.name}
                      </p>
                      <p className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {device.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {device.batteryLevel && (
                      <div className="flex items-center space-x-1">
                        {getBatteryIcon(device.batteryLevel)}
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {device.batteryLevel}%
                        </span>
                      </div>
                    )}
                    {getStatusIcon(device.status)}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stats.total}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Today
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stats.activeNow}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Active Now
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stats.totalRegistered}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Registered
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {stats.lastPunch}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Last Punch
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className={`h-1.5 rounded-full overflow-hidden ${
                    darkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(parseFloat(stats.utilization) || 0, 100)}%`,
                        backgroundColor: device.color
                      }}
                    />
                  </div>
                  <div className={`flex justify-between text-xs mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <span>Utilization</span>
                    <span>{stats.utilization}%</span>
                  </div>
                </div>

                <div className={`mt-2 text-xs flex justify-between ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span>Last Sync: {device.lastSync}</span>
                  <span>Status: <span className="text-green-500 capitalize">{device.status}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Recent Punches Section */
        <>
          <div className="flex justify-between items-center mb-3">
            <span className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${
              darkMode 
                ? 'text-gray-300 bg-gray-700' 
                : 'text-gray-500 bg-gray-100'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Live Updates • {filteredPunches.length} today</span>
            </span>
            {selectedDevice !== 'all' && (
              <span className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Filtered by {devices.find(d => d.id === selectedDevice)?.name}
              </span>
            )}
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
            {filteredPunches.length > 0 ? (
              filteredPunches.slice(0, 10).map((punch) => (
                <div 
                  key={punch.id} // ✅ FIXED: Using unique punch.id as key (already good)
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700/50 hover:bg-gray-700' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPunchTypeColor(punch.type)}`} />
                    
                    <div className={`p-1 rounded-full flex-shrink-0 ${
                      darkMode ? 'bg-gray-600' : 'bg-white'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`} />
                    </div>
                    
                    <span className={`text-xs sm:text-sm font-medium flex-shrink-0 ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {punch.time}
                    </span>
                    
                    <div className="ml-2 min-w-0">
                      <p className={`text-xs sm:text-sm font-medium truncate ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {punch.name}
                      </p>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {punch.empCode}
                        </span>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {punch.department}
                        </span>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {punch.device}
                        </span>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                        <div className={`flex items-center space-x-1 ${
                          punch.status === 'in' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          <span className="capitalize">{punch.status}</span>
                        </div>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                        <div className={`flex items-center space-x-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {getPunchTypeIcon(punch.type)}
                          <span>{punch.typeName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className={`p-1 rounded-lg transition-colors flex-shrink-0 ml-2 ${
                    darkMode 
                      ? 'hover:bg-gray-600 text-gray-400' 
                      : 'hover:bg-gray-200 text-gray-400'
                  }`}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className={`text-center py-8 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No punches found for this device
              </div>
            )}
          </div>

          {filteredPunches.length > 0 && (
            <button 
              onClick={onViewAllClick}
              className={`w-full mt-4 text-sm font-medium py-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' 
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              View All {filteredPunches.length} Punches →
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceDeviceCard;