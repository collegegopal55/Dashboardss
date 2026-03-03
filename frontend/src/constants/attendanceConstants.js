// Attendance types
export const ATTENDANCE_TYPES = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HALF_DAY: 'halfDay',
  LEAVE: 'leave',
  HOLIDAY: 'holiday',
  WEEKLY_OFF: 'weeklyOff',
  TOUR: 'tour',
   BIOMETRIC: 'biometric',
  MOBILE: 'mobile',
  MANUAL: 'manual'
};

// Employee status
export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'onLeave',
  TERMINATED: 'terminated'
};

// Months array
export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Full months object with details
export const MONTHS_DETAILS = {
  Jan: { name: 'January', days: 31, short: 'Jan' },
  Feb: { name: 'February', days: 28, short: 'Feb' },
  Mar: { name: 'March', days: 31, short: 'Mar' },
  Apr: { name: 'April', days: 30, short: 'Apr' },
  May: { name: 'May', days: 31, short: 'May' },
  Jun: { name: 'June', days: 30, short: 'Jun' },
  Jul: { name: 'July', days: 31, short: 'Jul' },
  Aug: { name: 'August', days: 31, short: 'Aug' },
  Sep: { name: 'September', days: 30, short: 'Sep' },
  Oct: { name: 'October', days: 31, short: 'Oct' },
  Nov: { name: 'November', days: 30, short: 'Nov' },
  Dec: { name: 'December', days: 31, short: 'Dec' }
};

// Department names
export const DEPARTMENTS = [
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

// Designations
export const DESIGNATIONS = [
  'Software Engineer',
  'Senior Software Engineer',
  'Team Lead',
  'Project Manager',
  'Sales Executive',
  'Marketing Specialist',
  'HR Manager',
  'Accountant',
  'Operations Manager',
  'IT Support Specialist',
  'Product Manager',
  'UI/UX Designer',
  'Legal Advisor'
];

// Leave types
export const LEAVE_TYPES = {
  SICK: 'Sick Leave',
  CASUAL: 'Casual Leave',
  EARNED: 'Earned Leave',
  MATERNITY: 'Maternity Leave',
  PATERNITY: 'Paternity Leave',
  UNPAID: 'Unpaid Leave',
  COMP_OFF: 'Compensatory Off'
};

// Shift timings
export const SHIFT_TIMINGS = {
  GENERAL: { start: '09:00', end: '18:00', name: 'General Shift' },
  MORNING: { start: '06:00', end: '15:00', name: 'Morning Shift' },
  AFTERNOON: { start: '14:00', end: '23:00', name: 'Afternoon Shift' },
  NIGHT: { start: '22:00', end: '07:00', name: 'Night Shift' }
};

// Device types
export const DEVICE_TYPES = {
  BIOMETRIC: 'biometric',
  RFID: 'rfid',
  FACIAL: 'facial',
  MOBILE: 'mobile'
};

// Punch status
export const PUNCH_STATUS = {
  IN: 'in',
  OUT: 'out',
  BREAK_OUT: 'breakOut',
  BREAK_IN: 'breakIn'
};