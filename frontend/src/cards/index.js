// सबसे पहले सभी cards को import करें
import StatCard, { 
  StatCardCompact, 
  StatCardDetailed,
  StatCardPrimary,
  StatCardSuccess,
  StatCardWarning,
  StatCardDanger
} from './StatCard';

import AttendanceDeviceCard from './AttendanceDeviceCard';
import RecentPunchesCard from './RecentPunchesCard';
import CombinedEventsCard from './CombinedEventsCard';
import PendingLeaveCard from './PendingLeaveCard';
import ActiveEmployeesCard from './ActiveEmployeesCard';

// सभी cards को individually export करें
export { default as StatCard } from './StatCard';
export { default as AttendanceDeviceCard } from './AttendanceDeviceCard';
export { default as RecentPunchesCard } from './RecentPunchesCard';
export { default as CombinedEventsCard } from './CombinedEventsCard';
export { default as PendingLeaveCard } from './PendingLeaveCard';
export { default as ActiveEmployeesCard } from './ActiveEmployeesCard';

// StatCard variants को अलग से export करें
export { 
  StatCardCompact, 
  StatCardDetailed,
  StatCardPrimary,
  StatCardSuccess,
  StatCardWarning,
  StatCardDanger
} from './StatCard';

// Export all cards as a single object for convenience
export const Cards = {
  StatCard,
  AttendanceDeviceCard,
  RecentPunchesCard,
  CombinedEventsCard,
  PendingLeaveCard,
  ActiveEmployeesCard,
  StatCardCompact,
  StatCardDetailed,
  StatCardPrimary,
  StatCardSuccess,
  StatCardWarning,
  StatCardDanger
};