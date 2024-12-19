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
    if (msalInstance) {
      // Call backend to invalidate session
      try {
        const accessToken = await getAccessToken();
        await fetch(AUTH_CONFIG.endpoints.logout, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error calling logout endpoint:', error);
      }

      // Perform MSAL logout
      await msalInstance.logoutRedirect({
        postLogoutRedirectUri: AUTH_CONFIG.routes.login
      });
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