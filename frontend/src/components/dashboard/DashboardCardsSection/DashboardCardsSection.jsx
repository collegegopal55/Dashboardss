
import React, { useState, useCallback } from 'react';
import { PendingLeaveCard, ActiveEmployeesCard } from '../../../cards';

const DashboardCardsSection = ({
  darkMode = false,
  employeeStats: propEmployeeStats,
  leaveRequests: propLeaveRequests,
  onApproveLeave,
  onRejectLeave,
  onViewAllLeaves,
  onViewEmployeeDetails
}) => {
  // Employee Statistics Data
  const defaultEmployeeStats = {
    totalActive: 1284,
    trend: 8.4,
    trendDirection: 'up',
    thisMonth: {
      newJoinees: 42,
      resigned: 18,
      netGrowth: 24
    },
    lastMonth: {
      newJoinees: 30,
      resigned: 22,
      netGrowth: 8
    },
    departmentWise: [
      { dept: 'Engineering', count: 345, change: '+12', color: '#3B82F6' },
      { dept: 'Sales', count: 234, change: '+5', color: '#10B981' },
      { dept: 'Marketing', count: 156, change: '-2', color: '#F59E0B' },
      { dept: 'HR', count: 89, change: '+3', color: '#8B5CF6' },
      { dept: 'Finance', count: 67, change: '+1', color: '#EC4899' }
    ],
    monthlyTrend: [
      { month: 'Jan', count: 1245 },
      { month: 'Feb', count: 1256 },
      { month: 'Mar', count: 1268 },
      { month: 'Apr', count: 1275 },
      { month: 'May', count: 1284 },
      { month: 'Jun', count: 1292 },
      { month: 'Jul', count: 1301 }
    ]
  };

  // Leave Requests Data
  const defaultLeaveRequests = [
    { 
      id: 1,
      employee: 'John Smith', 
      type: 'Sick Leave', 
      requestDate: 'Jan 12, 2024', 
      status: 'urgent', 
      days: 5,
      department: 'Engineering',
      reason: 'Fever and cold'
    },
    { 
      id: 2,
      employee: 'Emily Davis', 
      type: 'Vacation', 
      requestDate: 'Feb 5, 2024', 
      status: 'pending', 
      days: 3,
      department: 'Marketing',
      reason: 'Family trip'
    },
    { 
      id: 3,
      employee: 'Michael Lee', 
      type: 'Personal Leave', 
      requestDate: 'Jan 28, 2024', 
      status: 'overdue', 
      days: 10,
      department: 'Sales',
      reason: 'Personal matters'
    },
    { 
      id: 4,
      employee: 'Sophia Brown', 
      type: 'Other', 
      requestDate: 'Feb 10, 2024', 
      status: 'pending', 
      days: 2,
      department: 'HR',
      reason: 'Doctor appointment'
    },
    { 
      id: 5,
      employee: 'Robert Wilson', 
      type: 'Sick Leave', 
      requestDate: 'Feb 15, 2024', 
      status: 'pending', 
      days: 4,
      department: 'Finance',
      reason: 'Migraine'
    }
  ];

  // State for managing data
  const [employeeStats] = useState(propEmployeeStats || defaultEmployeeStats);
  const [leaveRequests, setLeaveRequests] = useState(propLeaveRequests || defaultLeaveRequests);

  // Handlers for leave actions
  const handleApprove = useCallback((leave) => {
    console.log('Approving leave:', leave);
    // Update local state
    setLeaveRequests(prev => prev.filter(l => l.id !== leave.id));
    // Call parent handler if provided
    if (onApproveLeave) {
      onApproveLeave(leave);
    }
  }, [onApproveLeave]);

  const handleReject = useCallback((leave) => {
    console.log('Rejecting leave:', leave);
    // Update local state
    setLeaveRequests(prev => prev.filter(l => l.id !== leave.id));
    // Call parent handler if provided
    if (onRejectLeave) {
      onRejectLeave(leave);
    }
  }, [onRejectLeave]);

  const handleViewAll = useCallback(() => {
    console.log('Viewing all leaves');
    if (onViewAllLeaves) {
      onViewAllLeaves();
    }
  }, [onViewAllLeaves]);

  const handleViewDetails = useCallback(() => {
    console.log('Viewing employee details');
    if (onViewEmployeeDetails) {
      onViewEmployeeDetails();
    }
  }, [onViewEmployeeDetails]);

  const handleExport = useCallback((data) => {
    console.log('Exporting employee data:', data);
    // यहाँ API call कर सकते हैं
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Active Employees Card */}
      <ActiveEmployeesCard 
        darkMode={darkMode}
        data={employeeStats}
        onViewDetails={handleViewDetails}
        onExport={handleExport}
        maxHeight="600px"
      />

      {/* Pending Leave Card */}
      <PendingLeaveCard 
        darkMode={darkMode}
        leaves={leaveRequests}
        onApprove={handleApprove}
        onReject={handleReject}
        onViewAll={handleViewAll}
        title="Pending Leave Requests"
        maxHeight="600px"
        showScrollButtons={true}
      />
    </div>
  );
};

export default React.memo(DashboardCardsSection);