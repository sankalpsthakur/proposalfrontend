'use client';

import { useEffect, useState, useCallback } from 'react';
import { getMsalInstance } from './msalConfig';
import { useRouter } from 'next/navigation';
import { AUTH_CONFIG } from './authConfig';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    const validateToken = useCallback(async (msalInstance, account) => {
      try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          scopes: AUTH_CONFIG.scopes.default,
          account: account
        });

        // Validate token with backend
        const response = await fetch(AUTH_CONFIG.endpoints.validate, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenResponse.accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Token validation failed:', errorData);
          throw new Error(AUTH_CONFIG.errors.unauthorized);
        }

        return true;
      } catch (error) {
        console.error('Token validation error:', error);
        return false;
      }
    }, []);

    const handleLogin = useCallback(async (msalInstance) => {
      try {
        await msalInstance.loginRedirect({
          scopes: AUTH_CONFIG.scopes.default,
          prompt: 'select_account'
        });
      } catch (error) {
        console.error('Login redirect error:', error);
        setError(error.message);
      }
    }, []);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          const msalInstance = await getMsalInstance();
          if (!msalInstance) {
            throw new Error(AUTH_CONFIG.errors.initFailed);
          }

          // Handle redirect promise first
          try {
            const result = await msalInstance.handleRedirectPromise();
            if (result) {
              const isValid = await validateToken(msalInstance, result.account);
              if (isValid) {
                setIsAuthenticated(true);
                return;
              }
            }
          } catch (redirectError) {
            console.error('Redirect error:', redirectError);
            setError(redirectError.message);
            return;
          }

          // Check for active account
          const accounts = msalInstance.getAllAccounts();
          if (accounts.length === 0) {
            await handleLogin(msalInstance);
            return;
          }

          // Validate existing account
          const isValid = await validateToken(msalInstance, accounts[0]);
          if (!isValid) {
            await handleLogin(msalInstance);
            return;
          }

          setIsAuthenticated(true);
        } catch (error) {
          console.error('Authentication error:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuthentication();
    }, [router, validateToken, handleLogin]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-center">
            <div className="text-[#CCFF00] text-xl font-semibold mb-4">Loading...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCFF00] mx-auto"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-center">
            <div className="text-red-500 text-xl font-semibold mb-4">Authentication Error</div>
            <div className="text-white mb-4">{error}</div>
            <button 
              onClick={async () => {
                const msalInstance = await getMsalInstance();
                if (msalInstance) {
                  await msalInstance.loginRedirect({
                    scopes: AUTH_CONFIG.scopes.default,
                    prompt: 'select_account'
                  });
                }
              }}
              className="px-4 py-2 bg-[#CCFF00] text-[#1A3721] rounded hover:bg-white transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
} 