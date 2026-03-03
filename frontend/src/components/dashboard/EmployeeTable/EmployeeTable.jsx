import React, { useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreVertical,
  Eye,
  Edit,
  Download,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BadgeCheck,
  Clock,
  AlertCircle
} from 'lucide-react';

const EmployeeTable = ({ 
  employees = [], 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  darkMode = false,
  onViewEmployee,
  onEditEmployee,
  onExportEmployee
}) => {
  
  // Get status badge color
  const getStatusBadge = (status) => {
    const statusMap = {
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', icon: BadgeCheck },
      inactive: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400', icon: Clock },
      'onLeave': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Calendar },
      terminated: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle }
    };
    return statusMap[status?.toLowerCase()] || statusMap.active;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get shift badge color
  const getShiftBadge = (shift) => {
    const shiftMap = {
      GENERAL: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      MORNING: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      AFTERNOON: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      NIGHT: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
    };
    return shiftMap[shift?.toUpperCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  if (!employees || employees.length === 0) {
    return (
      <div className={`w-full p-8 text-center rounded-xl border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Users className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No employees found
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full rounded-xl border overflow-hidden ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${
              darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
            }`}>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                <div className="flex items-center space-x-1">
                  <input 
                    type="checkbox" 
                    className={`rounded ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Shift
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Joining Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            darkMode ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {employees.map((employee, index) => {
              const StatusIcon = getStatusBadge(employee.status).icon;
              
              return (
                <tr 
                  key={employee.id || index}
                  className={`transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700/50' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className={`rounded ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10">
                        {employee.profileImage ? (
                          <img 
                            src={employee.profileImage} 
                            alt={employee.name}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=3B82F6&color=fff`;
                            }}
                          />
                        ) : (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <span className={`text-sm font-medium ${
                              darkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                              {employee.name?.charAt(0) || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {employee.name || 'N/A'}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {employee.employeeId || employee.id || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-900'
                    }`}>
                      {employee.department || 'N/A'}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {employee.designation || 'N/A'}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadge(employee.status).color
                    }`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {employee.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getShiftBadge(employee.shift)
                    }`}>
                      {employee.shift || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className={`w-4 h-4 mr-2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-900'
                      }`}>
                        {formatDate(employee.joiningDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className={`w-4 h-4 mr-2 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-900'
                      }`}>
                        {employee.location || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <Mail className={`w-3 h-3 mr-1 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {employee.email || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Phone className={`w-3 h-3 mr-1 ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {employee.phone || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewEmployee?.(employee)}
                        className={`p-1 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditEmployee?.(employee)}
                        className={`p-1 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onExportEmployee?.(employee)}
                        className={`p-1 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="Export Data"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className={`p-1 rounded-lg transition-colors ${
                          darkMode 
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                        }`}
                        title="More Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={`px-6 py-4 border-t ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} employees
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300 disabled:hover:bg-transparent disabled:opacity-50' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 disabled:hover:bg-transparent disabled:opacity-50'
              }`}
              title="First Page"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300 disabled:hover:bg-transparent disabled:opacity-50' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 disabled:hover:bg-transparent disabled:opacity-50'
              }`}
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1">
              {pageNumbers.map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? onPageChange(page) : null}
                  disabled={page === '...'}
                  className={`
                    min-w-[2.5rem] h-10 rounded-lg text-sm font-medium transition-colors
                    ${page === currentPage 
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-600'
                      : page === '...'
                        ? darkMode
                          ? 'text-gray-500 cursor-default'
                          : 'text-gray-400 cursor-default'
                        : darkMode
                          ? 'text-gray-400 hover:bg-gray-700 hover:text-gray-300'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300 disabled:hover:bg-transparent disabled:opacity-50' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 disabled:hover:bg-transparent disabled:opacity-50'
              }`}
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300 disabled:hover:bg-transparent disabled:opacity-50' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 disabled:hover:bg-transparent disabled:opacity-50'
              }`}
              title="Last Page"
            >
              <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add default props
EmployeeTable.defaultProps = {
  employees: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  darkMode: false,
  onViewEmployee: (employee) => console.log('View employee:', employee),
  onEditEmployee: (employee) => console.log('Edit employee:', employee),
  onExportEmployee: (employee) => console.log('Export employee:', employee)
};

export default EmployeeTable;