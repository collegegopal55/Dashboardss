// // components/charts/AttendanceChart.jsx
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const AttendanceChart = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="day" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Bar dataKey="P" fill="#EF4444" name="Present" />
//         <Bar dataKey="LP" fill="#10B981" name="Late Present" />
//         <Bar dataKey="A" fill="#3B82F6" name="Absent" />
//         <Bar dataKey="L" fill="#8B5CF6" name="Leave" />
//         <Bar dataKey="T" fill="#EC4899" name="Tour" />
//         <Bar dataKey="H" fill="#14B8A6" name="Holiday" />
//         <Bar dataKey="WH" fill="#6B7280" name="Weekend" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default AttendanceChart;




// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const AttendanceChart = ({ data, darkMode }) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data} layout="horizontal">
//         <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
//         <XAxis 
//           dataKey="day" 
//           stroke={darkMode ? '#9CA3AF' : '#4B5563'}
//           tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563' }}
//           angle={-45}
//           textAnchor="end"
//           height={60}
//         />
//         <YAxis 
//           stroke={darkMode ? '#9CA3AF' : '#4B5563'}
//           tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563' }}
//         />
//         <Tooltip 
//           contentStyle={{ 
//             backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//             borderColor: darkMode ? '#374151' : '#E5E7EB',
//             color: darkMode ? '#FFFFFF' : '#000000'
//           }}
//         />
//         <Legend 
//           wrapperStyle={{ 
//             color: darkMode ? '#FFFFFF' : '#000000',
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center'
//           }} 
//         />
//         <Bar dataKey="P" fill="#EF4444" name="Present" />
//         <Bar dataKey="LP" fill="#10B981" name="Late Present" />
//         <Bar dataKey="A" fill="#3B82F6" name="Absent" />
//         <Bar dataKey="L" fill="#8B5CF6" name="Leave" />
//         <Bar dataKey="T" fill="#EC4899" name="Tour" />
//         <Bar dataKey="H" fill="#14B8A6" name="Holiday" />
//         <Bar dataKey="WH" fill="#6B7280" name="Weekend" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default AttendanceChart;

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const AttendanceChart = ({ data, darkMode }) => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart data={data} layout="vertical" margin={{ left: 60, right: 20, top: 20, bottom: 20 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
//         <XAxis 
//           type="number"
//           stroke={darkMode ? '#9CA3AF' : '#4B5563'}
//           tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563' }}
//         />
//         <YAxis 
//           type="category"
//           dataKey="day"
//           stroke={darkMode ? '#9CA3AF' : '#4B5563'}
//           tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563' }}
//           width={80}
//         />
//         <Tooltip 
//           contentStyle={{ 
//             backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//             borderColor: darkMode ? '#374151' : '#E5E7EB',
//             color: darkMode ? '#FFFFFF' : '#000000'
//           }}
//         />
//         <Legend 
//           wrapperStyle={{ 
//             color: darkMode ? '#FFFFFF' : '#000000',
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center'
//           }} 
//         />
//         <Bar dataKey="P" fill="#EF4444" name="Present" />
//         <Bar dataKey="LP" fill="#10B981" name="Late Present" />
//         <Bar dataKey="A" fill="#3B82F6" name="Absent" />
//         <Bar dataKey="L" fill="#8B5CF6" name="Leave" />
//         <Bar dataKey="T" fill="#EC4899" name="Tour" />
//         <Bar dataKey="H" fill="#14B8A6" name="Holiday" />
//         <Bar dataKey="WH" fill="#6B7280" name="Weekend" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default AttendanceChart;


// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const AttendanceChart = ({ data = [], darkMode = false }) => {
//   // Process data to ensure correct format
//   const processedData = data.map(item => ({
//     day: item.day || 'Unknown',
//     present: Number(item.present) || 0,
//     late: Number(item.late) || 0,
//     absent: Number(item.absent) || 0,
//     leave: Number(item.leave) || 0,
//     tour: Number(item.tour) || 0,
//     holiday: Number(item.holiday) || 0,
//     weekend: Number(item.weekend) || 0
//   }));

//   // Calculate total for each day to set YAxis domain
//   const dataWithTotal = processedData.map(item => ({
//     ...item,
//     total: item.present + item.late + item.absent + item.leave + item.tour + item.holiday + item.weekend
//   }));

//   const maxValue = Math.max(...dataWithTotal.map(d => d.total), 100) + 20;

//   // Custom tooltip
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      
//       return (
//         <div className={`
//           p-3 rounded-lg shadow-lg border
//           ${darkMode 
//             ? 'bg-gray-800 border-gray-700 text-white' 
//             : 'bg-white border-gray-200 text-gray-900'
//           }
//         `}>
//           <p className="text-sm font-medium mb-2 border-b pb-1 dark:border-gray-700">
//             {label}
//           </p>
//           {payload.map((entry, index) => (
//             entry.value > 0 && (
//               <div key={index} className="flex items-center justify-between gap-6 text-xs py-1">
//                 <span style={{ color: entry.color }}>{entry.name}:</span>
//                 <span className="font-medium">{entry.value}</span>
//               </div>
//             )
//           ))}
//           <div className="mt-2 pt-2 border-t dark:border-gray-700">
//             <div className="flex items-center justify-between gap-6 text-xs font-semibold">
//               <span>Total:</span>
//               <span>{total}</span>
//             </div>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Define chart colors
//   const chartConfig = {
//     present: { color: '#10B981', name: 'Present' },
//     late: { color: '#F59E0B', name: 'Late' },
//     absent: { color: '#EF4444', name: 'Absent' },
//     leave: { color: '#8B5CF6', name: 'Leave' },
//     tour: { color: '#EC4899', name: 'Tour' },
//     holiday: { color: '#14B8A6', name: 'Holiday' },
//     weekend: { color: '#6B7280', name: 'Weekend' }
//   };

//   return (
//     <ResponsiveContainer width="100%" height="100%" debounce={1}>
//       <BarChart
//         data={processedData}
//         margin={{ left: 10, right: 30, top: 20, bottom: 30 }}
//         barSize={24}
//         barGap={2}
//         maxBarSize={40}
//       >
//         <CartesianGrid 
//           strokeDasharray="3 3" 
//           stroke={darkMode ? '#374151' : '#e5e7eb'} 
//           vertical={false}
//           horizontal={true}
//         />
        
//         <XAxis 
//           dataKey="day"
//           axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//           tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//           tick={{ 
//             fill: darkMode ? '#9CA3AF' : '#4B5563',
//             fontSize: 12,
//             fontWeight: 500
//           }}
//           interval={0}
//           height={40}
//         />
        
//         <YAxis 
//           domain={[0, maxValue]}
//           axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//           tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//           tick={{ 
//             fill: darkMode ? '#9CA3AF' : '#4B5563',
//             fontSize: 11
//           }}
//           width={40}
//         />
        
//         <Tooltip 
//           content={<CustomTooltip />}
//           cursor={{ 
//             fill: darkMode ? '#374151' : '#F3F4F6',
//             opacity: 0.5
//           }}
//         />
        
//         <Legend 
//           wrapperStyle={{ 
//             color: darkMode ? '#FFFFFF' : '#000000',
//             paddingTop: '20px',
//             fontSize: '11px',
//             lineHeight: '20px'
//           }}
//           iconType="circle"
//           iconSize={8}
//           layout="horizontal"
//           verticalAlign="bottom"
//           align="center"
//         />
        
//         {Object.entries(chartConfig).map(([key, config]) => (
//           <Bar 
//             key={key}
//             dataKey={key}
//             stackId="a"
//             fill={config.color}
//             name={config.name}
//             radius={[4, 4, 0, 0]}
//           />
//         ))}
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default AttendanceChart;


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AttendanceChart = ({ data = [], darkMode = false, width, height }) => {
  // Process data to ensure correct format
  const processedData = data.map(item => ({
    day: item.day || 'Unknown',
    present: Number(item.present) || 0,
    late: Number(item.late) || 0,
    absent: Number(item.absent) || 0,
    leave: Number(item.leave) || 0,
    tour: Number(item.tour) || 0,
    holiday: Number(item.holiday) || 0,
    weekend: Number(item.weekend) || 0
  }));

  // Calculate total for each day to set YAxis domain
  const dataWithTotal = processedData.map(item => ({
    ...item,
    total: item.present + item.late + item.absent + item.leave + item.tour + item.holiday + item.weekend
  }));

  const maxValue = Math.max(...dataWithTotal.map(d => d.total), 100) + 20;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      
      return (
        <div className={`
          p-3 rounded-lg shadow-lg border
          ${darkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
          }
        `}>
          <p className="text-sm font-medium mb-2 border-b pb-1 dark:border-gray-700">
            {label}
          </p>
          {payload.map((entry, index) => (
            entry.value > 0 && (
              <div key={index} className="flex items-center justify-between gap-6 text-xs py-1">
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-medium">{entry.value}</span>
              </div>
            )
          ))}
          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <div className="flex items-center justify-between gap-6 text-xs font-semibold">
              <span>Total:</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Define chart colors
  const chartConfig = {
    present: { color: '#10B981', name: 'Present' },
    late: { color: '#F59E0B', name: 'Late' },
    absent: { color: '#EF4444', name: 'Absent' },
    leave: { color: '#8B5CF6', name: 'Leave' },
    tour: { color: '#EC4899', name: 'Tour' },
    holiday: { color: '#14B8A6', name: 'Holiday' },
    weekend: { color: '#6B7280', name: 'Weekend' }
  };

  // Responsive bar sizes based on width
  const barSize = Math.min(40, Math.max(20, Math.floor(width / 20)));

  return (
    <BarChart
      width={width}
      height={height}
      data={processedData}
      margin={{ left: 10, right: 30, top: 20, bottom: 30 }}
      barSize={barSize}
      barGap={2}
      maxBarSize={40}
    >
      <CartesianGrid 
        strokeDasharray="3 3" 
        stroke={darkMode ? '#374151' : '#e5e7eb'} 
        vertical={false}
        horizontal={true}
      />
      
      <XAxis 
        dataKey="day"
        axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
        tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
        tick={{ 
          fill: darkMode ? '#9CA3AF' : '#4B5563',
          fontSize: 12,
          fontWeight: 500
        }}
        interval={0}
        height={40}
      />
      
      <YAxis 
        domain={[0, maxValue]}
        axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
        tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
        tick={{ 
          fill: darkMode ? '#9CA3AF' : '#4B5563',
          fontSize: 11
        }}
        width={40}
      />
      
      <Tooltip 
        content={<CustomTooltip />}
        cursor={{ 
          fill: darkMode ? '#374151' : '#F3F4F6',
          opacity: 0.5
        }}
      />
      
      <Legend 
        wrapperStyle={{ 
          color: darkMode ? '#FFFFFF' : '#000000',
          paddingTop: '20px',
          fontSize: '11px',
          lineHeight: '20px'
        }}
        iconType="circle"
        iconSize={8}
        layout="horizontal"
        verticalAlign="bottom"
        align="center"
      />
      
      {Object.entries(chartConfig).map(([key, config]) => (
        <Bar 
          key={key}
          dataKey={key}
          stackId="a"
          fill={config.color}
          name={config.name}
          radius={[4, 4, 0, 0]}
        />
      ))}
    </BarChart>
  );
};

export default AttendanceChart;