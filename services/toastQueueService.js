'use client';

import { toast as toastify } from 'react-toastify';

/**
 * Toast Queue Service to manage multiple toast messages
 * and prevent overwhelming the user
 */
class ToastQueue {
  constructor(maxVisible = 3) {
    this.queue = [];
    this.visible = 0;
    this.maxVisible = maxVisible;
  }
  
  /**
   * Add a toast message to the queue
   * 
   * @param {string} message The toast message
   * @param {string} type The toast type (success, error, warning, info)
   * @param {Object} options Toast options
   */
  add(message, type, options = {}) {
    const toastItem = { message, type, options };
    
    if (this.visible < this.maxVisible) {
      this.show(toastItem);
    } else {
      this.queue.push(toastItem);
    }
  }
  
  /**
   * Show a toast message
   * 
   * @param {Object} toastItem The toast item to show
   */
  show({ message, type, options }) {
    this.visible++;
    
    // Create a callback for when toast is closed
    const onClose = () => {
      this.visible--;
      
      // Show next toast in queue if available
      if (this.queue.length > 0) {
        const nextToast = this.queue.shift();
        this.show(nextToast);
      }
    };
    
    // Show the toast with the onClose callback
    const enhancedOptions = {
      ...options,
      onClose,
    };
    
    switch (type) {
      case 'success':
        toastify.success(message, enhancedOptions);
        break;
      case 'error':
        toastify.error(message, enhancedOptions);
        break;
      case 'warning':
        toastify.warning(message, enhancedOptions);
        break;
      case 'info':
      default:
        toastify.info(message, enhancedOptions);
    }
  }
  
  /**
   * Clear all pending toasts
   */
  clear() {
    this.queue = [];
  }
}

// Export a singleton instance
export const toastQueue = new ToastQueue(); 