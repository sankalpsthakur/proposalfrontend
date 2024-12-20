'use client';

import { useEffect, useState } from 'react';
import { getMsalInstance } from './msalConfig';
import { useRouter } from 'next/navigation';
import { AUTH_CONFIG } from './authConfig';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          const msalInstance = await getMsalInstance();
          if (!msalInstance) {
            throw new Error(AUTH_CONFIG.errors.initFailed);
          }

          // Check for active account
          const accounts = msalInstance.getAllAccounts();
          if (accounts.length === 0) {
            // No active account, initiate login
            await msalInstance.loginRedirect({
              scopes: AUTH_CONFIG.scopes.default,
              prompt: 'select_account'
            });
            return;
          }

          // Validate the session with backend
          const activeAccount = accounts[0];
          try {
            const tokenResponse = await msalInstance.acquireTokenSilent({
              scopes: AUTH_CONFIG.scopes.default,
              account: activeAccount
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
              throw new Error(AUTH_CONFIG.errors.unauthorized);
            }

            setIsAuthenticated(true);
          } catch (tokenError) {
            // Token acquisition failed, initiate login redirect
            await msalInstance.loginRedirect({
              scopes: AUTH_CONFIG.scopes.default,
              prompt: 'select_account'
            });
          }
        } catch (error) {
          console.error('Authentication error:', error);
          setError(error.message);
          // Initiate login redirect
          const msalInstance = await getMsalInstance();
          if (msalInstance) {
            await msalInstance.loginRedirect({
              scopes: AUTH_CONFIG.scopes.default,
              prompt: 'select_account'
            });
          }
        } finally {
          setIsLoading(false);
        }
      };

      checkAuthentication();
    }, [router]);

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