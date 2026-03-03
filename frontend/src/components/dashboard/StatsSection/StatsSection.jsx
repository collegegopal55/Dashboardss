import React from 'react';
import StatCard from '../../../cards/StatCard';
import { 
  Users, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Home 
} from 'lucide-react';
import { COLORS } from '../../../constants/colors';

const StatsSection = ({ stats, darkMode }) => {
  // Ensure stats and todayAttendance exist with default values
  const safeStats = stats || {
    activeUsers: 0,
    todayAttendance: {
      onTime: 0,
      late: 0,
      absent: 0,
      leave: 0,
      tour: 0,
      holiday: 0,
      weeklyOff: 0
    }
  };

  const attendanceStats = [
    { name: 'ACTIVE USER', value: safeStats.activeUsers, color: COLORS.primary, icon: Users, description: 'Total active employees today' },
    { name: 'ON TIME', value: safeStats.todayAttendance?.onTime || 0, color: COLORS.success, icon: CheckCircle, description: 'Employees who arrived on time' },
    { name: 'LATE', value: safeStats.todayAttendance?.late || 0, color: COLORS.warning, icon: AlertCircle, description: 'Employees who arrived late' },
    { name: 'ABSENT', value: safeStats.todayAttendance?.absent || 0, color: COLORS.danger, icon: XCircle, description: 'Employees absent today' },
    { name: 'LEAVE', value: safeStats.todayAttendance?.leave || 0, color: COLORS.purple, icon: Calendar, description: 'Employees on leave' },
    { name: 'TOUR', value: safeStats.todayAttendance?.tour || 0, color: COLORS.pink, icon: MapPin, description: 'Employees on tour' },
    { name: 'HOLIDAY', value: safeStats.todayAttendance?.holiday || 0, color: COLORS.teal, icon: Clock, description: 'Company holiday' },
    { name: 'WEEKLY OFF', value: safeStats.todayAttendance?.weeklyOff || 0, color: COLORS.gray, icon: Home, description: 'Weekly off employees' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
      {attendanceStats.map((stat, index) => (
        <StatCard 
          key={index} 
          stat={stat} 
          activeUsers={safeStats.activeUsers} 
          darkMode={darkMode}
          showTrend={stat.name !== 'ACTIVE USER'} // Don't show trend for active users
        />
      ))}
    </div>
  );
};

// Add default props
StatsSection.defaultProps = {
  stats: {
    activeUsers: 0,
    todayAttendance: {
      onTime: 0,
      late: 0,
      absent: 0,
      leave: 0,
      tour: 0,
      holiday: 0,
      weeklyOff: 0
    }
  },
  darkMode: false
};

export default StatsSection;