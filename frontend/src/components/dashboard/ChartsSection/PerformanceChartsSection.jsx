

// import React from 'react';
// import TrendChartContainer from './TrendChartContainer';
// import PerformanceChartContainer from './PerformanceChartContainer';

// const PerformanceChartsSection = ({ trendData = [], deptPerformance = [] }) => {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
//       {/* Left Column - Trend Chart */}
//       <div className="w-full h-full min-h-[500px]">
//         <TrendChartContainer data={trendData} />
//       </div>
      
//       {/* Right Column - Performance Chart */}
//       <div className="w-full h-full min-h-[500px]">
//         <PerformanceChartContainer data={deptPerformance} />
//       </div>
//     </div>
//   );
// };

// export default PerformanceChartsSection;


import React from 'react';
import TrendChartContainer from './TrendChartContainer';
import PerformanceChartContainer from './PerformanceChartContainer';

const PerformanceChartsSection = ({ trendData = [], deptPerformance = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-auto lg:h-[600px]">
      {/* Left Column - Trend Chart */}
      <div className="w-full h-[450px] sm:h-[500px] lg:h-full">
        <TrendChartContainer data={trendData} />
      </div>
      
      {/* Right Column - Performance Chart */}
      <div className="w-full h-[450px] sm:h-[500px] lg:h-full">
        <PerformanceChartContainer data={deptPerformance} />
      </div>
    </div>
  );
};

export default PerformanceChartsSection;