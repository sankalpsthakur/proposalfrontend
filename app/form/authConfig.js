'use client';

export const AUTH_CONFIG = {
  // API Endpoints
  endpoints: {
    validate: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`,
    refresh: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
    logout: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
  },
  
  // MSAL Scopes
  scopes: {
    default: ['user.read'],
    extended: ['user.read', 'profile', 'email']
  },
  
  // Routes
  routes: {
    home: '/app',
    unauthorized: '/unauthorized'
  },
  
  // Session Settings
  session: {
    refreshBeforeExpiry: 5 * 60 * 1000, // Refresh token 5 minutes before expiry
    maxIdleTime: 30 * 60 * 1000, // 30 minutes
  },
  
  // Error Messages
  errors: {
    initFailed: 'Failed to initialize authentication',
    sessionExpired: 'Your session has expired. Please login again.',
    unauthorized: 'You are not authorized to access this resource.',
    networkError: 'Network error. Please check your connection.',
  }
}; 