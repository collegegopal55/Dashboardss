import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
  RefreshCw,
  SlidersHorizontal,
  Check,
  Users,
  Briefcase,
  Building2
} from 'lucide-react';

const SearchAndFilter = ({
  searchTerm = '',
  onSearchChange,
  selectedDepartment = 'all',
  onDepartmentChange,
  filters = {},
  onFilterChange,
  onResetFilters,
  darkMode = false,
  departments = [],
  locations = [],
  shifts = [],
  statuses = [],
  showAdvancedFilters = true,
  className = ''
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Default options if none provided
  const defaultDepartments = [
    'Engineering',
    'Sales',
    'Marketing',
    'HR',
    'Finance',
    'Operations',
    'IT Support',
    'Product',
    'Design',
    'Legal'
  ];

  const defaultLocations = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Pune',
    'Chennai',
    'Hyderabad',
    'Kolkata',
    'Ahmedabad'
  ];

  const defaultShifts = [
    'General',
    'Morning',
    'Afternoon',
    'Night'
  ];

  const defaultStatuses = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'inactive', label: 'Inactive', color: 'gray' },
    { value: 'onLeave', label: 'On Leave', color: 'yellow' },
    { value: 'terminated', label: 'Terminated', color: 'red' }
  ];

  // Use provided options or defaults
  const departmentOptions = departments.length > 0 ? departments : defaultDepartments;
  const locationOptions = locations.length > 0 ? locations : defaultLocations;
  const shiftOptions = shifts.length > 0 ? shifts : defaultShifts;
  const statusOptions = statuses.length > 0 ? statuses : defaultStatuses;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        onSearchChange?.(localSearchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, onSearchChange]);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedDepartment && selectedDepartment !== 'all') count++;
    if (filters.status && filters.status !== 'all') count++;
    if (filters.shift && filters.shift !== 'all') count++;
    if (filters.location && filters.location !== 'all') count++;
    if (filters.dateRange?.start || filters.dateRange?.end) count++;
    setActiveFilterCount(count);
  }, [selectedDepartment, filters]);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange?.('');
  };

  const handleFilterChange = (key, value) => {
    onFilterChange?.(key, value === 'all' ? 'all' : value);
  };

  const handleResetFilters = () => {
    setLocalSearchTerm('');
    onSearchChange?.('');
    onResetFilters?.();
    setShowFilters(false);
  };

  const FilterBadge = ({ label, onRemove }) => (
    <span className={`
      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
      ${darkMode 
        ? 'bg-blue-900/30 text-blue-400 border border-blue-800' 
        : 'bg-blue-50 text-blue-700 border border-blue-200'
      }
    `}>
      {label}
      <button
        onClick={onRemove}
        className="ml-1.5 hover:opacity-70"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );

  const SelectField = ({ icon: Icon, label, value, options, onChange, placeholder }) => (
    <div className="relative">
      <label className={`block text-xs font-medium mb-1 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
        )}
        <select
          value={value || 'all'}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full pl-9 pr-8 py-2 rounded-lg text-sm appearance-none
            border transition-colors focus:outline-none focus:ring-2
            ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500/30' 
              : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
            }
          `}
        >
          <option value="all">{placeholder || `All ${label}`}</option>
          {options.map((opt) => {
            if (typeof opt === 'string') {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              );
            }
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label || opt.value}
              </option>
            );
          })}
        </select>
        <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`} />
      </div>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <input
            type="text"
            value={localSearchTerm}
            onChange={handleSearchChange}
            placeholder="Search employees by name, email, department..."
            className={`
              w-full pl-10 pr-10 py-2.5 rounded-lg text-sm
              border transition-colors focus:outline-none focus:ring-2
              ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500/30' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500/20 focus:border-blue-500'
              }
            `}
          />
          {localSearchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className={`w-4 h-4 ${
                darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
              }`} />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        {showAdvancedFilters && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`
              relative px-4 py-2.5 rounded-lg text-sm font-medium
              border transition-colors flex items-center gap-2
              ${showFilters
                ? darkMode
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-blue-50 border-blue-300 text-blue-700'
                : darkMode
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className={`
                absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs
                flex items-center justify-center
                ${darkMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-600 text-white'
                }
              `}>
                {activeFilterCount}
              </span>
            )}
          </button>
        )}

        {/* Reset Button - shown when filters are active */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleResetFilters}
            className={`
              px-3 py-2.5 rounded-lg text-sm font-medium
              border transition-colors flex items-center gap-2
              ${darkMode
                ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            `}
            title="Reset all filters"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Active Filters Badges */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Active filters:
          </span>
          
          {selectedDepartment && selectedDepartment !== 'all' && (
            <FilterBadge
              label={`Dept: ${selectedDepartment}`}
              onRemove={() => onDepartmentChange?.('all')}
            />
          )}
          
          {filters.status && filters.status !== 'all' && (
            <FilterBadge
              label={`Status: ${filters.status}`}
              onRemove={() => handleFilterChange('status', 'all')}
            />
          )}
          
          {filters.shift && filters.shift !== 'all' && (
            <FilterBadge
              label={`Shift: ${filters.shift}`}
              onRemove={() => handleFilterChange('shift', 'all')}
            />
          )}
          
          {filters.location && filters.location !== 'all' && (
            <FilterBadge
              label={`Location: ${filters.location}`}
              onRemove={() => handleFilterChange('location', 'all')}
            />
          )}
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && showFilters && (
        <div className={`
          p-4 rounded-lg border
          ${darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
          }
        `}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-medium ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Advanced Filters
            </h3>
            <button
              onClick={() => setShowFilters(false)}
              className={`p-1 rounded-lg ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Department Filter */}
            <SelectField
              icon={Briefcase}
              label="Department"
              value={selectedDepartment}
              options={departmentOptions}
              onChange={onDepartmentChange}
              placeholder="All Departments"
            />

            {/* Status Filter */}
            <SelectField
              icon={UserCheck}
              label="Status"
              value={filters.status}
              options={statusOptions}
              onChange={(val) => handleFilterChange('status', val)}
              placeholder="All Statuses"
            />

            {/* Shift Filter */}
            <SelectField
              icon={Clock}
              label="Shift"
              value={filters.shift}
              options={shiftOptions}
              onChange={(val) => handleFilterChange('shift', val)}
              placeholder="All Shifts"
            />

            {/* Location Filter */}
            <SelectField
              icon={MapPin}
              label="Location"
              value={filters.location}
              options={locationOptions}
              onChange={(val) => handleFilterChange('location', val)}
              placeholder="All Locations"
            />
          </div>

          {/* Quick Filter Actions */}
          <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }">
            <button
              onClick={handleResetFilters}
              className={`
                px-3 py-1.5 rounded-lg text-sm transition-colors
                ${darkMode
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              Reset All
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-medium
                ${darkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Quick filters:
        </span>
        
        <button
          onClick={() => {
            onDepartmentChange?.('Engineering');
            setShowFilters(true);
          }}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            border transition-colors
            ${darkMode
              ? 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          Engineering
        </button>
        
        <button
          onClick={() => {
            handleFilterChange('status', 'active');
            setShowFilters(true);
          }}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            border transition-colors
            ${darkMode
              ? 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          Active Only
        </button>
        
        <button
          onClick={() => {
            handleFilterChange('shift', 'Night');
            setShowFilters(true);
          }}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            border transition-colors
            ${darkMode
              ? 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          Night Shift
        </button>
        
        <button
          onClick={() => {
            handleFilterChange('location', 'Bangalore');
            setShowFilters(true);
          }}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            border transition-colors
            ${darkMode
              ? 'border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }
          `}
        >
          Bangalore
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;