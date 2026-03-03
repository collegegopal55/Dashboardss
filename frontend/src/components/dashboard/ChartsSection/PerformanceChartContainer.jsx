

// import React, { useState, useEffect, useRef } from 'react';
// import PerformanceRadarChart from '../../../charts/PerformanceRadarChart';
// import { useTheme } from '../../../context/ThemeContext';

// const PerformanceChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
//   const [isReady, setIsReady] = useState(false);
//   const containerRef = useRef(null);

//   // Default data
//   const defaultData = [
//     { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
//     { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
//     { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
//     { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
//     { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
//   ];

//   // Process data
//   const processedData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     department: item.department || 'Unknown',
//     attendance: Number(item.attendance || item.Attendance || 0),
//     productivity: Number(item.productivity || item.Productivity || 0),
//     satisfaction: Number(item.satisfaction || item.Satisfaction || 0)
//   }));

//   // Calculate averages
//   const averages = processedData.reduce((acc, item) => {
//     acc.attendance += item.attendance;
//     acc.productivity += item.productivity;
//     acc.satisfaction += item.satisfaction;
//     return acc;
//   }, { attendance: 0, productivity: 0, satisfaction: 0 });

//   const avgAttendance = Math.round(averages.attendance / processedData.length);
//   const avgProductivity = Math.round(averages.productivity / processedData.length);
//   const avgSatisfaction = Math.round(averages.satisfaction / processedData.length);

//   // Measure container
//   useEffect(() => {
//     const measureDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         if (width > 0 && height > 0) {
//           // Subtract header and stats height
//           setChartDimensions({ width, height: height - 140 });
//           setIsReady(true);
//         }
//       }
//     };

//     // Initial measurement
//     measureDimensions();

//     // Debounced resize handler
//     let timeoutId;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(measureDimensions, 100);
//     };

//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         const { width, height } = entry.contentRect;
//         if (width > 0 && height > 0) {
//           setChartDimensions({ width, height: height - 140 });
//           setIsReady(true);
//         }
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     window.addEventListener('resize', handleResize);

//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//       resizeObserver.disconnect();
//     };
//   }, []);

//   return (
//     <div 
//       ref={containerRef}
//       className={`
//         p-4 rounded-xl shadow-sm border h-full w-full
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//       style={{ 
//         minHeight: '500px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Department Performance
//       </h2>
      
//       {/* Chart container - takes remaining height */}
//       <div className="flex-grow w-full" style={{ minHeight: 0 }}>
//         {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
//           <PerformanceRadarChart 
//             data={processedData} 
//             darkMode={darkMode}
//             width={chartDimensions.width}
//             height={chartDimensions.height}
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Loading chart...
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Performance Summary - fixed height */}
//       <div className="mt-4 grid grid-cols-3 gap-2 text-center flex-shrink-0">
//         <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
//           <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Attendance</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgAttendance}%
//           </p>
//         </div>
//         <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
//           <p className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Productivity</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgProductivity}%
//           </p>
//         </div>
//         <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
//           <p className={`text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Satisfaction</p>
//           <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgSatisfaction}%
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceChartContainer;


import React, { useState, useEffect, useRef } from 'react';
import PerformanceRadarChart from '../../../charts/PerformanceRadarChart';
import { useTheme } from '../../../context/ThemeContext';

const PerformanceChartContainer = ({ data = [] }) => {
  const { darkMode } = useTheme();
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  // Default data
  const defaultData = [
    { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
    { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
    { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
    { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
    { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
  ];

  // Process data
  const processedData = (data && data.length > 0 ? data : defaultData).map(item => ({
    department: item.department || 'Unknown',
    attendance: Number(item.attendance || item.Attendance || 0),
    productivity: Number(item.productivity || item.Productivity || 0),
    satisfaction: Number(item.satisfaction || item.Satisfaction || 0)
  }));

  // Calculate averages
  const averages = processedData.reduce((acc, item) => {
    acc.attendance += item.attendance;
    acc.productivity += item.productivity;
    acc.satisfaction += item.satisfaction;
    return acc;
  }, { attendance: 0, productivity: 0, satisfaction: 0 });

  const avgAttendance = Math.round(averages.attendance / processedData.length);
  const avgProductivity = Math.round(averages.productivity / processedData.length);
  const avgSatisfaction = Math.round(averages.satisfaction / processedData.length);

  // Measure container with responsive adjustments
  useEffect(() => {
    const measureDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          // Responsive height adjustment
          const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
          setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
          setIsReady(true);
        }
      }
    };

    // Initial measurement
    measureDimensions();

    // Debounced resize handler
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(measureDimensions, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
          setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
          setIsReady(true);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`
        p-3 sm:p-4 rounded-xl shadow-sm border h-full w-full
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
      `}
      style={{ 
        minHeight: window?.innerWidth < 640 ? '450px' : '500px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h2 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Department Performance
      </h2>
      
      {/* Chart container - takes remaining height */}
      <div className="flex-grow w-full" style={{ minHeight: 0 }}>
        {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
          <PerformanceRadarChart 
            data={processedData} 
            darkMode={darkMode}
            width={chartDimensions.width}
            height={chartDimensions.height}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-b-2 border-blue-500 mx-auto mb-2 sm:mb-3"></div>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Loading chart...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Performance Summary - responsive grid */}
      <div className="mt-2 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-2 text-center flex-shrink-0">
        <div className="p-1 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Attendance</p>
          <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {avgAttendance}%
          </p>
        </div>
        <div className="p-1 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
          <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Productivity</p>
          <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {avgProductivity}%
          </p>
        </div>
        <div className="p-1 sm:p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
          <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Satisfaction</p>
          <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {avgSatisfaction}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChartContainer;