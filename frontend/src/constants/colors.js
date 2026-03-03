export const COLORS = {
  primary: '#3B82F6',      // Blue
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Yellow/Orange
  danger: '#EF4444',       // Red
  purple: '#8B5CF6',       // Purple
  pink: '#EC4899',         // Pink
  teal: '#14B8A6',         // Teal
  gray: '#6B7280',         // Gray
  indigo: '#6366F1',       // Indigo
  cyan: '#06B6D4',         // Cyan
  orange: '#F97316',       // Orange
  amber: '#FBBF24',        // Amber
  lime: '#84CC16',         // Lime
  emerald: '#10B981',      // Emerald
  sky: '#0EA5E9',          // Sky
  violet: '#8B5CF6',       // Violet
  fuchsia: '#D946EF',      // Fuchsia
  rose: '#F43F5E',         // Rose
};

// Chart color palette
export const CHART_COLORS = [
  COLORS.primary,
  COLORS.success,
  COLORS.warning,
  COLORS.danger,
  COLORS.purple,
  COLORS.pink,
  COLORS.teal,
  COLORS.indigo,
  COLORS.cyan,
  COLORS.orange
];

// Status colors
export const STATUS_COLORS = {
  active: COLORS.success,
  inactive: COLORS.gray,
  onLeave: COLORS.warning,
  terminated: COLORS.danger,
  pending: COLORS.warning,
  approved: COLORS.success,
  rejected: COLORS.danger
};

// Department colors (for charts)
export const DEPARTMENT_COLORS = {
  Engineering: COLORS.primary,
  Sales: COLORS.success,
  Marketing: COLORS.warning,
  HR: COLORS.purple,
  Finance: COLORS.pink,
  Operations: COLORS.teal,
  'IT Support': COLORS.indigo,
  Product: COLORS.cyan,
  Design: COLORS.orange,
  Legal: COLORS.rose
};

export default COLORS;