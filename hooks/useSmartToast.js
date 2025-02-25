'use client';

import { useState, useEffect } from 'react';
import { toastService } from '../services/toastService';

/**
 * Hook that provides smart toast notifications that adapt based on user behavior
 */
export const useSmartToast = () => {
  const [userInteractions, setUserInteractions] = useState({
    toastClicks: 0,
    pageInteractions: 0,
  });
  
  // Track user interactions
  useEffect(() => {
    const trackInteraction = () => {
      setUserInteractions(prev => ({
        ...prev,
        pageInteractions: prev.pageInteractions + 1,
      }));
    };
    
    window.addEventListener('click', trackInteraction);
    window.addEventListener('keydown', trackInteraction);
    
    return () => {
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('keydown', trackInteraction);
    };
  }, []);
  
  /**
   * Show a toast notification with adaptive behavior based on user interactions
   * 
   * @param {string} message The toast message
   * @param {string} type The toast type
   * @param {Object} options Toast options
   */
  const showToast = (message, type, options = {}) => {
    // If user rarely interacts with toasts, make them more persistent
    if (userInteractions.toastClicks < 2 && userInteractions.pageInteractions > 20) {
      options.autoClose = 8000; // Longer duration
      options.hideProgressBar = false; // Always show progress
    }
    
    // If user frequently dismisses toasts, make them less intrusive
    if (userInteractions.toastClicks > 5) {
      options.autoClose = 3000; // Shorter duration
    }
    
    // Track toast interaction
    const originalOnClick = options.onClick;
    options.onClick = (...args) => {
      setUserInteractions(prev => ({
        ...prev,
        toastClicks: prev.toastClicks + 1,
      }));
      
      if (originalOnClick) {
        originalOnClick(...args);
      }
    };
    
    return toastService.show(message, type, options);
  };
  
  return {
    success: (message, options) => showToast(message, 'success', options),
    error: (message, options) => showToast(message, 'error', options),
    warning: (message, options) => showToast(message, 'warning', options),
    info: (message, options) => showToast(message, 'info', options),
  };
}; 