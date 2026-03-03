// components/cards/BirthdaysCard.jsx
import React from 'react';
import { Cake } from 'lucide-react';

const BirthdaysCard = ({ birthdays }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Cake className="w-5 h-5 text-pink-500" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Birthdays This Month</h2>
      </div>
      {birthdays.length > 0 ? (
        <div className="space-y-3">
          {birthdays.map((bday, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{bday.name}</p>
                <p className="text-xs text-gray-500 truncate">{bday.empCode} • {bday.department}</p>
              </div>
              <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded flex-shrink-0 ml-2">
                {bday.date}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">No birthdays this month</p>
      )}
    </div>
  );
};

export default BirthdaysCard;