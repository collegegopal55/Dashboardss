// // components/cards/AnniversariesCard.jsx
// import React from 'react';
// import { Gift } from 'lucide-react';

// const AnniversariesCard = ({ anniversaries }) => {
//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
//       <div className="flex items-center space-x-2 mb-4">
//         <Gift className="w-5 h-5 text-purple-500" />
//         <h2 className="text-base sm:text-lg font-semibold text-gray-900">Work Anniversaries</h2>
//       </div>
//       {anniversaries.length > 0 ? (
//         <div className="space-y-3">
//           {anniversaries.map((anni, index) => (
//             <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
//               <div className="min-w-0 flex-1">
//                 <p className="text-sm font-medium text-gray-900 truncate">{anni.name}</p>
//                 <p className="text-xs text-gray-500 truncate">{anni.empCode} • {anni.department}</p>
//               </div>
//               <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded flex-shrink-0 ml-2">
//                 {anni.years} Year{anni.years > 1 ? 's' : ''}
//               </span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500 text-center py-4">No anniversaries this month</p>
//       )}
//     </div>
//   );
// };

// export default AnniversariesCard;

// components/cards/AnniversariesCard.jsx


import React from 'react';
import { Gift, Cake, Calendar, Star, Award, Sparkles } from 'lucide-react';

const AnniversariesCard = ({ anniversaries, darkMode = false }) => {
  // Sort anniversaries by years (descending) for better display
  const sortedAnniversaries = [...anniversaries].sort((a, b) => b.years - a.years);
  
  // Get milestone badge color based on years
  const getMilestoneColor = (years) => {
    if (years >= 10) return darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-700';
    if (years >= 5) return darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700';
    if (years >= 1) return darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-100 text-purple-700';
    return darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-100 text-gray-700';
  };

  // Get milestone icon
  const getMilestoneIcon = (years) => {
    if (years >= 10) return <Award className="w-3 h-3 mr-1" />;
    if (years >= 5) return <Star className="w-3 h-3 mr-1" />;
    return <Sparkles className="w-3 h-3 mr-1" />;
  };

  // Get anniversary message based on years
  const getAnniversaryMessage = (years) => {
    if (years >= 10) return `${years} years! 🎉 Golden milestone!`;
    if (years >= 5) return `${years} years! 🌟 Silver celebration!`;
    if (years === 1) return 'First year! 🎈 Welcome to the family!';
    return `${years} years! 🎂`;
  };

  // Get days remaining until anniversary (if date is provided)
  const getDaysRemaining = (anniversaryDate) => {
    if (!anniversaryDate) return null;
    
    const today = new Date();
    const anni = new Date(anniversaryDate);
    anni.setFullYear(today.getFullYear());
    
    if (anni < today) {
      anni.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = anni - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-sm border transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-100 hover:border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
          }`}>
            <Gift className={`w-5 h-5 ${
              darkMode ? 'text-purple-400' : 'text-purple-500'
            }`} />
          </div>
          <h2 className={`text-base sm:text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Work Anniversaries
          </h2>
        </div>
        
        {/* Count Badge */}
        <span className={`text-xs px-2 py-1 rounded-full ${
          darkMode 
            ? 'bg-purple-900/50 text-purple-300' 
            : 'bg-purple-100 text-purple-700'
        }`}>
          {anniversaries.length} this month
        </span>
      </div>

      {sortedAnniversaries.length > 0 ? (
        <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {sortedAnniversaries.map((anni, index) => {
            const daysRemaining = getDaysRemaining(anni.date);
            const milestoneColor = getMilestoneColor(anni.years);
            
            return (
              <div 
                key={index} 
                className={`group relative p-3 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700/50 hover:bg-gray-700' 
                    : 'bg-purple-50 hover:bg-purple-100'
                } ${anni.years >= 10 ? 'ring-2 ring-yellow-400/50' : ''}`}
              >
                {/* Decorative gradient for milestones */}
                {anni.years >= 10 && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/10 to-transparent pointer-events-none" />
                )}
                
                <div className="flex items-start justify-between relative">
                  {/* Left side - Employee info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        anni.years >= 10 ? 'bg-yellow-400' :
                        anni.years >= 5 ? 'bg-blue-400' : 'bg-purple-400'
                      }`} />
                      <p className={`text-sm font-medium truncate ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {anni.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {anni.empCode}
                      </span>
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}>•</span>
                      <span className={`text-xs truncate ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {anni.department}
                      </span>
                    </div>

                    {/* Days remaining indicator */}
                    {daysRemaining && daysRemaining <= 7 && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Calendar className={`w-3 h-3 ${
                          darkMode ? 'text-orange-400' : 'text-orange-500'
                        }`} />
                        <span className={`text-xs ${
                          darkMode ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          {daysRemaining === 0 ? 'Today!' : `${daysRemaining} days left`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right side - Years badge */}
                  <div className="flex flex-col items-end ml-2">
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${milestoneColor}`}>
                      {getMilestoneIcon(anni.years)}
                      {anni.years} {anni.years > 1 ? 'Years' : 'Year'}
                    </div>
                    
                    {/* Tooltip with message */}
                    <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`text-[10px] ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {getAnniversaryMessage(anni.years)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className={`p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <Cake className={`w-6 h-6 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No anniversaries this month
          </p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Check back next month!
          </p>
        </div>
      )}

      {/* Footer with upcoming count */}
      {sortedAnniversaries.length > 0 && (
        <div className={`mt-4 pt-3 border-t text-xs flex items-center justify-between ${
          darkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            🎉 Celebrating this month
          </span>
          <div className="flex items-center space-x-1">
            {sortedAnniversaries.slice(0, 3).map((anni, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
                title={anni.name}
              >
                {anni.name.charAt(0)}
              </div>
            ))}
            {sortedAnniversaries.length > 3 && (
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                +{sortedAnniversaries.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnniversariesCard;