// import React from 'react';
// import AttendanceChartContainer from './AttendanceChartContainer';
// import DepartmentChartContainer from './DepartmentChartContainer';

// const ChartsSection = ({ last7DaysData, departmentData }) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       <AttendanceChartContainer data={last7DaysData} />
//       <DepartmentChartContainer data={departmentData} />
//     </div>
//   );
// };

// export default ChartsSection;


// import React from 'react';
// import AttendanceChartContainer from './AttendanceChartContainer';
// import DepartmentChartContainer from './DepartmentChartContainer';

// const ChartsSection = ({ last7DaysData, departmentData }) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       <div className="h-[500px] w-full">
//         <AttendanceChartContainer data={last7DaysData} />
//       </div>
//       <div className="h-[500px] w-full">
//         <DepartmentChartContainer data={departmentData} />
//       </div>
//     </div>
//   );
// };

// export default ChartsSection;

// import React from 'react';
// import AttendanceChartContainer from './AttendanceChartContainer';
// import DepartmentChartContainer from './DepartmentChartContainer';

// const ChartsSection = ({ last7DaysData, departmentData }) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       <div className="h-[500px] w-full">
//         <AttendanceChartContainer data={last7DaysData || []} />
//       </div>
//       <div className="h-[500px] w-full">
//         <DepartmentChartContainer data={departmentData || []} />
//       </div>
//     </div>
//   );
// };

// export default ChartsSection;


// import React from 'react';
// import AttendanceChartContainer from './AttendanceChartContainer';
// import DepartmentChartContainer from './DepartmentChartContainer';

// const ChartsSection = ({ last7DaysData, departmentData }) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
//       {/* Both containers will have exactly the same height */}
//       <div className="w-full">
//         <AttendanceChartContainer data={last7DaysData || []} />
//       </div>
//       <div className="w-full">
//         <DepartmentChartContainer data={departmentData || []} />
//       </div>
//     </div>
//   );
// };

// export default ChartsSection;

import React from 'react';
import AttendanceChartContainer from './AttendanceChartContainer';
import DepartmentChartContainer from './DepartmentChartContainer';

const ChartsSection = ({ last7DaysData, departmentData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4 h-full">
      {/* Add h-full and min-h-0 to ensure proper containment */}
      <div className="w-full h-full min-h-0">
        <AttendanceChartContainer data={last7DaysData || []} />
      </div>
      <div className="w-full h-full min-h-0">
        <DepartmentChartContainer data={departmentData || []} />
      </div>
    </div>
  );
};

export default ChartsSection;