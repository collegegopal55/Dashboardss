// components/cards/LeaveRequestsCard.jsx
import React from 'react';
import { LEAVE_STATUS } from '../../../constants/index';

const LeaveRequestsCard = ({ leaveRequests }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case LEAVE_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-600';
      case LEAVE_STATUS.APPROVED:
        return 'bg-green-100 text-green-600';
      case LEAVE_STATUS.REJECTED:
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Leave Requests</h2>
        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Pending</span>
      </div>
      <div className="space-y-4 max-h-[300px] overflow-y-auto">
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave, index) => (
            <div key={leave.id || index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex flex-wrap gap-2 items-start mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-semibold">
                  {leave.days}d
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs font-semibold">
                  {leave.type}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(leave.status)}`}>
                  {leave.status}
                </span>
              </div>
              <p className="font-medium text-gray-900 text-sm truncate">{leave.applicant}</p>
              <p className="text-xs text-gray-500 mt-1 truncate">{leave.dept} • {leave.from} to {leave.to}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No leave requests</p>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestsCard;