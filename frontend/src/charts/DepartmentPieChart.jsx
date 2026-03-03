// // // components/charts/DepartmentPieChart.jsx
// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const DepartmentPieChart = ({ data }) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <PieChart>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           outerRadius={100}
//           dataKey="employees"
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={entry.color} />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default DepartmentPieChart;


// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const DepartmentPieChart = ({ data = [], darkMode = false }) => {
//   // Ensure we have data
//   const chartData = data.length > 0 ? data : [];

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart>
//         <Pie
//           data={chartData}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//           outerRadius={120}
//           innerRadius={40}
//           dataKey="value"
//           paddingAngle={2}
//           isAnimationActive={true}
//         >
//           {chartData.map((entry, index) => (
//             <Cell 
//               key={`cell-${index}`} 
//               fill={entry.color || '#3B82F6'}
//               stroke={darkMode ? '#1F2937' : '#FFFFFF'}
//               strokeWidth={2}
//             />
//           ))}
//         </Pie>
//         <Tooltip 
//           contentStyle={{ 
//                             backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
//             borderColor: darkMode ? '#374151' : '#E5E7EB',
//             color: darkMode ? '#FFFFFF' : '#000000'
//           }}
//           formatter={(value, name, props) => [value, props.payload.name]}
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default DepartmentPieChart;

import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const DepartmentPieChart = ({ data = [], darkMode = false, width, height }) => {
  if (width < 50 || height < 50) return null;

  const chartData = data.length ? data : [];

  const base = Math.min(width, height);
  const radius = Math.max(60, Math.floor(base * 0.35));
  const innerRadius = Math.floor(radius * 0.35);

  const isMobile = width < 480;

  return (
    <PieChart width={width} height={height}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={radius}
        innerRadius={innerRadius}
        paddingAngle={2}
        dataKey="value"
        label={isMobile ? false : ({ name, percent }) =>
          `${name} ${(percent * 100).toFixed(0)}%`
        }
        isAnimationActive={!isMobile}
      >
        {chartData.map((entry, index) => (
          <Cell
            key={index}
            fill={entry.color || '#3B82F6'}
            stroke={darkMode ? '#1F2937' : '#FFFFFF'}
            strokeWidth={2}
          />
        ))}
      </Pie>

      <Tooltip
        contentStyle={{
          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
          borderColor: darkMode ? '#374151' : '#E5E7EB',
          color: darkMode ? '#FFFFFF' : '#000000'
        }}
        formatter={(value, name, props) => [value, props.payload.name]}
      />
    </PieChart>
  );
};

export default React.memo(DepartmentPieChart);