import { 
  Home, Users, Clock3, CalendarDays, FileSpreadsheet,
  Calendar, Phone, Megaphone, Calendar as CalendarIcon, CalendarDays as CalendarDaysIcon,
  LayoutDashboard, Settings, TrendingUp, Bell, UserPlus,
  Moon, Sun, ChevronLeft, ChevronRight, LogOut, HelpCircle, 
  FileText, Shield, Eye, EyeOff, ChevronDown, ChevronUp, MapPin, Clock,
  AlertCircle, CheckCircle, XCircle, Briefcase, UserCheck
} from 'lucide-react';

// Main Navigation Items
export const MAIN_NAV_ITEMS = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Employee', icon: Users, path: '/employees' },
  { name: 'Attendance', icon: Clock3, path: '/attendance' },
  { name: 'Leave', icon: CalendarDays, path: '/leave' },
  { name: 'Payroll', icon: FileSpreadsheet, path: '/payroll' },
];

// Component Visibility Settings
export const COMPONENT_VISIBILITY = {
  statsCards: { name: 'Statistics Cards', default: true },
  charts: { name: 'Charts', default: true },
  recentPunches: { name: 'Recent Punches', default: true },
  employeeTable: { name: 'Employee Table', default: true },
  performanceCharts: { name: 'Performance Charts', default: true },
  importantSection: { name: 'Important Section', default: true },
  combinedEvents: { name: 'Combined Events', default: true },
  searchAndFilter: { name: 'Search & Filter', default: true },
  threeColumn: { name: 'Three Column Section', default: true },
  settings: { name: 'Settings Panel', default: false },
  dashboardCards: { name: 'Dashboard Cards', default: true },
};

// Important Dates
export const IMPORTANT_DATES = [
  { title: 'Board Meeting', date: 'Mar 15, 2026', type: 'meeting', icon: Calendar },
  { title: 'Salary Day', date: 'Apr 01, 2026', type: 'payroll', icon: FileSpreadsheet },
  { title: 'Company Holiday', date: 'Apr 15, 2026', type: 'holiday', icon: CalendarDaysIcon },
  { title: 'Review Cycle', date: 'Apr 30, 2026', type: 'review', icon: UserCheck },
];

// Important Numbers
export const IMPORTANT_NUMBERS = [
  { label: 'Emergency', number: '+91 12345 67890', type: 'emergency', icon: Phone },
  { label: 'IT Support', number: '+91 98765 43210', type: 'it', icon: Briefcase },
  { label: 'HR Helpline', number: '+91 11223 44556', type: 'hr', icon: Users },
  { label: 'Security', number: '+91 55667 88990', type: 'security', icon: Shield },
];

// Announcements
export const ANNOUNCEMENTS = [
  { title: 'Office Closed on Holi', date: 'Mar 25, 2026', priority: 'high', icon: Megaphone },
  { title: 'New HR Policy Update', date: 'Mar 20, 2026', priority: 'medium', icon: FileText },
  { title: 'Team Building Event', date: 'Mar 28, 2026', priority: 'low', icon: Users },
  { title: 'System Maintenance', date: 'Mar 18, 2026', priority: 'high', icon: Settings },
];

// Dashboard Stats Types
export const STATS_TYPES = {
  ACTIVE_USER: 'ACTIVE USER',
  ON_TIME: 'ON TIME',
  LATE: 'LATE',
  ABSENT: 'ABSENT',
  LEAVE: 'LEAVE',
  TOUR: 'TOUR',
  HOLIDAY: 'HOLIDAY',
  WEEKLY_OFF: 'WEEKLY OFF'
};

// Chart Colors
export const CHART_COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  pink: '#EC4899',
  teal: '#14B8A6',
  orange: '#F97316',
  cyan: '#06B6D4',
  indigo: '#6366F1'
};

// Time Ranges
export const TIME_RANGES = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  FULL: 'MMM dd, yyyy HH:mm'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Export all as default for convenience
export default {
  MAIN_NAV_ITEMS,
  COMPONENT_VISIBILITY,
  IMPORTANT_DATES,
  IMPORTANT_NUMBERS,
  ANNOUNCEMENTS,
  STATS_TYPES,
  CHART_COLORS,
  TIME_RANGES,
  DATE_FORMATS,
  NOTIFICATION_TYPES
};