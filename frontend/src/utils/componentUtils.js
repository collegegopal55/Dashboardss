import React from 'react';

// Memoize HOC for components
export const withMemo = (Component) => React.memo(Component);

// Class name merger utility
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};