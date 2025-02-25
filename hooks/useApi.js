'use client';

import { useState, useCallback } from 'react';
import { toastService } from '../services/toastService';
import { fetchData } from '../utils/apiUtils';

/**
 * Hook for making API calls with integrated loading state and toast notifications
 */
export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make an API call with loading state and toast notifications
   * 
   * @param {Function} apiCall The API call function
   * @param {Object} options Options for the API call
   * @returns {Promise<any>} The response data
   */
  const callApi = useCallback(async (apiCall, options = {}) => {
    const {
      loadingMessage = 'Loading...',
      successMessage,
      errorMessage = 'An error occurred',
      showLoadingToast = false,
      showSuccessToast = true,
      showErrorToast = true,
      onSuccess,
      onError,
    } = options;

    try {
      setIsLoading(true);
      setError(null);
      
      if (showLoadingToast) {
        toastService.info(loadingMessage);
      }
      
      const response = await apiCall();
      
      if (showSuccessToast && successMessage) {
        toastService.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (err) {
      setError(err);
      
      if (showErrorToast) {
        toastService.error(err.message || errorMessage);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Make a GET request
   * 
   * @param {string} url The URL to fetch from
   * @param {Object} options Options for the API call
   * @returns {Promise<any>} The response data
   */
  const get = useCallback((url, options = {}) => {
    return callApi(() => fetchData(url, { method: 'GET', ...options }), options);
  }, [callApi]);

  /**
   * Make a POST request
   * 
   * @param {string} url The URL to fetch from
   * @param {Object} data The data to send
   * @param {Object} options Options for the API call
   * @returns {Promise<any>} The response data
   */
  const post = useCallback((url, data, options = {}) => {
    return callApi(() => fetchData(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    }), options);
  }, [callApi]);

  /**
   * Make a PUT request
   * 
   * @param {string} url The URL to fetch from
   * @param {Object} data The data to send
   * @param {Object} options Options for the API call
   * @returns {Promise<any>} The response data
   */
  const put = useCallback((url, data, options = {}) => {
    return callApi(() => fetchData(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    }), options);
  }, [callApi]);

  /**
   * Make a DELETE request
   * 
   * @param {string} url The URL to fetch from
   * @param {Object} options Options for the API call
   * @returns {Promise<any>} The response data
   */
  const del = useCallback((url, options = {}) => {
    return callApi(() => fetchData(url, { method: 'DELETE', ...options }), options);
  }, [callApi]);

  return {
    isLoading,
    error,
    get,
    post,
    put,
    delete: del,
  };
}; 