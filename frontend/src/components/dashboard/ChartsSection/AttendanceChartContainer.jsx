
// import React, { useState, useEffect, useRef } from 'react';
// import AttendanceChart from '../../../charts/AttendanceChart';
// import { useTheme } from '../../../context/ThemeContext';

// const AttendanceChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
//   const [isReady, setIsReady] = useState(false);
//   const containerRef = useRef(null);
//   const chartRef = useRef(null);

//   // Default data if no data provided
//   const defaultData = [
//     { day: 'Mon', present: 85, late: 8, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Tue', present: 82, late: 10, absent: 6, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Wed', present: 88, late: 5, absent: 4, leave: 3, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Thu', present: 79, late: 12, absent: 7, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Fri', present: 84, late: 9, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Sat', present: 45, late: 5, absent: 10, leave: 5, tour: 0, holiday: 0, weekend: 35 },
//     { day: 'Sun', present: 20, late: 2, absent: 8, leave: 5, tour: 0, holiday: 0, weekend: 65 }
//   ];

//   // Ensure data has valid values
//   const safeData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     day: item.day || 'Unknown',
//     present: Number(item.present) || 0,
//     late: Number(item.late) || 0,
//     absent: Number(item.absent) || 0,
//     leave: Number(item.leave) || 0,
//     tour: Number(item.tour) || 0,
//     holiday: Number(item.holiday) || 0,
//     weekend: Number(item.weekend) || 0
//   }));

//   // Measure container on mount and resize
//   useEffect(() => {
//     const measureDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
        
//         // Only update if dimensions are valid
//         if (width > 0 && height > 0) {
//           setChartDimensions({ width, height });
          
//           // Add a small delay before setting isReady to ensure DOM is fully rendered
//           setTimeout(() => {
//             setIsReady(true);
//           }, 100);
//         }
//       }
//     };

//     // Initial measurement with delay to ensure container is rendered
//     const timeoutId = setTimeout(measureDimensions, 200);

//     // Add resize listener
//     window.addEventListener('resize', measureDimensions);

//     // Create ResizeObserver for more accurate dimension tracking
//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         const { width, height } = entry.contentRect;
//         if (width > 0 && height > 0) {
//           setChartDimensions({ width, height });
//           setIsReady(true);
//         }
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', measureDimensions);
//       resizeObserver.disconnect();
//     };
//   }, []);

//   return (
//     <div 
//       ref={containerRef}
//       className={`
//         p-4 rounded-xl shadow-sm border
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//       style={{ 
//         height: '450px', 
//         minHeight: '450px',
//         width: '100%',
//         position: 'relative',
//         overflow: 'hidden'
//       }}
//     >
//       <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Last 7 Days Attendance
//       </h2>
      
//       <div 
//         ref={chartRef}
//         className="w-full" 
//         style={{ 
//           height: 'calc(100% - 60px)', 
//           minHeight: '350px',
//           position: 'relative'
//         }}
//       >
//         {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
//           <AttendanceChart data={safeData} darkMode={darkMode} />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
//               <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Loading chart...
//               </p>
//               <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
//                 {chartDimensions.width > 0 ? 'Rendering...' : 'Preparing container...'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AttendanceChartContainer;


// import React, { useState, useEffect, useRef } from 'react';
// import AttendanceChart from '../../../charts/AttendanceChart';
// import { useTheme } from '../../../context/ThemeContext';

// const AttendanceChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
//   const [isReady, setIsReady] = useState(false);
//   const containerRef = useRef(null);
  
//   // Default data if no data provided
//   const defaultData = [
//     { day: 'Mon', present: 85, late: 8, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Tue', present: 82, late: 10, absent: 6, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Wed', present: 88, late: 5, absent: 4, leave: 3, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Thu', present: 79, late: 12, absent: 7, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Fri', present: 84, late: 9, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
//     { day: 'Sat', present: 45, late: 5, absent: 10, leave: 5, tour: 0, holiday: 0, weekend: 35 },
//     { day: 'Sun', present: 20, late: 2, absent: 8, leave: 5, tour: 0, holiday: 0, weekend: 65 }
//   ];

//   // Ensure data has valid values
//   const safeData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     day: item.day || 'Unknown',
//     present: Number(item.present) || 0,
//     late: Number(item.late) || 0,
//     absent: Number(item.absent) || 0,
//     leave: Number(item.leave) || 0,
//     tour: Number(item.tour) || 0,
//     holiday: Number(item.holiday) || 0,
//     weekend: Number(item.weekend) || 0
//   }));

//   useEffect(() => {
//   if (!containerRef.current) return;

//   const observer = new ResizeObserver(entries => {
//     const { width, height } = entries[0].contentRect;

//     if (width > 0 && height > 0) {
//       const newHeight = height - 80;

//       setChartDimensions(prev => {
//         if (prev.width === width && prev.height === newHeight) return prev;
//         return { width, height: newHeight };
//       });

//       setIsReady(true);
//     }
//   });

//   observer.observe(containerRef.current);

//   return () => observer.disconnect();
// }, []);

  
//   return (
//     <div 
//       ref={containerRef}
//       className={`
//         p-4 rounded-xl shadow-sm border h-full w-full
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//       style={{ 
//         minHeight: '400px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Last 7 Days Attendance
//       </h2>
      
//       {/* Chart container - takes remaining height */}
//       <div className="flex-grow w-full" style={{ minHeight: 0 }}>
//         {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
//           <AttendanceChart 
//             data={safeData} 
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
//     </div>
//   );
// };

// export default AttendanceChartContainer;


import React, { useState, useEffect, useRef } from 'react';
import AttendanceChart from '../../../charts/AttendanceChart';
import { useTheme } from '../../../context/ThemeContext';

const AttendanceChartContainer = ({ data = [] }) => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);

  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0
  });

  const [isReady, setIsReady] = useState(false);

  // fallback data
  const defaultData = [
    { day: 'Mon', present: 85, late: 8, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
    { day: 'Tue', present: 82, late: 10, absent: 6, leave: 2, tour: 0, holiday: 0, weekend: 0 },
    { day: 'Wed', present: 88, late: 5, absent: 4, leave: 3, tour: 0, holiday: 0, weekend: 0 },
    { day: 'Thu', present: 79, late: 12, absent: 7, leave: 2, tour: 0, holiday: 0, weekend: 0 },
    { day: 'Fri', present: 84, late: 9, absent: 5, leave: 2, tour: 0, holiday: 0, weekend: 0 },
    { day: 'Sat', present: 45, late: 5, absent: 10, leave: 5, tour: 0, holiday: 0, weekend: 35 },
    { day: 'Sun', present: 20, late: 2, absent: 8, leave: 5, tour: 0, holiday: 0, weekend: 65 }
  ];

  const safeData = (data?.length ? data : defaultData).map(item => ({
    day: item.day || 'Unknown',
    present: Number(item.present) || 0,
    late: Number(item.late) || 0,
    absent: Number(item.absent) || 0,
    leave: Number(item.leave) || 0,
    tour: Number(item.tour) || 0,
    holiday: Number(item.holiday) || 0,
    weekend: Number(item.weekend) || 0
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    let frame;
    let timeoutId;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;

      if (width <= 0 || height <= 0) return;

      // Calculate available height for chart
      const headerHeight = 60; // Title height
      const padding = 32; // Total padding
      const availableHeight = height - headerHeight - padding;
      
      // Ensure minimum height for chart
      const newHeight = Math.max(200, Math.min(availableHeight, height * 0.7));

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setChartDimensions(prev => {
          if (prev.width === width && prev.height === newHeight) {
            return prev;
          }
          return { width, height: newHeight };
        });

        // Debounce the ready state
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsReady(true);
        }, 100);
      });
    });

    observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
      style={{
        minHeight: '320px', // Match with DepartmentChartContainer
        maxHeight: '100%',
        overflow: 'hidden'
      }}
    >
      <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Last 7 Days Attendance
      </h2>

      <div className="flex-1 min-h-0 w-full">
        {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
          <AttendanceChart
            data={safeData}
            darkMode={darkMode}
            width={chartDimensions.width}
            height={chartDimensions.height}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Loading chart...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceChartContainer;