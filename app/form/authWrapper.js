'use client';

import { useEffect, useState } from 'react';
import { getMsalInstance } from './msalConfig';

export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const msalInstance = await getMsalInstance();
          if (!msalInstance) {
            console.error('MSAL instance not initialized');
            return;
          }

          const accounts = msalInstance.getAllAccounts();
          if (accounts.length === 0) {
            await msalInstance.loginRedirect({
              scopes: ['user.read'],
            });
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Authentication error:', error);
        } finally {
          setIsLoading(false);
        }
      };

      checkAuthentication();
    }, []);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-[#CCFF00] text-xl font-semibold">Loading...</div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#1A3721]">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-[#CCFF00]">Please sign in to access the dashboard.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
} 