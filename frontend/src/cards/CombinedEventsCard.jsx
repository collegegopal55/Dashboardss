

// import React, { useState, useEffect } from 'react';
// import { 
//   Cake, Gift, Bell, 
//   ChevronLeft, ChevronRight, 
//   Calendar, Star, Award, Sparkles,
//   Users, Clock, AlertCircle
// } from 'lucide-react';

// const CombinedEventsCard = ({ 
//   birthdays = [], 
//   anniversaries = [], 
//   announcements = [],
//   darkMode = false,
//   autoRotateInterval = 3000 // 10 seconds
// }) => {
//   const [activeTab, setActiveTab] = useState('birthdays');
//   const [isAutoRotating, setIsAutoRotating] = useState(true);
//   const [hovered, setHovered] = useState(false);

//   // Tabs configuration
//   const tabs = [
//     { id: 'birthdays', label: 'Birthdays', icon: Cake, color: 'pink', count: birthdays.length },
//     { id: 'anniversaries', label: 'Anniversaries', icon: Gift, color: 'purple', count: anniversaries.length },
//     { id: 'announcements', label: 'Announcements', icon: Bell, color: 'blue', count: announcements.length }
//   ];

//   // Auto-rotation effect
//   useEffect(() => {
//     let interval;
//     if (isAutoRotating && !hovered) {
//       interval = setInterval(() => {
//         setActiveTab(current => {
//           const currentIndex = tabs.findIndex(tab => tab.id === current);
//           const nextIndex = (currentIndex + 1) % tabs.length;
//           return tabs[nextIndex].id;
//         });
//       }, autoRotateInterval);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoRotating, hovered, autoRotateInterval, tabs]);

 

//   const handleTabClick = (tabId) => {
//     setIsAutoRotating(true);
//     setActiveTab(tabId);
//   };

//   // Get milestone badge color for anniversaries
//   const getMilestoneColor = (years) => {
//     if (years >= 10) return darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-700';
//     if (years >= 5) return darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700';
//     return darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-100 text-purple-700';
//   };

//   // Get announcement priority color
//   const getPriorityColor = (priority) => {
//     switch(priority?.toLowerCase()) {
//       case 'high': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
//       case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//       case 'low': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
//       default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
//     }
//   };

//   // Get days remaining until anniversary
//   const getDaysRemaining = (anniversaryDate) => {
//     if (!anniversaryDate) return null;
    
//     const today = new Date();
//     const anni = new Date(anniversaryDate);
//     anni.setFullYear(today.getFullYear());
    
//     if (anni < today) {
//       anni.setFullYear(today.getFullYear() + 1);
//     }
    
//     const diffTime = anni - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays;
//   };

//   // Render birthdays content
//   const renderBirthdays = () => (
//     <div className="space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
//       {birthdays.length > 0 ? (
//         birthdays.map((bday, index) => (
//           <div 
//             key={index} 
//             className={`p-2 sm:p-3 rounded-lg transition-all ${
//               darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-pink-50 hover:bg-pink-100'
//             }`}
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//               <div className="min-w-0 flex-1">
//                 <p className={`text-xs sm:text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                   {bday.name}
//                 </p>
//                 <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
//                   {bday.empCode} • {bday.department}
//                 </p>
//               </div>
//               <span className={`text-[10px] sm:text-xs px-2 py-1 rounded inline-block w-fit ${
//                 darkMode ? 'bg-pink-900 text-pink-300' : 'bg-pink-200 text-pink-700'
//               }`}>
//                 {bday.date}
//               </span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-6 sm:py-8">
//           <Cake className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
//           <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             No birthdays this month
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   // Render anniversaries content
//   const renderAnniversaries = () => (
//     <div className="space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
//       {anniversaries.length > 0 ? (
//         anniversaries.map((anni, index) => {
//           const daysRemaining = getDaysRemaining(anni.date);
          
//           return (
//             <div 
//               key={index} 
//               className={`p-2 sm:p-3 rounded-lg transition-all ${
//                 darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-purple-50 hover:bg-purple-100'
//               } ${anni.years >= 10 ? 'ring-1 sm:ring-2 ring-yellow-400/50' : ''}`}
//             >
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center space-x-2">
//                     <p className={`text-xs sm:text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                       {anni.name}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2 mt-1">
//                     <span className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {anni.empCode}
//                     </span>
//                     <span className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
//                     <span className={`text-[10px] sm:text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {anni.department}
//                     </span>
//                   </div>
//                   {daysRemaining && daysRemaining <= 7 && (
//                     <div className="flex items-center space-x-1 mt-1">
//                       <Calendar className={`w-2 h-2 sm:w-3 sm:h-3 ${
//                         darkMode ? 'text-orange-400' : 'text-orange-500'
//                       }`} />
//                       <span className={`text-[10px] sm:text-xs ${
//                         darkMode ? 'text-orange-400' : 'text-orange-600'
//                       }`}>
//                         {daysRemaining === 0 ? 'Today!' : `${daysRemaining} days left`}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className={`flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium w-fit ${getMilestoneColor(anni.years)}`}>
//                   {anni.years >= 10 ? <Award className="w-2 h-2 sm:w-3 sm:h-3 mr-1" /> : 
//                    anni.years >= 5 ? <Star className="w-2 h-2 sm:w-3 sm:h-3 mr-1" /> : 
//                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />}
//                   {anni.years} {anni.years > 1 ? 'Yrs' : 'Yr'}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <div className="text-center py-6 sm:py-8">
//           <Gift className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
//           <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             No anniversaries this month
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   // Render announcements content
//   const renderAnnouncements = () => (
//     <div className="space-y-2 sm:space-y-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
//       {announcements.length > 0 ? (
//         announcements.map((announcement, index) => (
//           <div 
//             key={index} 
//             className={`p-2 sm:p-3 rounded-lg transition-all ${
//               darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50 hover:bg-blue-100'
//             }`}
//           >
//             <div className="flex items-start space-x-2 sm:space-x-3">
//               <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 mt-1.5 rounded-full flex-shrink-0 ${
//                 announcement.priority === 'high' ? 'bg-red-500' :
//                 announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
//               }`} />
//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
//                   <p className={`text-xs sm:text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                     {announcement.title}
//                   </p>
//                   <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded w-fit ${getPriorityColor(announcement.priority)}`}>
//                     {announcement.priority || 'Normal'}
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-1">
//                   <Calendar className={`w-2 h-2 sm:w-3 sm:h-3 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
//                   <span className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     {announcement.date}
//                   </span>
//                 </div>
//                 {announcement.description && (
//                   <p className={`text-[10px] sm:text-xs mt-1 sm:mt-2 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                     {announcement.description}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-6 sm:py-8">
//           <Bell className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
//           <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//             No announcements
//           </p>
//         </div>
//       )}
//     </div>
//   );

//   // Render content based on active tab
//   const renderContent = () => {
//     switch(activeTab) {
//       case 'birthdays': return renderBirthdays();
//       case 'anniversaries': return renderAnniversaries();
//       case 'announcements': return renderAnnouncements();
//       default: return null;
//     }
//   };

//   // Get total events count
//   const totalEvents = birthdays.length + anniversaries.length + announcements.length;

//   return (
//     <div 
//       className={`rounded-xl shadow-sm border transition-all duration-300 h-full ${
//         darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//       }`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Header */}
//       <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//           <div className="flex items-center space-x-2">
//             <Users className={`w-4 h-4 sm:w-5 sm:h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
//             <h2 className={`text-sm sm:text-base lg:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//               Events & Updates
//             </h2>
//           </div>
          
//           {totalEvents > 0 && (
//           <div className="mt-2">
//             <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${
//               darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
//             }`}>
//               {totalEvents} upcoming {totalEvents === 1 ? 'event' : 'events'}
//             </span>
//           </div>
//         )}
//         </div>

       
       
//       </div>

//       {/* Tabs - Scrollable on mobile */}
//       <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700 hide-scrollbar">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           const isActive = activeTab === tab.id;
          
//           return (
//             <button
//               key={tab.id}
//               onClick={() => handleTabClick(tab.id)}
//               className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs md:text-sm font-medium transition-all relative min-w-[80px] sm:min-w-[100px] ${
//                 isActive
//                   ? darkMode
//                     ? `text-${tab.color}-400 border-b-2 border-${tab.color}-400`
//                     : `text-${tab.color}-600 border-b-2 border-${tab.color}-600`
//                   : darkMode
//                     ? 'text-gray-400 hover:text-gray-300'
//                     : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${
//                 isActive 
//                   ? darkMode ? `text-${tab.color}-400` : `text-${tab.color}-600`
//                   : ''
//               }`} />
//               <span className="hidden xs:inline">{tab.label}</span>
//               {tab.count > 0 && (
//                 <span className={`ml-1 text-[8px] sm:text-[10px] px-1 py-0.5 rounded-full ${
//                   isActive
//                     ? darkMode
//                       ? `bg-${tab.color}-900 text-${tab.color}-300`
//                       : `bg-${tab.color}-100 text-${tab.color}-700`
//                     : darkMode
//                       ? 'bg-gray-700 text-gray-300'
//                       : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {tab.count}
//                 </span>
//               )}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content */}
//       <div className="p-8 sm:p-9 ">
//         {renderContent()}
//       </div>

    

    
//     </div>
//   );
// };

// export default CombinedEventsCard;


// import React, { useState, useEffect } from 'react';
// import { 
//   Cake, Gift, Bell, 
//   Calendar, Star, Award, Sparkles,
//   Users
// } from 'lucide-react';

// const CombinedEventsCard = ({ 
//   birthdays = [], 
//   anniversaries = [], 
//   announcements = [],
//   darkMode = false,
//   autoRotateInterval = 4000 
// }) => {
//   const [activeTab, setActiveTab] = useState('birthdays');
//   const [isAutoRotating, setIsAutoRotating] = useState(true);
//   const [hovered, setHovered] = useState(false);

//   // Tabs configuration
//   const tabs = [
//     { id: 'birthdays', label: 'Birthdays', icon: Cake, color: 'pink', count: birthdays.length },
//     { id: 'anniversaries', label: 'Anniversaries', icon: Gift, color: 'purple', count: anniversaries.length },
//     { id: 'announcements', label: 'Announcements', icon: Bell, color: 'blue', count: announcements.length }
//   ];

//   // Auto-rotation logic
//   useEffect(() => {
//     let interval;
//     if (isAutoRotating && !hovered) {
//       interval = setInterval(() => {
//         setActiveTab(current => {
//           const currentIndex = tabs.findIndex(tab => tab.id === current);
//           const nextIndex = (currentIndex + 1) % tabs.length;
//           return tabs[nextIndex].id;
//         });
//       }, autoRotateInterval);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoRotating, hovered, autoRotateInterval]);

//   const handleTabClick = (tabId) => {
//     setIsAutoRotating(false); 
//     setActiveTab(tabId);
//   };

//   const getMilestoneColor = (years) => {
//     if (years >= 10) return darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-700';
//     if (years >= 5) return darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700';
//     return darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-100 text-purple-700';
//   };

//   const getPriorityColor = (priority) => {
//     switch(priority?.toLowerCase()) {
//       case 'high': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
//       case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
//       case 'low': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
//       default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getDaysRemaining = (anniversaryDate) => {
//     if (!anniversaryDate) return null;
//     const today = new Date();
//     const anni = new Date(anniversaryDate);
//     anni.setFullYear(today.getFullYear());
//     if (anni < today) anni.setFullYear(today.getFullYear() + 1);
//     const diffTime = anni - today;
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   };

//   // --- HEIGHT ADJUSTMENT ---
//   // Content ki height ko yahan max-h-[450px] sm:max-h-[500px] par set kiya hai
//   const scrollContainerClass = `space-y-3 max-h-[450px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-300`;

//   const renderBirthdays = () => (
//     <div className={scrollContainerClass}>
//       {birthdays.length > 0 ? (
//         birthdays.map((bday, index) => (
//           <div key={index} className={`p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-pink-50 hover:bg-pink-100'}`}>
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//               <div className="min-w-0 flex-1">
//                 <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bday.name}</p>
//                 <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>{bday.empCode} • {bday.department}</p>
//               </div>
//               <span className={`text-xs px-2 py-1 rounded inline-block w-fit ${darkMode ? 'bg-pink-900 text-pink-300' : 'bg-pink-200 text-pink-700'}`}>
//                 {bday.date}
//               </span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <EmptyState icon={Cake} text="No birthdays this month" darkMode={darkMode} />
//       )}
//     </div>
//   );

//   const renderAnniversaries = () => (
//     <div className={scrollContainerClass}>
//       {anniversaries.length > 0 ? (
//         anniversaries.map((anni, index) => {
//           const daysRemaining = getDaysRemaining(anni.date);
//           return (
//             <div key={index} className={`p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-purple-50 hover:bg-purple-100'} ${anni.years >= 10 ? 'ring-2 ring-yellow-400/50' : ''}`}>
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
//                 <div className="min-w-0 flex-1">
//                   <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{anni.name}</p>
//                   <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{anni.empCode} • {anni.department}</p>
//                   {daysRemaining !== null && daysRemaining <= 7 && (
//                     <div className="flex items-center space-x-1 mt-2">
//                       <Calendar className={`w-3 h-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
//                       <span className={`text-[10px] sm:text-xs font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
//                         {daysRemaining === 0 ? 'Today!' : `${daysRemaining} days left`}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//                 <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getMilestoneColor(anni.years)}`}>
//                   {anni.years >= 10 ? <Award className="w-3 h-3 mr-1" /> : anni.years >= 5 ? <Star className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
//                   {anni.years} {anni.years > 1 ? 'Yrs' : 'Yr'}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       ) : (
//         <EmptyState icon={Gift} text="No anniversaries this month" darkMode={darkMode} />
//       )}
//     </div>
//   );

//   const renderAnnouncements = () => (
//     <div className={scrollContainerClass}>
//       {announcements.length > 0 ? (
//         announcements.map((ann, index) => (
//           <div key={index} className={`p-3 rounded-lg transition-all ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-blue-50 hover:bg-blue-100'}`}>
//             <div className="flex items-start space-x-3">
//               <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between gap-2">
//                   <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ann.title}</p>
//                   <span className={`text-[10px] px-2 py-0.5 rounded ${getPriorityColor(ann.priority)}`}>{ann.priority || 'Normal'}</span>
//                 </div>
//                 {ann.description && <p className={`text-xs mt-1 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ann.description}</p>}
//                 <div className="flex items-center space-x-2 mt-2 opacity-60">
//                   <Calendar className="w-3 h-3" />
//                   <span className="text-[10px]">{ann.date}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <EmptyState icon={Bell} text="No announcements" darkMode={darkMode} />
//       )}
//     </div>
//   );

//   const totalEvents = birthdays.length + anniversaries.length + announcements.length;

//   return (
//     <div 
//       className={`rounded-xl shadow-lg border transition-all duration-300 flex flex-col h-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Header */}
//       <div className="p-4 border-b border-gray-100 dark:border-gray-700">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Users className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
//             <h2 className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Events & Updates</h2>
//           </div>
//           {totalEvents > 0 && (
//             <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
//               {totalEvents} upcoming
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/10">
//         {tabs.map((tab) => {
//           const Icon = tab.icon;
//           const isActive = activeTab === tab.id;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => handleTabClick(tab.id)}
//               className={`flex-1 flex items-center justify-center space-x-2 py-3 px-1 text-xs sm:text-sm font-medium transition-all relative ${
//                 isActive 
//                   ? darkMode ? `text-${tab.color}-400 border-b-2 border-${tab.color}-400` : `text-${tab.color}-600 border-b-2 border-${tab.color}-600`
//                   : 'text-gray-400 hover:text-gray-600'
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               <span className="hidden xs:inline">{tab.label}</span>
//               {tab.count > 0 && <span className="text-[10px] ml-1 opacity-70">({tab.count})</span>}
//             </button>
//           );
//         })}
//       </div>

//       {/* Content */}
//       <div className="p-4 flex-1">
//         {activeTab === 'birthdays' && renderBirthdays()}
//         {activeTab === 'anniversaries' && renderAnniversaries()}
//         {activeTab === 'announcements' && renderAnnouncements()}
//       </div>

//       {/* Custom Scrollbar CSS */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
//         .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
//         .custom-scrollbar::-webkit-scrollbar-thumb { 
//           background: ${darkMode ? '#4b5563' : '#e2e8f0'}; 
//           border-radius: 10px; 
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
//           background: ${darkMode ? '#6b7280' : '#cbd5e1'}; 
//         }
//       `}</style>
//     </div>
//   );
// };

// const EmptyState = ({ icon: Icon, text, darkMode }) => (
//   <div className="flex flex-col items-center justify-center py-20 opacity-40">
//     <Icon className="w-12 h-12 mb-3" />
//     <p className="text-sm font-medium">{text}</p>
//   </div>
// );

// export default CombinedEventsCard;


import React, { useState, useEffect } from 'react';
import { 
  Cake, Gift, Bell, 
  Calendar, Star, Award, Sparkles,
  Users
} from 'lucide-react';

const CombinedEventsCard = ({ 
  birthdays = [], 
  anniversaries = [], 
  announcements = [],
  darkMode = false,
  autoRotateInterval = 4000 
}) => {
  const [activeTab, setActiveTab] = useState('birthdays');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Tabs configuration with dark mode colors
  const tabs = [
    { id: 'birthdays', label: 'Birthdays', icon: Cake, color: 'pink', count: birthdays.length },
    { id: 'anniversaries', label: 'Anniversaries', icon: Gift, color: 'purple', count: anniversaries.length },
    { id: 'announcements', label: 'Announcements', icon: Bell, color: 'blue', count: announcements.length }
  ];

  // Auto-rotation logic
  useEffect(() => {
    let interval;
    if (isAutoRotating && !hovered) {
      interval = setInterval(() => {
        setActiveTab(current => {
          const currentIndex = tabs.findIndex(tab => tab.id === current);
          const nextIndex = (currentIndex + 1) % tabs.length;
          return tabs[nextIndex].id;
        });
      }, autoRotateInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, hovered, autoRotateInterval, tabs]);

  const handleTabClick = (tabId) => {
    setIsAutoRotating(false); 
    setActiveTab(tabId);
  };

  const getMilestoneColor = (years) => {
    if (years >= 10) return darkMode ? 'bg-yellow-600 text-yellow-100' : 'bg-yellow-100 text-yellow-700';
    if (years >= 5) return darkMode ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700';
    return darkMode ? 'bg-purple-600 text-purple-100' : 'bg-purple-100 text-purple-700';
  };

  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';
      case 'medium': return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
      case 'low': return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
      default: return darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };

  const getTabActiveColor = (tabId) => {
    if (!darkMode) {
      switch(tabId) {
        case 'birthdays': return 'text-pink-600 border-pink-600';
        case 'anniversaries': return 'text-purple-600 border-purple-600';
        case 'announcements': return 'text-blue-600 border-blue-600';
        default: return 'text-blue-600 border-blue-600';
      }
    } else {
      switch(tabId) {
        case 'birthdays': return 'text-pink-400 border-pink-400';
        case 'anniversaries': return 'text-purple-400 border-purple-400';
        case 'announcements': return 'text-blue-400 border-blue-400';
        default: return 'text-blue-400 border-blue-400';
      }
    }
  };

  const getDaysRemaining = (anniversaryDate) => {
    if (!anniversaryDate) return null;
    const today = new Date();
    const anni = new Date(anniversaryDate);
    anni.setFullYear(today.getFullYear());
    if (anni < today) anni.setFullYear(today.getFullYear() + 1);
    const diffTime = anni - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Content height adjustment
  const scrollContainerClass = `space-y-3 max-h-[450px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar transition-all duration-300`;

  const renderBirthdays = () => (
    <div className={scrollContainerClass}>
      {birthdays.length > 0 ? (
        birthdays.map((bday, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg transition-all ${
              darkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                : 'bg-pink-50 hover:bg-pink-100 border border-pink-100'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {bday.name}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>
                  {bday.empCode} • {bday.department}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded inline-block w-fit ${
                darkMode 
                  ? 'bg-pink-900/50 text-pink-300 border border-pink-800' 
                  : 'bg-pink-200 text-pink-700'
              }`}>
                {bday.date}
              </span>
            </div>
          </div>
        ))
      ) : (
        <EmptyState icon={Cake} text="No birthdays this month" darkMode={darkMode} />
      )}
    </div>
  );

  const renderAnniversaries = () => (
    <div className={scrollContainerClass}>
      {anniversaries.length > 0 ? (
        anniversaries.map((anni, index) => {
          const daysRemaining = getDaysRemaining(anni.date);
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg transition-all ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                  : 'bg-purple-50 hover:bg-purple-100 border border-purple-100'
              } ${anni.years >= 10 ? 'ring-2 ring-yellow-400/50' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {anni.name}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {anni.empCode} • {anni.department}
                  </p>
                  {daysRemaining !== null && daysRemaining <= 7 && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Calendar className={`w-3 h-3 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <span className={`text-[10px] sm:text-xs font-medium ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                        {daysRemaining === 0 ? 'Today!' : `${daysRemaining} days left`}
                      </span>
                    </div>
                  )}
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getMilestoneColor(anni.years)}`}>
                  {anni.years >= 10 ? (
                    <Award className="w-3 h-3 mr-1" />
                  ) : anni.years >= 5 ? (
                    <Star className="w-3 h-3 mr-1" />
                  ) : (
                    <Sparkles className="w-3 h-3 mr-1" />
                  )}
                  {anni.years} {anni.years > 1 ? 'Yrs' : 'Yr'}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <EmptyState icon={Gift} text="No anniversaries this month" darkMode={darkMode} />
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className={scrollContainerClass}>
      {announcements.length > 0 ? (
        announcements.map((ann, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg transition-all ${
              darkMode 
                ? 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600' 
                : 'bg-blue-50 hover:bg-blue-100 border border-blue-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                ann.priority === 'high' ? 'bg-red-500' : 
                ann.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {ann.title}
                  </p>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${getPriorityColor(ann.priority)}`}>
                    {ann.priority || 'Normal'}
                  </span>
                </div>
                {ann.description && (
                  <p className={`text-xs mt-1 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {ann.description}
                  </p>
                )}
                <div className={`flex items-center space-x-2 mt-2 ${darkMode ? 'opacity-70' : 'opacity-60'}`}>
                  <Calendar className={`w-3 h-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {ann.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <EmptyState icon={Bell} text="No announcements" darkMode={darkMode} />
      )}
    </div>
  );

  const totalEvents = birthdays.length + anniversaries.length + announcements.length;

  return (
    <div 
      className={`rounded-xl shadow-lg border transition-all duration-300 flex flex-col h-full ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:shadow-gray-900/50' 
          : 'bg-white border-gray-200 hover:shadow-xl'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h2 className={`text-base sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Events & Updates
            </h2>
          </div>
          {totalEvents > 0 && (
            <span className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full ${
              darkMode 
                ? 'bg-gray-700 text-gray-300 border border-gray-600' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {totalEvents} upcoming
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${
        darkMode ? 'bg-gray-900/20' : 'bg-gray-50/30'
      }`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const activeColors = getTabActiveColor(tab.id);
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-1 
                text-xs sm:text-sm font-medium transition-all relative
                ${isActive 
                  ? activeColors
                  : darkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? '' : darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <span className="hidden xs:inline">{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] ml-1 ${
                  isActive 
                    ? darkMode ? 'text-gray-300' : 'text-gray-600'
                    : darkMode ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  ({tab.count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {activeTab === 'birthdays' && renderBirthdays()}
        {activeTab === 'anniversaries' && renderAnniversaries()}
        {activeTab === 'announcements' && renderAnnouncements()}
      </div>

      {/* Custom Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${darkMode ? '#1f2937' : 'transparent'};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${darkMode ? '#4b5563' : '#e2e8f0'}; 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: ${darkMode ? '#6b7280' : '#cbd5e1'}; 
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

const EmptyState = ({ icon: Icon, text, darkMode }) => (
  <div className={`flex flex-col items-center justify-center py-20 ${
    darkMode ? 'opacity-60' : 'opacity-40'
  }`}>
    <Icon className={`w-12 h-12 mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
    <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
      {text}
    </p>
  </div>
);

export default CombinedEventsCard;