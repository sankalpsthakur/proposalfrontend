'use client';

export const AUTH_CONFIG = {
  // API Endpoints
  endpoints: {
    signin: `https://proposal.hygenco.in/api/auth/signin`,
    validate: `https://proposal.hygenco.in/api/auth/validate_session`,
    logout: `https://proposal.hygenco.in/api/auth/logout`,
    msCallback: `https://proposal.hygenco.in/api/auth/ms`
  },
  
  // Routes
  routes: {
    home: '/app',
    unauthorized: '/unauthorized'
  },
  
  // Error Messages
  errors: {
    initFailed: 'Failed to initialize authentication',
    sessionExpired: 'Your session has expired. Please login again.',
    unauthorized: 'You are not authorized to access this resource.',
    networkError: 'Network error. Please check your connection.',
  }
}; 