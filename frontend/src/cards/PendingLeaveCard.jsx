// import React, { useState } from 'react';
// import { 
//   Clock, 
//   AlertCircle, 
//   CheckCircle, 
//   XCircle,
//   Calendar,
//   User,
//   Filter,
//   ChevronDown,
//   AlertTriangle,
//   Clock3
// } from 'lucide-react';

// const PendingLeaveCard = ({ 
//   leaves = [],
//   darkMode = false,
//   onViewAll,
//   onApprove,
//   onReject,
//   title = "Pending Leave Details"
// }) => {
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [sortBy, setSortBy] = useState('date');

//   // Sample data if no data provided
//   const sampleLeaves = [
//     { 
//       id: 1,
//       employee: 'John Smith', 
//       type: 'Sick Leave', 
//       requestDate: 'Jan 12, 2024', 
//       status: 'urgent', 
//       days: 5,
//       department: 'Engineering',
//       reason: 'Fever and cold'
//     },
//     { 
//       id: 2,
//       employee: 'Emily Davis', 
//       type: 'Vacation', 
//       requestDate: 'Feb 5, 2024', 
//       status: 'pending', 
//       days: 3,
//       department: 'Marketing',
//       reason: 'Family trip'
//     },
//     { 
//       id: 3,
//       employee: 'Michael Lee', 
//       type: 'Personal Leave', 
//       requestDate: 'Jan 28, 2024', 
//       status: 'overdue', 
//       days: 10,
//       department: 'Sales',
//       reason: 'Personal matters'
//     },
//     { 
//       id: 4,
//       employee: 'Sophia Brown', 
//       type: 'Other', 
//       requestDate: 'Feb 10, 2024', 
//       status: 'pending', 
//       days: 2,
//       department: 'HR',
//       reason: 'Doctor appointment'
//     },
//     { 
//       id: 5,
//       employee: 'Sophia Brown', 
//       type: 'Other', 
//       requestDate: 'Feb 10, 2024', 
//       status: 'pending', 
//       days: 2,
//       department: 'HR',
//       reason: 'Doctor appointment'
//     },
//     { 
//       id: 6,
//       employee: 'Sophia Brown', 
//       type: 'Other', 
//       requestDate: 'Feb 10, 2024', 
//       status: 'pending', 
//       days: 2,
//       department: 'HR',
//       reason: 'Doctor appointment'
//     },
//     { 
//       id: 7,
//       employee: 'Sophia Brown', 
//       type: 'Other', 
//       requestDate: 'Feb 10, 2024', 
//       status: 'pending', 
//       days: 2,
//       department: 'HR',
//       reason: 'Doctor appointment'
//     }
//   ];

//   const leaveData = leaves.length > 0 ? leaves : sampleLeaves;

//   // Get status badge color and icon
//   const getStatusInfo = (status) => {
//     switch(status.toLowerCase()) {
//       case 'urgent':
//         return { 
//           color: 'text-red-600 dark:text-red-400',
//           bg: 'bg-red-100 dark:bg-red-900/30',
//           border: 'border-red-200 dark:border-red-800',
//           icon: AlertCircle,
//           label: 'Urgent'
//         };
//       case 'overdue':
//         return { 
//           color: 'text-orange-600 dark:text-orange-400',
//           bg: 'bg-orange-100 dark:bg-orange-900/30',
//           border: 'border-orange-200 dark:border-orange-800',
//           icon: AlertTriangle,
//           label: 'Overdue'
//         };
//       case 'pending':
//         return { 
//           color: 'text-yellow-600 dark:text-yellow-400',
//           bg: 'bg-yellow-100 dark:bg-yellow-900/30',
//           border: 'border-yellow-200 dark:border-yellow-800',
//           icon: Clock,
//           label: 'Pending'
//         };
//       default:
//         return { 
//           color: 'text-gray-600 dark:text-gray-400',
//           bg: 'bg-gray-100 dark:bg-gray-900/30',
//           border: 'border-gray-200 dark:border-gray-800',
//           icon: Clock3,
//           label: status
//         };
//     }
//   };

//   // Get leave type color
//   const getLeaveTypeColor = (type) => {
//     const colors = {
//       'Sick Leave': 'text-blue-600 dark:text-blue-400',
//       'Vacation': 'text-green-600 dark:text-green-400',
//       'Personal Leave': 'text-purple-600 dark:text-purple-400',
//       'Other': 'text-gray-600 dark:text-gray-400'
//     };
//     return colors[type] || 'text-gray-600 dark:text-gray-400';
//   };

//   // Filter and sort leaves
//   const filteredLeaves = leaveData
//     .filter(leave => filterStatus === 'all' ? true : leave.status === filterStatus)
//     .sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(b.requestDate) - new Date(a.requestDate);
//       }
//       if (sortBy === 'days') {
//         return b.days - a.days;
//       }
//       return 0;
//     });

//   // Calculate statistics
//   const totalPending = leaveData.filter(l => l.status === 'pending').length;
//   const urgentCount = leaveData.filter(l => l.status === 'urgent').length;
//   const overdueCount = leaveData.filter(l => l.status === 'overdue').length;
//   const totalDays = leaveData.reduce((sum, leave) => sum + leave.days, 0);

//   return (
//     <div className={`
//       rounded-xl shadow-sm border overflow-hidden
//       ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
//     `}>
//       {/* Header */}
//       <div className={`
//         p-4 border-b flex items-center justify-between
//         ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//       `}>
//         <div className="flex items-center space-x-3">
//           <div className={`
//             p-2 rounded-lg
//             ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}
//           `}>
//             <Calendar className={`w-5 h-5 ${
//               darkMode ? 'text-blue-400' : 'text-blue-600'
//             }`} />
//           </div>
//           <div>
//             <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {title}
//             </h3>
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               {totalPending} pending • {urgentCount} urgent • {overdueCount} overdue
//             </p>
//           </div>
//         </div>

//         {/* Filter and Sort */}
//         <div className="flex items-center space-x-2">
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className={`
//               text-xs px-2 py-1 rounded-lg border
//               ${darkMode 
//                 ? 'bg-gray-700 border-gray-600 text-gray-300' 
//                 : 'bg-white border-gray-300 text-gray-600'
//               }
//             `}
//           >
//             <option value="all">All Status</option>
//             <option value="pending">Pending</option>
//             <option value="urgent">Urgent</option>
//             <option value="overdue">Overdue</option>
//           </select>

//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className={`
//               text-xs px-2 py-1 rounded-lg border
//               ${darkMode 
//                 ? 'bg-gray-700 border-gray-600 text-gray-300' 
//                 : 'bg-white border-gray-300 text-gray-600'
//               }
//             `}
//           >
//             <option value="date">Sort by Date</option>
//             <option value="days">Sort by Days</option>
//           </select>
//         </div>
//       </div>

//       {/* Stats Summary */}
//       <div className="grid grid-cols-4 gap-2 p-4">
//         <div className="text-center">
//           <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {leaveData.length}
//           </p>
//           <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Total Requests
//           </p>
//         </div>
//         <div className="text-center">
//           <p className={`text-2xl font-bold text-yellow-500`}>
//             {totalPending}
//           </p>
//           <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Pending
//           </p>
//         </div>
//         <div className="text-center">
//           <p className={`text-2xl font-bold text-red-500`}>
//             {urgentCount}
//           </p>
//           <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Urgent
//           </p>
//         </div>
//         <div className="text-center">
//           <p className={`text-2xl font-bold text-orange-500`}>
//             {totalDays}
//           </p>
//           <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             Total Days
//           </p>
//         </div>
//       </div>

//       {/* Leave List */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className={`
//               border-t border-b text-xs
//               ${darkMode ? 'bg-gray-700/50 border-gray-700' : 'bg-gray-50 border-gray-200'}
//             `}>
//               <th className="px-4 py-2 text-left">Employee</th>
//               <th className="px-4 py-2 text-left">Leave Type</th>
//               <th className="px-4 py-2 text-left">Request Date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Days</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y dark:divide-gray-700">
//             {filteredLeaves.map((leave) => {
//               const status = getStatusInfo(leave.status);
//               const StatusIcon = status.icon;

//               return (
//                 <tr 
//                   key={leave.id}
//                   className={`
//                     text-sm transition-colors
//                     ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
//                   `}
//                 >
//                   <td className="px-4 py-3">
//                     <div>
//                       <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {leave.employee}
//                       </p>
//                       <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         {leave.department}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={getLeaveTypeColor(leave.type)}>
//                       {leave.type}
//                     </span>
//                   </td>
//                   <td className={`px-4 py-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                     {leave.requestDate}
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`
//                       inline-flex items-center px-2 py-1 rounded-full text-xs
//                       ${status.bg} ${status.color} ${status.border}
//                     `}>
//                       <StatusIcon className="w-3 h-3 mr-1" />
//                       {status.label}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className="font-medium">{leave.days} Days</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <div className="flex items-center justify-center space-x-2">
//                       <button
//                         onClick={() => onApprove?.(leave)}
//                         className={`
//                           p-1 rounded-lg transition-colors
//                           ${darkMode 
//                             ? 'hover:bg-green-900/30 text-green-400' 
//                             : 'hover:bg-green-50 text-green-600'
//                           }
//                         `}
//                         title="Approve"
//                       >
//                         <CheckCircle className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => onReject?.(leave)}
//                         className={`
//                           p-1 rounded-lg transition-colors
//                           ${darkMode 
//                             ? 'hover:bg-red-900/30 text-red-400' 
//                             : 'hover:bg-red-50 text-red-600'
//                           }
//                         `}
//                         title="Reject"
//                       >
//                         <XCircle className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Footer */}
//       {filteredLeaves.length > 0 && (
//         <div className={`
//           p-3 border-t flex justify-between items-center text-xs
//           ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//         `}>
//           <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
//             Showing {filteredLeaves.length} of {leaveData.length} requests
//           </span>
//           <button
//             onClick={onViewAll}
//             className={`
//               flex items-center space-x-1
//               ${darkMode ? 'text-blue-400' : 'text-blue-600'}
//               hover:underline
//             `}
//           >
//             <span>View All</span>
//             <ChevronDown className="w-3 h-3" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingLeaveCard;


import React, { useState } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Calendar,
  User,
  Filter,
  ChevronDown,
  AlertTriangle,
  Clock3,
  ChevronUp
} from 'lucide-react';

const PendingLeaveCard = ({ 
  leaves = [],
  darkMode = false,
  onViewAll,
  onApprove,
  onReject,
  title = "Pending Leave Details",
  maxHeight = "400px", // Customizable max height
  showScrollButtons = true
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showAll, setShowAll] = useState(false);

  // Sample data if no data provided
  const sampleLeaves = [
    { 
      id: 1,
      employee: 'John Smith', 
      type: 'Sick Leave', 
      requestDate: 'Jan 12, 2024', 
      status: 'urgent', 
      days: 5,
      department: 'Engineering',
      reason: 'Fever and cold'
    },
    { 
      id: 2,
      employee: 'Emily Davis', 
      type: 'Vacation', 
      requestDate: 'Feb 5, 2024', 
      status: 'pending', 
      days: 3,
      department: 'Marketing',
      reason: 'Family trip'
    },
    { 
      id: 3,
      employee: 'Michael Lee', 
      type: 'Personal Leave', 
      requestDate: 'Jan 28, 2024', 
      status: 'overdue', 
      days: 10,
      department: 'Sales',
      reason: 'Personal matters'
    },
    { 
      id: 4,
      employee: 'Sophia Brown', 
      type: 'Other', 
      requestDate: 'Feb 10, 2024', 
      status: 'pending', 
      days: 2,
      department: 'HR',
      reason: 'Doctor appointment'
    },
    { 
      id: 5,
      employee: 'Robert Wilson', 
      type: 'Sick Leave', 
      requestDate: 'Feb 15, 2024', 
      status: 'pending', 
      days: 4,
      department: 'Finance',
      reason: 'Migraine'
    },
    { 
      id: 6,
      employee: 'Jennifer Lee', 
      type: 'Vacation', 
      requestDate: 'Feb 18, 2024', 
      status: 'urgent', 
      days: 7,
      department: 'Operations',
      reason: 'Emergency leave'
    },
    { 
      id: 7,
      employee: 'David Brown', 
      type: 'Personal Leave', 
      requestDate: 'Feb 20, 2024', 
      status: 'overdue', 
      days: 3,
      department: 'IT',
      reason: 'Family function'
    },
    { 
      id: 8,
      employee: 'Sarah Johnson', 
      type: 'Other', 
      requestDate: 'Feb 22, 2024', 
      status: 'pending', 
      days: 1,
      department: 'Marketing',
      reason: 'Half day'
    },
    { 
      id: 9,
      employee: 'James Smith', 
      type: 'Sick Leave', 
      requestDate: 'Feb 23, 2024', 
      status: 'urgent', 
      days: 2,
      department: 'Engineering',
      reason: 'Viral fever'
    },
    { 
      id: 10,
      employee: 'Maria Garcia', 
      type: 'Vacation', 
      requestDate: 'Feb 24, 2024', 
      status: 'pending', 
      days: 5,
      department: 'HR',
      reason: 'Annual leave'
    }
  ];

  const leaveData = leaves.length > 0 ? leaves : sampleLeaves;

  // Get status badge color and icon
  const getStatusInfo = (status) => {
    switch(status.toLowerCase()) {
      case 'urgent':
        return { 
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-100 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-800',
          icon: AlertCircle,
          label: 'Urgent'
        };
      case 'overdue':
        return { 
          color: 'text-orange-600 dark:text-orange-400',
          bg: 'bg-orange-100 dark:bg-orange-900/30',
          border: 'border-orange-200 dark:border-orange-800',
          icon: AlertTriangle,
          label: 'Overdue'
        };
      case 'pending':
        return { 
          color: 'text-yellow-600 dark:text-yellow-400',
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: Clock,
          label: 'Pending'
        };
      default:
        return { 
          color: 'text-gray-600 dark:text-gray-400',
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          border: 'border-gray-200 dark:border-gray-800',
          icon: Clock3,
          label: status
        };
    }
  };

  // Get leave type color
  const getLeaveTypeColor = (type) => {
    const colors = {
      'Sick Leave': 'text-blue-600 dark:text-blue-400',
      'Vacation': 'text-green-600 dark:text-green-400',
      'Personal Leave': 'text-purple-600 dark:text-purple-400',
      'Other': 'text-gray-600 dark:text-gray-400'
    };
    return colors[type] || 'text-gray-600 dark:text-gray-400';
  };

  // Filter and sort leaves
  const filteredLeaves = leaveData
    .filter(leave => filterStatus === 'all' ? true : leave.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.requestDate) - new Date(a.requestDate);
      }
      if (sortBy === 'days') {
        return b.days - a.days;
      }
      return 0;
    });

  // Limit records if not showing all
  const displayedLeaves = showAll ? filteredLeaves : filteredLeaves.slice(0, 5);

  // Calculate statistics
  const totalPending = leaveData.filter(l => l.status === 'pending').length;
  const urgentCount = leaveData.filter(l => l.status === 'urgent').length;
  const overdueCount = leaveData.filter(l => l.status === 'overdue').length;
  const totalDays = leaveData.reduce((sum, leave) => sum + leave.days, 0);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={`
      rounded-xl shadow-sm border overflow-hidden flex flex-col
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header - Fixed */}
      <div className={`
        p-4 border-b flex items-center justify-between flex-shrink-0
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <div className="flex items-center space-x-3">
          <div className={`
            p-2 rounded-lg
            ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}
          `}>
            <Calendar className={`w-5 h-5 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {totalPending} pending • {urgentCount} urgent • {overdueCount} overdue
            </p>
          </div>
        </div>

        {/* Filter and Sort */}
        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`
              text-xs px-2 py-1 rounded-lg border
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-300' 
                : 'bg-white border-gray-300 text-gray-600'
              }
            `}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="urgent">Urgent</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`
              text-xs px-2 py-1 rounded-lg border
              ${darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-300' 
                : 'bg-white border-gray-300 text-gray-600'
              }
            `}
          >
            <option value="date">Sort by Date</option>
            <option value="days">Sort by Days</option>
          </select>
        </div>
      </div>

      {/* Stats Summary - Fixed */}
      <div className="grid grid-cols-4 gap-2 p-4 flex-shrink-0">
        <div className="text-center">
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {leaveData.length}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Total Requests
          </p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold text-yellow-500`}>
            {totalPending}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Pending
          </p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold text-red-500`}>
            {urgentCount}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Urgent
          </p>
        </div>
        <div className="text-center">
          <p className={`text-2xl font-bold text-orange-500`}>
            {totalDays}
          </p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Total Days
          </p>
        </div>
      </div>

      {/* Leave List - Scrollable Area */}
      <div 
        className="overflow-y-auto flex-1"
        style={{ maxHeight: maxHeight }}
      >
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className={`
              border-t border-b text-xs
              ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}
            `}>
              <th className="px-4 py-2 text-left">Employee</th>
              <th className="px-4 py-2 text-left">Leave Type</th>
              <th className="px-4 py-2 text-left">Request Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Days</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {displayedLeaves.map((leave) => {
              const status = getStatusInfo(leave.status);
              const StatusIcon = status.icon;

              return (
                <tr 
                  key={leave.id}
                  className={`
                    text-sm transition-colors
                    ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}
                  `}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {leave.employee}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {leave.department}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getLeaveTypeColor(leave.type)}>
                      {leave.type}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {leave.requestDate}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs whitespace-nowrap
                      ${status.bg} ${status.color} ${status.border}
                    `}>
                      <StatusIcon className="w-3 h-3 mr-1 flex-shrink-0" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium">{leave.days} Days</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onApprove?.(leave)}
                        className={`
                          p-1 rounded-lg transition-colors
                          ${darkMode 
                            ? 'hover:bg-green-900/30 text-green-400' 
                            : 'hover:bg-green-50 text-green-600'
                          }
                        `}
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onReject?.(leave)}
                        className={`
                          p-1 rounded-lg transition-colors
                          ${darkMode 
                            ? 'hover:bg-red-900/30 text-red-400' 
                            : 'hover:bg-red-50 text-red-600'
                          }
                        `}
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {displayedLeaves.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Calendar className={`w-8 h-8 mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No leave requests found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Show More/Less and View All */}
      <div className={`
        p-3 border-t flex justify-between items-center text-xs flex-shrink-0
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <div className="flex items-center space-x-3">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Showing {displayedLeaves.length} of {filteredLeaves.length} requests
          </span>
          
          {/* Show More/Less Button */}
          {filteredLeaves.length > 5 && (
            <button
              onClick={toggleShowAll}
              className={`
                flex items-center space-x-1
                ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  <span>Show More</span>
                </>
              )}
            </button>
          )}
        </div>

        <button
          onClick={onViewAll}
          className={`
            flex items-center space-x-1
            ${darkMode ? 'text-blue-400' : 'text-blue-600'}
            hover:underline
          `}
        >
          <span>View All</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: ${darkMode ? '#4B5563 #1F2937' : '#CBD5E0 #F1F5F9'};
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: ${darkMode ? '#1F2937' : '#F1F5F9'};
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#4B5563' : '#CBD5E0'};
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#6B7280' : '#94A3B8'};
        }
        
        .overflow-y-auto::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default PendingLeaveCard;