'use client';

import { getMsalInstance } from './msalConfig';
import { AUTH_CONFIG } from './authConfig';

/**
 * Acquires an access token silently or redirects to login
 */
export const getAccessToken = async () => {
  try {
    const msalInstance = await getMsalInstance();
    if (!msalInstance) {
      throw new Error(AUTH_CONFIG.errors.initFailed);
    }

    const accounts = msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No active account');
    }

    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: AUTH_CONFIG.scopes.default,
      account: accounts[0]
    });

    return tokenResponse.accessToken;
  } catch (error) {
    console.error('Error acquiring token:', error);
    throw error;
  }
};

/**
 * Validates the current session with the backend
 */
export const validateSession = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(AUTH_CONFIG.endpoints.validate, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(AUTH_CONFIG.errors.unauthorized);
    }

    return true;
  } catch (error) {
    console.error('Session validation error:', error);
    return false;
  }
};

/**
 * Handles user logout
 */
export const logout = async () => {
  try {
    const msalInstance = await getMsalInstance();
    if (!msalInstance) {
      throw new Error(AUTH_CONFIG.errors.initFailed);
    }

    // Call backend to invalidate session
    let backendLogoutSuccessful = false;
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(AUTH_CONFIG.endpoints.logout, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      backendLogoutSuccessful = response.ok;
      if (!backendLogoutSuccessful) {
        console.error('Backend logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Error calling logout endpoint:', error);
      throw new Error('Failed to invalidate backend session');
    }

    if (backendLogoutSuccessful) {
      // Only perform MSAL logout if backend session was successfully invalidated
      await msalInstance.logoutRedirect({
        postLogoutRedirectUri: AUTH_CONFIG.routes.login
      });
    } else {
      throw new Error('Failed to invalidate backend session');
    }
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Checks if the current route requires authentication
 */
export const requiresAuth = (pathname) => {
  const publicPaths = [
    AUTH_CONFIG.routes.login,
    '/unauthorized',
    '/',
    '/privacy',
    '/terms'
  ];
  return !publicPaths.includes(pathname);
}; 