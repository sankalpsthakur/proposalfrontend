'use client';

import { toast as toastify } from 'react-toastify';
import { useMemo } from 'react';

// Define toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Define toast positions
export const TOAST_POSITIONS = {
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_LEFT: 'bottom-left',
};

// Define default options
const defaultOptions = {
  position: TOAST_POSITIONS.BOTTOM_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  // Accessibility improvements
  role: 'alert',
  ariaLive: 'assertive',
  closeButton: ({ closeToast }) => (
    <button 
      onClick={closeToast} 
      aria-label="Close notification"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      ×
    </button>
  ),
};

// Enhance message with icons and additional context
const enhanceMessage = (message, type) => {
  // Add icons based on message type
  const icons = {
    [TOAST_TYPES.SUCCESS]: '✅',
    [TOAST_TYPES.ERROR]: '❌',
    [TOAST_TYPES.WARNING]: '⚠️',
    [TOAST_TYPES.INFO]: 'ℹ️',
  };
  
  // For error messages, add more context if available
  if (type === TOAST_TYPES.ERROR && typeof message === 'string') {
    // Add a suggestion for common errors
    if (message.includes('network') || message.includes('connection')) {
      return `${icons[type]} ${message} Please check your internet connection and try again.`;
    }
    
    if (message.includes('permission') || message.includes('unauthorized')) {
      return `${icons[type]} ${message} You may need to log in again.`;
    }
  }
  
  return `${icons[type]} ${message}`;
};

// Calculate dynamic duration based on message length and type
const getDynamicDuration = (message, type) => {
  const baseDurations = {
    [TOAST_TYPES.SUCCESS]: 3000,
    [TOAST_TYPES.INFO]: 4000,
    [TOAST_TYPES.WARNING]: 5000,
    [TOAST_TYPES.ERROR]: 7000,
  };
  
  const baseTime = baseDurations[type] || 5000;
  const wordCount = typeof message === 'string' ? message.split(' ').length : 5;
  
  // Add 100ms per word for longer messages, capped at 3 extra seconds
  return baseTime + Math.min(wordCount * 100, 3000);
};

// Non-hook version for direct imports
export const toastService = {
  show: (message, type = TOAST_TYPES.INFO, options = {}) => {
    const enhancedMessage = enhanceMessage(message, type);
    const dynamicDuration = getDynamicDuration(message, type);
    const toastOptions = { 
      ...defaultOptions, 
      autoClose: dynamicDuration,
      ...options 
    };
    
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return toastify.success(enhancedMessage, toastOptions);
      case TOAST_TYPES.ERROR:
        return toastify.error(enhancedMessage, toastOptions);
      case TOAST_TYPES.WARNING:
        return toastify.warning(enhancedMessage, toastOptions);
      case TOAST_TYPES.INFO:
      default:
        return toastify.info(enhancedMessage, toastOptions);
    }
  },
  
  success: (message, options = {}) => {
    return toastService.show(message, TOAST_TYPES.SUCCESS, options);
  },
  
  error: (message, options = {}) => {
    return toastService.show(message, TOAST_TYPES.ERROR, options);
  },
  
  warning: (message, options = {}) => {
    return toastService.show(message, TOAST_TYPES.WARNING, options);
  },
  
  info: (message, options = {}) => {
    return toastService.show(message, TOAST_TYPES.INFO, options);
  },
};

// Hook version for component usage with memoization
export const useToastService = () => {
  return useMemo(() => ({
    show: (message, type = TOAST_TYPES.INFO, options = {}) => {
      return toastService.show(message, type, options);
    },
    
    success: (message, options = {}) => {
      return toastService.success(message, options);
    },
    
    error: (message, options = {}) => {
      return toastService.error(message, options);
    },
    
    warning: (message, options = {}) => {
      return toastService.warning(message, options);
    },
    
    info: (message, options = {}) => {
      return toastService.info(message, options);
    },
  }), []);
}; 