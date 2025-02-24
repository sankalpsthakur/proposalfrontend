'use client';

import React, { createContext, useContext, useState } from 'react';
import { toastService } from '../services/toastService';
import { debounce } from '../utils/debounce';

// Create the context
const ErrorContext = createContext(null);

// Create debounced versions of toast functions
const debouncedToasts = {
  error: debounce((message, options) => toastService.error(message, options), 300),
  warning: debounce((message, options) => toastService.warning(message, options), 300),
};

/**
 * Error Provider component
 */
export const ErrorProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState(null);

  /**
   * Handle an error and show a toast notification
   * 
   * @param {Error|string} error The error object or message
   * @param {string} context The context where the error occurred
   * @param {boolean} debounced Whether to debounce the toast notification
   */
  const handleError = (error, context = 'application', debounced = false) => {
    console.error(`Error in ${context}:`, error);
    
    // Set global error state
    setGlobalError({ error, context, timestamp: Date.now() });
    
    // Extract error message
    const message = typeof error === 'string' 
      ? error 
      : error.message || `An error occurred in ${context}`;
    
    // Show toast notification
    if (debounced) {
      debouncedToasts.error(message);
    } else {
      toastService.error(message);
    }
  };

  /**
   * Handle a warning and show a toast notification
   * 
   * @param {string} message The warning message
   * @param {string} context The context where the warning occurred
   * @param {boolean} debounced Whether to debounce the toast notification
   */
  const handleWarning = (message, context = 'application', debounced = false) => {
    console.warn(`Warning in ${context}:`, message);
    
    if (debounced) {
      debouncedToasts.warning(message);
    } else {
      toastService.warning(message);
    }
  };

  /**
   * Clear the global error
   */
  const clearError = () => {
    setGlobalError(null);
  };

  return (
    <ErrorContext.Provider value={{ 
      globalError, 
      handleError, 
      handleWarning,
      clearError 
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * Hook to use the error context
 */
export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}; 