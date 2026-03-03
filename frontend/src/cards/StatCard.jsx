import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Info,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const StatCard = ({ 
  stat, 
  activeUsers, 
  darkMode = false,
  showTrend = true,
  onClick,
  onHover,
  size = 'default' // 'small', 'default', 'large'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trend, setTrend] = useState(null);

  // Generate random trend for demo purposes
  // In real app, this would come from props
  useEffect(() => {
    if (showTrend) {
      const trendValue = (Math.random() * 20 - 10).toFixed(1);
      const trendType = trendValue > 0 ? 'up' : trendValue < 0 ? 'down' : 'flat';
      setTrend({
        value: Math.abs(trendValue),
        type: trendType,
        percentage: Math.abs(parseFloat(trendValue))
      });
    }
  }, [showTrend]);

  // Calculate percentage of active users
  const calculatePercentage = () => {
    if (!activeUsers || activeUsers === 0) return 0;
    return ((stat.value / activeUsers) * 100).toFixed(1);
  };

  const percentage = calculatePercentage();

  // Size classes
  const sizeClasses = {
    small: {
      container: 'p-3',
      icon: 'w-4 h-4',
      value: 'text-lg',
      label: 'text-xs'
    },
    default: {
      container: 'p-4',
      icon: 'w-6 h-6',
      value: 'text-xl',
      label: 'text-sm'
    },
    large: {
      container: 'p-6',
      icon: 'w-8 h-8',
      value: 'text-2xl',
      label: 'text-base'
    }
  };

  const currentSize = sizeClasses[size];

  // Trend icon and color
  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch(trend.type) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-500" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch(trend.type) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  // Handle click with animation feedback
  const handleClick = () => {
    if (onClick) {
      onClick(stat);
    }
  };

  // Handle hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover(stat, true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onHover) {
      onHover(stat, false);
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative rounded-xl border transition-all duration-200
        ${darkMode 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-white border-gray-200 hover:border-gray-300'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${isHovered ? 'transform scale-105 shadow-lg' : 'shadow-sm'}
        ${currentSize.container}
      `}
    >
      {/* Top section with icon and optional info tooltip */}
      <div className="flex items-start justify-between">
        <div 
          className={`
            p-2 rounded-lg
            ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
          `}
          style={{ 
            backgroundColor: isHovered ? stat.color : undefined,
            transition: 'background-color 0.2s'
          }}
        >
          <stat.icon 
            className={`
              ${currentSize.icon}
              ${isHovered 
                ? 'text-white' 
                : darkMode 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
              }
            `}
            style={{ 
              color: isHovered ? 'white' : stat.color,
              transition: 'color 0.2s'
            }}
          />
        </div>
        
        {/* Info tooltip - shown on hover */}
        {stat.description && (
          <div className="relative group">
            <Info className={`
              w-4 h-4 cursor-help
              ${darkMode ? 'text-gray-500' : 'text-gray-400'}
            `} />
            <div className={`
              absolute right-0 top-6 w-48 p-2 rounded-lg text-xs
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-10
              ${darkMode 
                ? 'bg-gray-900 text-gray-300 border border-gray-700' 
                : 'bg-white text-gray-600 border border-gray-200 shadow-lg'
              }
            `}>
              {stat.description}
            </div>
          </div>
        )}
      </div>

      {/* Value and label */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <span className={`
            font-bold ${currentSize.value}
            ${darkMode ? 'text-white' : 'text-gray-900'}
          `}>
            {stat.value?.toLocaleString()}
          </span>
          
          {/* Percentage badge */}
          {activeUsers > 0 && (
            <span className={`
              text-xs px-1.5 py-0.5 rounded-full
              ${darkMode 
                ? 'bg-gray-700 text-gray-300' 
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {percentage}%
            </span>
          )}
        </div>
        
        <p className={`
          ${currentSize.label}
          ${darkMode ? 'text-gray-400' : 'text-gray-500'}
          mt-0.5
        `}>
          {stat.name}
        </p>
      </div>

      {/* Trend indicator */}
      {showTrend && trend && (
        <div className={`
          mt-2 flex items-center gap-1 text-xs
          ${getTrendColor()}
        `}>
          {getTrendIcon()}
          <span>{trend.percentage}% vs last month</span>
          
          {/* Mini sparkline - simple representation */}
          <div className="flex items-center gap-0.5 ml-auto">
            {[...Array(5)].map((_, i) => {
              const height = Math.floor(Math.random() * 12) + 4;
              return (
                <div
                  key={i}
                  className={`
                    w-1 rounded-full
                    ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}
                  `}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Progress bar for certain stats */}
      {(stat.name === 'ACTIVE USER' || stat.showProgress) && activeUsers > 0 && (
        <div className="mt-3">
          <div className={`
            w-full h-1.5 rounded-full overflow-hidden
            ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
          `}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${percentage}%`,
                backgroundColor: stat.color 
              }}
            />
          </div>
        </div>
      )}

      {/* Interactive overlay for clickable cards */}
      {onClick && isHovered && (
        <div className="absolute inset-0 rounded-xl bg-black bg-opacity-5 flex items-center justify-center">
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full
            ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            shadow-lg
          `}>
            View Details
          </span>
        </div>
      )}
    </div>
  );
};

// Predefined stat card variants
export const StatCardWithIcon = (props) => (
  <StatCard {...props} />
);

export const StatCardCompact = (props) => (
  <StatCard {...props} size="small" showTrend={false} />
);

export const StatCardDetailed = (props) => (
  <StatCard {...props} size="large" />
);

// Example usage with different color variants
export const StatCardPrimary = (props) => (
  <StatCard 
    {...props} 
    stat={{ ...props.stat, color: '#3B82F6' }} 
  />
);

export const StatCardSuccess = (props) => (
  <StatCard 
    {...props} 
    stat={{ ...props.stat, color: '#10B981' }} 
  />
);

export const StatCardWarning = (props) => (
  <StatCard 
    {...props} 
    stat={{ ...props.stat, color: '#F59E0B' }} 
  />
);

export const StatCardDanger = (props) => (
  <StatCard 
    {...props} 
    stat={{ ...props.stat, color: '#EF4444' }} 
  />
);

// Default props
StatCard.defaultProps = {
  stat: {
    name: 'Statistic',
    value: 0,
    color: '#3B82F6',
    icon: TrendingUp,
    description: ''
  },
  activeUsers: 0,
  darkMode: false,
  showTrend: true,
  size: 'default'
};

export default StatCard;