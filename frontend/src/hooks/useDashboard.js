import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  generateEmployees, 
  generateRecentPunches, 
  generateBirthdays, 
  generateAnniversaries,
  generateLeaveRequests,
  generateDepartmentData,
  generateTrendData,
  generateLast7DaysData,
  generateDeptPerformance
} from '../utils/dataGenerator';

export const useDashboard = (employeeCount = 500) => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: 'all',
    shift: 'all',
    location: 'all'
  });

  // Stats state
  const [stats, setStats] = useState({
    activeUsers: 0,
    totalEmployees: 0,
    todayAttendance: {
      onTime: 0,
      late: 0,
      absent: 0,
      leave: 0,
      tour: 0,
      holiday: 0,
      weeklyOff: 0
    }
  });

  // Data for charts
  const [departmentData, setDepartmentData] = useState([]);
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [deptPerformance, setDeptPerformance] = useState([]);
  const [recentPunches, setRecentPunches] = useState([]);
  const [birthdays, setBirthdays] = useState([]);
  const [anniversaries, setAnniversaries] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const generatedEmployees = generateEmployees(employeeCount);
        setEmployees(generatedEmployees);
        
        // Generate stats
        const activeCount = generatedEmployees.length;
        setStats({
          activeUsers: activeCount,
          totalEmployees: generatedEmployees.length,
          todayAttendance: {
            onTime: Math.floor(activeCount * 0.7),
            late: Math.floor(activeCount * 0.15),
            absent: Math.floor(activeCount * 0.05),
            leave: Math.floor(activeCount * 0.05),
            tour: Math.floor(activeCount * 0.02),
            holiday: Math.floor(activeCount * 0.02),
            weeklyOff: Math.floor(activeCount * 0.01)
          }
        });

        // Generate chart data
        setDepartmentData(generateDepartmentData(generatedEmployees));
        setLast7DaysData(generateLast7DaysData());
        setTrendData(generateTrendData());
        setDeptPerformance(generateDeptPerformance());
        
        // Generate cards data
        setRecentPunches(generateRecentPunches(generatedEmployees, 20));
        setBirthdays(generateBirthdays(generatedEmployees));
        setAnniversaries(generateAnniversaries(generatedEmployees));
        setLeaveRequests(generateLeaveRequests(generatedEmployees, 10));
        
        setLoading(false);
      }, 1500);
    };

    loadData();
  }, [employeeCount]);

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment = selectedDepartment === 'all' || 
        emp.department === selectedDepartment;

      // Status filter
      const matchesStatus = filters.status === 'all' || 
        emp.status === filters.status;

      // Shift filter
      const matchesShift = filters.shift === 'all' || 
        emp.shift === filters.shift;

      // Location filter
      const matchesLocation = filters.location === 'all' || 
        emp.location === filters.location;

      return matchesSearch && matchesDepartment && matchesStatus && 
             matchesShift && matchesLocation;
    });
  }, [employees, searchTerm, selectedDepartment, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, filters]);

  // Update filter
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setFilters({
      status: 'all',
      shift: 'all',
      location: 'all'
    });
  }, []);

  return {
    // Data
    employees,
    stats,
    departmentData,
    last7DaysData,
    recentPunches,
    birthdays,
    anniversaries,
    leaveRequests,
    trendData,
    deptPerformance,
    
    // Loading state
    loading,
    
    // Search and filters
    searchTerm,
    setSearchTerm,
    selectedDepartment,
    setSelectedDepartment,
    filters,
    updateFilter,
    resetFilters,
    
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredEmployees,
    paginatedEmployees,
    
    // Feature toggles (if needed)
    featureToggles: {},
    toggleFeature: () => {}
  };
};