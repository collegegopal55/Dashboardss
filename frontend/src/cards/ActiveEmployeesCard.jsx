// import React, { useState } from 'react';
// import {
//   Users,
//   TrendingUp,
//   TrendingDown,
//   UserPlus,
//   UserMinus,
//   Briefcase,
//   Calendar,
//   ArrowUp,
//   ArrowDown,
//   Minus,
//   Activity
// } from 'lucide-react';

// const ActiveEmployeesCard = ({
//   darkMode = false,
//   data = null,
//   onViewDetails
// }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   // Sample data if no data provided
//   const sampleData = {
//     totalActive: 1284,
//     trend: 8.4,
//     trendDirection: 'up',
//     thisMonth: {
//       newJoinees: 42,
//       resigned: 18,
//       netGrowth: 24
//     },
//     lastMonth: {
//       newJoinees: 30,
//       resigned: 22,
//       netGrowth: 8
//     },
//     departmentWise: [
//       { dept: 'Engineering', count: 345, change: '+12' },
//       { dept: 'Sales', count: 234, change: '+5' },
//       { dept: 'Marketing', count: 156, change: '-2' },
//       { dept: 'HR', count: 89, change: '+3' },
//       { dept: 'Finance', count: 67, change: '+1' }
//     ]
//   };

//   const employeeData = data || sampleData;

//   // Calculate change indicators
//   const getChangeIcon = (value) => {
//     if (value > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
//     if (value < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
//     return <Minus className="w-3 h-3 text-gray-400" />;
//   };

//   const getChangeColor = (value) => {
//     if (value > 0) return 'text-green-500';
//     if (value < 0) return 'text-red-500';
//     return 'text-gray-400';
//   };

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
//             ${darkMode ? 'bg-gray-700' : 'bg-green-50'}
//           `}>
//             <Users className={`w-5 h-5 ${
//               darkMode ? 'text-green-400' : 'text-green-600'
//             }`} />
//           </div>
//           <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             Active Employees
//           </h3>
//         </div>
//         <button
//           onClick={() => setShowDetails(!showDetails)}
//           className={`
//             text-xs px-2 py-1 rounded-lg transition-colors
//             ${darkMode 
//               ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
//               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//             }
//           `}
//         >
//           {showDetails ? 'Show Summary' : 'Show Details'}
//         </button>
//       </div>

//       {/* Main Stats */}
//       <div className="p-4">
//         <div className="flex items-end justify-between">
//           <div>
//             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Total Active
//             </p>
//             <div className="flex items-baseline space-x-2">
//               <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 {employeeData.totalActive.toLocaleString()}
//               </span>
//               <span className={`
//                 flex items-center text-sm font-medium
//                 ${employeeData.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}
//               `}>
//                 {employeeData.trendDirection === 'up' ? '↑' : '↓'} 
//                 {employeeData.trend}%
//               </span>
//             </div>
//             <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//               from last month
//             </p>
//           </div>
          
//           {/* Mini Trend Chart */}
//           <div className="flex items-end space-x-1">
//             {[65, 72, 68, 75, 82, 79, 84].map((height, i) => (
//               <div key={i} className="flex flex-col items-center">
//                 <div 
//                   className="w-2 bg-green-500 rounded-t"
//                   style={{ height: `${height/2}px` }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Change Summary Cards */}
//         <div className="grid grid-cols-3 gap-3 mt-4">
//           <div className={`
//             p-2 rounded-lg text-center
//             ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
//           `}>
//             <UserPlus className={`
//               w-4 h-4 mx-auto mb-1
//               ${darkMode ? 'text-green-400' : 'text-green-600'}
//             `} />
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               New Joinees
//             </p>
//             <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {employeeData.thisMonth.newJoinees}
//             </p>
//             <p className="text-xs text-green-500">
//               +{employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees}
//             </p>
//           </div>

//           <div className={`
//             p-2 rounded-lg text-center
//             ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
//           `}>
//             <UserMinus className={`
//               w-4 h-4 mx-auto mb-1
//               ${darkMode ? 'text-red-400' : 'text-red-600'}
//             `} />
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Resigned
//             </p>
//             <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {employeeData.thisMonth.resigned}
//             </p>
//             <p className="text-xs text-green-500">
//               {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned > 0 ? '−' : '+'}
//               {Math.abs(employeeData.thisMonth.resigned - employeeData.lastMonth.resigned)}
//             </p>
//           </div>

//           <div className={`
//             p-2 rounded-lg text-center
//             ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
//           `}>
//             <TrendingUp className={`
//               w-4 h-4 mx-auto mb-1
//               ${darkMode ? 'text-blue-400' : 'text-blue-600'}
//             `} />
//             <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               Net Growth
//             </p>
//             <p className={`text-lg font-bold ${
//               employeeData.thisMonth.netGrowth > 0 
//                 ? 'text-green-500' 
//                 : employeeData.thisMonth.netGrowth < 0 
//                   ? 'text-red-500' 
//                   : darkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               {employeeData.thisMonth.netGrowth > 0 ? '+' : ''}
//               {employeeData.thisMonth.netGrowth}
//             </p>
//             <p className="text-xs text-blue-500">
//               vs +{employeeData.lastMonth.netGrowth} last month
//             </p>
//           </div>
//         </div>

//         {/* Detailed Comparison Table */}
//         {showDetails && (
//           <div className="mt-4">
//             <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               Month over Month Comparison
//             </h4>
            
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className={`
//                   text-xs border-y
//                   ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//                 `}>
//                   <th className="py-2 text-left"></th>
//                   <th className="py-2 text-right">This Month</th>
//                   <th className="py-2 text-right">Last Month</th>
//                   <th className="py-2 text-right">Change</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b dark:border-gray-700">
//                   <td className="py-2">New Joinees</td>
//                   <td className="py-2 text-right font-medium">
//                     {employeeData.thisMonth.newJoinees}
//                   </td>
//                   <td className="py-2 text-right">
//                     {employeeData.lastMonth.newJoinees}
//                   </td>
//                   <td className="py-2 text-right">
//                     <span className="flex items-center justify-end space-x-1">
//                       {getChangeIcon(employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees)}
//                       <span className={getChangeColor(employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees)}>
//                         {employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees > 0 ? '+' : ''}
//                         {employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees}
//                       </span>
//                     </span>
//                   </td>
//                 </tr>
//                 <tr className="border-b dark:border-gray-700">
//                   <td className="py-2">Resigned</td>
//                   <td className="py-2 text-right font-medium">
//                     {employeeData.thisMonth.resigned}
//                   </td>
//                   <td className="py-2 text-right">
//                     {employeeData.lastMonth.resigned}
//                   </td>
//                   <td className="py-2 text-right">
//                     <span className="flex items-center justify-end space-x-1">
//                       {getChangeIcon(employeeData.lastMonth.resigned - employeeData.thisMonth.resigned)}
//                       <span className={getChangeColor(employeeData.lastMonth.resigned - employeeData.thisMonth.resigned)}>
//                         {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned > 0 ? '+' : ''}
//                         {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned}
//                       </span>
//                     </span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td className="py-2 font-medium">Net Growth</td>
//                   <td className="py-2 text-right font-bold text-green-500">
//                     +{employeeData.thisMonth.netGrowth}
//                   </td>
//                   <td className="py-2 text-right">
//                     +{employeeData.lastMonth.netGrowth}
//                   </td>
//                   <td className="py-2 text-right">
//                     <span className="flex items-center justify-end space-x-1">
//                       {getChangeIcon(employeeData.thisMonth.netGrowth - employeeData.lastMonth.netGrowth)}
//                       <span className={getChangeColor(employeeData.thisMonth.netGrowth - employeeData.lastMonth.netGrowth)}>
//                         {employeeData.thisMonth.netGrowth - employeeData.lastMonth.netGrowth > 0 ? '+' : ''}
//                         {employeeData.thisMonth.netGrowth - employeeData.lastMonth.netGrowth}
//                       </span>
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             {/* Department Wise Distribution */}
//             <div className="mt-4">
//               <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                 Department Wise
//               </h4>
//               <div className="space-y-2">
//                 {employeeData.departmentWise.map((dept) => (
//                   <div key={dept.dept} className="flex items-center justify-between">
//                     <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {dept.dept}
//                     </span>
//                     <div className="flex items-center space-x-3">
//                       <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                         {dept.count}
//                       </span>
//                       <span className={`text-xs ${dept.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
//                         {dept.change}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Net Growth Bar */}
//         <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Activity className="w-4 h-4" />
//               <span className="text-sm font-medium">Net Employee Growth</span>
//             </div>
//             <span className="text-lg font-bold">
//               +{employeeData.thisMonth.netGrowth} Employees
//             </span>
//           </div>
//           <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-white rounded-full"
//               style={{ width: `${(employeeData.thisMonth.netGrowth / 50) * 100}%` }}
//             />
//           </div>
//           <p className="text-xs mt-1 text-white/80">
//             {employeeData.thisMonth.netGrowth > employeeData.lastMonth.netGrowth 
//               ? '↑ Better than last month' 
//               : '↓ Lower than last month'}
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className={`
//         p-3 border-t text-xs
//         ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//       `}>
//         <button
//           onClick={onViewDetails}
//           className="w-full text-center text-blue-500 hover:text-blue-600"
//         >
//           View Detailed Report →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ActiveEmployeesCard;

import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  TrendingUp,
  TrendingDown,
  UserPlus,
  UserMinus,
  Briefcase,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  ChevronDown,
  ChevronUp,
  BarChart3,
  PieChart,
  Download
} from 'lucide-react';

const ActiveEmployeesCard = ({
  darkMode = false,
  data = null,
  onViewDetails,
  onExport,
  maxHeight = '500px'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDept, setSelectedDept] = useState('all');
  const [chartType, setChartType] = useState('bar');
  const detailsRef = useRef(null);

  // Sample data with all required fields
  const sampleData = {
    totalActive: 1284,
    trend: 8.4,
    trendDirection: 'up',
    thisMonth: {
      newJoinees: 42,
      resigned: 18,
      netGrowth: 24
    },
    lastMonth: {
      newJoinees: 30,
      resigned: 22,
      netGrowth: 8
    },
    departmentWise: [
      { dept: 'Engineering', count: 345, change: '+12', color: '#3B82F6' },
      { dept: 'Sales', count: 234, change: '+5', color: '#10B981' },
      { dept: 'Marketing', count: 156, change: '-2', color: '#F59E0B' },
      { dept: 'HR', count: 89, change: '+3', color: '#8B5CF6' },
      { dept: 'Finance', count: 67, change: '+1', color: '#EC4899' }
    ],
    monthlyTrend: [
      { month: 'Jan', count: 1245 },
      { month: 'Feb', count: 1256 },
      { month: 'Mar', count: 1268 },
      { month: 'Apr', count: 1275 },
      { month: 'May', count: 1284 },
      { month: 'Jun', count: 1292 },
      { month: 'Jul', count: 1301 }
    ]
  };

  // Safe data initialization with defaults
  const employeeData = {
    totalActive: data?.totalActive ?? sampleData.totalActive,
    trend: data?.trend ?? sampleData.trend,
    trendDirection: data?.trendDirection ?? sampleData.trendDirection,
    thisMonth: {
      newJoinees: data?.thisMonth?.newJoinees ?? sampleData.thisMonth.newJoinees,
      resigned: data?.thisMonth?.resigned ?? sampleData.thisMonth.resigned,
      netGrowth: data?.thisMonth?.netGrowth ?? sampleData.thisMonth.netGrowth
    },
    lastMonth: {
      newJoinees: data?.lastMonth?.newJoinees ?? sampleData.lastMonth.newJoinees,
      resigned: data?.lastMonth?.resigned ?? sampleData.lastMonth.resigned,
      netGrowth: data?.lastMonth?.netGrowth ?? sampleData.lastMonth.netGrowth
    },
    departmentWise: data?.departmentWise ?? sampleData.departmentWise,
    monthlyTrend: data?.monthlyTrend ?? sampleData.monthlyTrend
  };

  // Filter department data safely
  const filteredDepts = selectedDept === 'all' 
    ? (employeeData.departmentWise || []) 
    : (employeeData.departmentWise || []).filter(d => d.dept === selectedDept);

  // Calculate max count for chart scaling safely
  const maxCount = Math.max(...(employeeData.departmentWise || []).map(d => d.count), 1);

  // Calculate change indicators
  const getChangeIcon = (value) => {
    if (value > 0) return <ArrowUp className="w-3 h-3 text-green-500" />;
    if (value < 0) return <ArrowDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-gray-400" />;
  };

  const getChangeColor = (value) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  const handleExport = () => {
    if (onExport) {
      onExport(employeeData);
    } else {
      // Default export as CSV
      const csv = convertToCSV(employeeData);
      downloadCSV(csv, 'employee-data.csv');
    }
  };

  const convertToCSV = (data) => {
    const headers = ['Department', 'Count', 'Change'];
    const rows = (data.departmentWise || []).map(d => [d.dept, d.count, d.change]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
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
            ${darkMode ? 'bg-gray-700' : 'bg-green-50'}
          `}>
            <Users className={`w-5 h-5 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`} />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Active Employees
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: Today at {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Export Button */}
          <button
            onClick={handleExport}
            className={`
              p-1.5 rounded-lg transition-colors
              ${darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
            title="Export Data"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Toggle Details Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`
              text-xs px-2 py-1.5 rounded-lg transition-colors flex items-center space-x-1
              ${darkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            <span>{showDetails ? 'Show Summary' : 'Show Details'}</span>
            {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div 
        className="overflow-y-auto flex-1"
        style={{ maxHeight: showDetails ? maxHeight : 'auto' }}
        ref={detailsRef}
      >
        <div className="p-4">
          {/* Main Stats */}
          <div className="flex items-end justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Total Active
              </p>
              <div className="flex items-baseline space-x-2">
                <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {employeeData.totalActive.toLocaleString()}
                </span>
                <span className={`
                  flex items-center text-sm font-medium
                  ${employeeData.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'}
                `}>
                  {employeeData.trendDirection === 'up' ? '↑' : '↓'} 
                  {employeeData.trend}%
                </span>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                from last month
              </p>
            </div>
            
            {/* Mini Trend Chart - Safe check for monthlyTrend */}
            <div className="flex items-end space-x-1">
              {(employeeData.monthlyTrend || []).slice(-7).map((month, i) => (
                <div key={i} className="flex flex-col items-center group relative">
                  <div 
                    className="w-2 bg-green-500 rounded-t transition-all duration-300 group-hover:bg-green-400"
                    style={{ height: `${((month?.count || 0) / 1500) * 40}px` }}
                  />
                  {/* Tooltip */}
                  <div className={`
                    absolute bottom-full mb-2 opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none
                    text-xs px-2 py-1 rounded whitespace-nowrap z-10
                    ${darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-800 text-white'
                    }
                  `}>
                    {month?.month || 'N/A'}: {month?.count || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Change Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className={`
              p-3 rounded-lg text-center transition-all hover:scale-105
              ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}
            `}>
              <UserPlus className={`
                w-5 h-5 mx-auto mb-1
                ${darkMode ? 'text-green-400' : 'text-green-600'}
              `} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                New Joinees
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {employeeData.thisMonth.newJoinees}
              </p>
              <p className="text-xs text-green-500">
                ↑ {employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees}
              </p>
            </div>

            <div className={`
              p-3 rounded-lg text-center transition-all hover:scale-105
              ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}
            `}>
              <UserMinus className={`
                w-5 h-5 mx-auto mb-1
                ${darkMode ? 'text-red-400' : 'text-red-600'}
              `} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Resigned
              </p>
              <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {employeeData.thisMonth.resigned}
              </p>
              <p className="text-xs text-green-500">
                ↓ {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned}
              </p>
            </div>

            <div className={`
              p-3 rounded-lg text-center transition-all hover:scale-105
              ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}
            `}>
              <TrendingUp className={`
                w-5 h-5 mx-auto mb-1
                ${darkMode ? 'text-blue-400' : 'text-blue-600'}
              `} />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Net Growth
              </p>
              <p className={`text-xl font-bold ${
                employeeData.thisMonth.netGrowth > 0 
                  ? 'text-green-500' 
                  : employeeData.thisMonth.netGrowth < 0 
                    ? 'text-red-500' 
                    : darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {employeeData.thisMonth.netGrowth > 0 ? '+' : ''}
                {employeeData.thisMonth.netGrowth}
              </p>
              <p className="text-xs text-blue-500">
                vs +{employeeData.lastMonth.netGrowth}
              </p>
            </div>
          </div>

          {/* Detailed Section */}
          {showDetails && (
            <div className="mt-6 space-y-6 animate-in fade-in duration-300">
              {/* Month over Month Comparison */}
              <div>
                <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Month over Month Comparison
                </h4>
                
                <div className="space-y-4">
                  {/* New Joinees */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        New Joinees
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {employeeData.thisMonth.newJoinees}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          vs {employeeData.lastMonth.newJoinees}
                        </span>
                        <span className="flex items-center space-x-1 text-green-500">
                          {getChangeIcon(employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees)}
                          <span className="text-xs">
                            +{employeeData.thisMonth.newJoinees - employeeData.lastMonth.newJoinees}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ 
                          width: `${(employeeData.thisMonth.newJoinees / 50) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Resigned */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Resigned
                      </span>
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {employeeData.thisMonth.resigned}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          vs {employeeData.lastMonth.resigned}
                        </span>
                        <span className="flex items-center space-x-1 text-green-500">
                          {getChangeIcon(employeeData.lastMonth.resigned - employeeData.thisMonth.resigned)}
                          <span className="text-xs">
                            {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned > 0 ? '+' : ''}
                            {employeeData.lastMonth.resigned - employeeData.thisMonth.resigned}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ 
                          width: `${(employeeData.thisMonth.resigned / 30) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Wise Distribution */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Department Wise Distribution
                  </h4>
                  
                  <div className="flex items-center space-x-2">
                    {/* Department Filter */}
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className={`
                        text-xs px-2 py-1 rounded-lg border
                        ${darkMode 
                          ? 'bg-gray-700 border-gray-600 text-gray-300' 
                          : 'bg-white border-gray-300 text-gray-600'
                        }
                      `}
                    >
                      <option value="all">All Departments</option>
                      {(employeeData.departmentWise || []).map(dept => (
                        <option key={dept.dept} value={dept.dept}>{dept.dept}</option>
                      ))}
                    </select>

                    {/* Chart Type Toggle */}
                    <button
                      onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
                      className={`
                        p-1.5 rounded-lg transition-colors
                        ${darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                      title="Toggle Chart View"
                    >
                      {chartType === 'bar' ? <PieChart className="w-4 h-4" /> : <BarChart3 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Bar Chart View */}
                {chartType === 'bar' ? (
                  <div className="space-y-3">
                    {filteredDepts.map((dept) => (
                      <div key={dept.dept} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {dept.dept}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {dept.count}
                            </span>
                            <span className={`text-xs ${dept.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {dept.change}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(dept.count / maxCount) * 100}%`,
                              backgroundColor: dept.color || '#3B82F6'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Pie Chart Preview - Simplified */
                  <div className="flex items-center justify-center py-6">
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {filteredDepts.map((dept) => (
                        <div key={dept.dept} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: dept.color || '#3B82F6' }}
                          />
                          <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {dept.dept} ({dept.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Monthly Trend - Safe check */}
              {(employeeData.monthlyTrend || []).length > 0 && (
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    6-Month Trend
                  </h4>
                  <div className="grid grid-cols-6 gap-2">
                    {(employeeData.monthlyTrend || []).slice(-6).map((month) => (
                      <div key={month?.month || Math.random()} className="text-center">
                        <div className="h-16 flex items-end justify-center mb-1">
                          <div 
                            className="w-4 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
                            style={{ height: `${((month?.count || 0) / 1400) * 60}px` }}
                          />
                        </div>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {month?.month || 'N/A'}
                        </span>
                        <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {month?.count || 0}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Net Growth Bar */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span className="text-sm font-medium">Net Employee Growth</span>
              </div>
              <span className="text-xl font-bold">
                +{employeeData.thisMonth.netGrowth} Employees
              </span>
            </div>
            <div className="mt-3 h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(employeeData.thisMonth.netGrowth / 50) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2 text-white/80">
              <span>Target: 50</span>
              <span>{((employeeData.thisMonth.netGrowth / 50) * 100).toFixed(1)}% Achieved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className={`
        p-3 border-t text-xs flex-shrink-0
        ${darkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        <button
          onClick={onViewDetails}
          className="w-full text-center text-blue-500 hover:text-blue-600 font-medium"
        >
          View Detailed Report →
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
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ActiveEmployeesCard;