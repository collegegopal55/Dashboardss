

// import React, { useState, useMemo, useCallback } from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';

// const TrendComposedChart = ({ data, darkMode = false }) => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Sample data if no data provided
//   const sampleData = useMemo(() => [
//     { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
//     { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
//     { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
//     { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
//     { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
//     { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
//     { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 }
//   ], []);

//   // Color palette
//   const monthColors = useMemo(() => ({
//     Jan: '#3B82F6', Feb: '#EF4444', Mar: '#F59E0B',
//     Apr: '#10B981', May: '#8B5CF6', Jun: '#EC4899',
//     Jul: '#34D399', Aug: '#FBBF24', Sep: '#60A5FA',
//     Oct: '#FB923C', Nov: '#A78BFA', Dec: '#F472B6'
//   }), []);

//   const categoryColors = useMemo(() => ({
//     attendance: '#6366F1',
//     overtime: '#F59E0B',
//     late: '#EF4444'
//   }), []);

//   // Process data
//   const chartData = useMemo(() => {
//     if (!data || !Array.isArray(data) || data.length === 0) {
//       return sampleData;
//     }
//     return data;
//   }, [data, sampleData]);

//   // Prepare pie data
//   const { innerData, outerData, total, monthTotals } = useMemo(() => {
//     const categories = ['attendance', 'overtime', 'late'];
    
//     // Calculate category totals
//     const categoryTotals = categories.map(cat => ({
//       name: cat.charAt(0).toUpperCase() + cat.slice(1),
//       key: cat,
//       value: chartData.reduce((sum, item) => sum + (Number(item[cat]) || 0), 0),
//       color: categoryColors[cat]
//     }));

//     const grandTotal = categoryTotals.reduce((sum, cat) => sum + cat.value, 0) || 1;

//     // Calculate month totals
//     const monthTotals = chartData.map(item => ({
//       month: item.month,
//       total: (Number(item.attendance) || 0) + (Number(item.overtime) || 0) + (Number(item.late) || 0),
//       color: monthColors[item.month] || '#6B7280'
//     }));

//     // Create outer ring data (monthly breakdown)
//     const outerData = chartData.flatMap(item => 
//       categories.map(cat => ({
//         name: `${item.month} - ${cat}`,
//         value: Number(item[cat]) || 0,
//         category: cat,
//         month: item.month,
//         color: monthColors[item.month] || categoryColors[cat],
//         parentCategory: cat,
//         monthColor: monthColors[item.month] || categoryColors[cat]
//       }))
//     ).filter(d => d.value > 0);

//     return {
//       innerData: categoryTotals,
//       outerData,
//       total: grandTotal,
//       monthTotals
//     };
//   }, [chartData, monthColors, categoryColors]);

//   // Filter outer data based on selected category
//   const filteredOuterData = useMemo(() => {
//     if (!selectedCategory) return outerData;
//     return outerData.filter(d => d.parentCategory === selectedCategory);
//   }, [selectedCategory, outerData]);

//   // Active shape component
//   const renderActiveShape = useCallback((props) => {
//     const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
//     return (
//       <g>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius - 1}
//           outerRadius={outerRadius + 3}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//           opacity={0.3}
//         />
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={outerRadius}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//           stroke={darkMode ? '#374151' : '#FFFFFF'}
//           strokeWidth={2}
//         />
//       </g>
//     );
//   }, [darkMode]);

//   // Custom tooltip
//   const CustomTooltip = useCallback(({ active, payload }) => {
//     if (!active || !payload || !payload.length) return null;
    
//     const data = payload[0].payload;
//     return (
//       <div className={`p-3 rounded-xl shadow-2xl border-2 min-w-[150px] ${
//         darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//       }`}>
//         <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           {data.month || data.name}
//         </p>
//         <p className="text-sm mt-1">
//           Value: <span className="font-bold">{data.value}</span>
//         </p>
//         {data.category && (
//           <p className="text-xs mt-1 opacity-75">Category: {data.category}</p>
//         )}
//       </div>
//     );
//   }, [darkMode]);

//   return (
//     <div className="w-full h-full flex flex-col">
//       {/* Month summary cards */}
//       <div className="flex-shrink-0 overflow-x-auto pb-2 px-2">
//         <div className="flex gap-2">
//           {monthTotals.map((month) => (
//             <div
//               key={month.month}
//               className="flex-shrink-0 px-3 py-1.5 rounded-lg border-2 shadow-md"
//               style={{
//                 borderColor: month.color + '40',
//                 backgroundColor: darkMode ? '#1F2937' : 'white'
//               }}
//             >
//               <div className="flex items-center gap-2">
//                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: month.color }} />
//                 <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                   {month.month}
//                 </span>
//               </div>
//               <div className="text-right">
//                 <span className="font-bold" style={{ color: month.color }}>{month.total}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="w-full relative" style={{ height: 260 }}>
//        <ResponsiveContainer width="100%" height={260}>
//           <PieChart>
//             {/* Outer ring */}
//             <Pie
//               activeIndex={activeIndex}
//               activeShape={renderActiveShape}
//               data={filteredOuterData}
//               cx="50%"
//               cy="50%"
//               innerRadius={90}
//               outerRadius={140}
//               dataKey="value"
//               onMouseEnter={(_, index) => setActiveIndex(index)}
//               onMouseLeave={() => setActiveIndex(null)}
//             >
//               {filteredOuterData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.color}
//                   stroke={darkMode ? '#374151' : '#FFFFFF'}
//                   strokeWidth={2}
//                   style={{
//                     opacity: selectedCategory && entry.parentCategory !== selectedCategory ? 0.3 : 1,
//                     transition: 'all 0.3s ease'
//                   }}
//                 />
//               ))}
//             </Pie>

//             {/* Inner ring */}
//             <Pie
//               data={innerData}
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={82}
//               dataKey="value"
//             >
//               {innerData.map((entry, index) => (
//                 <Cell
//                   key={`inner-${index}`}
//                   fill={entry.color}
//                   stroke={darkMode ? '#374151' : '#FFFFFF'}
//                   strokeWidth={3}
//                   style={{
//                     opacity: selectedCategory && entry.key !== selectedCategory ? 0.4 : 1,
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}
//                   onClick={() => setSelectedCategory(
//                     selectedCategory === entry.key ? null : entry.key
//                   )}
//                 />
//               ))}
//             </Pie>

//             <Tooltip content={CustomTooltip} />
//           </PieChart>
//         </ResponsiveContainer>

//         {/* Center text */}
//         <div className={`
//           absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//           w-20 h-20 rounded-full flex flex-col items-center justify-center
//           backdrop-blur-md z-10 pointer-events-none
//           ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}
//           shadow-2xl border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}
//         `}>
//           <span className="text-xs font-medium opacity-75">Total</span>
//           <span className="text-lg font-bold">{Math.round(total)}</span>
//         </div>
//       </div>

//       {/* Category legend */}
//       <div className="flex-shrink-0 grid grid-cols-3 gap-2 px-3 py-2 border-t dark:border-gray-800">
//         {innerData.map((cat) => (
//           <div
//             key={cat.key}
//             className={`
//               text-center px-2 py-1.5 rounded-lg cursor-pointer transition-all
//               ${selectedCategory === cat.key 
//                 ? (darkMode ? 'bg-gray-800 shadow-lg' : 'bg-gray-100 shadow-md') 
//                 : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
//               }
//             `}
//             onClick={() => setSelectedCategory(
//               selectedCategory === cat.key ? null : cat.key
//             )}
//             style={{ borderLeft: `3px solid ${cat.color}` }}
//           >
//             <div className="text-xs font-medium truncate" style={{ color: cat.color }}>
//               {cat.name}
//             </div>
//             <div className="text-sm font-bold dark:text-white">
//               {cat.value}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendComposedChart;

import React, { useState, useMemo, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from 'recharts';

const TrendComposedChart = ({ data, darkMode = false }) => {
  const [dimensions, setDimensions] = useState({ width: 0 });
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const [zoomDomain, setZoomDomain] = useState(null);

  // Sample data if no data provided
  const sampleData = useMemo(() => [
    { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
    { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
    { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
    { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
    { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
    { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
    { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 },
    { month: 'Aug', attendance: 91, overtime: 44, late: 13, trend: 89 },
    { month: 'Sep', attendance: 87, overtime: 56, late: 19, trend: 84 },
    { month: 'Oct', attendance: 94, overtime: 41, late: 9, trend: 91 },
    { month: 'Nov', attendance: 88, overtime: 53, late: 17, trend: 86 },
    { month: 'Dec', attendance: 90, overtime: 47, late: 15, trend: 88 }
  ], []);

  // Chart data
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return sampleData;
    }
    return data;
  }, [data, sampleData]);

  // Color palette for 3D effect
  const colors = useMemo(() => ({
    attendance: { 
      main: '#6366F1',
      gradient: ['#8183f3', '#4f51e5'],
      stroke: '#4f51e5'
    },
    overtime: { 
      main: '#F59E0B',
      gradient: ['#f7b044', '#e08c0b'],
      stroke: '#e08c0b'
    },
    late: { 
      main: '#EF4444',
      gradient: ['#f26767', '#dc2626'],
      stroke: '#dc2626'
    },
    trend: { 
      main: '#8B5CF6',
      gradient: ['#a27bf8', '#7b42f5'],
      stroke: '#7b42f5'
    }
  }), []);

  // Calculate statistics
  const stats = useMemo(() => {
    const metrics = ['attendance', 'overtime', 'late', 'trend'];
    const result = {};
    
    metrics.forEach(metric => {
      const values = chartData.map(d => d[metric]).filter(v => !isNaN(v));
      result[metric] = {
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        max: Math.max(...values),
        min: Math.min(...values),
        total: values.reduce((a, b) => a + b, 0)
      };
    });
    
    return result;
  }, [chartData]);

  // Toggle series visibility
  const toggleSeries = (series) => {
    const newHidden = new Set(hiddenSeries);
    if (newHidden.has(series)) {
      newHidden.delete(series);
    } else {
      newHidden.add(series);
    }
    setHiddenSeries(newHidden);
  };

  // Responsive settings
  const getChartSettings = () => {
    if (dimensions.width < 640) {
      return {
        fontSize: 10,
        margin: { top: 10, right: 10, left: 0, bottom: 30 },
        dotSize: false,
        strokeWidth: 2
      };
    } else if (dimensions.width < 1024) {
      return {
        fontSize: 11,
        margin: { top: 20, right: 20, left: 0, bottom: 30 },
        dotSize: true,
        strokeWidth: 2
      };
    } else {
      return {
        fontSize: 12,
        margin: { top: 20, right: 30, left: 0, bottom: 30 },
        dotSize: true,
        strokeWidth: 3
      };
    }
  };

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = getChartSettings();

  // Custom tooltip with 3D effect
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className={`
        p-2 sm:p-3 rounded-xl shadow-2xl border-2 min-w-[160px] sm:min-w-[200px]
        transform transition-all duration-200 hover:scale-105
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <p className={`font-bold text-sm sm:text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm transform rotate-45 shadow-lg"
                style={{ backgroundColor: entry.color }}
              />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {entry.name}:
              </span>
            </div>
            <span className="font-bold text-sm sm:text-base" style={{ color: entry.color }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Custom legend with 3D effect
  const renderLegend = () => {
    const series = [
      { key: 'attendance', name: 'Attendance', color: colors.attendance.main },
      { key: 'overtime', name: 'Overtime', color: colors.overtime.main },
      { key: 'late', name: 'Late', color: colors.late.main },
      { key: 'trend', name: 'Trend', color: colors.trend.main }
    ];

    return (
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 py-3">
        {series.map((item) => (
          <button
            key={item.key}
            onClick={() => toggleSeries(item.key)}
            className={`
              flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 
              rounded-lg transition-all duration-300
              ${hiddenSeries.has(item.key) 
                ? 'opacity-40 grayscale' 
                : 'hover:scale-105 hover:shadow-lg'
              }
              ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            `}
            style={{
              borderLeft: `4px solid ${item.color}`,
              boxShadow: hiddenSeries.has(item.key) 
                ? 'none' 
                : darkMode 
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 transform rotate-45"
              style={{ backgroundColor: item.color }}
            />
            <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.name}
            </span>
            <span className={`text-xs font-bold ml-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              ({Math.round(stats[item.key]?.avg || 0)})
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2 p-2 sm:p-3 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/20 rounded-lg">
        {Object.entries(stats).map(([key, stat]) => (
          <div
            key={key}
            className={`
              p-1.5 sm:p-2 rounded-lg text-center
              transform transition-all duration-300 hover:-translate-y-1
              ${darkMode ? 'bg-gray-800/50' : 'bg-white'}
            `}
            style={{
              borderLeft: `4px solid ${colors[key]?.main}`,
              boxShadow: darkMode 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' 
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className={`text-[8px] sm:text-xs uppercase font-bold`} style={{ color: colors[key]?.main }}>
              {key}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-center gap-0 sm:gap-1">
              <span className="text-xs sm:text-sm font-bold dark:text-white">
                {Math.round(stat.avg)}
              </span>
              <span className="text-[8px] sm:text-xs opacity-60 dark:text-gray-400">
                avg
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="flex-1 min-h-[200px] sm:min-h-[390px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={settings.margin}
            onMouseLeave={() => setZoomDomain(null)}
          >
            <defs>
              {/* 3D Gradient Definitions */}
              {Object.entries(colors).map(([key, color]) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color.gradient[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color.gradient[1]} stopOpacity={0.2}/>
                </linearGradient>
              ))}
              
              {/* Pattern for 3D effect */}
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={darkMode ? '#374151' : '#E5E7EB'}
              opacity={0.5}
            />
            
            <XAxis 
              dataKey="month" 
              tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563', fontSize: settings.fontSize }}
              axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              interval={dimensions.width < 640 ? 1 : 0}
            />
            
            <YAxis 
              tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563', fontSize: settings.fontSize }}
              axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              domain={[0, 'auto']}
            />
            
            <Tooltip content={CustomTooltip} />
            
            {/* 3D Areas with stacking effect */}
            {!hiddenSeries.has('attendance') && (
              <Area
                type="monotone"
                dataKey="attendance"
                name="Attendance"
                stroke={colors.attendance.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-attendance)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="1"
              />
            )}
            
            {!hiddenSeries.has('overtime') && (
              <Area
                type="monotone"
                dataKey="overtime"
                name="Overtime"
                stroke={colors.overtime.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-overtime)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="2"
              />
            )}
            
            {!hiddenSeries.has('late') && (
              <Area
                type="monotone"
                dataKey="late"
                name="Late"
                stroke={colors.late.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-late)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="3"
              />
            )}
            
            {!hiddenSeries.has('trend') && (
              <Area
                type="monotone"
                dataKey="trend"
                name="Trend"
                stroke={colors.trend.stroke}
                strokeWidth={settings.strokeWidth + 1}
                fill={`url(#gradient-trend)`}
                fillOpacity={0.6}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                strokeDasharray="5 5"
              />
            )}

            {/* Reference lines for averages */}
            {!hiddenSeries.has('attendance') && (
              <ReferenceLine 
                y={stats.attendance.avg} 
                stroke={colors.attendance.main}
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{ 
                  value: 'Avg', 
                  position: 'right',
                  fill: colors.attendance.main,
                  fontSize: settings.fontSize
                }}
              />
            )}

            {/* Brush for zooming */}
            {dimensions.width > 768 && (
              <Brush
                dataKey="month"
                height={30}
                stroke={darkMode ? '#4B5563' : '#9CA3AF'}
                fill={darkMode ? '#1F2937' : '#F3F4F6'}
                travellerWidth={10}
                gap={5}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {renderLegend()}

   
    </div>
  );
};

export default TrendComposedChart;