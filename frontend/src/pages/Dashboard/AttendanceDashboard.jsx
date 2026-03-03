
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ThemeProvider } from '../../context/ThemeContext';
import { UserProvider } from '../../context/UserContext';

import { SidebarProvider } from '../../context/SidebarContext';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import Header from '../../components/layout/Header/Header';
import WelcomeSection from '../../components/dashboard/WelcomeSection/WelcomeSection';
import StatsSection from '../../components/dashboard/StatsSection/StatsSection';
import ChartsSection from '../../components/dashboard/ChartsSection/ChartsSection';
import ThreeColumnSection from '../../components/dashboard/ThreeColumnSection/ThreeColumnSection';
import PerformanceChartsSection from '../../components/dashboard/ChartsSection/PerformanceChartsSection';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import SearchAndFilter from '../../components/dashboard/SearchAndFilter/SearchAndFilter';
import DashboardCardsSection from '../../components/dashboard/DashboardCardsSection/DashboardCardsSection';
import { useDashboard } from '../../hooks/useDashboard';
import { useTheme } from '../../context/ThemeContext';
import { COMPONENT_VISIBILITY } from '../../constants/dashboardConstants';
import { generateEmployees } from '../../utils/dataGenerator';
import { X, Eye, EyeOff, Sliders } from 'lucide-react';

const MemoizedSearchAndFilter = React.memo(SearchAndFilter);

const DashboardContent = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('visibility'); // 'visibility', 'layout', 'presets'
  const [componentVisibility, setComponentVisibility] = useState(() => 
    Object.keys(COMPONENT_VISIBILITY).reduce((acc, key) => {
      acc[key] = COMPONENT_VISIBILITY[key].default;
      return acc;
    }, {})
  );
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const [employees] = useState(() => generateEmployees(100));
  const { darkMode } = useTheme();
  const popupRef = useRef(null);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSettingsOpen]);

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isSettingsOpen]);

  const employeeStats = {
    totalActive: 1284,
    trend: 8.4,
    trendDirection: 'up',
    thisMonth: { newJoinees: 42, resigned: 18, netGrowth: 24 },
    lastMonth: { newJoinees: 30, resigned: 22, netGrowth: 8 },
    departmentWise: [
      { dept: 'Engineering', count: 345, change: '+12' },
      { dept: 'Sales', count: 234, change: '+5' },
      { dept: 'Marketing', count: 156, change: '-2' },
      { dept: 'HR', count: 89, change: '+3' },
      { dept: 'Finance', count: 67, change: '+1' }
    ]
  };

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: 'John Smith', type: 'Sick Leave', requestDate: 'Jan 12, 2024', status: 'urgent', days: 5, department: 'Engineering', reason: 'Fever and cold' },
    { id: 2, employee: 'Emily Davis', type: 'Vacation', requestDate: 'Feb 5, 2024', status: 'pending', days: 3, department: 'Marketing', reason: 'Family trip' },
    { id: 3, employee: 'Michael Lee', type: 'Personal Leave', requestDate: 'Jan 28, 2024', status: 'overdue', days: 10, department: 'Sales', reason: 'Personal matters' },
    { id: 4, employee: 'Sophia Brown', type: 'Other', requestDate: 'Feb 10, 2024', status: 'pending', days: 2, department: 'HR', reason: 'Doctor appointment' }
  ]);

  const {
    stats,
    departmentData,
    last7DaysData,
    recentPunches,
    birthdays,
    anniversaries,
    trendData,
    deptPerformance,
    loading,
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filters,
    updateFilter,
    resetFilters,
  } = useDashboard(500);

  const toggleComponentVisibility = useCallback((key) => {
    setComponentVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const handleViewAllClick = useCallback(() => console.log('View all clicked'), []);
  const handleDeviceChange = useCallback((deviceId) => console.log('Device changed:', deviceId), []);
  const handleApproveLeave = useCallback((leave) => setLeaveRequests(prev => prev.filter(l => l.id !== leave.id)), []);
  const handleRejectLeave = useCallback((leave) => setLeaveRequests(prev => prev.filter(l => l.id !== leave.id)), []);
  const handleViewAllLeaves = useCallback(() => console.log('Navigating to all leaves page'), []);
  const handleViewEmployeeDetails = useCallback(() => console.log('Navigating to employee details'), []);

  // Settings popup open karne ke liye function
  const openSettingsPopup = useCallback((tab = 'visibility') => {
    setSettingsTab(tab);
    setIsSettingsOpen(true);
  }, []);

  const getSpacingClasses = () => {
    if (windowWidth < 640) return 'px-2 sm:px-3 py-3';
    if (windowWidth < 1024) return 'px-4 sm:px-5 py-4';
    return 'px-4 sm:px-6 lg:px-8 py-6';
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={`h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar onOpenSettings={openSettingsPopup} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header 
          activeMenuItem={activeMenuItem} 
          setActiveMenuItem={setActiveMenuItem}
        />

        <main className="flex-1 overflow-y-auto min-h-0">
          <div className={getSpacingClasses()}>
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-5 lg:mb-6">
              <WelcomeSection activeMenuItem={activeMenuItem} />
            </div>

            {/* Search and Filter */}
            {componentVisibility.searchAndFilter && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <MemoizedSearchAndFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={setSelectedDepartment}
                  filters={filters}
                  onFilterChange={updateFilter}
                  onResetFilters={resetFilters}
                  darkMode={darkMode}
                />
              </div>
            )}

            {/* Stats Cards */}
            {componentVisibility.statsCards && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <StatsSection stats={stats} darkMode={darkMode} />
              </div>
            )}

            {/* Dashboard Cards */}
            {componentVisibility.dashboardCards && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <DashboardCardsSection
                  darkMode={darkMode}
                  employeeStats={employeeStats}
                  leaveRequests={leaveRequests}
                  onApproveLeave={handleApproveLeave}
                  onRejectLeave={handleRejectLeave}
                  onViewAllLeaves={handleViewAllLeaves}
                  onViewEmployeeDetails={handleViewEmployeeDetails}
                />
              </div>
            )}

            {/* Charts */}
            {componentVisibility.charts && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <ChartsSection 
                  last7DaysData={last7DaysData} 
                  departmentData={departmentData} 
                />
              </div>
            )}

            {/* Three Column */}
            {componentVisibility.threeColumn && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <ThreeColumnSection
                  recentPunches={recentPunches}
                  employees={employees}
                  birthdays={birthdays}
                  anniversaries={anniversaries}
                  onViewAllClick={handleViewAllClick}
                  onDeviceChange={handleDeviceChange}
                />
              </div>
            )}

            {/* Performance Charts */}
            {componentVisibility.performanceCharts && (
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <div className={`
                  ${windowWidth < 640 ? 'h-[900px]' : ''}
                  ${windowWidth >= 640 && windowWidth < 1024 ? 'h-[1000px]' : ''}
                  ${windowWidth >= 1024 ? 'h-[600px]' : ''}
                `}>
                  <PerformanceChartsSection
                    trendData={trendData}
                    deptPerformance={deptPerformance}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Settings Popup */}
      {isSettingsOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsSettingsOpen(false)}
          />
          
          {/* Popup */}
          <div
            ref={popupRef}
            className="fixed inset-4 md:inset-10 z-[101] flex items-center justify-center"
          >
            <div className={`
              w-full max-w-2xl rounded-xl shadow-2xl border overflow-hidden
              ${darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
              }
            `}>
              {/* Header with Tabs */}
              <div className={`
                border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <div className="flex items-center justify-between p-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Settings
                  </h2>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className={`
                      p-1 rounded-lg transition-colors
                      ${darkMode 
                        ? 'hover:bg-gray-700 text-gray-400' 
                        : 'hover:bg-gray-100 text-gray-600'
                      }
                    `}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex px-4 gap-2">
                  <button
                    onClick={() => setSettingsTab('visibility')}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2
                      ${settingsTab === 'visibility'
                        ? darkMode 
                          ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                          : 'bg-gray-100 text-blue-600 border-b-2 border-blue-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <Eye size={16} />
                    Component Visibility
                  </button>
                  <button
                    onClick={() => setSettingsTab('layout')}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2
                      ${settingsTab === 'layout'
                        ? darkMode 
                          ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                          : 'bg-gray-100 text-blue-600 border-b-2 border-blue-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <Sliders size={16} />
                    Layout Settings
                  </button>
                  <button
                    onClick={() => setSettingsTab('presets')}
                    className={`
                      px-4 py-2 text-sm font-medium rounded-t-lg flex items-center gap-2
                      ${settingsTab === 'presets'
                        ? darkMode 
                          ? 'bg-gray-700 text-white border-b-2 border-blue-500' 
                          : 'bg-gray-100 text-blue-600 border-b-2 border-blue-500'
                        : darkMode
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    <EyeOff size={16} />
                    Visibility Presets
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {settingsTab === 'visibility' && (
                  <div className="space-y-4">
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Toggle components to show/hide them on the dashboard
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(COMPONENT_VISIBILITY).map(([key, { name }]) => (
                        <div
                          key={key}
                          className={`
                            flex items-center justify-between p-4 rounded-lg border
                            ${darkMode 
                              ? 'border-gray-700 hover:bg-gray-700/50' 
                              : 'border-gray-200 hover:bg-gray-50'
                            }
                            transition-colors cursor-pointer
                          `}
                          onClick={() => toggleComponentVisibility(key)}
                        >
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {name}
                          </span>
                          <div
                            className={`
                              relative inline-flex h-6 w-11 items-center rounded-full
                              transition-colors
                              ${componentVisibility[key] 
                                ? 'bg-blue-600' 
                                : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                              }
                            `}
                          >
                            <span
                              className={`
                                inline-block h-4 w-4 transform rounded-full bg-white 
                                transition-transform duration-200 ease-in-out
                                ${componentVisibility[key] ? 'translate-x-6' : 'translate-x-1'}
                              `}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {settingsTab === 'layout' && (
                  <div className="text-center py-8">
                    <Sliders size={48} className="mx-auto mb-4 opacity-50" />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Layout settings coming soon...
                    </p>
                  </div>
                )}

                {settingsTab === 'presets' && (
                  <div className="text-center py-8">
                    <EyeOff size={48} className="mx-auto mb-4 opacity-50" />
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Visibility presets coming soon...
                    </p>
                  </div>
                )}

                {/* Quick Actions for Visibility Tab */}
                {settingsTab === 'visibility' && (
                  <div className="mt-6 pt-6 border-t flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setComponentVisibility(prev => 
                          Object.keys(prev).reduce((acc, key) => {
                            acc[key] = true;
                            return acc;
                          }, {})
                        );
                      }}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg
                        ${darkMode 
                          ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }
                        transition-colors
                      `}
                    >
                      Show All
                    </button>
                    <button
                      onClick={() => {
                        setComponentVisibility(prev => 
                          Object.keys(prev).reduce((acc, key) => {
                            acc[key] = false;
                            return acc;
                          }, {})
                        );
                      }}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg
                        ${darkMode 
                          ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30' 
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }
                        transition-colors
                      `}
                    >
                      Hide All
                    </button>
                    <button
                      onClick={() => setIsSettingsOpen(false)}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg
                        ${darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }
                        transition-colors
                      `}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AttendanceDashboard = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <SidebarProvider>
          <DashboardContent />
        </SidebarProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default AttendanceDashboard;