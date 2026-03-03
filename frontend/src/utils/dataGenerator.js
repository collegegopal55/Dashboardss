import { 
  DEPARTMENTS,
  DESIGNATIONS,
  ATTENDANCE_TYPES,
  EMPLOYEE_STATUS,
  MONTHS,
  LEAVE_TYPES,
  SHIFT_TIMINGS
} from '../constants';

// Helper function to generate random date
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate random phone number
const generatePhoneNumber = () => {
  const prefixes = ['987', '876', '765', '654', '543', '432', '321', '998', '887', '776'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `+91 ${prefix}${number}`;
};

// Generate random email
const generateEmail = (firstName, lastName) => {
  const domains = ['company.com', 'organization.org', 'business.net', 'corp.in'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
};

// Generate random employee ID
const generateEmployeeId = (index) => {
  const year = new Date().getFullYear();
  return `EMP${year}${index.toString().padStart(4, '0')}`;
};

// First names for random generation
const FIRST_NAMES = [
  'Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advik', 'Kabir', 'Arjun',
  'Sai', 'Ishaan', 'Aadhya', 'Anaya', 'Sara', 'Reyansh', 'Ayaan', 'Krishna',
  'Rohan', 'Priya', 'Amit', 'Neha', 'Raj', 'Pooja', 'Vikram', 'Sunita',
  'Deepak', 'Kavita', 'Sanjay', 'Meera', 'Alok', 'Shweta', 'Prakash', 'Anjali'
];

// Last names for random generation
const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Reddy',
  'Rao', 'Nair', 'Menon', 'Iyer', 'Desai', 'Mehta', 'Shah', 'Malhotra',
  'Chopra', 'Khanna', 'Kapoor', 'Saxena', 'Trivedi', 'Bhatt', 'Mishra', 'Dubey'
];

// Generate employees
export const generateEmployees = (count = 100) => {
  const employees = [];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date();

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const designation = DESIGNATIONS[Math.floor(Math.random() * DESIGNATIONS.length)];
    const joiningDate = randomDate(startDate, endDate);
    const status = EMPLOYEE_STATUS.ACTIVE; // Most employees active
    
    employees.push({
      id: generateEmployeeId(i + 1),
      employeeId: generateEmployeeId(i + 1),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhoneNumber(),
      department,
      designation,
      joiningDate: joiningDate.toISOString().split('T')[0],
      status,
      shift: Object.keys(SHIFT_TIMINGS)[Math.floor(Math.random() * Object.keys(SHIFT_TIMINGS).length)],
      manager: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 6)],
      bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'][Math.floor(Math.random() * 8)],
      emergencyContact: generatePhoneNumber(),
      profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
    });
  }

  return employees;
};

// Generate attendance data for a specific employee
export const generateEmployeeAttendance = (employeeId, month, year) => {
  const attendance = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    let status;
    let punchIn, punchOut;
    
    if (isWeekend) {
      status = ATTENDANCE_TYPES.WEEKLY_OFF;
    } else {
      const rand = Math.random();
      if (rand < 0.7) {
        status = ATTENDANCE_TYPES.PRESENT;
        punchIn = '09:00';
        punchOut = '18:00';
      } else if (rand < 0.85) {
        status = ATTENDANCE_TYPES.LATE;
        punchIn = '09:30';
        punchOut = '18:30';
      } else if (rand < 0.95) {
        status = ATTENDANCE_TYPES.LEAVE;
      } else {
        status = ATTENDANCE_TYPES.ABSENT;
      }
    }
    
    attendance.push({
      date: date.toISOString().split('T')[0],
      employeeId,
      status,
      punchIn,
      punchOut,
      workingHours: punchIn && punchOut ? '9h 0m' : '0h 0m',
      overtime: '0h 0m'
    });
  }
  
  return attendance;
};

// // Generate recent punches - FIXED VERSION
// export const generateRecentPunches = (employees, count = 20) => {
//   const punches = [];
//   const now = new Date();
  
//   // Active employees ही लें
//   const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE);
  
//   for (let i = 0; i < count; i++) {
//     const employee = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
//     const punchTime = new Date(now - Math.random() * 3600000 * 8); // Last 8 hours
    
//     // ✅ बेहतर unique ID - crypto.randomUUID() use करें
//     const uniqueId = crypto.randomUUID 
//       ? `punch-${crypto.randomUUID()}`
//       : `punch-${employee.id}-${punchTime.getTime()}-${Math.random().toString(36).substr(2, 9)}`;
    
//     punches.push({
//       id: uniqueId, // ✅ अब truly unique
//       employeeId: employee.id,
//       employeeName: employee.name,
//       department: employee.department,
//       // ✅ अलग-अलग types की punches
//       type: ['biometric', 'mobile', 'manual'][Math.floor(Math.random() * 3)],
//       time: punchTime.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: false 
//       }),
//       date: punchTime.toISOString().split('T')[0],
//       device: ['Main Gate', 'Side Gate', 'Office Entry', 'Mobile App'][Math.floor(Math.random() * 4)],
//       status: Math.random() > 0.9 ? 'warning' : 'normal',
//       timestamp: punchTime.getTime() // sorting के लिए
//     });
//   }
  
//   // नई से पुरानी की तरफ sort करें
//   return punches.sort((a, b) => b.timestamp - a.timestamp);
// };

// Generate recent punches - UPDATED VERSION with proper fields
export const generateRecentPunches = (employees, count = 20) => {
  const punches = [];
  const now = new Date();
  
  // Active employees hi len
  const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE);
  
  for (let i = 0; i < count; i++) {
    const employee = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
    if (!employee) continue;
    
    const punchTime = new Date(now - Math.random() * 3600000 * 8); // Last 8 hours
    const punchTypes = ['biometric', 'mobile', 'manual'];
    const devices = ['Main Gate', 'Side Gate', 'Office Entry', 'Mobile App'];
    const punchStatus = ['in', 'out'][Math.floor(Math.random() * 2)]; // Random in/out
    
    // Format time properly
    const hours = punchTime.getHours().toString().padStart(2, '0');
    const minutes = punchTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    
    // Format date
    const date = punchTime.toISOString().split('T')[0];
    
    punches.push({
      id: `punch-${employee.id}-${punchTime.getTime()}-${Math.random().toString(36).substr(2, 5)}`,
      employeeId: employee.employeeId || employee.id,
      employeeName: employee.name,
      name: employee.name, // For backward compatibility
      empCode: employee.employeeId || employee.id, // For backward compatibility
      department: employee.department,
      type: punchTypes[Math.floor(Math.random() * punchTypes.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      status: punchStatus, // 'in' or 'out'
      time: formattedTime,
      date: date,
      timestamp: punchTime.getTime(),
      punchIn: punchStatus === 'in' ? formattedTime : null,
      punchOut: punchStatus === 'out' ? formattedTime : null,
    });
  }
  
  // Sort by timestamp (newest first)
  return punches.sort((a, b) => b.timestamp - a.timestamp);
};



// Generate birthdays for current month
export const generateBirthdays = (employees) => {
  const currentMonth = new Date().getMonth();
  
  return employees
    .filter(emp => {
      const joiningDate = new Date(emp.joiningDate);
      return joiningDate.getMonth() === currentMonth;
    })
    .slice(0, 20)
    .map(emp => ({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      date: new Date(emp.joiningDate).getDate(),
      type: 'birthday'
    }));
};

// Generate anniversaries for current month
export const generateAnniversaries = (employees) => {
  const currentMonth = new Date().getMonth();
  
  return employees
    .filter(emp => {
      const joiningDate = new Date(emp.joiningDate);
      return joiningDate.getMonth() === currentMonth;
    })
    .slice(0, 19)
    .map(emp => ({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      date: new Date(emp.joiningDate).getDate(),
      year: new Date().getFullYear() - new Date(emp.joiningDate).getFullYear(),
      type: 'anniversary'
    }));
};

// Generate leave requests
export const generateLeaveRequests = (employees, count = 20) => {
  const leaveRequests = [];
  const leaveTypes = Object.values(LEAVE_TYPES);
  
  for (let i = 0; i < count; i++) {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);
    
    leaveRequests.push({
      id: `leave_${i}`,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
      reason: ['Personal', 'Sick', 'Family Function', 'Travel'][Math.floor(Math.random() * 4)],
      status: ['Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 3)]
    });
  }
  
  return leaveRequests;
};

// Generate department-wise data for charts
export const generateDepartmentData = (employees) => {
  const deptMap = new Map();
  
  employees.forEach(emp => {
    const count = deptMap.get(emp.department) || 0;
    deptMap.set(emp.department, count + 1);
  });
  
  return Array.from(deptMap.entries()).map(([name, value]) => ({
    name,
    value
  }));
};

// Generate trend data for charts
export const generateTrendData = () => {
  const data = [];
  const months = MONTHS;
  
  months.forEach(month => {
    data.push({
      month,
      present: Math.floor(Math.random() * 300) + 200,
      absent: Math.floor(Math.random() * 50) + 10,
      late: Math.floor(Math.random() * 40) + 10,
      leave: Math.floor(Math.random() * 30) + 5
    });
  });
  
  return data;
};

// Generate last 7 days attendance data
export const generateLast7DaysData = () => {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  days.forEach(day => {
    data.push({
      day,
      present: Math.floor(Math.random() * 80) + 20,
      absent: Math.floor(Math.random() * 20) + 5,
      late: Math.floor(Math.random() * 15) + 5,
      leave: Math.floor(Math.random() * 10) + 2
    });
  });
  
  return data;
};

// Generate department performance data for radar chart
export const generateDeptPerformance = () => {
  const metrics = ['Attendance', 'Punctuality', 'Productivity', 'Quality', 'Teamwork', 'Initiative'];
  const departments = DEPARTMENTS.slice(0, 5); // Use first 5 departments
  
  return departments.map(dept => ({
    department: dept,
    ...metrics.reduce((acc, metric) => {
      acc[metric] = Math.floor(Math.random() * 40) + 60; // Random between 60-100
      return acc;
    }, {})
  }));
};

// Default export with all generators
export default {
  generateEmployees,
  generateEmployeeAttendance,
  generateRecentPunches,
  generateBirthdays,
  generateAnniversaries,
  generateLeaveRequests,
  generateDepartmentData,
  generateTrendData,
  generateLast7DaysData,
  generateDeptPerformance
};