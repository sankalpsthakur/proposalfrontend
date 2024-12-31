'use client';

export const AUTH_CONFIG = {
  // API Endpoints
  endpoints: {
    signin: `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    validate: `${process.env.NEXT_PUBLIC_API_URL}/auth/validate_session`,
    logout: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    msCallback: `${process.env.NEXT_PUBLIC_API_URL}/auth/ms`
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