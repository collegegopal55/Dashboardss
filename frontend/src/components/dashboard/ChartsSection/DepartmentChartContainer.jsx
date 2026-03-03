
// import React from 'react';
// import DepartmentPieChart from '../../../charts/DepartmentPieChart';
// import { useTheme } from '../../../context/ThemeContext';

// const DepartmentChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();

//   // Default data with proper format
//   const defaultData = [
//     { name: 'Engineering', value: 345, color: '#3B82F6' },
//     { name: 'Sales', value: 234, color: '#10B981' },
//     { name: 'Marketing', value: 156, color: '#F59E0B' },
//     { name: 'HR', value: 89, color: '#8B5CF6' },
//     { name: 'Finance', value: 67, color: '#EC4899' }
//   ];

//   // Process data to ensure correct format
//   let processedData = data;
  
//   if (data && data.length > 0) {
//     processedData = data.map(item => ({
//       name: item.name || item.department || 'Unknown',
//       value: Number(item.value || item.employees || item.count || 0),
//       color: item.color || getDepartmentColor(item.name || item.department)
//     })).filter(item => item.value > 0);
//   }

//   // If no valid data after processing, use default
//   if (processedData.length === 0) {
//     processedData = data;
//   }

//   // Simple color function
//   function getDepartmentColor(name) {
//     const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
//     const index = (name?.length || 0) % colors.length;
//     return colors[index];
//   }

//   return (
//     <div className={`
//       p-4 rounded-xl shadow-sm border h-full w-full
//       ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//     `}>
//       <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Department Distribution
//       </h2>
      
//       {/* Chart - Use processedData instead of raw data */}
//       <div style={{ width: '100%', height: '300px' }}>
//         <DepartmentPieChart data={processedData} darkMode={darkMode} />
//       </div>

//       {/* Simple stats - Use processedData */}
//       <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
//         {processedData.slice(0, 5).map((dept) => (
//           <div key={dept.name} className="text-center">
//             <div 
//               className="w-3 h-3 rounded-full mx-auto mb-1"
//               style={{ backgroundColor: dept.color }}
//             />
//             <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               {dept.name}
//             </p>
//             <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {dept.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DepartmentChartContainer;

// import React, { useState, useEffect, useRef } from 'react';
// import DepartmentPieChart from '../../../charts/DepartmentPieChart';
// import { useTheme } from '../../../context/ThemeContext';

// const DepartmentChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
//   const [isReady, setIsReady] = useState(false);
//   const containerRef = useRef(null);

//   // Default data with proper format
//   const defaultData = [
//     { name: 'Engineering', value: 345, color: '#3B82F6' },
//     { name: 'Sales', value: 234, color: '#10B981' },
//     { name: 'Marketing', value: 156, color: '#F59E0B' },
//     { name: 'HR', value: 89, color: '#8B5CF6' },
//     { name: 'Finance', value: 67, color: '#EC4899' }
//   ];

//   // Process data to ensure correct format
//   const getDepartmentColor = (name) => {
//     const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
//     const index = (name?.length || 0) % colors.length;
//     return colors[index];
//   };

//   const processedData = (data && data.length > 0 ? data : defaultData)
//     .map(item => ({
//       name: item.name || item.department || 'Unknown',
//       value: Number(item.value || item.employees || item.count || 0),
//       color: item.color || getDepartmentColor(item.name || item.department)
//     }))
//     .filter(item => item.value > 0);

//   // If no valid data after processing, use default
//   const finalData = processedData.length > 0 ? processedData : defaultData;

//   // Measure container on mount and resize
//   useEffect(() => {
//     const measureDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
        
//         // Only update if dimensions are valid
//         if (width > 0 && height > 0) {
//           setChartDimensions({ width, height: height - 140 }); // Subtract header and stats height
//           setIsReady(true);
//         }
//       }
//     };

//     // Initial measurement
//     measureDimensions();

//     // Add resize listener with debounce
//     let timeoutId;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         measureDimensions();
//       }, 100);
//     };

//     window.addEventListener('resize', handleResize);

//     // Create ResizeObserver for more accurate dimension tracking
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
//         minHeight: '400px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Department Distribution
//       </h2>
      
//       {/* Chart container - takes remaining height */}
//       <div className="flex-grow w-full" style={{ minHeight: 0 }}>
//         {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
//           <DepartmentPieChart 
//             data={finalData} 
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

//       {/* Stats - fixed height */}
//       <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 flex-shrink-0">
//         {finalData.slice(0, 5).map((dept) => (
//           <div key={dept.name} className="text-center">
//             <div 
//               className="w-3 h-3 rounded-full mx-auto mb-1"
//               style={{ backgroundColor: dept.color }}
//             />
//             <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               {dept.name}
//             </p>
//             <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               {dept.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DepartmentChartContainer;


import React, { useState, useEffect, useRef } from 'react';
import DepartmentPieChart from '../../../charts/DepartmentPieChart';
import { useTheme } from '../../../context/ThemeContext';

const DepartmentChartContainer = ({ data = [] }) => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);

  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0
  });

  const [isReady, setIsReady] = useState(false);

  const defaultData = [
    { name: 'Engineering', value: 345, color: '#3B82F6' },
    { name: 'Sales', value: 234, color: '#10B981' },
    { name: 'Marketing', value: 156, color: '#F59E0B' },
    { name: 'HR', value: 89, color: '#8B5CF6' },
    { name: 'Finance', value: 67, color: '#EC4899' }
  ];

  const getDepartmentColor = (name) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };

  const processedData = (data?.length ? data : defaultData)
    .map(item => ({
      name: item.name || item.department || 'Unknown',
      value: Number(item.value || item.employees || item.count || 0),
      color: item.color || getDepartmentColor(item.name || item.department)
    }))
    .filter(item => item.value > 0);

  const finalData = processedData.length ? processedData : defaultData;

  useEffect(() => {
    if (!containerRef.current) return;

    let frame;
    let timeoutId;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;

      if (width <= 0 || height <= 0) return;

      // Calculate available height for chart based on screen size
      const isMobile = width < 640;
      const headerHeight = 60; // Title height
      const legendHeight = isMobile ? 100 : 80; // More space for legend on mobile
      const padding = 32; // Total padding
      const availableHeight = height - headerHeight - legendHeight - padding;
      
      // Ensure minimum height for chart
      const newHeight = Math.max(200, Math.min(availableHeight, height * 0.6));

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

  // Determine grid columns based on number of items and screen size
  const getGridClass = () => {
    const count = finalData.length;
    if (count <= 3) return 'grid-cols-3';
    if (count <= 4) return 'grid-cols-4';
    return 'grid-cols-2 sm:grid-cols-5';
  };

  return (
    <div
      ref={containerRef}
      className={`p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
      ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
      style={{
        minHeight: '320px', // Reduced from 380px
        maxHeight: '100%', // Prevent infinite expansion
        overflow: 'hidden' // Prevent content overflow
      }}
    >
      <h2 className={`text-lg font-semibold mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Department Distribution
      </h2>

      <div className="flex-1 min-h-0 w-full">
        {isReady && chartDimensions.width > 50 && chartDimensions.height > 50 ? (
          <DepartmentPieChart
            data={finalData}
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

      {/* Legend section with responsive layout */}
      <div className={`mt-4 grid ${getGridClass()} gap-2 flex-shrink-0`}>
        {finalData.slice(0, 5).map((dept) => (
          <div key={dept.name} className="text-center min-w-0">
            <div
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: dept.color }}
            />
            <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {dept.name}
            </p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {dept.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChartContainer;