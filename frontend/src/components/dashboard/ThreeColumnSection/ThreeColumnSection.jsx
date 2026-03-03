import React from 'react';
import RecentPunchesCard from '../../../cards/RecentPunchesCard';
import AttendanceDeviceCard from '../../../cards/AttendanceDeviceCard';
import CombinedEventsCard from '../../../cards/CombinedEventsCard';
import { ANNOUNCEMENTS } from '../../../constants/dashboardConstants';
import { useTheme } from '../../../context/ThemeContext';

const ThreeColumnSection = ({ 
  recentPunches, 
  employees, 
  birthdays, 
  anniversaries,
  onViewAllClick,
  onDeviceChange
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <RecentPunchesCard punches={recentPunches} darkMode={darkMode} />
      
      <div className={darkMode ? 'dark' : ''}>
        <AttendanceDeviceCard 
          employees={employees}
          darkMode={darkMode}
          onViewAllClick={onViewAllClick}
          onDeviceChange={onDeviceChange}
          refreshInterval={30000}
        />
      </div>

      <CombinedEventsCard
        birthdays={birthdays}
        anniversaries={anniversaries}
        announcements={ANNOUNCEMENTS}
        darkMode={darkMode}
        autoRotateInterval={10000}
      />
    </div>
  );
};

export default ThreeColumnSection;