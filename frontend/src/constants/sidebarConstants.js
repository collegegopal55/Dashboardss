
import { 
  LayoutDashboard, Settings, TrendingUp, Calendar, 
  Phone, Megaphone, Calendar as CalendarIcon, CalendarDays,
  Eye, EyeOff, Sliders
} from 'lucide-react';

export const MANAGE_ITEMS = [
  { name: 'Important Dates', icon: Calendar },
  { name: 'Important Number', icon: Phone },
  { name: 'Announcement', icon: Megaphone },
];

export const REPORT_ITEMS = [
  { name: 'View Important Dates', icon: Calendar },
  { name: 'Calendar', icon: CalendarIcon },
  { name: 'Complete Session Calendar', icon: CalendarDays },
];

// Component visibility ke liye alag se item
export const COMPONENT_VISIBILITY_ITEMS = [
  { name: 'Component Visibility', icon: Eye },
  { name: 'Layout Settings', icon: Sliders },
  { name: 'Visibility Presets', icon: EyeOff },
];

export const SIDEBAR_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, hasDropdown: false },
  { 
    name: 'MANAGE', 
    icon: Settings, 
    hasDropdown: true, 
    dropdownItems: MANAGE_ITEMS 
  },
  { 
    name: 'REPORT', 
    icon: TrendingUp, 
    hasDropdown: true, 
    dropdownItems: REPORT_ITEMS 
  },
  { 
    name: 'Settings', 
    icon: Settings, 
    hasDropdown: true, 
    dropdownItems: COMPONENT_VISIBILITY_ITEMS 
  },
];