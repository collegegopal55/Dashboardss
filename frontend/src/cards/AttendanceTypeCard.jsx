// // components/cards/AttendanceTypeCard.jsx
// import React from 'react';

// const AttendanceTypeCard = ({ data, totalEmployees }) => {
//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
//       <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Attendance Type Wise</h2>
//       <div className="space-y-4">
//         {data.map((item, index) => (
//           <div key={index}>
//             <div className="flex justify-between text-xs sm:text-sm mb-1">
//               <span className="text-gray-600 truncate">{item.name}</span>
//               <span className="font-medium ml-2" style={{ color: item.color }}>{item.value} employees</span>
//             </div>
//             <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//               <div 
//                 className="h-full rounded-full transition-all duration-500"
//                 style={{ width: `${(item.value / totalEmployees) * 100}%`, backgroundColor: item.color }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AttendanceTypeCard;

// components/cards/AttendanceTypeCard.jsx



import React from 'react';
import { Users, TrendingUp, TrendingDown } from 'lucide-react';

const AttendanceTypeCard = ({ data, totalEmployees, darkMode = false }) => {
  // Calculate percentages and find trends
  const enhancedData = data.map(item => ({
    ...item,
    percentage: ((item.value / totalEmployees) * 100).toFixed(1),
    trend: item.previousValue ? ((item.value - item.previousValue) / item.previousValue * 100).toFixed(1) : null
  }));

  // Get icon based on type name
  const getTypeIcon = (name) => {
    switch(name?.toLowerCase()) {
      case 'present':
        return '✅';
      case 'absent':
        return '❌';
      case 'late':
        return '⏰';
      case 'leave':
        return '🏖️';
      case 'wfh':
      case 'work from home':
        return '🏠';
      case 'tour':
        return '✈️';
      case 'holiday':
        return '🎉';
      default:
        return '👤';
    }
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-100 hover:border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-blue-50'
          }`}>
            <Users className={`w-4 h-4 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </div>
          <h2 className={`text-base sm:text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Attendance Type Wise
          </h2>
        </div>
        
        {/* Total Employees Badge */}
        <div className={`text-xs px-2 py-1 rounded-full ${
          darkMode 
            ? 'bg-gray-700 text-gray-300' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          Total: {totalEmployees}
        </div>
      </div>

      {/* Data List */}
      <div className="space-y-4">
        {enhancedData.map((item, index) => (
          <div key={index} className="group">
            {/* Label Row */}
            <div className="flex justify-between items-center text-xs sm:text-sm mb-1">
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-base" style={{ color: item.color }}>
                  {getTypeIcon(item.name)}
                </span>
                <span className={`truncate ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {item.name}
                </span>
                
                {/* Trend Indicator */}
                {item.trend && (
                  <div className={`flex items-center space-x-1 text-xs ${
                    item.trend > 0 ? 'text-green-500' : 
                    item.trend < 0 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {item.trend > 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : item.trend < 0 ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : null}
                    <span>{Math.abs(item.trend)}%</span>
                  </div>
                )}
              </div>
              
              {/* Value and Percentage */}
              <div className="flex items-center space-x-2 ml-2">
                <span className={`font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.value}
                </span>
                <span className={`text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  ({item.percentage}%)
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className={`h-2.5 rounded-full overflow-hidden ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out group-hover:scale-y-110"
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: item.color,
                    boxShadow: darkMode ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
              
              {/* Tooltip on hover (optional) */}
              <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${
                darkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-800 text-white'
              }`}>
                {item.value} out of {totalEmployees} employees
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer with Summary */}
      <div className={`mt-4 pt-4 border-t text-xs ${
        darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-100 text-gray-500'
      }`}>
        <div className="flex justify-between items-center">
          <span>Total Present Today</span>
          <span className={`font-medium ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {enhancedData.find(d => d.name?.toLowerCase() === 'present')?.value || 0} / {totalEmployees}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span>Attendance Rate</span>
          <span className={`font-medium ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {((enhancedData.find(d => d.name?.toLowerCase() === 'present')?.value || 0) / totalEmployees * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTypeCard;