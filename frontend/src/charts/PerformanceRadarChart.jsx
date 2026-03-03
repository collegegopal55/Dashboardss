
// import React from 'react';
// import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

// const PerformanceRadarChart = ({ data = [], darkMode = false }) => {
//   // Default data if none provided
//   const defaultData = [
//     { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
//     { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
//     { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
//     { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
//     { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
//   ];

//   // Ensure data is in correct format
//   const chartData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     department: item.department || 'Unknown',
//     attendance: Number(item.attendance || 0),
//     productivity: Number(item.productivity || 0),
//     satisfaction: Number(item.satisfaction || 0)
//   }));

//   const colors = {
//     text: darkMode ? '#f3f4f6' : '#111827',
//     textSecondary: darkMode ? '#9ca3af' : '#6b7280',
//     grid: darkMode ? '#4b5563' : '#e5e7eb',
//     attendance: '#3B82F6',
//     productivity: '#10B981',
//     satisfaction: '#F59E0B'
//   };

//   // Custom tooltip
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className={`
//           p-3 rounded-lg shadow-lg border
//           ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
//         `}>
//           <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {payload[0].payload.department}
//           </p>
//           {payload.map((entry, index) => (
//             <div key={index} className="flex items-center justify-between gap-4 text-xs">
//               <span style={{ color: entry.color }}>{entry.name}:</span>
//               <span className="font-bold">{entry.value}%</span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <RadarChart outerRadius={150} data={chartData}>
//         <PolarGrid stroke={colors.grid} />
//         <PolarAngleAxis 
//           dataKey="department" 
//           tick={{ fill: colors.text, fontSize: 12 }}
//         />
//         <PolarRadiusAxis 
//           angle={30} 
//           domain={[0, 100]} 
//           tick={{ fill: colors.textSecondary, fontSize: 10 }}
//         />
//         <Radar 
//           name="Attendance" 
//           dataKey="attendance" 
//           stroke={colors.attendance} 
//           fill={colors.attendance} 
//           fillOpacity={0.3} 
//         />
//         <Radar 
//           name="Productivity" 
//           dataKey="productivity" 
//           stroke={colors.productivity} 
//           fill={colors.productivity} 
//           fillOpacity={0.3} 
//         />
//         <Radar 
//           name="Satisfaction" 
//           dataKey="satisfaction" 
//           stroke={colors.satisfaction} 
//           fill={colors.satisfaction} 
//           fillOpacity={0.3} 
//         />
//         <Legend 
//           wrapperStyle={{ 
//             color: colors.text,
//             paddingTop: '20px'
//           }} 
//         />
//         <Tooltip content={<CustomTooltip />} />
//       </RadarChart>
//     </ResponsiveContainer>
//   );
// };

// export default PerformanceRadarChart;


import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceRadarChart = ({ data = [], darkMode = false }) => {
  // Default data if none provided
  const defaultData = [
    { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
    { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
    { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
    { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
    { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
  ];

  // Ensure data is in correct format
  const chartData = (data && data.length > 0 ? data : defaultData).map(item => ({
    department: item.department || 'Unknown',
    attendance: Number(item.attendance || 0),
    productivity: Number(item.productivity || 0),
    satisfaction: Number(item.satisfaction || 0)
  }));

  const colors = {
    text: darkMode ? '#f3f4f6' : '#111827',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    grid: darkMode ? '#4b5563' : '#e5e7eb',
    attendance: '#3B82F6',
    productivity: '#10B981',
    satisfaction: '#F59E0B'
  };

  // Responsive outer radius based on container size
  const getOuterRadius = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 100; // mobile
      if (width < 1024) return 130; // tablet
      return 150; // desktop
    }
    return 150;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          p-2 sm:p-3 rounded-lg shadow-lg border text-xs sm:text-sm
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <p className={`font-medium mb-1 sm:mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {payload[0].payload.department}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-2 sm:gap-4">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-bold">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart outerRadius={getOuterRadius()} data={chartData}>
        <PolarGrid stroke={colors.grid} />
        <PolarAngleAxis 
          dataKey="department" 
          tick={{ 
            fill: colors.text, 
            fontSize: window?.innerWidth < 640 ? 10 : 12 
          }}
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={{ 
            fill: colors.textSecondary, 
            fontSize: window?.innerWidth < 640 ? 8 : 10 
          }}
        />
        <Radar 
          name="Attendance" 
          dataKey="attendance" 
          stroke={colors.attendance} 
          fill={colors.attendance} 
          fillOpacity={0.3} 
        />
        <Radar 
          name="Productivity" 
          dataKey="productivity" 
          stroke={colors.productivity} 
          fill={colors.productivity} 
          fillOpacity={0.3} 
        />
        <Radar 
          name="Satisfaction" 
          dataKey="satisfaction" 
          stroke={colors.satisfaction} 
          fill={colors.satisfaction} 
          fillOpacity={0.3} 
        />
        <Legend 
          wrapperStyle={{ 
            color: colors.text,
            paddingTop: '10px',
            fontSize: window?.innerWidth < 640 ? '10px' : '12px'
          }} 
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceRadarChart;