

// import React, { useMemo } from 'react';
// import TrendComposedChart from '../../../charts/TrendComposedChart';
// import { useTheme } from '../../../context/ThemeContext';

// const TrendChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();

//   // Default data - memoized
//   const defaultData = useMemo(() => [
//     { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
//     { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
//     { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
//     { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
//     { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
//     { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
//     { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 }
//   ], []);

//   // Process data - memoized
//   const processedData = useMemo(() => {
//     const sourceData = data && data.length > 0 ? data : defaultData;
    
//     return sourceData.map(item => ({
//       month: item.month || 'Unknown',
//       attendance: Number(item.attendance || item.present || 0),
//       overtime: Number(item.overtime || 0),
//       late: Number(item.late || 0),
//       trend: Number(item.trend || 0)
//     }));
//   }, [data, defaultData]);

//   // Calculate averages - memoized
//   const averages = useMemo(() => {
//     const totals = processedData.reduce((acc, item) => {
//       acc.attendance += item.attendance;
//       acc.overtime += item.overtime;
//       acc.late += item.late;
//       return acc;
//     }, { attendance: 0, overtime: 0, late: 0 });

//     const count = processedData.length || 1;
    
//     return {
//       attendance: Math.round(totals.attendance / count),
//       overtime: Math.round(totals.overtime / count),
//       late: Math.round(totals.late / count)
//     };
//   }, [processedData]);

//   return (
//     <div 
//       className={`
//         p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//     >
//       <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Attendance Trend 2026
//       </h2>
      
//       {/* Chart container with fixed height - 60px for header, 80px for stats */}
//   <div className="w-full h-[300px]">
//         <TrendComposedChart 
//           data={processedData} 
//           darkMode={darkMode}
//         />
//       </div>

//       {/* Quick Stats */}
//       <div className="mt-4 grid grid-cols-3 gap-2 text-center flex-shrink-0">
//         <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
//           <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Avg Attendance</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {averages.attendance}
//           </p>
//         </div>
//         <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
//           <p className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Avg Overtime</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {averages.overtime}
//           </p>
//         </div>
//         <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
//           <p className={`text-xs ${darkMode ? 'text-red-400' : 'text-red-600'}`}>Avg Late</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {averages.late}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendChartContainer;



import React, { useMemo, useState, useEffect } from 'react';
import TrendComposedChart from '../../../charts/TrendComposedChart';
import { useTheme } from '../../../context/ThemeContext';

const TrendChartContainer = ({ data = [] }) => {
  const { darkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0 });

  // Default data - memoized
  const defaultData = useMemo(() => [
    { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
    { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
    { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
    { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
    { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
    { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
    { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 }
  ], []);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Process data - memoized
  const processedData = useMemo(() => {
    const sourceData = data && data.length > 0 ? data : defaultData;
    
    return sourceData.map(item => ({
      month: item.month || 'Unknown',
      attendance: Number(item.attendance || item.present || 0),
      overtime: Number(item.overtime || 0),
      late: Number(item.late || 0),
      trend: Number(item.trend || 0)
    }));
  }, [data, defaultData]);

  // Calculate averages - memoized
  const averages = useMemo(() => {
    const totals = processedData.reduce((acc, item) => {
      acc.attendance += item.attendance;
      acc.overtime += item.overtime;
      acc.late += item.late;
      return acc;
    }, { attendance: 0, overtime: 0, late: 0 });

    const count = processedData.length || 1;
    
    return {
      attendance: Math.round(totals.attendance / count),
      overtime: Math.round(totals.overtime / count),
      late: Math.round(totals.late / count)
    };
  }, [processedData]);

  // Responsive chart height
  const getChartHeight = () => {
    if (dimensions.width < 640) return '250px';
    if (dimensions.width < 1024) return '280px';
    return '300px';
  };

  return (
    <div 
      className={`
        p-3 sm:p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
      `}
    >
      <h2 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Attendance Trend 2026
      </h2>
      
      {/* Chart container with responsive height */}
      <div className="w-full" style={{ height: getChartHeight() }}>
        <TrendComposedChart 
          data={processedData} 
          darkMode={darkMode}
        />
      </div>

     
    </div>
  );
};

export default TrendChartContainer;