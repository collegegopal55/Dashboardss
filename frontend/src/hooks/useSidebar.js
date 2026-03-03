import { useState, useCallback, useRef, useEffect } from 'react';
import { useMobile } from './useMobile';

export const useSidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedDropdowns, setExpandedDropdowns] = useState({});
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
  const [activeDropdownItem, setActiveDropdownItem] = useState(null);
  
  const hoverTimeoutRef = useRef(null);
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    if (sidebarCollapsed && isHovering && !mobileSidebarOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        setSidebarCollapsed(false);
      }, 150);
    } else if (!sidebarCollapsed && !isHovering && !mobileSidebarOpen) {
      hoverTimeoutRef.current = setTimeout(() => {
        setSidebarCollapsed(true);
      }, 300);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [sidebarCollapsed, isHovering, mobileSidebarOpen, isMobile]);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(prev => !prev);
    if (!mobileSidebarOpen && isMobile) {
      setSidebarCollapsed(false);
    }
  }, [mobileSidebarOpen, isMobile]);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsHovering(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setIsHovering(false);
    }
  }, [isMobile]);

  const toggleDropdown = useCallback((itemName) => {
    if (!isMobile && sidebarCollapsed) return;
    
    setExpandedDropdowns(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  }, [sidebarCollapsed, isMobile]);

  const setActiveItem = useCallback((item, dropdownItem = null) => {
    setActiveSidebarItem(item);
    if (dropdownItem) {
      setActiveDropdownItem(dropdownItem);
    }
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  return {
    sidebarCollapsed,
    mobileSidebarOpen,
    isHovering,
    expandedDropdowns,
    activeSidebarItem,
    activeDropdownItem,
    toggleSidebar,
    toggleMobileSidebar,
    closeMobileSidebar,
    handleMouseEnter,
    handleMouseLeave,
    toggleDropdown,
    setActiveItem,
    isMobile
  };
};