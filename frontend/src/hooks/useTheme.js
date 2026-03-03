import { useState, useCallback } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return { darkMode, toggleDarkMode };
};