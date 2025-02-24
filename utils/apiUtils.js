'use client';

import { toastService } from '../services/toastService';

// Map to store pending requests for deduplication
const pendingRequests = new Map();

/**
 * Handles API errors based on status code and displays appropriate toast messages
 * 
 * @param {Error} error The error object
 * @param {string} defaultMessage Default error message
 */
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  // Handle network errors
  if (!error.response) {
    toastService.error('Network error. Please check your connection.');
    return;
  }
  
  // Handle HTTP status codes
  switch (error.response.status) {
    case 400:
      toastService.warning(error.response.data?.message || 'Invalid request. Please check your input.');
      break;
    case 401:
      toastService.warning('Your session has expired. Please login again.');
      // Could trigger re-authentication here
      break;
    case 403:
      toastService.error('You do not have permission to perform this action.');
      break;
    case 404:
      toastService.warning('The requested resource was not found.');
      break;
    case 422:
      toastService.warning('Validation error. Please check your input.');
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      toastService.error('Server error. Please try again later.');
      break;
    default:
      toastService.error(error.response.data?.message || defaultMessage);
  }
};

/**
 * Fetches data from an API with request deduplication
 * 
 * @param {string} url The URL to fetch from
 * @param {Object} options Fetch options
 * @returns {Promise<any>} The response data
 */
export const fetchWithDeduplication = async (url, options = {}) => {
  const requestKey = `${options.method || 'GET'}-${url}-${JSON.stringify(options.body || {})}`;
  
  // If this exact request is already in progress, return the existing promise
  if (pendingRequests.has(requestKey)) {
    return pendingRequests.get(requestKey);
  }
  
  // Create the request promise
  const requestPromise = fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
    .then(async (response) => {
      // Remove from pending requests
      pendingRequests.delete(requestKey);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { response: { status: response.status, data: errorData } };
      }
      
      return response.json();
    })
    .catch((error) => {
      // Remove from pending requests
      pendingRequests.delete(requestKey);
      throw error;
    });
  
  // Store the promise
  pendingRequests.set(requestKey, requestPromise);
  
  return requestPromise;
};

/**
 * Fetches data from an API with error handling
 * 
 * @param {string} url The URL to fetch from
 * @param {Object} options Fetch options
 * @returns {Promise<any>} The response data
 */
export const fetchData = async (url, options = {}) => {
  try {
    return await fetchWithDeduplication(url, options);
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw for component-level handling
  }
}; 